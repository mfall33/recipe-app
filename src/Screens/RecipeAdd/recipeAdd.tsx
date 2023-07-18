import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';
import { useCallback, useMemo, useRef, useState } from "react";
import { ScrollView, View, Alert, TouchableOpacity, Image, ImageBackground, Text, Touchable } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

import { TextInput, Button, Header, ImageContainer, ParaSm, TitleMd } from "../../Components";
import { useRecipes } from "../../Hooks";
import { styles } from "./styles";
import { addRecipe } from "../../Redux/Store/recipeStore";
import Modal from "react-native-modal";
import { TURQOISE, TURQOISE_OP, WHITE } from "../../Constants/Colors";

const RecipeAdd = ({ route }) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { addImage } = useRecipes();

    const [modal, setModal] = useState(false);
    const [photo, setPhoto] = useState(true);
    const [photos, setPhotos] = useState([]);

    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');

    const [ingredients, setIngredients] = useState([]);

    const [nameErrors, setNameErrors] = useState([]);
    const [durationErrors, setDurationErrors] = useState([]);

    const nameRef = useRef(null);
    const durationRef = useRef(null);

    useFocusEffect(

        useCallback(() => {

            try {
                const { name, duration } = route.params;

                setName(name);
                setDuration(duration);

            } catch (err) {

            }

        }, [])

    );

    const mainImg = useMemo(() => {

        let image = require('../../../assets/images/cooking-stock.jpeg');

        if (photos.length > 0) {
            image = {
                uri: photos[0].uri
            }
        }

        return image;

    }, [photos]);

    const clearErrors = () => {
        setNameErrors([]);
        setDurationErrors([]);
    }

    const clearFields = () => {
        setName('')
        setDuration('')
    }

    const showModal = (image) => {
        setPhoto(image);
        setModal(true)
    }

    // determines if the user has made a start on making a new recipe
    const madeStart = useCallback((): boolean => {
        return !!(name.length > 0 || duration.length > 0 || photos.length > 0);
    }, [name, duration, photos]);

    const onSubmitHandler = async () => {

        await dispatch(addRecipe({ name, duration, ingredients }))
            .unwrap()
            .then(data => {

                clearErrors();

                if (data.errors) {
                    alert(JSON.stringify(data.errors))
                    setNameErrors(data.errors.name)
                    setDurationErrors(data.errors.duration)
                    return;
                }

                clearFields();

                if (photos.length) uploadPhotos()

                navigation.replace('Recipe');

                Toast.show({
                    type: 'success',
                    text1: 'New Recipe Added!'
                })

            })
            .catch(function (error) {
                console.log("Error: " + JSON.stringify(error))
                Toast.show({
                    type: 'error',
                    text1: 'Something went wrong.. please try again.'
                })
            })

    }

    const handleImageSelection = () => {

        launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 3
        })
            .then(response => {

                if (response.error) {

                    return Toast.show({
                        type: 'error',
                        text1: 'Failed to select image'
                    })

                } else if (response.didCancel) {

                    return Toast.show({
                        type: 'error',
                        text1: 'Image selection cancelled'
                    })

                } else {

                    let tmpPhotos = [];

                    response.assets.forEach(asset => tmpPhotos.push({
                        fileName: asset.fileName,
                        type: asset.type,
                        uri: asset.uri
                    }));

                    setPhotos(tmpPhotos);
                }

            })

    }

    const uploadPhotos = () => {

        const formData = new FormData();
        photos.forEach((image) => {
            formData.append('files', {
                uri: image.uri,
                type: image.type,
                name: image.fileName,
            });
        });

        addImage(formData);
        setPhotos([]);

    }

    const handleIngredientData = (ingredientData) => {
        setIngredients([...ingredients, ingredientData]);
    };

    return (
        <View style={{
            height: '100%',
            paddingVertical: 0
        }}>

            <Modal
                isVisible={modal}
                onBackdropPress={() => setModal(false)}
                animationInTiming={200}
                animationOutTiming={200}>
                <View style={styles.modalInner}>
                    <Image
                        source={{ uri: photo }}
                        style={styles.modalImg} />
                </View>
            </Modal>

            <Header
                backBtnPress={
                    () => {
                        if (!madeStart()) {
                            return navigation.goBack()
                        }

                        Alert.alert(`Leave page?`, `Are you sure you want to leave this page?`, [
                            { text: 'No', },
                            {
                                text: 'Yes',
                                onPress: () => {
                                    navigation.goBack()
                                }
                            }])

                    }
                } />

            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>

                <ImageBackground
                    style={styles.imgBackground}
                    source={mainImg}>
                    <View style={styles.imgBackgroundCont}>
                        <View>
                            <TitleMd style={{ color: WHITE }}>New Recipe</TitleMd>
                            <ParaSm style={styles.whiteAndItalic}>Create your new masterpiece!</ParaSm>
                        </View>
                        <View style={styles.actionBtnCont}>
                            <TouchableOpacity
                                style={[styles.actionBtn, { backgroundColor: TURQOISE_OP }]}
                                onPress={() => handleImageSelection()}>
                                <Image source={require('../../../assets/images/Icons/Image-Add.png')}
                                    style={styles.actionBtnImg} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

                {photos.length > 0 &&
                    <ImageContainer
                        images={photos.map(photo => photo.uri)}
                        onPress={(image) => showModal(image)}
                        contStyle={styles.topImgContCont}
                        imgStyle={styles.bottomImg}
                        onDeletePress={(image) => {
                            Alert.alert(`Delete image`, `Are you sure you want to delete this image?`, [
                                { text: 'No', },
                                {
                                    text: 'Yes',
                                    onPress: () => setPhotos(photos.filter(photo => photo.uri !== image))
                                }])
                        }}
                    />
                }

                <View style={styles.pad}>

                    <TextInput
                        required={true}
                        errors={nameErrors}
                        inputRef={nameRef}
                        value={name}
                        label="Recipe name"
                        placeholder="Spaghetti Bolognese, Chicken Tikka Masala..."
                        onSubmitEditing={() => durationRef.current?.focus()}
                        onChangeText={(text) => setName(text)}
                    />

                    <TextInput
                        required={true}
                        errors={durationErrors}
                        inputRef={durationRef}
                        value={duration}
                        label="Duration"
                        placeholder="40 mins, 4 hours..."
                        blurOnSubmit={false}
                        onChangeText={(text) => setDuration(text)}
                    />


                    <TextInput
                        label={"Ingredients"}
                        editable={false}
                        value={"Add Ingredient"}
                        onPressIn={() => {
                            navigation.navigate("IngredientAdd", {
                                handleIngredientData: handleIngredientData
                            })
                        }}
                    />

                    <View style={{ marginTop: 15 }}>
                        {
                            ingredients.map((ing, index) => {
                                return (<View style={{ backgroundColor: TURQOISE_OP, borderColor: TURQOISE_OP, borderWidth: 2, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, marginBottom: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text
                                        style={{ color: WHITE, fontWeight: '600' }}>{ing.name} - {ing.amount} {ing.unit}</Text>
                                    <TouchableOpacity
                                        style={{ borderWidth: 1, borderColor: WHITE, borderRadius: 15, padding: 5 }}
                                        onPress={() => {
                                            setIngredients(prevIngredients => {
                                                return prevIngredients.filter((item, i) => i !== index);
                                            })
                                        }}
                                    >
                                        <Image source={require('../../../assets/images/Icons/Close.png')} style={{ width: 15, height: 15, tintColor: WHITE }} />
                                    </TouchableOpacity>
                                </View>);
                            })
                        }
                    </View>

                </View>

            </ScrollView>

            <View style={styles.btnCont}>

                <Button
                    text={`SUBMIT`}
                    style={{ borderColor: WHITE }}
                    onPress={onSubmitHandler}
                    disabled={false}
                />
            </View>

        </View>
    );
}

export default RecipeAdd;
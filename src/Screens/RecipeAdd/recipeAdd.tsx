import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';
import { useCallback, useRef, useState } from "react";
import { ScrollView, View, Alert, TouchableOpacity, Text, Image } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

import { TitleLg, ParaMd, TextInput, Button, Header, ImageContainer } from "../../Components";
import { useRecipes } from "../../Hooks";
import { styles } from "./styles";
import { addRecipe } from "../../Redux/Store/recipeStore";
import Modal from "react-native-modal";
import { RED, WHITE } from "../../Constants/Colors";

const RecipeAdd = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { addImage } = useRecipes();


    const [modal, setModal] = useState(false);
    const [photo, setPhoto] = useState(true);
    const [photos, setPhotos] = useState([]);

    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');

    const [nameErrors, setNameErrors] = useState([]);
    const [durationErrors, setDurationErrors] = useState([]);

    const nameRef = useRef(null);
    const durationRef = useRef(null);

    useFocusEffect(

        useCallback(() => {
            nameRef.current?.focus();
        }, [])

    );

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

        await dispatch(addRecipe({ name, duration }))
            .unwrap()
            .then(data => {

                clearErrors();

                if (data.errors) {
                    setNameErrors(data.errors.name)
                    setDurationErrors(data.errors.duration)
                    return;
                }

                clearFields();

                if (photos.length) uploadPhotos()

                navigation.navigate('Recipe');

                Toast.show({
                    type: 'success',
                    text1: 'New Recipe Added!'
                })

            })
            .catch(function (error) {
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

            <ScrollView showsVerticalScrollIndicator={false}>

                <View>
                    <TitleLg style={styles.title}>New Recipe</TitleLg>
                    <ParaMd style={styles.duration}>Create your new Recipe!</ParaMd>
                </View>

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

                </View>

                <View style={[styles.pad, styles.imgSelectBtnCont]}>
                    <TouchableOpacity onPress={() => handleImageSelection()}
                        style={styles.imgSelectBtn}>
                        <View>
                            <Text style={styles.imgSelectPlus}>+</Text>
                            <Text style={styles.imgSelectText}>Add some images</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.pad}>

                    <ImageContainer
                        images={photos.map(photo => photo.uri)}
                        onPress={(image) => showModal(image)}
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

                </View>

            </ScrollView>

            <View style={styles.btnCont}>

                <Button
                    text={`Submit ${name ? `'${name}'` : 'recipe'}!`}
                    style={{ borderColor: WHITE }}
                    onPress={onSubmitHandler}
                    disabled={false}
                />
            </View>

        </View>
    );
}

export default RecipeAdd;
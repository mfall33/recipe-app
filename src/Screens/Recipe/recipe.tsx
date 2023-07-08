import moment from 'moment';
import { useMemo, useRef, useState } from "react";
import { Alert, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import Modal from "react-native-modal";

import { TextInput, Button, Header, ImageContainer, TitleMd, ParaSm, ListItem, ImageBackground } from "../../Components";
import { useRecipes } from "../../Hooks";
import { styles } from "./styles";
import { RED_OP, TURQOISE, TURQOISE_OP, WHITE } from "../../Constants/Colors";
import { IMAGE_BASE_URL } from "../../../config";
import { useDispatch, useSelector } from 'react-redux';
import { likeRecipe } from '../../Redux/Store/recipeStore';
import { selectEmail } from '../../Redux/Store/userStore';
import { addRecipeToCollection, getCollections, selectCollections } from '../../Redux/Store/collectionStore';

const Recipe = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { recipe, deleteRecipe, editRecipe, deleteImage, addImage } = useRecipes();

    const currentEmail = useSelector(selectEmail);
    const collections = useSelector(selectCollections);

    const [modal, setModal] = useState(false);
    const [photo, setPhoto] = useState(true);

    const [name, setName] = useState(recipe.name);
    const [duration, setDuration] = useState(recipe.duration);
    const [photos, setPhotos] = useState([]);

    const [nameErrors, setNameErrors] = useState([]);
    const [durationErrors, setDurationErrors] = useState([]);

    const [collectionModal, setCollectionModal] = useState(false);

    const nameRef = useRef(null);
    const durationRef = useRef(null);

    const timeAgo = useMemo(() => {
        const duration = moment.duration(moment().diff(recipe.created_at));

        if (duration.asSeconds() < 60) {
            return `${Math.floor(duration.asSeconds())} seconds ago`;
        } else if (duration.asMinutes() < 60) {
            return `${Math.floor(duration.asMinutes())} minutes ago`;
        } else if (duration.asHours() < 24) {
            return `${Math.floor(duration.asHours())} hours ago`;
        } else if (duration.asDays() < 365) {
            return `${Math.floor(duration.asDays())} days ago`;
        } else {
            return `${Math.floor(duration.asYears())} years ago`;
        }
    }, [recipe.created_at]);

    const madeByCurrentUser = useMemo(() => {
        return recipe.user.email === currentEmail
    }, [recipe])

    const mainImg = useMemo(() => {
        
        let image = require('../../../assets/images/cooking-stock.jpeg');

        if (recipe?.images.length > 0) {
            image = { uri: `${IMAGE_BASE_URL}${recipe.images[0]}` }
            console.log("Image: " + JSON.stringify(image))
        }

        return image;

    }, [recipe])

    const clearErrors = () => {
        setNameErrors([]);
        setDurationErrors([]);
    }

    const updateSuccess = (data) => {
        clearErrors();

        if (data.errors) {
            setNameErrors(data.errors.name)
            setDurationErrors(data.errors.duration)
            return;
        }

        setName(data.name)
        setDuration(data.duration)

        Toast.show({
            type: 'success',
            text1: 'Recipe updated!'
        })
    }

    const updateFailure = (err) => {
        Toast.show({
            type: 'error',
            text1: 'Failed to save recipe!'
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

    const showModal = (image) => {
        setPhoto(image);
        setModal(true)
    }

    const toggleCollectionModal = () => {
        if (collectionModal) {
            setCollectionModal(false)
            return;
        }

        dispatch(getCollections())
            .unwrap()
            .then(data => {
                setCollectionModal(true);
            })
    }

    return (
        <View style={styles.mainCont}>

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

            <Header backBtnPress={() => navigation.goBack()} />

            <Modal
                isVisible={collectionModal}
                onBackdropPress={() => setCollectionModal(false)}
                animationInTiming={200}
                animationOutTiming={200}
            >
                <View
                    style={styles.collectionModalInner}>
                    <View style={{ backgroundColor: TURQOISE_OP, padding: 10 }}>
                        <TitleMd style={{ color: WHITE }}>Add to Collection</TitleMd>
                    </View>
                    <FlatList
                        data={collections}
                        renderItem={({ item }) => {

                            return (
                                <ListItem
                                    title={item.name}
                                    subTitleOne={item.recipes.length + " recipes"}
                                    onPress={() => {
                                        dispatch(addRecipeToCollection({ recipeId: recipe._id, collectionId: item._id }))
                                            .unwrap()
                                            .then(data => {
                                                setCollectionModal(false);
                                                Toast.show({
                                                    type: 'success',
                                                    text1: 'Recipe added to collection'
                                                })
                                                
                                            })

                                    }}
                                />)
                        }
                        }
                    />
                </View>
            </Modal>

            <ScrollView contentContainerStyle={styles.cont} showsVerticalScrollIndicator={false}>

                <ImageBackground
                    style={styles.imgBackground}
                    source={mainImg}>
                    <View style={styles.imgBackgroundCont}>
                        <TitleMd style={{ color: WHITE, textAlign: 'center' }}>{recipe.name}</TitleMd>
                        <ParaSm style={{ color: WHITE, textAlign: 'center' }}>{timeAgo} by <Text style={{ color: TURQOISE }}>{recipe.user.username}</Text></ParaSm>
                        <ParaSm style={{ color: WHITE, marginBottom: 10, textAlign: 'center' }}>{recipe.likes.length > 0 && recipe.likes.length + ' Likes'}</ParaSm>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={styles.actionBtnCont}>
                                <TouchableOpacity
                                    style={[styles.actionBtn, { backgroundColor: TURQOISE_OP }]} onPress={() => dispatch(likeRecipe(recipe))}>
                                    <Image source={recipe.liked ? require('../../../assets/images/Icons/Heart-Full.png') : require('../../../assets/images/Icons/Heart-Empty.png')}
                                        style={styles.actionBtnImg} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.actionBtn, { backgroundColor: TURQOISE_OP }]} onPress={() => { 
                                        toggleCollectionModal();
                                    }}>
                                    <Image source={require('../../../assets/images/Icons/Add-Collection.png')}
                                        style={styles.actionBtnImg} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.actionBtn, { backgroundColor: TURQOISE_OP }]}
                                    onPress={() => handleImageSelection()}>
                                    <Image source={require('../../../assets/images/Icons/Image-Add.png')}
                                        style={styles.actionBtnImg} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.actionBtn, { backgroundColor: TURQOISE_OP }]}
                                    onPress={() => navigation.navigate("RecipeAdd", { duration: recipe.duration, name: recipe.name })}>
                                    <Image source={require('../../../assets/images/Icons/Copy.png')}
                                        style={styles.actionBtnImg} />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: RED_OP }]}
                                    onPress={
                                        () => Alert.alert(`Remove Recipe`, `Are you sure you want to remove '${recipe.name}'?`, [
                                            { text: 'No', },
                                            {
                                                text: 'Yes',
                                                onPress: () => {
                                                    deleteRecipe(() => {
                                                        navigation.goBack();
                                                    })
                                                }
                                            }])
                                    } >
                                    <Image
                                        source={require('../../../assets/images/Icons/Delete.png')}
                                        style={styles.actionBtnImg} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                {recipe.images?.length > 1 &&
                    <View>
                        <ImageContainer
                            imgStyle={styles.topImg}
                            images={recipe.images}
                            imgUrlPrefix={IMAGE_BASE_URL}
                            contStyle={styles.topImgContCont}
                            onPress={(image) => { showModal(IMAGE_BASE_URL + image) }}
                            onDeletePress={(image) =>
                                Alert.alert(`Delete '${image}'`, `Are you sure you want to delete this image?`, [
                                    { text: 'No', },
                                    {
                                        text: 'Yes',
                                        onPress: () => {
                                            deleteImage(image)
                                        }
                                    }])
                            }
                        />
                    </View>}

                <View style={styles.pad}>


                    <TextInput
                        editable={madeByCurrentUser}
                        required={true}
                        errors={nameErrors}
                        inputRef={nameRef}
                        value={name}
                        label="Recipe name"
                        placeholder="Spaghetti Bolognese, Chicken Tikka Masala..."
                        onSubmitEditing={() => durationRef.current?.focus()}
                        onChangeText={(text) => {
                            setName(text)
                        }}
                    />

                    <TextInput
                        editable={madeByCurrentUser}
                        required={true}
                        errors={durationErrors}
                        inputRef={durationRef}
                        value={duration}
                        label="Duration"
                        placeholder="40 mins, 4 hours..."
                        blurOnSubmit={false}
                        onChangeText={(text) => {
                            setDuration(text)
                        }}
                    />

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

            </ScrollView >

            {madeByCurrentUser &&
                <View style={styles.btnCont}>

                    <Button
                        text={`UPDATE`}
                        style={{ borderColor: WHITE }}
                        onPress={() => {
                            editRecipe({ name, duration, successCallback: updateSuccess, errCallback: updateFailure })
                            photos.length > 0 && uploadPhotos()
                        }}
                        disabled={false}
                    />
                </View>
            }

        </View >
    );
}

export default Recipe;
import { useCallback, useRef, useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import Modal from "react-native-modal";

import { TextInput, Button, Header, ImageContainer } from "../../Components";
import { useRecipes } from "../../Hooks";
import { styles } from "./styles";
import { RED, WHITE } from "../../Constants/Colors";
import { IMAGE_BASE_URL } from "../../../config";

const Recipe = () => {

    const navigation = useNavigation();

    const { recipe, deleteRecipe, editRecipe, deleteImage, addImage } = useRecipes();

    const [modal, setModal] = useState(false);
    const [photo, setPhoto] = useState(true);

    const [name, setName] = useState(recipe.name);
    const [duration, setDuration] = useState(recipe.duration);
    const [photos, setPhotos] = useState([]);

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

            <Header backBtnPress={() => navigation.goBack()} subTitle={recipe.name} />

            <ScrollView contentContainerStyle={styles.cont} showsVerticalScrollIndicator={false}>

                {recipe.images?.length > 0 &&
                    <View>

                        <ImageContainer
                            style={styles.topImgCont}
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
                    style={{ backgroundColor: RED, borderColor: WHITE }}
                    text={`Delete '${recipe.name}'`}
                    onPress={
                        () => Alert.alert(`Remove Recipe`, `Are you sure you want to remove '${recipe.name}'?`, [
                            { text: 'No', },
                            {
                                text: 'Yes',
                                onPress: () => {
                                    deleteRecipe()
                                }
                            }])
                    } />

                <Button
                    text={`Update '${recipe.name}'!`}
                    style={{ borderColor: WHITE }}
                    onPress={() => {
                        editRecipe({ name, duration, successCallback: updateSuccess, errCallback: updateFailure })
                        photos.length > 0 && uploadPhotos()
                    }}
                    disabled={false}
                />
            </View>

        </View>
    );
}

export default Recipe;
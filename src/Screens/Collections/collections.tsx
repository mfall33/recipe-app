import moment from 'moment';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView, RefreshControl, Text, View, FlatList, Image, TouchableOpacity } from "react-native";

import { styles } from "./styles";
import { TURQOISE, TURQOISE_OP } from "../../Constants/Colors";
import { PlusBtn, Header, TextInput, TitleMd, Button, TitleSm, ListItem } from "../../Components";
import { addCollection, getCollections, selectCollectionStatus, selectCollections } from "../../Redux/Store/collectionStore";
import { useCollections, useRecipes } from "../../Hooks";

const Collections = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { viewCollection } = useCollections();

    const [refreshing, setRefreshing] = useState(false);
    const [modal, setModal] = useState(false);
    const [collectionName, setCollectionName] = useState("");
    const [collectionNameErrors, setCollectionNameErrors] = useState([]);

    const nameRef = useRef(null);

    const collectionStatus = useSelector(selectCollectionStatus);
    const collections = useSelector(selectCollections);

    useFocusEffect(
        useCallback(() => {
            dispatch(getCollections());
        }, [])
    );

    useEffect(() => {

        if (collectionStatus === 'idle') {
            dispatch(getCollections());
        }
    }, [collectionStatus, dispatch]);


    const refreshData = async () => {
        setRefreshing(true);
        dispatch(getCollections());
        setRefreshing(false);
    }

    const addNewCollecton = () => {

        setCollectionNameErrors([]);

        dispatch(addCollection(collectionName))
            .unwrap()
            .then(data => {
                dispatch(getCollections());
                setCollectionName('');
                setModal(false);
            })
            .catch(err => {

                if (err?.message) {
                    setCollectionName('');
                    setModal(false);
                    Toast.show({
                        type: 'error',
                        text1: err.message
                    })
                    return;
                }

                setCollectionNameErrors(err.errors.name);
            });

    }

    return (
        <View style={styles.cont}>

            <Header
                subTitle="My Collections"
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollCont}
                refreshControl={
                    <RefreshControl
                        tintColor={TURQOISE}
                        progressBackgroundColor={TURQOISE}
                        refreshing={refreshing}
                        onRefresh={refreshData} />
                }
            >


                <Modal
                    isVisible={modal}
                    onBackdropPress={() => {
                        setCollectionName('');
                        setModal(false);
                    }}
                    animationInTiming={200}
                    animationOutTiming={200}>
                    <View style={styles.modalInner}>
                        <View style={{ width: '100%' }}>
                            <TitleMd>New Collection</TitleMd>
                            <TextInput
                                label='Name'
                                required={true}
                                inputRef={nameRef}
                                errors={collectionNameErrors}
                                value={collectionName}
                                onChangeText={setCollectionName} />
                            <Button text="Add" disabled={collectionName.length <= 0} onPress={addNewCollecton} />
                        </View>
                    </View>
                </Modal>

                {collections.length > 0 ?
                    <FlatList
                        data={collections}
                        renderItem={({ item }) => {

                            const duration = moment.duration(moment().diff(item.created_at));

                            const timeAgo = () => {
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
                            };

                            return (
                                <ListItem
                                    title={item.name}
                                    subTitleOne={item.recipes.length + " recipes"}
                                    subTitleTwo={timeAgo()}
                                    onPress={() => viewCollection(item)}
                                />)
                        }
                        }
                    /> :
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ padding: 10, textAlign: 'center', fontSize: 24, fontWeight: '400', fontStyle: 'italic', marginTop: 60 }}>Looks like you haven't cooked up any collections yet!</Text>
                        <Text style={{ color: TURQOISE, padding: 10, textAlign: 'center', fontSize: 24, fontWeight: '400', fontStyle: 'italic', marginBottom: 20 }}>Let's get cracking and create some recipe playlists!</Text>
                        <Image source={require('../../../assets/images/Icons/Recipe-Book.png')} style={{ width: '100%', height: 250, resizeMode: 'contain' }} />
                    </View>
                }


            </ScrollView>
            <PlusBtn onPress={() => {
                nameRef.current?.focus()
                setModal(true)
            }} />
        </View>
    );
}

export default Collections;
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView, RefreshControl, Text, View, FlatList, Image } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-native-modal';

import { styles } from "./styles";
import { useRecipes } from "../../Hooks";
import { TURQOISE, TURQOISE_OP, WHITE } from "../../Constants/Colors";
import { Card, PlusBtn, Header, ListItem, TitleSm, TitleMd } from "../../Components";
import {
    getAllRecipes,
    selectAllRecipes,
    selectRecipeStatus,
} from "../../Redux/Store/recipeStore";
import { likeRecipe } from "../../Redux/Store/recipeStore";
import { addRecipeToCollection, getCollections, selectCollections } from "../../Redux/Store/collectionStore";
import Toast from "react-native-toast-message";

const Recipes = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState('');

    const [collectionModal, setCollectionModal] = useState(false);

    const [selectedRecipeId, setSelectedRecipeId] = useState('');

    const { viewRecipe } = useRecipes();

    const recipesStatus = useSelector(selectRecipeStatus)
    const recipes = useSelector(selectAllRecipes)
    const collections = useSelector(selectCollections)

    useEffect(() => {
        if (recipesStatus === 'idle') {
            dispatch(getAllRecipes(search));
        }
    }, [recipesStatus, dispatch])

    useFocusEffect(
        useCallback(() => {
            dispatch(getAllRecipes(search));
        }, [])
    );

    const refreshData = async () => {
        setRefreshing(true);
        dispatch(getAllRecipes(search));
        setRefreshing(false);
    }

    const toggleCollectionModal = () => {
        if (collectionModal) {
            setCollectionModal(false)
            setSelectedRecipeId('')
            return;
        }

        dispatch(getCollections())
            .unwrap()
            .then(data => {
                setCollectionModal(true);
            })
    }

    return (
        <View style={styles.cont}>

            <Header
                search={search}
                onChange={(e) => setSearch(e)}
                onSubmit={() => { dispatch(getAllRecipes(search)); }}
                onCancel={() => { setSearch('') }} />


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
                                        dispatch(addRecipeToCollection({ recipeId: selectedRecipeId, collectionId: item._id }))
                                            .unwrap()
                                            .then(data => {
                                                setCollectionModal(false);
                                                Toast.show({
                                                    type: 'success',
                                                    text1: 'Recipe added to collection'
                                                })
                                                setSelectedRecipeId('');
                                            })

                                    }}
                                />)
                        }
                        }
                    />
                </View>
            </Modal>

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

                {recipes.length > 0 ?
                    <FlatList
                        data={recipes}
                        renderItem={({ item }) =>
                            <Card
                                onPress={() => viewRecipe(item)}
                                title={item.name}
                                subTitle={item.duration}
                                bottomText={item.user.username}
                                image={item.images[0]}
                                createdAt={item.created_at}
                                onLikePress={() => dispatch(likeRecipe(item))}
                                onAddPress={() => {
                                    setSelectedRecipeId(item._id)
                                    toggleCollectionModal()
                                }}
                                liked={item.liked}
                            />
                        }
                    /> :
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ padding: 10, textAlign: 'center', fontSize: 24, fontWeight: '400', fontStyle: 'italic', marginTop: 60 }}>Oops! Looks like the <Text style={{ color: TURQOISE_OP }}>recipes</Text> went on vacation. Don't worry, we'll whip up a fresh batch of tasty ideas in no time!...</Text>
                        <Image source={require('../../../assets/images/Icons/Flour.png')} style={{ width: '100%', height: 250, resizeMode: 'contain' }} />
                    </View>
                }


            </ScrollView>
            <PlusBtn onPress={() => navigation.navigate("RecipeAdd")} />
        </View>
    );
}

export default Recipes;
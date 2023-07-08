import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView, RefreshControl, Text, View, FlatList, Image, ImageBackground, TouchableOpacity, Keyboard } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./styles";
import { useRecipes } from "../../Hooks";
import { TURQOISE, TURQOISE_OP } from "../../Constants/Colors";
import { Card, PlusBtn, Header } from "../../Components";
import {
    getAllRecipes,
    selectAllRecipes,
    selectRecipeStatus,
} from "../../Redux/Store/recipeStore";
import { likeRecipe } from "../../Redux/Store/recipeStore";

const Recipes = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState('');

    const { viewRecipe } = useRecipes();

    const recipesStatus = useSelector(selectRecipeStatus)
    const recipes = useSelector(selectAllRecipes)

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

    return (
        <View style={styles.cont}>

            <Header
                search={search}
                subTitle="Liked Recipes"
                onChange={(e) => setSearch(e)}
                onSubmit={() => { dispatch(getAllRecipes(search)); }}
                onCancel={() => {
                    setSearch('');
                    dispatch(getAllRecipes());
                    Keyboard.dismiss();
                }} />

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

                {recipes.length > 0 && recipes.some(recipe => recipe.liked) ?
                    <FlatList
                        data={recipes}
                        renderItem={({ item }) =>
                            item.liked &&
                            <Card
                                onPress={() => viewRecipe(item)}
                                title={item.name}
                                subTitle={item.duration}
                                bottomText={item.user.username}
                                image={item.images[0]}
                                createdAt={item.created_at}
                                onLikePress={() => dispatch(likeRecipe(item))}
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
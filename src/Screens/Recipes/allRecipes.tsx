import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView, RefreshControl, Text, View, FlatList, Image, ImageBackground, TouchableOpacity } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./styles";
import { useRecipes } from "../../Hooks";
import { TURQOISE, WHITE } from "../../Constants/Colors";
import { Card, PlusBtn, Header } from "../../Components";
import {
    getAllRecipes,
    selectAllRecipes,
    selectRecipeStatus,
    selectRecipesError
} from "../../Redux/Store/recipeStore";
import { IMAGE_BASE_URL } from "../../../config";

const Recipes = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState('');

    const { viewRecipe } = useRecipes();

    const recipesStatus = useSelector(selectRecipeStatus)
    const recipesError = useSelector(selectRecipesError)
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
                subTitle="All Recipes"
                onChange={(e) => setSearch(e)}
                onSubmit={() => { dispatch(getAllRecipes(search)); }}
                onCancel={() => { setSearch('') }} />

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
                            />
                        }
                    />
                    :
                    <Text style={{ padding: 10 }}>No Recipes found...</Text>
                }

                {recipesStatus === 'failed' &&
                    <View style={styles.errCont}>
                        <Text style={styles.errText}>{recipesError}</Text>
                    </View>
                }


            </ScrollView>
            <PlusBtn onPress={() => navigation.navigate("RecipeAdd")} />
        </View>
    );
}

export default Recipes;
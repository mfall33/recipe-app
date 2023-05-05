import { useFocusEffect, useNavigation, CommonActions } from "@react-navigation/native";
import { ScrollView, RefreshControl, Text, View, Alert } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import { styles } from "./styles";
import { useRecipes } from "../../Hooks";
import { TURQOISE } from "../../Constants/Colors";
import { List, PlusBtn, Header } from "../../Components";
import {
    getRecipes,
    removeRecipe,
    selectAllRecipes,
    selectRecipeStatus,
    selectRecipesError
} from "../../Redux/Store/recipeStore";

import { setLoggedIn } from "../../Redux/Store/authStore";

const Recipes = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState('');

    const { viewRecipe } = useRecipes();

    const recipesStatus = useSelector(selectRecipeStatus)
    const recipesError = useSelector(selectRecipesError)
    const recipes = useSelector(selectAllRecipes)

    const redirectIfNoAuth = (result) => {

        alert(JSON.stringify(result))
        if (result?.payload?.status === 403) {
            alert(403)
            // dispatch(setLoggedIn(false))

            // navigation.dispatch(
            //     CommonActions.reset({
            //         index: 1,
            //         routes: [
            //             { name: 'Login' },
            //         ],
            //     })
            // );

        }
    }

    useEffect(() => {
        if (recipesStatus === 'idle') {
            dispatch(getRecipes(search)).then(redirectIfNoAuth);
        }
    }, [recipesStatus, dispatch])

    useFocusEffect(
        useCallback(() => {
            dispatch(getRecipes(search)).then(redirectIfNoAuth);
        }, [])
    );

    const refreshData = async () => {
        setRefreshing(true);
        dispatch(getRecipes(search)).then(redirectIfNoAuth);
        setRefreshing(false);
    }

    const deleteRecipe = (item) => {
        {
            Alert.alert(`Remove Recipe`, `Are you sure you want to remove '${item.name}'?`, [{
                text: 'No',
            }, {
                text: 'Yes',
                onPress: () => {
                    onDeleteHandler(item)
                }
            }])
        }
    }

    const onDeleteHandler = async (item) => {

        try {
            await dispatch(removeRecipe(item)).unwrap()
            dispatch(getRecipes(search)).then(redirectIfNoAuth);
            Toast.show({
                type: 'success',
                text1: 'Recipe Removed!'
            })
        } catch (err) {
            console.log('Failed to delete recipe', err)
        }

    }

    return (
        <View style={styles.cont}>

            <Header
                search={search}
                onChange={(e) => setSearch(e)}
                onSubmit={() => { dispatch(getRecipes(search)).then(redirectIfNoAuth); }}
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

                <List
                    items={recipes}
                    itemDisplayKey="name"
                    itemPress={(item) => { viewRecipe(item) }}
                    itemDeletePress={(item) => deleteRecipe(item)}
                    err={'No recipes found...'}
                />

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
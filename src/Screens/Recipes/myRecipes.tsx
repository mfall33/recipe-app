import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ScrollView, RefreshControl, Text, View, Alert, FlatList, Image, Keyboard } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import { styles } from "./styles";
import { useRecipes } from "../../Hooks";
import { RED, TURQOISE, TURQOISE_OP } from "../../Constants/Colors";
import { PlusBtn, Header, Card } from "../../Components";
import {
    getMyRecipes,
    removeRecipe,
    selectMyRecipes,
    selectRecipeStatus,
    selectRecipesError
} from "../../Redux/Store/recipeStore";

const Recipes = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);
    const [search, setSearch] = useState('');

    const { viewRecipe } = useRecipes();

    const recipesStatus = useSelector(selectRecipeStatus)
    const recipesError = useSelector(selectRecipesError)
    const recipes = useSelector(selectMyRecipes)

    useEffect(() => {
        if (recipesStatus === 'idle') {
            dispatch(getMyRecipes(search));
        }
    }, [recipesStatus, dispatch])

    useFocusEffect(
        useCallback(() => {
            dispatch(getMyRecipes(search));
        }, [])
    );

    const refreshData = async () => {
        setRefreshing(true);
        dispatch(getMyRecipes(search));
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
            dispatch(getMyRecipes(search));
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
                subTitle="My Recipes"
                search={search}
                onChange={(e) => setSearch(e)}
                onSubmit={() => {
                    dispatch(getMyRecipes(search));
                    Keyboard.dismiss()
                }}
                onCancel={() => {
                    setSearch('')
                    dispatch(getMyRecipes());
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

                {recipes.length > 0 ?
                    <FlatList
                        data={recipes}
                        renderItem={({ item }) =>
                            <Card
                                onPress={() => viewRecipe(item)}
                                onDeletePress={() => deleteRecipe(item)}
                                title={item.name}
                                subTitle={item.duration}
                                bottomText={item.user.username}
                                image={item.images[0]}
                                createdAt={item.created_at}

                            />
                        }
                    />
                    :
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                        <Text style={{ padding: 10, textAlign: 'center', fontSize: 24, fontWeight: '400', fontStyle: 'italic', marginTop: 60 }}>Oops! Looks like the <Text style={{ color: TURQOISE_OP }}>recipes</Text> went on vacation. Don't worry, we'll whip up a fresh batch of tasty ideas in no time!...</Text>
                        <Image source={require('../../../assets/images/Icons/Flour.png')} style={{ width: '100%', height: 250, resizeMode: 'contain' }} />
                    </View>
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
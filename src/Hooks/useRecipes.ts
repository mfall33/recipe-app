import { useSelector } from "react-redux";
import { setRecipe, setRecipes as setStoreRecipes, removeRecipeImage, removeRecipe, getRecipes, updateRecipe, addRecipeImages } from "../Redux/Store/recipeStore";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';

const useRecipes = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const recipes = useSelector(state => state.recipes.recipes);
    const recipe = useSelector(state => state.recipes.recipe);

    const setRecipes = (items) => {
        dispatch(setStoreRecipes(items));
    }

    const viewRecipe = (item) => {
        dispatch(setRecipe(item._id));
        navigation.navigate('Recipe');

    }

    const deleteImage = async (image) => {

        try {

            await dispatch(removeRecipeImage(image)).unwrap()
                .then(data => {

                    Toast.show({
                        type: 'success',
                        text1: 'Image Removed!'
                    })
                })

        } catch (err) {

            Toast.show({
                type: 'error',
                text1: 'Failed to delete image!'
            })

        }
    }

    const addImage = async (images) => {

        try {

            await dispatch(addRecipeImages(images)).unwrap()
                .then(data => {

                    Toast.show({
                        type: 'success',
                        text1: 'Images Uploaded!'
                    })
                })
                .catch(err => Toast.show({
                    type: 'error',
                    text1: 'Failed to upload image'
                }))

        }
        catch (err) {

            Toast.show({
                type: 'error',
                text1: 'Failed to upload image!'
            })

        }
    }

    const deleteRecipe = async () => {
        try {
            await dispatch(removeRecipe(recipe)).unwrap()
                .then(data => {
                    navigation.navigate('Recipes');
                    Toast.show({
                        type: 'success',
                        text1: 'Recipe Removed!'
                    })
                })
                .catch(err => console.log("Something went wrong: " + JSON.stringify(err)))
            dispatch(getRecipes());
        } catch (err) {
            Toast.show({
                type: 'error',
                text1: 'Failed to delete recipe!'
            })
        }
    }

    const editRecipe = async ({ name, duration, successCallback, errCallback }) => {
        try {
            await dispatch(updateRecipe({ name, duration })).unwrap()
                .then(data => {
                    successCallback && successCallback(data)
                })
                .catch(err => Toast.show({
                    type: 'error',
                    text1: 'Failed to update recipe'
                }))

        } catch (err) {

            errCallback && errCallback(err);
        }
    }


    return { recipes, recipe, setRecipes, viewRecipe, deleteRecipe, editRecipe, addImage, deleteImage };

}

export default useRecipes;
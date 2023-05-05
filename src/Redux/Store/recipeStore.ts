import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../config';

interface RecipeState {
  recipe: object,
  recipes: [],
  status: string
}

const initialState: RecipeState = {
  recipe: {},
  recipes: [],
  status: 'idle',
}

export const getRecipes = createAsyncThunk(
  'recipes/getRecipes',
  async (search) => {

    let url = `${BASE_URL}/recipes`;
    let body = {};

    if (search?.length) {
      body.name = search;
      url += `?name=${search}`
    }

    const response = await axios.get(url, { validateStatus: () => true });

    return response;

  }
)

export const updateRecipe = createAsyncThunk(
  'recipes/updateRecipe',
  async (params, { getState }) => {

    const recipe = getState().recipes.recipe;

    try {

      const response = await axios.put(`${BASE_URL}/recipes/${recipe._id}`, params);
      return response.data;

    } catch (error) {
      return error?.response?.data;
    }

  }
)

export const addRecipe = createAsyncThunk(
  'recipes/addRecipe',
  // The payload creator receives the partial `{title, content, user}` object
  async recipe => {

    try {

      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/recipes`,
        data: recipe
      })
      return response.data;

    } catch (error) {
      return error?.response?.data;
    }
  }
)

export const removeRecipeImage = createAsyncThunk(
  'recipes/removeRecipeImage',
  // The payload creator receives the partial `{title, content, user}` object
  async (image, { getState }) => {

    const recipe = getState().recipes.recipe;

    try {

      const response = await axios({
        method: 'delete',
        url: `${BASE_URL}/recipes/${recipe._id}/image`,
        data: {
          image: image
        }
      })

      return response.data;

    } catch (error) {
      return error?.response?.data;
    }
  }
)

export const addRecipeImages = createAsyncThunk(
  'recipes/addRecipeImages',
  async (data, { getState }) => {

    const recipe = getState().recipes.recipe;

    try {

      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/recipes/${recipe._id}/image`,
        data: data
      })
      return response.data;

    } catch (error) {
      return error?.response?.data;
    }
  }
)


export const removeRecipe = createAsyncThunk(
  'recipes/removeRecipe',
  // The payload creator receives the partial `{title, content, user}` object
  async recipe => {
    // We send the initial data to the fake API server
    const response = await axios.delete(`${BASE_URL}/recipes/${recipe._id}`)
    // The response includes the complete post object, including unique ID
    return response.data
  }
)

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    setRecipe: (state, action) => {
      state.recipe = state.recipes.find(recipe => recipe._id === action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRecipes.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.recipes = action.payload.data
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.recipe = action.payload;
      })
      .addCase(removeRecipe.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        // checking if we are getting an updated model returned..
        if ('_id' in action.payload) {
          state.recipe = action.payload;
          let recipeIndex = state.recipes.findIndex(recipe => recipe._id === action.payload._id)
          state.recipes[recipeIndex] = action.payload;
        }
        state.status = 'succeeded'
      })
      .addCase(removeRecipeImage.fulfilled, (state, action) => {
        if ('_id' in action.payload) {
          state.recipe.images = action.payload.images;
        }
      })
      .addCase(addRecipeImages.fulfilled, (state, action) => {
        state.recipe.images = action.payload.images;
      })
  }
})

export const selectAllRecipes = (state: RecipeState) => state.recipes.recipes;
export const selectRecipeStatus = (state: RecipeState) => state.recipes.status;
export const selectRecipesError = (state: RecipeState) => state.recipes.error;

export const { setRecipes, setRecipe } = recipeSlice.actions

export default recipeSlice.reducer
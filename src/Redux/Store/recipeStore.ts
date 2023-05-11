import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import API from '../../API';

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

    let url = `/recipes`;
    let body = {};

    if (search?.length) {
      body.name = search;
      url += `?name=${search}`
    }

    const response = await API.get(url, { validateStatus: () => true });

    return response;

  }
)

export const updateRecipe = createAsyncThunk(
  'recipes/updateRecipe',
  async (params, { getState }) => {

    const recipe = getState().recipes.recipe;

    try {

      const response = await API.put(`/recipes/${recipe._id}`, params);

      return response.data;

    } catch (error) {
      return error?.response?.data;
    }

  }
)

export const addRecipe = createAsyncThunk(
  'recipes/addRecipe',
  async recipe => {

    try {
      
      const response = await API.post('/recipes', recipe);

      return response.data;

    } catch (error) {
      throw error?.response?.data;
    }
  }
)

export const removeRecipeImage = createAsyncThunk(
  'recipes/removeRecipeImage',
  async (image, { getState }) => {

    const recipe = getState().recipes.recipe;

    try {

      const response = await API.delete(`/recipes/${recipe._id}/image`, {
        data: {
          image: image
        }
      });

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

      // untidy... need to revisit this to use the API helper instance...
      // need to try setting headers for form-data content-type
      // might need to better structure the body into data.files etc

      const response = await API.post(`/recipes/${recipe._id}/image`, data);

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

    const response = await API.delete(`/recipes/${recipe._id}`);

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
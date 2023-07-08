import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthedAPI } from '../../API';

interface RecipeState {
  recipe: object,
  recipes: [],
  myRecipes: [],
  status: string
}

const initialState: RecipeState = {
  recipe: {},
  recipes: [],
  myRecipes: [],
  status: 'idle',
}

export const getAllRecipes = createAsyncThunk(
  'recipes/getAllRecipes',
  async (search) => {

    let url = `/recipes`;
    let body = {};

    if (search?.length) {
      body.name = search;
      url += `?name=${search}`
    }

    const response = await AuthedAPI.get(url, { validateStatus: () => true });

    return response;

  }
)

export const getMyRecipes = createAsyncThunk(
  'recipes/getMyRecipes',
  async (search) => {

    let url = `/recipes/mine`;
    let body = {};

    if (search?.length) {
      body.name = search;
      url += `?name=${search}`
    }

    const response = await AuthedAPI.get(url, { validateStatus: () => true });

    return response;

  }
)

export const updateRecipe = createAsyncThunk(
  'recipes/updateRecipe',
  async (params, { getState }) => {

    const recipe = getState().recipes.recipe;

    try {

      const response = await AuthedAPI.put(`/recipes/${recipe._id}`, params);

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

      const response = await AuthedAPI.post('/recipes', recipe);

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

      const response = await AuthedAPI.delete(`/recipes/${recipe._id}/image`, {
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

      const response = await AuthedAPI.post(`/recipes/${recipe._id}/image`, data);

      return response.data;

    } catch (error) {
      return error?.response?.data;
    }
  }
)


export const removeRecipe = createAsyncThunk(
  'recipes/removeRecipe',
  async (recipe, { rejectWithValue }) => {
    try {

      const response = await AuthedAPI.delete(`/recipes/${recipe._id}`);
      if (response.status !== 200) {
        return rejectWithValue(response.data);
      }

      return response.data

    } catch (err) {
      return error?.response?.data;
    }
  }
)

export const likeRecipe = createAsyncThunk(
  'recipes/likeRecipe',
  async (recipe) => {

    const response = await AuthedAPI.put(`/recipes/${recipe._id}/like`);

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
      .addCase(getAllRecipes.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getAllRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.recipes = action.payload.data
      })
      .addCase(getMyRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.myRecipes = action.payload.data
      })
      .addCase(getAllRecipes.rejected, (state, action) => {
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
      .addCase(likeRecipe.fulfilled, (state, action) => {
        if ('_id' in action.payload) {
          state.recipes.forEach(recipe => {
            if (recipe._id === action.payload._id) {
              recipe.likes = action.payload.likes;
              recipe.liked = action.payload.liked;
            }
          });

          state.recipe.likes = action.payload.likes;
          state.recipe.liked = action.payload.liked;
        }
      })
  }
})

export const selectAllRecipes = (state: RecipeState) => state.recipes.recipes;
export const selectMyRecipes = (state: RecipeState) => state.recipes.myRecipes;
export const selectRecipeStatus = (state: RecipeState) => state.recipes.status;
export const selectRecipesError = (state: RecipeState) => state.recipes.error;

export const { setRecipes, setRecipe } = recipeSlice.actions

export default recipeSlice.reducer
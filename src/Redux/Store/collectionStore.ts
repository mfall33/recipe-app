import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';

interface CollectionState {
  collection: object,
  collections: [],
  status: string
}

const initialState: CollectionState = {
  collection: {},
  collections: [],
  status: 'idle',
}

export const getCollections = createAsyncThunk(
  'collections/getCollections',
  async () => {

    const response = await API.get('/collections');

    return response.data;

  }
)

export const addRecipeToCollection = createAsyncThunk(
  'recipes/updateRecipe',
  async ({ recipeId, collectionId }, { getState }) => {

    try {

      const response = await API.put(`/collections/${collectionId}`, { recipe: recipeId });

      return response.data;

    } catch (error) {
      return error?.response?.data;
    }

  }
)

export const addCollection = createAsyncThunk(
  'collections/addCollection',
  async (collection, { rejectWithValue }) => {

    try {

      const response = await API.post('/collections', { name: collection });

      if (response.status > 200) {
        return rejectWithValue(response.data)
      }

      return response.data;

    } catch (error) {

      throw error?.response?.data;

    }
  }
)

// export const removeRecipe = createAsyncThunk(
//   'recipes/removeRecipe',
//   async (recipe, { rejectWithValue }) => {
//     try {

//       const response = await API.delete(`/recipes/${recipe._id}`);
//       if (response.status !== 200) {
//         return rejectWithValue(response.data);
//       }

//       return response.data

//     } catch (err) {
//       return error?.response?.data;
//     }
//   }
// )

export const collectionSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setCollection: (state, action) => {
      state.collection = state.collections.find(collection => collection._id === action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCollections.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getCollections.fulfilled, (state, action) => {
        state.collections = action.payload;

        if (state.collection._id) {

          state.collection = action.payload.find(collection => collection._id === state.collection._id);

        }
      })
  }
})

export const selectCollections = (state: CollectionState) => state.collections.collections;
export const selectCollectionStatus = (state: CollectionState) => state.collections.status;

export const { setCollection } = collectionSlice.actions

export default collectionSlice.reducer
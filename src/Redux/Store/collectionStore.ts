import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';

interface CollectionState {
  collection: object,
  collections: [],
  status: string
}

const initialState: CollectionStateState = {
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

// export const updateRecipe = createAsyncThunk(
//   'recipes/updateRecipe',
//   async (params, { getState }) => {

//     const recipe = getState().recipes.recipe;

//     try {

//       const response = await API.put(`/recipes/${recipe._id}`, params);

//       return response.data;

//     } catch (error) {
//       return error?.response?.data;
//     }

//   }
// )

// export const addRecipe = createAsyncThunk(
//   'recipes/addRecipe',
//   async recipe => {

//     try {

//       const response = await API.post('/recipes', recipe);

//       return response.data;

//     } catch (error) {
//       throw error?.response?.data;
//     }
//   }
// )

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
  },
  extraReducers(builder) {
    builder
      .addCase(getCollections.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getCollections.fulfilled, (state, action) => {
        state.collections = action.payload;
      })
  }
})

export const selectCollections = (state: CollectionState) => state.collections.collections;
export const selectCollectionStatus = (state: CollectionState) => state.collections.status;

export const { } = collectionSlice.actions

export default collectionSlice.reducer
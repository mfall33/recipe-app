import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import recipeStore from './recipeStore';
import authStore from './authStore';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
}

const peristedAuthStore = persistReducer(persistConfig, authStore)


export const store = configureStore({
  reducer: {
    recipes: recipeStore,
    auth: peristedAuthStore
  },
  middleware: [thunk]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import recipeStore from './recipeStore';
import authStore from './authStore';
import userStore from './userStore';
import collectionStore from './collectionStore';

const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage: AsyncStorage
}

const userPersistConfig = {
  key: 'user',
  version: 1,
  storage: AsyncStorage
}

const categoriesPersistConfig = {
  key: 'categories',
  version: 1,
  storage: AsyncStorage,
};


const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authStore),
  user: persistReducer(userPersistConfig, userStore),
  categories: persistReducer(categoriesPersistConfig, (state = [], action) => {
    // Your categories reducer logic here
    // You can handle any actions related to categories here if needed
    return state;
  }),
  recipes: recipeStore,
  collections: collectionStore
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
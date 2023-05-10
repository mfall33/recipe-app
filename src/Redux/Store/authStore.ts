import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import API from '../../API';

interface AuthState {
  loggedIn: boolean,
  accessToken: string | null,
  refreshToken: string | null
}

const initialState: AuthState = {
  loggedIn: false,
  accessToken: null,
  refreshToken: null,
}

export const signup = createAsyncThunk(
  'auth/signup',
  async user => {

    try {

      const response = await API.post(`/auth/signup`, user)

      return response.data;

    } catch (error) {
      return error?.response?.data;
    }
  }
)

export const signin = createAsyncThunk(
  'auth/signin',
  async user => {

    try {
      const response = await API.post(`/auth/signin`, user)

      return response.data;

    } catch (error) {
      return error?.response?.data;
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        if ('id' in action.payload) {
          const { accessToken, refreshToken } = action.payload;
          state.loggedIn = true;
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
        }
      })
  }
})

export const selectLoggedIn = (state: AuthState) => {
  return state.auth.loggedIn
};

export const selectAccessToken = (state: AuthState) => {
  return state.auth.accessToken
};

export const selectRefreshToken = (state: AuthState) => {
  return state.auth.refreshToken
};



export const { setLoggedIn, setAccessToken, setRefreshToken } = authSlice.actions

export default authSlice.reducer
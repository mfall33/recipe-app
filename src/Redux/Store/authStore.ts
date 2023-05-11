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
      /* 
      we don't really need the API axios instance for
      this but the response interceptor will set the
      access token behind the scenes
      */
      const response = await API.post(`/auth/signin`, user)

      return response.data;

    } catch (error) {
      return error?.response?.data;
    }
  }
)

export const refreshTokens = createAsyncThunk(
  'auth/refreshTokens',
  async (token, { getState }) => {

    const { refreshToken } = getState().auth;

    try {
      // using normal axios instance as we don't need the access token for this request
      const response = await axios.post(
        `${BASE_URL}/auth/refreshtoken`,
        { refreshToken: refreshToken })

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
    logout: (state, action) => {

      state.loggedIn = false;
      state.accessToken = '';
      state.refreshToken = '';
      
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
      .addCase(refreshTokens.fulfilled, (state, action) => {

        const { accessToken, refreshToken } = action.payload;
        if (accessToken) state.accessToken = accessToken;
        if (refreshToken) state.refreshToken = refreshToken;

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

export const { logout } = authSlice.actions

export default authSlice.reducer
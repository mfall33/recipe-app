import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../../config';

interface AuthState {
  loggedIn: boolean,
}

const initialState: AuthState = {
  loggedIn: false,
}

export const signup = createAsyncThunk(
  'auth/signup',
  async user => {

    try {

      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/auth/signup`,
        data: user
      })

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

      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/auth/signin`,
        data: user
      })

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
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        if ('id' in action.payload) {
          state.loggedIn = true;
          // state.auth.loggedIn = true;
        }
      })
  }
})

export const selectLoggedIn = (state: AuthState) => {
  return state.auth.loggedIn
};

export const { setLoggedIn } = authSlice.actions

export default authSlice.reducer
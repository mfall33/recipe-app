import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../API';

interface UserState {
  email: string | null,
  username: string | null
}

const initialState: UserState = {
  email: null,
  username: null,
}

export const updateUsername = createAsyncThunk('users/updateUsername', async username => {

  try {

    const response = await API.patch(`/user`, { username });

    return response.data

  } catch (err) {
    throw err;
  }

})

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
  },
  extraReducers(builder) {
    builder.addCase(updateUsername.fulfilled, (state, action) => {
      if ('_id' in action.payload) {
        state.username = action.payload.username
      }
    })
  }
})

export const selectEmail = (state: UserState) => {
  return state.user.email
};

export const selectUsername = (state: UserState) => {
  return state.user.username
};

export const { setUser } = userSlice.actions

export default userSlice.reducer
import { createSlice } from '@reduxjs/toolkit';

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  },
});

export const { login, logout } = authReducer.actions;

export const getUser = state => state.auth.user;

export default authReducer.reducer;
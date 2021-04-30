import { createSlice } from '@reduxjs/toolkit'

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
    nullCurrentUser: (state) => {
      state.currentUser = null
    }
  },
})

export const { setCurrentUser, nullCurrentUser } = authReducer.actions

export const getCurrentUser = state => state.auth.currentUser

export default authReducer.reducer
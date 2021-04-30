import { createSlice } from '@reduxjs/toolkit'

export const appReducer = createSlice({
    name: 'app',
    initialState: {
        mic: true,
        currentPage: 'Friends',
    },
    reducers: {
        setMicOn: (state) => {
            state.mic = true
        },
        setMicOff: (state) => {
            state.mic = false
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    },
})

export const { setMicOn, setMicOff, setCurrentPage } = appReducer.actions

export const isMicOn = (state) => state.app.mic
export const getCurrentPage = (state) => state.app.currentPage

export default appReducer.reducer
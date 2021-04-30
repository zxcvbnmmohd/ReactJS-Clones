import { createSlice } from '@reduxjs/toolkit'

export const channelReducer = createSlice({
  name: 'channel',
  initialState: {
    channelID: null,
    channelName: null,
  },
  reducers: {
    setChannelID: (state, action) => {
      state.app = action.payload
    },
  },
})

export const { setChannelID } = channelReducer.actions

export const getChannelID = state => state.channel.channelID
export const getChannelName = state => state.channel.channelName

export default channelReducer.reducer

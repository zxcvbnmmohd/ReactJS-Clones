import { createSlice } from '@reduxjs/toolkit';

export const channelsReducer = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannel: null,
  },
  reducers: {
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    updateChannel: (state, action) => {
      state.channels[state.channels.findIndex((obj => obj.channelID === action.payload.channelID))] = action.payload;
    },
    removeChannel: (state, action) => {
      state.channels.splice(state.channels.findIndex((obj => obj.channelID === action.payload.channelID)), 1);
    },
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    clearChannels: (state) => {
      state.channels = [];
      state.currentChannel = null;
    },
  },
});

export const {
  addChannel,
  updateChannel,
  removeChannel,
  setCurrentChannel,
  clearChannels,
} = channelsReducer.actions;

export const getChannels = (state) => state.channels.channels;
export const getCurrentChannel = (state) => state.channels.currentChannel;

export default channelsReducer.reducer;

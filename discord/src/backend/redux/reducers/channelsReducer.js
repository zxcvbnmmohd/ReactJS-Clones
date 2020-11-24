import { createSlice } from "@reduxjs/toolkit";

export const channelsReducer = createSlice({
  name: "channels",
  initialState: {
    textChannels: [],
    voiceChannels: [],
    currentChannel: null,
  },
  reducers: {
    addTextChannels: (state, action) => {
      state.channels = action.payload;
    },
    addVoiceChannels: (state, action) => {
      state.channels = action.payload;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  },
});

export const { addTextChannels, addVoiceChannels, setCurrentChannel } = channelsReducer.actions;

export const getTextChannels = (state) => state.channels.textChannels;
export const getVoiceChannels = (state) => state.channels.voiceChannels;
export const getCurrentChannel = (state) => state.channels.currentChannel;

export default channelsReducer.reducer;

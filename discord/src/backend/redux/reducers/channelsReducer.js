import { createSlice } from "@reduxjs/toolkit";

export const channelsReducer = createSlice({
  name: "channels",
  initialState: {
    textChannels: [],
    voiceChannels: [],
    currentChannel: null,
  },
  reducers: {
    addTextChannel: (state, action) => {
      state.textChannels.push(action.payload);
    },
    updateTextChannel: (state, action) => {
      state.textChannels[state.textChannels.findIndex((obj => obj.channelID === action.payload.channelID))] = action.payload;
    },
    removeTextChannel: (state, action) => {
      state.textChannels.splice(state.textChannels.findIndex((obj => obj.serverID === action.payload.serverID)), 1);
    },
    addVoiceChannel: (state, action) => {
      state.voiceChannels.push(action.payload);
    },
    updateVoiceChannel: (state, action) => {
      state.voiceChannels[state.voiceChannels.findIndex((obj => obj.channelID === action.payload.channelID))] = action.payload;
    },
    removeVoiceChannel: (state, action) => {
      state.voiceChannels.splice(state.voiceChannels.findIndex((obj => obj.serverID === action.payload.serverID)), 1);
    },
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    clearChannels: (state) => {
      state.textChannels = [];
      state.voiceChannels = [];
      state.currentChannel = null;
    },
  },
});

export const {
  addTextChannel,
  updateTextChannel,
  removeTextChannel,
  
  addVoiceChannel,
  updateVoiceChannel,
  removeVoiceChannel,

  setCurrentChannel,
  clearChannels,
} = channelsReducer.actions;

export const getTextChannels = (state) => state.channels.textChannels;
export const getVoiceChannels = (state) => state.channels.voiceChannels;
export const getCurrentChannel = (state) => state.channels.currentChannel;

export default channelsReducer.reducer;

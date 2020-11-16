import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    channelID: null,
    channelName: null,
  },
  reducers: {
    setChannelID: (state, action) => {
      state.app = action.payload;
    },
  },
});

export const { setChannelID } = appSlice.actions;
export const getChannelID = state => state.app.channelID;
export const getChannelName = state => state.app.channelName;
export default appSlice.reducer;

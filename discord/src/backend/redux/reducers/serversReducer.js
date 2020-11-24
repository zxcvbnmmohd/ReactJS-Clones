import { createSlice } from "@reduxjs/toolkit";

export const serversReducer = createSlice({
  name: "servers",
  initialState: {
    servers: [],
    currentServer: null,
  },
  reducers: {
    addServers: (state, action) => {
      state.servers = action.payload;
    },
    setCurrentServer: (state, action) => {
      state.currentServer = action.payload;
    },
  },
});

export const { addServers, setCurrentServer } = serversReducer.actions;

export const getServers = (state) => state.servers.servers;
export const getCurrentServer = (state) => state.servers.currentServer;

export default serversReducer.reducer;

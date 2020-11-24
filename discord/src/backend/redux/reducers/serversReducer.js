import { createSlice } from "@reduxjs/toolkit";

export const serversReducer = createSlice({
  name: "servers",
  initialState: {
    servers: [],
    currentServer: null,
  },
  reducers: {
    addServer: (state, action) => {
      state.servers.push(action.payload);
    },
    updateServer: (state, action) => {
      state.servers[state.servers.findIndex((obj => obj.serverID === action.payload.serverID))] = action.payload;
    },
    removeServer: (state, action) => {
      state.servers.splice(state.servers.findIndex((obj => obj.serverID === action.payload.serverID)), 1);
    },
    setCurrentServer: (state, action) => {
      state.currentServer = action.payload;
    },
  },
});

export const {
  addServer,
  updateServer,
  removeServer,
  
  setCurrentServer,
} = serversReducer.actions;

export const getServers = (state) => state.servers.servers;
export const getCurrentServer = (state) => state.servers.currentServer;

export default serversReducer.reducer;

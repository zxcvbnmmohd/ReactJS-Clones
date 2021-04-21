import { createSlice } from '@reduxjs/toolkit';

export const serversReducer = createSlice({
  name: 'servers',
  initialState: {
    servers: [],
    currentServer: null,
  },
  reducers: {
    addServer: (state, action) => {
      console.log('Server Added');
      state.servers.push(action.payload);
    },
    updateServer: (state, action) => {
      console.log('Server Updated');
      state.servers[state.servers.findIndex((obj => obj.serverID === action.payload.serverID))] = action.payload;
    },
    removeServer: (state, action) => {
      console.log('Server Removed');
      state.servers.splice(state.servers.findIndex((obj => obj.serverID === action.payload.serverID)), 1);
    },
    clearServers: (state, action) => {
      console.log('Servers Cleared');
      state.servers = [];
    },
    setCurrentServer: (state, action) => {
      console.log('Current Server Set');
      state.currentServer = action.payload;
    },
  },
});

export const {
  addServer,
  updateServer,
  removeServer,
  clearServers,
  setCurrentServer,
} = serversReducer.actions;

export const getServers = (state) => state.servers.servers;
export const getCurrentServer = (state) => state.servers.currentServer;

export default serversReducer.reducer;

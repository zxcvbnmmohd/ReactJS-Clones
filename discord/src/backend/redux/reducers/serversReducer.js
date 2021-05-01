import { createSlice } from '@reduxjs/toolkit'

export const serversReducer = createSlice({
	name: 'servers',
	initialState: {
		servers: [],
		channels: [],
		currentServer: null,
		currentChannel: null,
	},
	reducers: {
		addServer: (state, action) => {
			console.log('Added Server: ', action.payload.serverID)
			state.servers.push(action.payload)
		},
		updateServer: (state, action) => {
			console.log('Updated Server: ', action.payload.serverID)
			state.servers[state.servers.findIndex((obj => obj.serverID === action.payload.serverID))] = action.payload
		},
		removeServer: (state, action) => {
			console.log('Removed Server: ', action.payload.serverID)
			state.servers.splice(state.servers.findIndex((obj => obj.serverID === action.payload.serverID)), 1)
		},
		clearServers: (state, action) => {
			console.log('Servers Cleared')
			state.servers = []
		},
		setCurrentServer: (state, action) => {
			console.log('Current Server Set')
			state.currentServer = action.payload
		},
		addChannel: (state, action) => {
			console.log('Added Channel: ', action.payload.channelID)
			// state.servers[state.servers.findIndex((obj => obj.serverID === state.currentServer.serverID))].channels.push(action.payload)
			state.channels.push(action.payload)
		},
		updateChannel: (state, action) => {
			console.log('Update Channel: ', action.payload.channelID)
			state.servers[state.servers.findIndex((obj => obj.serverID === state.currentServer.serverID))].channels[state.channels.findIndex((obj => obj.channelID === action.payload.channelID))] = action.payload
		},
		removeChannel: (state, action) => {
			console.log('Remove Channel: ', action.payload.channelID)
			state.servers[state.servers.findIndex((obj => obj.serverID === state.currentServer.serverID))].channels.splice(state.channels.findIndex((obj => obj.channelID === action.payload.channelID)), 1)
		},
		clearChannels: (state) => {
			console.log('Cleared Channels')
			state.servers[state.servers.findIndex((obj => obj.serverID === state.currentServer.serverID))].channels = []
			state.currentChannel = null
		},
		setCurrentChannel: (state, action) => {
			console.log('Current Channel Set')
			state.currentChannel = action.payload
		},
	},
})

export const {
	addServer,
	updateServer,
	removeServer,
	clearServers,
	setCurrentServer,
	addChannel,
	updateChannel,
	removeChannel,
	clearChannels,
	setCurrentChannel,
} = serversReducer.actions

export const getServers = (state) => state.servers.servers
export const getChannels = (state) => state.servers.channels
export const getCurrentServer = (state) => state.servers.currentServer
export const getCurrentChannel = (state) => state.servers.currentChannel

export default serversReducer.reducer

import appReducer, {
	setMicOn,
	setMicOff,
	setCurrentPage,
	isMicOn,
	getCurrentPage,
} from './appReducer'
import authReducer, {
	setCurrentUser,
	nullCurrentUser,
	getCurrentUser,
} from './authReducer'
import serversReducer, {
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
	getServers,
	getChannels,
	getCurrentServer,
	getCurrentChannel,
} from './serversReducer'

export {
	appReducer,
	setMicOn,
	setMicOff,
	setCurrentPage,
	isMicOn,
	getCurrentPage,
	authReducer,
	setCurrentUser,
	nullCurrentUser,
	getCurrentUser,
	serversReducer,
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
	getServers,
	getChannels,
	getCurrentServer,
	getCurrentChannel,
}

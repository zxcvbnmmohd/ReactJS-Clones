import appReducer, {
  setMicOn,
  setMicOff,
  setCurrentPage,
  isMicOn,
  getCurrentPage,
} from './appReducer';
import authReducer, {
  setCurrentUser,
  nullCurrentUser,
  getCurrentUser,
} from './authReducer';
import channelsReducer, {
  addChannel,
  updateChannel,
  removeChannel,
  setCurrentChannel,
  clearChannels,
  getChannels,
  getCurrentChannel,
} from './channelsReducer';
import serversReducer, {
  addServer,
  updateServer,
  removeServer,
  setCurrentServer,
  getServers,
  getCurrentServer,
} from './serversReducer';

export {
  setMicOn,
  setMicOff,
  setCurrentPage,
  isMicOn,
  getCurrentPage,
  appReducer,
  setCurrentUser,
  nullCurrentUser,
  getCurrentUser,
  authReducer,
  addChannel,
  updateChannel,
  removeChannel,
  setCurrentChannel,
  clearChannels,
  getChannels,
  getCurrentChannel,
  channelsReducer,
  addServer,
  updateServer,
  removeServer,
  setCurrentServer,
  getServers,
  getCurrentServer,
  serversReducer,
};

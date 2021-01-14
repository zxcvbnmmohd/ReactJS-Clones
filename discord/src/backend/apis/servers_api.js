import { firestore } from '../';

export const serversCollection = () => firestore.collection('servers');
export const serverDocument = (serverID) => serversCollection().doc(serverID);
export const channelsCollection = (serverID) => serverDocument(serverID).collection('channels');
export const channelDocument = (serverID, channelID) => channelsCollection(serverID).doc(channelID);
export const msgsCollection = (serverID, channelID) => channelDocument(serverID, channelID).collection('messages');

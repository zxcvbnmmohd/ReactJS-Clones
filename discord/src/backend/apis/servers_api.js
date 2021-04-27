import { firestore } from '../';

export const serversCollection = () => firestore.collection('servers');
export const serverDocument = (serverID) => serversCollection().doc(serverID);
export const channelsCollection = (serverID, channelName) => serverDocument(serverID).collection(channelName);
export const channelDocument = (serverID, channelName, channelID) => channelsCollection(serverID, channelName).doc(channelID);
export const msgsCollection = (serverID, channelName, channelID) => channelDocument(serverID, channelName, channelID).collection('messages');

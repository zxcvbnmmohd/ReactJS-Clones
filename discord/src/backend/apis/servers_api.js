import { firestore } from '../';

export const serversCollection = () => firestore.collection('servers');
export const serverDocument = (serverID) => serversCollection().document(serverID);

export const createServerDocument = (doc) => serversCollection.add(doc);
export const readServerDocument = (serverID) => serverDocument(serverID).get();
export const updateServerDocument = (serverID, doc) => serverDocument(serverID).update(doc);
export const deleteServerDocument = (serverID) => serverDocument(serverID).delete();

export const channelsCollection = (serverID, category) => serverDocument(serverID).collection(category);
export const channelDocument = (serverID, category, channelID) => channelsCollection(serverID, category).document(channelID);

export const createChannelDocument = (serverID, category, doc) => channelsCollection(serverID, category).add(doc);
export const readChannelDocument = (serverID, category, channelID) => channelDocument(serverID, category, channelID).get();
export const updateChannelDocument = (serverID, category, channelID, doc) => channelDocument(serverID, category, channelID).update(doc);
export const deleteChannelDocument = (serverID, category, channelID) => channelDocument(serverID, category, channelID).delete();

export const msgsCollection = (serverID, category, channelID) => channelDocument(serverID, category, channelID).collection('messages');
export const msgDocument = (serverID, category, channelID, msgID) => msgsCollection(serverID, category, channelID).document(msgID);

export const createMessageDocument = (serverID, category, channelID, doc) => msgsCollection(serverID, category, channelID).add(doc);
export const readMessageDocument = (serverID, category, channelID, msgID) => msgDocument(serverID, category, channelID, msgID).get();
export const updateMessageDocument = (serverID, category, channelID, msgID, doc) => msgDocument(serverID, category, channelID, msgID).update(doc);
export const deleteMessageDocument = (serverID, category, channelID, msgID) => msgDocument(serverID, category, channelID, msgID).delete();

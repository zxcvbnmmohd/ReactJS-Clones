import { auth, firestore } from '../'

export const serversCollection = () => firestore.collection('servers')
export const serverDocument = (serverID) => serversCollection().doc(serverID)

export const createServerDocument = (doc) => serversCollection().set(doc)
export const readServerDocument = (serverID) => serverDocument(serverID).get()
export const updateServerDocument = (serverID, doc) => serverDocument(serverID).update(doc)
export const deleteServerDocument = (serverID) => serverDocument(serverID).delete()

export const serversQuery = (onAdded, onModified, onRemoved) => serversCollection().where('membersIDs', 'array-contains-any', [auth.currentUser.uid]).onSnapshot((snapshot) => {
	console.log('Servers Query Started')

	snapshot.docChanges().forEach((change) => {
		const server = {
			serverID: change.doc.id,
			ownerID: change.doc.data().ownerID,
			name: change.doc.data().name,
			membersIDs: change.doc.data().members,
			categories: change.doc.data().categories,
			channels: {},
		}

		if (change.type === 'added') {
			console.log('Server Added: ', server.serverID)
			onAdded(server)
		}
		if (change.type === 'modified') {
			console.log('Server Modified: ', server.serverID)
			onModified(server)
		}
		if (change.type === 'removed') {
			console.log('Server Removed: ', server.serverID)
			onRemoved(server)
		}
	})
})

export const channelsCollection = (serverID, category) => serverDocument(serverID).collection(category)
export const channelDocument = (serverID, category, channelID) => channelsCollection(serverID, category).doc(channelID)

export const createChannelDocument = (serverID, category, doc) => channelsCollection(serverID, category).set(doc)
export const readChannelDocument = (serverID, category, channelID) => channelDocument(serverID, category, channelID).get()
export const updateChannelDocument = (serverID, category, channelID, doc) => channelDocument(serverID, category, channelID).update(doc)
export const deleteChannelDocument = (serverID, category, channelID) => channelDocument(serverID, category, channelID).delete()

export const channelsQuery = (serverID, category, onAdded, onModified, onRemoved) => channelsCollection(serverID, category).onSnapshot((snapshot) => {
	console.log("Channels Query Started")

	snapshot.docChanges().forEach((change) => {
		const channel = {
			channelID: change.doc.id,
			type: change.doc.data().type,
			name: change.doc.data().name,
			category: change.doc.data().category,
			isPrimary: change.doc.data().isPrimary,
		}

		if (change.type === "added") {
			console.log("Added Channel: ", channel.channelID)
			onAdded(channel)
		}
		if (change.type === "modified") {
			console.log("Modified Channel: ", channel.channelID)
			onModified(channel)
		}
		if (change.type === "removed") {
			console.log("Removed Channel: ", channel.channelID)
			onRemoved(channel)
		}
	})
})

export const msgsCollection = (serverID, category, channelID) => channelDocument(serverID, category, channelID).collection('messages')
export const msgDocument = (serverID, category, channelID, msgID) => msgsCollection(serverID, category, channelID).doc(msgID)

export const createMessageDocument = (serverID, category, channelID, doc) => msgsCollection(serverID, category, channelID).set(doc)
export const readMessageDocument = (serverID, category, channelID, msgID) => msgDocument(serverID, category, channelID, msgID).get()
export const updateMessageDocument = (serverID, category, channelID, msgID, doc) => msgDocument(serverID, category, channelID, msgID).update(doc)
export const deleteMessageDocument = (serverID, category, channelID, msgID) => msgDocument(serverID, category, channelID, msgID).delete()

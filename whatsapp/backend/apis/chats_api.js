import { auth, firestore } from '../'

export const chatsCollection = () => firestore.collection('chats')
export const chatDocument = (chatID) => chatsCollection().doc(chatID)

export const createChatDocument = (chatID, doc) => chatDocument(chatID).set(doc)
export const readChatDocument = (chatID) => chatDocument(chatID).get()
export const updateChatDocument = (chatID, doc) => chatDocument(chatID).update(doc)
export const deleteChatDocument = (chatID) => chatDocument(chatID).delete()

export const chatExists = (userID) => {
    const query = chatsCollection().where('membersIDs', 'array-contains-any', [userID, auth.currentUser.uid])
    const docs = query.docs
    return !docs ? [] : docs.first();
}

export const markChatAsRead = (chat) => {
    const key = `members.${auth.currentUser.uid}`
    updateChatDocument(chat.chatID, {
        key: {
            'didRead': true,
            'count': 0,
            'when': chat.updatedAt,
        }
    })
}

export const writeChat = async (chatID, chat, isCreating = false) => {
    const batch = firestore.batch()

    if (isCreating) {
        console.log('Creating New Chat...')
        batch.set(chatDocument(chatID).collection('messages').doc(), chat.recentMessage)
        batch.set(chatDocument(chatID), chat)
    } else {
        console.log('Updating Chat...')
        batch.set(chatDocument(chatID).collection('messages').doc(), chat.recentMessage)
        batch.update(chatDocument(chatID), chat)
    }

    await batch.commit()
}

export const reacChats = (chats = [], onAdded, onModified, onRemoved) =>
    (chats.isEmpty
        ? chatsCollection()
            .where('membersIDs', 'array-contains-any', [auth.currentUser.uid])
            .orderBy('updatedAt', 'desc')
            .limit(15)
        : chatsCollection()
            .where('membersIDs', 'array-contains-any', [auth.currentUser.uid])
            .orderBy('updatedAt', 'desc')
            .startAfter(chats.last.ds)
            .limit(5)).onSnapshot((snap) => {
                console.log("Chats Query Started")

                snap.docChanges.forEach((change) => {
                    const chat = {
                        ds: change.doc,
                        chatID: change.id,
                        membersIDs: change.doc.membersIDs,
                        members: change.doc.members,
                        recentMessage: change.doc.recentMessage,
                        createdAt: change.doc.createdAt,
                        updatedAt: change.doc.updatedAt,
                    }

                    if (change.type === "added") {
                        onAdded(chat)
                    }
                    if (change.type === "modified") {
                        onModified(chat)
                    }
                    if (change.type === "removed") {
                        onRemoved(chat)
                    }
                })
            })

export const previousMessages = async (chat, limit = 5) =>
    (await (chat.messages.isEmpty
        ? chatDocument(chat.chatID)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .limit(limit)
        : chatDocument(chat.chatID)
            .collection('messages')
            .orderBy('createdAt', 'desc')
            .startAfter(chat.messages.last.ds)
            .limit(limit)).get())?.docs.map((ds) => { }).toArray()


export const missingMessages = () => { }

export const readMessages = () => { }
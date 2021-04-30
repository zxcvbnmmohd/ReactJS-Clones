import { auth, firestore } from '../'

export const usersCollection = () => firestore.collection('users')
export const userDocument = (userID) => usersCollection().doc(userID)
export const userTokensCollection = (userID) => userDocument(userID).collection('tokens')

export const createUserDocument = (userID, doc) => userDocument(userID).set(doc)
export const readUserDocument = (userID) => userDocument(userID).get()
export const updateUserDocument = (userID, doc) => userDocument(userID).update(doc)
export const deleteUserDocument = (userID) => userDocument(userID).delete()

export const createCurrentUserDocument = (doc) => userDocument(auth.currentUser.uid).set(doc)
export const readCurrentUserDocument = () => userDocument(auth.currentUser.uid).get()
export const updateCurrentUserDocument = (doc) => userDocument(auth.currentUser.uid).update(doc)
export const deleteCurrentUserDocument = () => userDocument(auth.currentUser.uid).delete()
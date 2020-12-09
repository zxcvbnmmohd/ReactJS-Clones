import { firestore } from '../';

export const usersCollection = () => firestore.collection('users');
export const cuDocument = (userID) => usersCollection.doc(userID);
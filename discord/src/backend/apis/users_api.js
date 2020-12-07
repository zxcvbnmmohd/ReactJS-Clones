import firestore from "../configs/firebase";

export const usersCollection = () => firestore.collection("users");
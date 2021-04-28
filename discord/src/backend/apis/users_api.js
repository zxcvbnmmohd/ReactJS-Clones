import { auth, firestore } from "../";

export const usersCollection = () => firestore.collection("users");
export const userDocument = (userID) => usersCollection.document(userID);
export const userTokensCollection = (userID) => userDocument(userID).collection("tokens");

export const createUserDocument = (userID, doc) => userDocument(userID).add(doc);
export const readUserDocument = async (userID) => await userDocument(userID).get();
export const updateUserDocument = (userID, doc) => userDocument(userID).update(doc);
export const deleteUserDocument = (userID) => userDocument(userID).delete();

export const createCurrentUserDocument = (doc) => userDocument(auth.currentUser.uid).add(doc);
export const readCurrentUserDocument = async () => await userDocument(auth.currentUser.uid).get();
export const updateCurrentUserDocument = (doc) => userDocument(auth.currentUser.uid).update(doc);
export const deleteCurrentUserDocument = () => userDocument(auth.currentUser.uid).delete();

// const ref = firestore
//   .collection("boards")
//   .doc(this.props.match.params.id);

// ref.get().then((doc) => {
//   if (doc.exists) {
//     this.setState({
//       board: doc.data(),
//       key: doc.id,
//       isLoading: false,
//     });
//   } else {
//     console.log("No such document!");
//   }
// });

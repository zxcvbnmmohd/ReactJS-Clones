import firestore from "../configs/firebase";

export const serversCollection = () => firestore.collection("servers");
export const channelsCollection = (serverID) => firestore.collection("servers").doc(serverID).collection("channels");
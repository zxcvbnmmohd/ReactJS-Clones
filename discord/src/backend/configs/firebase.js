import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDWjeFT2yA0LdzHAdTkfl2opmicWHoTJGg",
    authDomain: "discord-77f85.firebaseapp.com",
    databaseURL: "https://discord-77f85.firebaseio.com",
    projectId: "discord-77f85",
    storageBucket: "discord-77f85.appspot.com",
    messagingSenderId: "24370684697",
    appId: "1:24370684697:web:f3fdbe5a17ba5de4615b88",
    measurementId: "G-E8MKK9WGZY"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, auth, googleProvider }
export default firestore;
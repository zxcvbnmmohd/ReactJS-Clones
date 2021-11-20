// Import the functions you need from the SDKs you need
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCWBFP5-Q_EcxjQe6bjYX5BLIk_wubap3g",
  authDomain: "fir-253ec.firebaseapp.com",
  projectId: "fir-253ec",
  storageBucket: "fir-253ec.appspot.com",
  messagingSenderId: "687613025782",
  appId: "1:687613025782:web:d12940df23caf17933fbd7",
  measurementId: "G-H0855LN889",
};

// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const firestore = app.firestore();

export default firestore;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC5eCkjXxyjjwkoQGxYuffJSKJss69tuVg",
    authDomain: "whatsapp-mohd.firebaseapp.com",
    projectId: "whatsapp-mohd",
    storageBucket: "whatsapp-mohd.appspot.com",
    messagingSenderId: "829298963023",
    appId: "1:829298963023:web:0822cfc1a3dccbc1fd703a",
    measurementId: "G-1GBWRVS0KM"
};

const firebaseApp = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const firestore = firebaseApp.firestore()
const auth = firebaseApp.auth()
const fieldValues = firebase.firestore.FieldValue

export { firebase, firestore, auth, fieldValues }

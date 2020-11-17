import { auth, googleProvider } from "../../backend/configs/firebase";

export default function loginWithGoogle() {
    auth.signInWithPopup(googleProvider);
};

// export default function login(email, password) {
//     return auth.signInWithEmailAndPassword(email, password).then((_) => {

//     });
// }
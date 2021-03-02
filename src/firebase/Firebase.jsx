import Firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyARTILtzGCuuSpAurnBNO2e7u9LDpoL7R8",
    authDomain: "slack-clone-1e907.firebaseapp.com",
    projectId: "slack-clone-1e907",
    storageBucket: "slack-clone-1e907.appspot.com",
    messagingSenderId: "105513734378",
    appId: "1:105513734378:web:c8ae3afe359aa2d6f30793"
};

Firebase.initializeApp(firebaseConfig);

export const auth = Firebase.auth()
export const db = Firebase.firestore()

const provider = new Firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider)

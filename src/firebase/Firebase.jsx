import Firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    
};

Firebase.initializeApp(firebaseConfig);

export const auth = Firebase.auth()
export const db = Firebase.firestore()

const provider = new Firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider)

import React, { useEffect, useState } from 'react'
import FormInput from "../../components/FormInput/FormInput"
import Button from "../../components/Button/Button"
import { auth, db, signInWithGoogle } from "../../firebase/Firebase";
import { useHistory } from 'react-router-dom';

function Login() {

    const history = useHistory()

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [users, setUsers] = useState([])

    const signIn = () => {
        auth.signInWithEmailAndPassword(
            email, 
            password
        )
        .then(() => checkUser())
        .catch(err => alert(err))
    }

    useEffect(() => {        
        db
        .collection("users")
        .onSnapshot(snapshot => {
            setUsers(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        })
    }, [])

    const checkUser = async () => {
        const userExist = users.map(user => 
            user.data.uid.includes(auth.currentUser.uid)
        )

        if(await !userExist.includes(true)){
            db
            .collection("users")
            .add({
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName,
                photoUrl: auth.currentUser.photoURL,
                email: auth.currentUser.email,
            })
        }
        else{
            const setProfilePicture = (docId) => {
                db
                .collection("users")
                .doc(docId)
                .update({
                    photoUrl: auth.currentUser.photoURL,
                })
                .then(() => console.log("Success"))
                .catch(err =>
                    console.log(err)
                )
            };

            db
            .collection("users")
            .where("uid", "==", auth.currentUser.uid)
            .onSnapshot(snapshot => 
                snapshot.docs.map(doc => {
                    if(doc.data().photoUrl !== auth.currentUser.photoURL){
                        setProfilePicture(doc.id)
                    }
                })    
            )

        }
    }

    return (
        <div className="my-5 w-95 mw-500 mx-auto">
            <h1><strong>Sign in to Slack</strong></h1>
            <p>Continue with the Google account of email address you use to sign in.</p>

            <FormInput onChange={e => setemail(e.target.value)} placeholder="name@work-email.com" inputType="email" />
            <FormInput onChange={e => setpassword(e.target.value)} placeholder="password" inputType="password" />
            <button onClick={() => history.push("/recover")} className="btn btn-link">Forgot Password?</button>
            <Button onClick={signIn} btnColour="btn-info" btnSize="w-100">Login</Button>
            <hr />
            <Button onClick={() => {
                signInWithGoogle()
                .then(() => checkUser())
            }} btnColour="btn-outline-primary" btnSize="w-100">
                Continue with Google
            </Button>            
            <label>or</label>
            <Button onClick={() => history.push("/register")} btnColour="btn-dark" btnSize="w-100">Register</Button>
        </div>
    )
}

export default Login

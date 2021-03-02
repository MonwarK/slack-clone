import React, { useState } from 'react'
import FormInput from "../../components/FormInput/FormInput"
import Button from "../../components/Button/Button"
import { auth, signInWithGoogle } from "../../firebase/Firebase";
import { useHistory } from 'react-router-dom';

function Login() {

    const history = useHistory()

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const signIn = () => {
        auth.signInWithEmailAndPassword(
            email, 
            password
        )
        .catch(err => alert(err))
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
            <Button onClick={signInWithGoogle} btnColour="btn-outline-primary" btnSize="w-100">
                Continue with Google
            </Button>            
            <label>or</label>
            <Button onClick={() => history.push("/register")} btnColour="btn-dark" btnSize="w-100">Register</Button>
        </div>
    )
}

export default Login

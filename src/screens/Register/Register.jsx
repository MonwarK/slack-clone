import React, { useState } from 'react'
import FormInput from "../../components/FormInput/FormInput"
import Button from "../../components/Button/Button"
import { auth } from "../../firebase/Firebase";
import { useHistory } from 'react-router-dom';

function Register() {

    const history = useHistory()

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")

    const registerUser = e => {

        if(confirmpassword === password)
        {
            auth.createUserWithEmailAndPassword(
                email,
                password
            )
            .then(userAuth => {
                userAuth.user.updateProfile({
                    displayName:name,
                    photoURL: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
                });
                auth.signOut()
            })
            .then((() => {
                history.push("/")
            }))
        }
        else{
            alert("Passwords don't match.")
        }
    }

    return (
        <div className="my-5 w-95 mw-500 mx-auto">
            <h1><strong>Sign up to Slack</strong></h1>
            <p>Fill in the textboxes and click the register button.</p>
            <FormInput onChange={e => setname(e.target.value)} placeholder="Name" inputType="text" />
            <FormInput onChange={e => setemail(e.target.value)} placeholder="Email" inputType="email" />
            <FormInput onChange={e => setpassword(e.target.value)} placeholder="Password" inputType="password" />
            <FormInput onChange={e => setconfirmpassword(e.target.value)} placeholder="Confirm Password" inputType="password" />

            <Button btnColour="btn-info" btnSize="w-100" onClick={registerUser}>Register</Button>
            <hr />
            <label>or</label>
            <Button onClick={() => history.push("/")} btnColour="btn-dark" btnSize="w-100">Click here to sign in</Button>
        </div>
    )
}

export default Register

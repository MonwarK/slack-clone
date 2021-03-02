import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import FormInput from "../../components/FormInput/FormInput"
import { auth } from '../../firebase/Firebase'

function ForgotPassword() {

    const [email, setemail] = useState("")
    const history = useHistory()

    const resetPassword = () => {
        auth.sendPasswordResetEmail(email)
        .then(() =>{  
            alert("Success")
            history.push("/")
        })
        .catch( err => alert(err))
    }

    return (
        <div className="w-100 mw-500 mx-auto mt-5">
            <h3>Forgot password?</h3>
            <FormInput inputType="email" onChange={e => setemail(e.target.value)} placeholder="Enter your email here" />
            <button onClick={resetPassword} className="btn btn-info w-100">Send email link</button>
        </div>
    )
}

export default ForgotPassword

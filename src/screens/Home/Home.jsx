import React, { useState } from 'react'
import NavBar from "../../components/NavBar/Navbar"
import SideNav from "../../components/SideNav/SideNav"
import { Route, Router, Switch, useHistory } from "react-router-dom"
import { auth } from '../../firebase/Firebase'
import DMs from "../DMs/DMs"
import Chat from "../Chat/Chat"
import "./Home.css"

function Home({changeTheme}) {

    const [profile, setProfile] = useState(false)
    const history = useHistory()

    const toggleProfile = () => {
        if(profile){
            setProfile(false)
        } else {
            setProfile(true)
        }
    }

    return (
        <div className="home-container">
            <NavBar toggleProfile={toggleProfile}/>
            {
                profile?
                <div className="profile-info card py-3">
                    <button className="btn btn-profile">
                        Edit Profile
                    </button>
                    <button className="btn btn-profile" onClick={changeTheme}>
                        Change Theme
                    </button>
                    <button className="btn btn-profile" onClick={() => {history.push("/"); auth.signOut();}}>
                        Sign out
                    </button>
                </div>
                :null
            }
            <div className="home-page">
                <SideNav />
                <Switch>
                    <Route path="/" exact>
                        <Chat chatType={true}/>
                    </Route>
                    <Route path="/messages" exact>
                        <DMs />
                    </Route>
                </Switch> 
              
            </div>
        </div>
    )
}

export default Home

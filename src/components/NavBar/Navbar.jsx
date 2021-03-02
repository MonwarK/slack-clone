import React from 'react'
import FormInput from "../FormInput/FormInput"
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { auth } from '../../firebase/Firebase';
import "./NavBar.css"

function Navbar({toggleProfile}) {
    return (
        <nav className="navbar navbar-expand-lg p-1 secondary">
            <div className="search">
                <QueryBuilderIcon />
                <FormInput className="input-color navbar-search mx-3" placeholder="Search for test" inputType="text"/>
                <HelpOutlineIcon />
            </div>
            <div>
                <span className="mx-3">{auth.currentUser?.displayName}</span>
                <img className="profile-icon" src={auth.currentUser?.photoURL} alt="Profile" onClick={toggleProfile}/>
            </div>
        </nav>
    )
}

export default Navbar

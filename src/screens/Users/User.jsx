import React, { useState, useEffect } from 'react'
import "./Users.css"
import { auth, db } from '../../firebase/Firebase'
import FormInput from '../../components/FormInput/FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { useHistory } from 'react-router-dom'
import { closeChat } from '../../features/dmSlice'

function User() {

    const [users, setUsers] = useState([])
    const currentUser = useSelector(selectUser)
    const [searchBar, setSearchBar] = useState("")
    const [dms, setDms] = useState([])

    const history = useHistory()
    const dispatch = useDispatch()

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

        db
        .collection("messages")
        .onSnapshot(snapshot => {
            setDms(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    Dms: doc.data()
                }))
            )
        })
    }, [])

    const filterUsers = users.filter(user => 
        user.data.displayName.toLowerCase().includes(searchBar.toLowerCase())
    )

    const sendDirectMessage = async (user) => {

        const chatExists = dms.map(dm => 
            dm.Dms.userIds.includes(currentUser.uid) && dm.Dms.userIds.includes(user.uid)
        )
        
        dispatch(closeChat())

        if(await chatExists.includes(true))
        {
            history.push("/messages")
        } 
        else {
            db
            .collection("messages")
            .add({
                userNames: [
                    auth.currentUser.displayName, 
                    user.displayName
                ],
                userIds: [
                    auth.currentUser.uid,  
                    user.uid 
                ],
            })   
                        
            history.push("/messages")
        }    
    }

    return (
        <div className="users-page">
            <div className="p-2">
                <FormInput value={searchBar} onChange={e => setSearchBar(e.target.value)} placeholder="Search user"/>
            </div>            
            {
                
            }
            <div className="user-list">
                {        
                    searchBar
                    ?   
                    filterUsers.map(user => {
                        return ( 
                            <dix className="user-card">
                                <img className="user-profile ml-3" src={user.data.photoUrl} alt={user.data.displayName}/>
                                <p className="user-name ml-3">{user.data.displayName}</p>
                                <button onClick={() => sendDirectMessage(user.data)} className="btn btn-primary mr-3">Send message</button>
                            </dix>   
                        ) 
                    })
                    :
                    <p>Type in a name (if your name doesn't appear, please relog)</p>
                }
            </div>            
        </div>
    )
}

export default User

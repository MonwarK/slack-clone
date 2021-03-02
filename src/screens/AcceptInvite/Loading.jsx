import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { auth, db } from '../../firebase/Firebase'
import firebase from "firebase"
import "./Loading.css"

function Loading() {

    const { groupCode } = useParams();
    const [channels, setChannels] = useState([])
    const [group, setGroup] = useState("")
    const history = useHistory()

    useEffect(() => {
            if(auth.currentUser){
                db.collection("channels")
                .onSnapshot(
                    snapshot => {
                        setChannels(
                            snapshot.docs.map(doc => ({
                                id: doc.id,
                                channel: doc.data()
                            }))
                        )
                    }
                )
            } else {
                alert("You need to login before using this link")
                history.push("/")
            }
        }
    ,[groupCode])

    useEffect(() => {
        setGroup(channels.filter(channel => {
            return channel?.id.includes(groupCode)
        }))
    }, [channels, groupCode])

    useEffect(() => {
        if(group){
            group.map(item => {
                
                console.log(item)
                const status = item.channel.users.includes(auth.currentUser.uid)

                if(status){
                    console.log(group)
                    alert("You have already joined this group")
                    history.push("/")
                }
                else{
                    db.collection("channels").doc(groupCode).update({
                        users: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
                    })
                    alert("You have now been added to the group");
                    history.push("/")
                }
            }) 
        }  
    }, [group])

    return (
        <div>
            <div class="loader"/>
        </div>
    )
}

export default Loading

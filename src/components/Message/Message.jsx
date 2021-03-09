import React, {useEffect, useState} from "react"
import "./Message.css"
import DeleteIcon from '@material-ui/icons/Delete';
import { auth, db } from "../../firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectChannelId } from "../../features/channelSlice";
import AlertMessage from "../Alert/Alert"
import { useHistory } from "react-router-dom";
import { closeChat } from "../../features/dmSlice";
import { selectUser } from "../../features/userSlice";

function Message({id, user, imageUrl, timestamp, message, chatType}) {

    const [dms, setDms] = useState([])
    const channelId = useSelector(selectChannelId)
    const currentUser = useSelector(selectUser)
    const [alertBox, setAlertBox] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
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

    const sendDirectMessage = async e => {

        e.preventDefault()

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
                    user.name
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

        <div>

            {
                alertBox?
                <AlertMessage onSubmit={() => setAlertBox(false)}>
                    <div className="alert-profile">
                        <img height="100" src={user.pfp} alt={user.name} />
                        <div className="alert-details ml-2">
                            <h4 onClick={() => setAlertBox(true)}>{user.name}</h4>
                            <br />
                            <button onClick={sendDirectMessage} className="btn btn-danger w-100">Send message</button>
                        </div>
                    </div>
                </AlertMessage>
                : null
            }

            <div className="message-container px-3 my-2">
                <img className="profile-picture" src={user.pfp} alt={user.name} />

                <div className="message-details">
                    <strong onClick={() => setAlertBox(true)}>{user.name}</strong>
                    <span className="ml-3">{new Date(timestamp?.toDate()).toUTCString()}</span>
                    
                    <p>
                        {
                            imageUrl
                            ?
                            <img className="message-photo" src={imageUrl} alt={"Image sent by " + user.name} />
                            :
                            null
                        }
                        {message}
                    </p>
                </div>

                {
                    user.uid === auth.currentUser?.uid && chatType
                    ?
                    <DeleteIcon 
                        className="delete-icon"
                        onClick={
                            () => {
                                db
                                .collection("channels")
                                .doc(channelId)
                                .collection("messages")
                                .doc(id)
                                .delete()
                            }
                        }
                    />
                    :
                    null
                }
            </div>
        </div>
    )
}

export default Message

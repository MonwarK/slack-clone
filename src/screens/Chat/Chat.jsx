import React, { useEffect, useState } from 'react'
import firebase from "firebase"
import "./Chat.css"
import { useSelector } from 'react-redux';
import { db } from '../../firebase/Firebase';
import { selectChannelId, selectChannelName } from '../../features/channelSlice';
import { selectUser } from '../../features/userSlice';
import Message from "../../components/Message/Message"
import SendIcon from '@material-ui/icons/Send';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Alert from "../../components/Alert/Alert"
import Picker from 'emoji-picker-react';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import alert from '../../components/Alert/Alert';

function Chat() {

    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const user = useSelector(selectUser)
    const [messages, setmessages] = useState([])
    const [message, setmessage] = useState("")
    const [alertBox, setAlertBox] = useState("")
    const [emoji, setemoji] = useState(false)

    useEffect(() => {
        if(!channelId){
            return;
        }

        db
        .collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot => {
            setmessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    messages: doc.data()
                }))
            )
        })

    }, [channelId])

    const sendMessage = e => {

        e.preventDefault()

        if(message){
            if(message.length <= 300){
                db.collection("channels").doc(channelId).collection("messages").add({
                    user: user,
                    message: message,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
            }
            else{
                alert("Character limit exceeded")
            } 
        }

        setmessage("")
    }

    const onEmojiClick = (event, emojiObject) => {
        setmessage(message + emojiObject.emoji);
    };

    const addImage = () => {
        const imageUrl = prompt("Image Url?")
        if(imageUrl){
            db.collection("channels").doc(channelId).collection("messages").add({
                user: user,
                imageUrl: imageUrl,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }
        else{
            alert("Please input an image")
        }
    }

    return (
        
        <div className="chat-page">

            {
                alertBox
                ?
                <Alert onSubmit={e => {e.preventDefault();
                setAlertBox(false)}}>
                    <p className="py-3"><strong>Send this link to a friend:</strong></p>
                    <p>{window.location.href+"invite/"+channelId}</p>
                </Alert>
                :
                null
            }

            {
                channelId
                ?
                <div className="chat-contents">
                    <div className="chat-header">
                        <div className="chat-title">
                            <h6><strong>#{channelName}</strong></h6>
                            <label>This is the description.</label>
                        </div>
                        <div className="chat-details">
                            <StarBorderIcon className="mr-3"/>
                            <button onClick={() => setAlertBox(true)} className="btn btn-outline-primary">
                                <GroupAddIcon className="mr-2"/>
                                Invite
                            </button>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {
                            messages.length
                            ?
                            messages.map(({id, messages: {message, imageUrl, timestamp, user}}) => {
                                return <Message id={id} chatType={true} imageUrl={imageUrl} message={message} timestamp={timestamp} user={user}/>
                            })

                            :
                            <div className="my-5">
                                <img className="svg-icons" src="./images/Humaaans - Phone.png" alt="Start chatting" />
                                <p>Type in the textbox below, and start chatting</p>
                            </div>
                        }
                    </div>

                    <form onSubmit={sendMessage} className="chat-input px-3">
                        <input className="chat-textbox" type="text" placeholder={`Send a message to #${channelName}`} value={message} onChange={e => setmessage(e.target.value)}/>
                        {
                            emoji
                            ?
                            <div className="position-absolute emoji-container">
                                <Picker onEmojiClick={onEmojiClick}/>
                            </div>
                            :
                            null
                        }
                        <div className="form-buttons">
                            <FlashOnIcon />
                            <div>
                                <AlternateEmailIcon className="mr-2"/>
                                <SentimentVerySatisfiedIcon  onClick={() => emoji ? setemoji(false) : setemoji(true)} className="mr-2"/>
                                <AttachFileIcon onClick={addImage} className="mr-2"/>
                                <button type="submit" className="btn btn-primary"><SendIcon/></button>
                            </div>
                        </div>
                    </form>
                </div>
                :
                <div className="my-5">
                    <img className="svg-icons" src="./images/Happy Bunch - Chat.png" alt="Select channel"/>
                    <p>Select a channel</p>
                </div>
            }
            
        </div>

    )
}

export default Chat

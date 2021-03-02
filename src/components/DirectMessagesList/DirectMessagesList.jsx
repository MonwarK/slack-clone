import React, { useState, useEffect } from 'react'
import { auth, db } from '../../firebase/Firebase'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import "./DirectMessageList.css"
import { useDispatch } from 'react-redux';
import { setChat } from '../../features/dmSlice';

function DirectMessagesList() {

    const [messages, setMessages] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        db
        .collection("messages")
        .onSnapshot(snapshot => {
            setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    messages: doc.data()
                }))
            )

        })
    }, [])

    const openDM = (chatId, userName) => {
        dispatch(setChat({
            chatId: chatId,
            userName: userName
        }))
    }

    return (
        <div className="direct-message">
            <h3 className="text-center py-3">All DMs</h3>
            <hr />
            {
                messages
                ?
                messages.map(({id, messages: userNames}) => {

                    const isUserDM = userNames.userIds.includes(auth.currentUser.uid);

                    return (
                        isUserDM
                        ?
                        <div className="direct-message-item p-3" onClick={() => openDM(id, userNames.userNames.filter(name => name !== auth.currentUser.displayName))}>
                            <QuestionAnswerIcon />
                            <div className="dm-preview ml-3">
                                <h6>{userNames.userNames.filter(name => name !== auth.currentUser.displayName)}</h6>
                            </div>
                        </div>
                        : 
                        null
                    )
                })                
                :
                null
            }
        </div>
    )
}

export default DirectMessagesList

import React from 'react'
import { useSelector } from 'react-redux'
import DirectMessagesList from "../../components/DirectMessagesList/DirectMessagesList"
import { selectChatId } from '../../features/dmSlice';
import Chat from "../Chat/DirectMessage"

function DMs() {

    const chatId = useSelector(selectChatId);

    return (        
        chatId
        ?
        <Chat chatType={false}/>
        :
        <DirectMessagesList />
    )
}

export default DMs

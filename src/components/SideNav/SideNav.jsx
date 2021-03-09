import React, { useState, useEffect } from 'react'
import AddIcon from '@material-ui/icons/Add';
import SideButton from "../SideNavButtons/SideNavButton"
import "./SideNav.css"
import MessageIcon from '@material-ui/icons/Message';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleIcon from '@material-ui/icons/People';
import AppsIcon from '@material-ui/icons/Apps';
import FormInput from "../FormInput/FormInput"
import Button from "../Button/Button"
import DeleteIcon from '@material-ui/icons/Delete';
import { auth, db } from '../../firebase/Firebase';
import { useDispatch } from 'react-redux';
import { setChannel } from '../../features/channelSlice';
import AlertBox from "../Alert/Alert"
import alert from '../Alert/Alert';
import { useHistory } from 'react-router-dom';
import { closeChat } from '../../features/dmSlice';

function SideNav({sideNav, toggleSideNav}) {

    const dispatch = useDispatch();
    const [channels, setchannels] = useState([])
    const [users, setusers] = useState([])
    const [alertBox, setAlertBox] = useState(false)
    const [channelName, setChannelName] = useState("")
    const history = useHistory()

    useEffect(() => {
        db.collection("channels").onSnapshot(
            snapshot => {
                setchannels(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        channel: doc.data()
                    }))
                )
            }
        )
    }, [])

    useEffect(() => {
        setusers(channels.filter(({channel: {users}}) => {
            return users.includes(auth.currentUser?.uid)
        }))
    }, [channels])

    const addChannel = e => {

        e.preventDefault()

        if(channelName){
            db.collection("channels").add({
                channelName: channelName,
                users: [
                    auth.currentUser.uid,   
                ]
            })
            
            alert("Make sure you invite users to your channel.")
            setAlertBox(false)
        }
    }

    return (
        <div className={`primary side-nav text-left ${sideNav?`open`:`closed`}`}>
            
            {
                alertBox
                ?
                <AlertBox onSubmit={e => {e.preventDefault();
                setAlertBox(false)}}>
                    <h4 className="py-1 text-center">Add channel</h4>
                    <FormInput onChange={e => setChannelName(e.target.value)} placeholder="Type channel name" inputType="text"/>
                    <Button type="submit" onClick={addChannel} btnColour="btn-primary" btnSize="w-100" type="submit">Add Channel</Button>
                </AlertBox>
                :
                null
            }

            <div className={`navigation ${sideNav?`open`:`closed`}`}>          
                <h4 className="mt-3 text-center">Slack Clone</h4>  

                <div className="my-3">
                    <SideButton>
                        <MessageIcon />
                        <span>Thread</span>
                    </SideButton>

                    <SideButton link={
                        () => { 
                                dispatch(closeChat()); 
                                history.push("/messages")
                                toggleSideNav()
                            }
                        }>
                        <InboxIcon />
                        <span>All DMs</span>
                    </SideButton>

                    <SideButton>
                        <DraftsIcon />
                        <span>Mentions & Reactions</span>
                    </SideButton>

                    <SideButton>
                        <BookmarkBorderIcon />
                        <span>Save Items</span>
                    </SideButton>

                    <SideButton link={
                        () => { 
                            dispatch(closeChat()); 
                            history.push("/users");
                            toggleSideNav();
                        }}>
                        <PeopleIcon/>
                        <span>People & Groups</span>
                    </SideButton>

                    <SideButton>
                        <AppsIcon />
                        <span>More</span>
                    </SideButton>
                </div>


                <div className="channels my-3">
                    <div className="title px-3">    
                        <h6>Channels</h6>
                        <AddIcon onClick={() => setAlertBox(true)}/>
                    </div>
                    <ul className="list-group">
                        {
                            users.map(({id, channel}) => {
                                return <li className="my-1 channel-item" onClick={() => history.push("/")}>
                                    <label
                                        className="group-item mx-3"
                                        onClick={
                                            () => {
                                                dispatch(setChannel({
                                                    channelId: id,
                                                    channelName: channel.channelName,
                                                    channelUsers: users.length
                                                }))
                                                toggleSideNav()    
                                            }
                                    }
                                    ># {channel.channelName}</label>
                                    {
                                        channel.users[0] === auth.currentUser.uid 
                                        ?
                                        <DeleteIcon 
                                            className="mr-2"
                                            onClick={
                                                () => {
                                                    alert(channel.channelName + " has been deleted")

                                                    db
                                                    .collection("channels")
                                                    .doc(id)
                                                    .delete()
                                                }
                                            }
                                        />
                                        :
                                        null
                                    }
                                </li>
                            })
                        }
                    </ul> 
                </div>  
            </div>
        </div>
    )
}

export default SideNav
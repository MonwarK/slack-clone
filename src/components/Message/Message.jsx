import React, {useState} from "react"
import "./Message.css"
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { auth, db } from "../../firebase/Firebase";
import { useSelector } from "react-redux";
import { selectChannelId } from "../../features/channelSlice";

function Message({id, user, imageUrl, timestamp, message}) {

    const channelId = useSelector(selectChannelId)
    const [liked, setLiked] = useState(false)

    const likeMessage = () => {
        liked? setLiked(false) : setLiked(true)
    }

    return (

        <div>
            <div className="message-container px-3 my-2">
                <img className="profile-picture" src={user.pfp} alt={user.name} />

                <div className="message-details">
                    <strong>{user.name}</strong>
                    <span className="ml-3">{new Date(timestamp?.toDate()).toUTCString()}</span>
                    
                    <p>
                        {
                            imageUrl
                            ?
                            <img height="300" src={imageUrl} alt={"Image sent by " + user.name} />
                            :
                            null
                        }
                        {message}
                    </p>
                </div>
                
                <div className="text-warning" onClick={likeMessage}>
                {
                    liked ?
                    <StarBorderIcon />
                    : <StarIcon /> 
                }
                </div>                
                {
                    user.uid === auth.currentUser.uid
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

import PropTypes from "prop-types"
import { useContext, useRef } from "react";
import { MessagesContext } from "../utils/contexts/MessagesProvider";
import moment from 'moment'

const UserCard = ({friends, setCurrentChatView, highlight, typingIndicator, onlineStatus = "Offline" }) => {
    const { setMessages, setFriendProfile} = useContext(MessagesContext)
    const display = useRef(null)  

    let falseCount = friends.messages.filter(item => item?.is_read === false).length;

    if(falseCount > 99){
        falseCount = "99+"
    }else{
        falseCount
    }

    const handleCardClick = () => {
        setMessages(friends?.messages || []);
        setFriendProfile(friends?.friend)
        setCurrentChatView(friends?.friend?.username);
    }

    const lastMessage = friends.messages[friends?.messages?.length -1 ]
    const sentAt = moment(lastMessage?.sent_at);
    const now = moment();
  
    const diffInDays = now.diff(sentAt, 'days');
    const diffInYears = now.diff(sentAt, 'years');

    let formattedDate;
  
    if (diffInDays < 1) {
      formattedDate = sentAt.fromNow();
    } else if (diffInDays < 7) {
      formattedDate = sentAt.format('dddd');
    } else if (diffInYears < 1) {
      formattedDate = sentAt.format('MMMM, ddd');
    } else {
      formattedDate = sentAt.format('MMMM YYYY');
    }
    
    return (
        <div className="liscontainer" style={{ display: highlight ? 'flex' : 'none' }} ref={display} onClick={handleCardClick}>
            <div className="qwerty">
                <div className="friendProfile">
                            
                    {friends.friend.profile?.profile_picture ? (
                        <img src={`http://localhost:8000${friends?.friend?.profile?.profile_picture}`} alt={`${friends?.friend?.username}'s profile`}/> 
                    ) : (
                        <div className="profile_name">{friends?.friend?.username?.charAt(0)?.toUpperCase()}</div>
                    )}
                    
                </div>

                <div className="over">
                    <div className="friendname">
                        <h3 style={{ fontWeight: highlight ? 'bold' : 'normal' }}>{friends?.friend?.username}</h3>
                    </div>
                    
                    {typingIndicator[friends?.friend?.username] && <span>typing...</span>}

                    {friends?.friend?.username === lastMessage?.recipient ? (
                        (lastMessage?.message ? (
                            <div className="messageOverview">
                                <div className="vieww">
                                        <span>{lastMessage?.message}</span>
                                </div>
                            </div> 
                        )
                        :
                        (
                            <div className="view_media">
                                <span>
                                    <i className="bi bi-images"></i>
                                </span>

                                <span>media</span>
                            </div>
                        )
                        )
                        ) : (
                            null
                        )
                    }
                    
                </div>

            </div>
            
            {friends?.friend?.username === lastMessage?.recipient &&  (
                <div className="leftmessoverview">
                    <div className="messTime">
                        <div className="Timeset">
                            {lastMessage?.message && <p>{formattedDate}</p>}
                        </div>

                    
                        <div className="messNum">
                            {friends?.friend?.username === lastMessage?.recipient && 
                            <div className="numcount">
                                <span>{falseCount}</span>
                            </div>
                            }
                            
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    )

}

export default UserCard

UserCard.propTypes = {
    setCurrentChatView: PropTypes.func.isRequired, 
    highlight : PropTypes.bool.isRequired,
    incomingMessage: PropTypes.object,
    friends: PropTypes.shape({ 
        friend: PropTypes.shape({
            username: PropTypes.string.isRequired,
            profile: PropTypes.shape({
            bio: PropTypes.string,
            profile_picture: PropTypes.string,
            user: PropTypes.number.isRequired,
        }),
        
        }),

        messages: PropTypes.array,
        
    }).isRequired,
    typingIndicator: PropTypes.object,
};
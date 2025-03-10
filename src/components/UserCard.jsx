import PropTypes from "prop-types"
import { useContext, useEffect, useRef } from "react";
import { MessagesContext } from "../utils/contexts/MessagesProvider";

const UserCard = ({friend, setCurrentChatView, highlight, typingIndicator, }) => {
    const { setMessages, } = useContext(MessagesContext)

    const handleCardClick = () => {
        setMessages(friend.messages || []);
        setCurrentChatView(friend.friend.username);
    }

    const display = useRef(null)

    return (
        <div className="liscontainer" style={{ display: highlight ? 'flex' : 'none' }} ref={display} onClick={handleCardClick}>
            <div className="qwerty">
                <div className="friendProfile">
                            
                    {friend.friend.profile?.profile_picture ? (
                        <img src={`http://localhost:8000${friend.friend.profile?.profile_picture}`} alt={`${friend.friend.username}'s profile`}/> 
                    ) : (
                        <div className="profile_name">{friend.friend.username.charAt(0).toUpperCase()}</div>
                    )}
                </div>

                <div className="over">
                    <div className="friendname">
                        <h3 style={{ fontWeight: highlight ? 'bold' : 'normal' }}>{friend.friend.username}</h3>
                    </div>
                    
                    {typingIndicator[friend.username] && <span>typing...</span>}

                    {/* {friend.friend.username === last.friend.username ? (
                        (last.message.message ? (
                            <div className="messageOverview">
                                <div className="vieww">
                                        <span>{last.message}</span>
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
                    } */}
                    
                </div>

            </div>
            
            {/* {friend.from_user.username === incomingMessage.sender &&  (
                <div className="leftmessoverview">
                    <div className="messTime">
                        <div className="Timeset">
                            {incomingMessage.message && <p>{formattedTime}</p>}
                        </div>

                    
                        <div className="messNum">
                            {incomingMessage.incomingMessageCount && 
                            <div className="numcount">
                                <span>{incomingMessage.incomingMessageCount}</span>
                            </div>
                            }
                            
                        </div>
                    </div>
                </div>
            )} */}
            
        </div>
    )

}

export default UserCard

UserCard.propTypes = {
    setCurrentChatView: PropTypes.func.isRequired, 
    highlight : PropTypes.bool.isRequired,
    incomingMessage: PropTypes.object,
    friend: PropTypes.shape({ 
        id: PropTypes.number,
        username: PropTypes.string,
        friend: PropTypes.shape({
            username: PropTypes.string.isRequired,
            profile: PropTypes.shape({
            bio: PropTypes.string,
            profile_picture: PropTypes.string,
            user: PropTypes.number.isRequired,
        }),
        messages: PropTypes.shape({
            message: PropTypes.string,
        })
        })
        
    }).isRequired,
    typingIndicator: PropTypes.object,
};
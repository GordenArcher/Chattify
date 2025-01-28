import PropTypes from "prop-types"
import { useRef } from "react";

const UserCard = ({ friend, setCurrentChatView, highlight, typingIndicator }) => {

    const display = useRef(null)

    return (
        <div className="liscontainer" style={{ display: highlight ? 'flex' : 'none' }} ref={display} onClick={() => setCurrentChatView(`${friend.from_user.username}`)}>
            <div className="qwerty">
                <div className="friendProfile">
                            
                    {friend.from_user.profile?.profile_picture ? (
                        <img src={`http://localhost:8000${friend.from_user.profile?.profile_picture}`} alt={`${friend.from_user.username}'s profile`}/> 
                    ) : (
                        <div className="profile_name">{friend.from_user.username.charAt(0).toUpperCase()}</div>
                    )}
                    
                </div>

                <div className="over">
                    <div className="friendname">
                        <h3 style={{ fontWeight: highlight ? 'bold' : 'normal' }}>{friend.from_user.username}</h3>
                    </div>
                    {typingIndicator === friend.from_user.username && ("typing") }

                    {/* {friend.from_user.username === incomingMessage.sender || incomingMessage.recipient === friend.from_user.username ? (
                        (incomingMessage.message ? (
                            <div className="messageOverview">
                                <div className="vieww">
                                        <span>{incomingMessage.message}</span>
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
        id: PropTypes.number.isRequired,
        from_user: PropTypes.shape({
            username: PropTypes.string.isRequired,
           profile: PropTypes.shape({
            bio: PropTypes.string,
            profile_picture: PropTypes.string,
            user: PropTypes.number.isRequired,
        }) 
        })
        
    }).isRequired,
    typingIndicator: PropTypes.string,
};
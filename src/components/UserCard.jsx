import PropTypes from "prop-types"
import { useEffect, useRef, useState } from "react"

const UserCard = ({ friends, setCurrentChatView, searchFriends, incomingMessage }) => {
    const display = useRef(null)
    const [isVisible, setIsVisible] = useState(false);
    // console.log(incomingMessage)
    const date = new Date(incomingMessage.timestamp)
    const formattedTime = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;

    const isFriendVisible = friends.username;

    console.log(incomingMessage.loggedInUser, incomingMessage.recipient)

    useEffect(() => {
        if(searchFriends.includes(isFriendVisible)){
            setIsVisible(true)
        }else{
            setIsVisible(false)
        }
    }, [isFriendVisible, searchFriends])



  return (
    <div className={`liscontainer ${isVisible ? 'visible' : 'hidden'}`} ref={display} onClick={() => setCurrentChatView(`${friends.username}`)}>
        <div className="qwerty">
            <div className="friendProfile">
                        
                {friends.profile?.profile_picture ? (
                    <img src={`http://localhost:8000${friends.profile?.profile_picture}`} alt={`${friends.username}'s profile`}/> 
                ) : (
                    <div className="profile_name">{friends.username.charAt(0).toUpperCase()}</div>
                )}
                
            </div>

            <div className="over">
                <div className="friendname">
                    <h3>{friends.username}</h3>
                </div>

                {incomingMessage.loggedInUser === incomingMessage.recipient || incomingMessage.loggedInUser === incomingMessage.sender ? (
                    (incomingMessage.message && (
                        <div className="messageOverview">
                            <div className="vieww">
                                <span>{incomingMessage.message}</span>
                            </div>
                        </div> 
                    ))
                    ) : (
                        null
                    )
                }
                
            </div>

        </div>
        
        {incomingMessage.sender === friends.username  &&  (
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
        )}
        
    </div>
  )
}

export default UserCard

UserCard.propTypes = {
    setCurrentChatView: PropTypes.func.isRequired, 
    searchFriends : PropTypes.string.isRequired,
    incomingMessage: PropTypes.object,
    friends: PropTypes.shape({ 
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string,
        profile: PropTypes.shape({
            bio: PropTypes.string,
            profile_picture: PropTypes.string,
            user: PropTypes.number.isRequired,
        })
    }).isRequired
};
import PropTypes from "prop-types"
import { useRef } from "react"

const UserCard = ({ friends, setCurrentChatView, searchFriends }) => {
    const display = useRef(null)
    
    const isFriendVisible = searchFriends.includes(friends.username);

  return (
    <div className="liscontainer" ref={display} style={{ display: isFriendVisible ? "none" : "flex" }} onClick={() => setCurrentChatView(`${friends.username}`)}>
        <div className="friendProfile">
            {/* <img src={ProfilePic} alt="user profile" /> */}
            <div className="profile_name">{friends.username.charAt(0).toUpperCase()}</div>
        </div>

        <div className="leftmessoverview">
            <div className="over">
                <div className="friendname">
                    <h3>{friends.username}</h3>
                </div>

                <div className="messageOverview">
                    <div className="vieww">
                        <span>How you doing man</span>
                    </div>
                </div>
            </div>

            <div className="messTime">
                <div className="Timeset">
                    <p>01 : 35</p>
                </div>

                <div className="messNum">
                    <div className="numcount">
                        <span>5</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard

UserCard.propTypes = {
    setCurrentChatView: PropTypes.func.isRequired, 
    searchFriends : PropTypes.string.isRequired, 
    friends: PropTypes.shape({ 
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string,
    }).isRequired
};
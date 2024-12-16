import PropTypes from "prop-types"
import ProfilePic from '../assets/images/avatar-7.png'

const UserCard = ({ friends, setCurrentChatView }) => {
  return (
    <div className="liscontainer" onClick={() => setCurrentChatView(`${friends.username}`)}>
        <div className="friendProfile">
            <img src={ProfilePic} alt="user profile" />
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
    friends: PropTypes.shape({ 
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string,
    }).isRequired
};
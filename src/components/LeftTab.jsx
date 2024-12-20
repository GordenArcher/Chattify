import '../App.css'
import PropTypes from 'prop-types'
import { GetUserProfile } from '../utils/hooks/GetProfile'

export const LeftTab = ({ setCurrentView }) => {

        const {usersData, usersDataDet} = GetUserProfile()

  return (
    <div className='tab'>
        <div className="flow">
            <div className="flowTop">
                <div className="chats">
                    <div className="chaticon">
                        <button onClick={() => {
                            setCurrentView("chat")
                        }}>
                            <i className='bi bi-chat-left-text'></i>
                        </button>
                    </div>
                </div>

                <div className="add-friend">
                    <div className="addfriendicon">
                        <button onClick={() => setCurrentView("find_friends")}>
                            <i className='bi bi-person'></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flowBottom">
                <div className="settings">
                    <div className="settingsicon">
                        <button onClick={() => setCurrentView("settings")}>
                            <i className='bi bi-gear'></i>
                        </button>
                    </div>
                </div>

                <div className="profile">
                    <div className="profileimage" onClick={() => setCurrentView("profile")}>
                        {usersData.payload?.profile_picture ? (
                            <img src={`http://localhost:8000${usersData.payload.profile_picture}`} alt="user profile" />
                        ) : (
                            <div className='no_profile_i i'>{ usersDataDet.charAt(0).toUpperCase() }</div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

LeftTab.propTypes = {
    setCurrentView: PropTypes.func.isRequired
}
import '../App.css'
import PropTypes from 'prop-types'
import { GetUserProfile } from '../utils/hooks/GetProfile'
import { useContext } from 'react'
import { AuthContext } from '../utils/contexts/AuthContextProvider'

export const LeftTab = ({ setCurrentView, setShowLogOut, setCurrentChatView }) => {

    const {user, usersDataDet} = GetUserProfile()
    const {notificationCount} = useContext(AuthContext)
    

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

                <div className="notification">
                    <div className="notification-icon">
                        <button onClick={() => setCurrentView("notification")}>
                            <i className='bi bi-bell'></i>
                        </button>

                        {notificationCount > 0 && 
                            <div className="noti-count">
                                {notificationCount}
                            </div>
                        }
                        
                    </div>
                </div>

                <div className="ai">
                    <div className="ai-icon">
                        <button onClick={() => setCurrentView("ai")}>
                            <span >AI</span>
                            {/* <i className='bi bi-bell'></i> */}
                        </button>

                        
                    </div>
                </div>
            </div>

            <div className="flowBottom">

                <div className="logout">
                    <div className="logouticon">
                        <button onClick={() => setShowLogOut(true)}>
                            <i className="bi bi-box-arrow-left"></i>
                        </button>
                    </div>
                </div>

                {/* <div className="settings">
                    <div className="settingsicon">
                        <button onClick={() => setCurrentView("settings")}>
                            <i className='bi bi-gear'></i>
                        </button>
                    </div>
                </div> */}

                <div className="profile">
                    <div className="profileimage" onClick={() => setCurrentView("profile")}>
                        {user.profile?.profile_picture ? (
                            <img src={`http://localhost:8000${user.profile?.profile_picture}`} alt="user profile" />
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
    setCurrentView: PropTypes.func.isRequired,
    notificationCount: PropTypes.number,
    setShowLogOut: PropTypes.func
}
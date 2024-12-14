import ProfileImg from '../assets/images/avatar-7.png'
import '../App.css'
import PropTypes from 'prop-types'

export const LeftTab = ({ setCurrentView }) => {

        
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
                        <img src={ProfileImg} alt="user profile" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

LeftTab.propTypes = {
    setCurrentView: PropTypes.string.isRequired
}
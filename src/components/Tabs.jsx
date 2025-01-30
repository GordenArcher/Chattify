import { useContext } from "react"
import { AuthContext } from "../utils/contexts/AuthContextProvider"
import PropTypes from "prop-types"

const Tabs = ({ currentView, setCurrentView, setShowLogOut }) => {

    const {notificationCount} = useContext(AuthContext)
  return (
    <div className="mobile_tabs">
      <div className="m_tabs">

        <button 
            className={currentView === "chat" ? "active" : ""}
            onClick={() => {setCurrentView("chat")}}>
            <i className='bi bi-chat-left-text'></i>
        </button>

        <button 
            className={currentView === "find_friends" ? "active" : ""}
            onClick={() => setCurrentView("find_friends")}>
                <i className='bi bi-person'></i>
        </button>

        <div className="notification_m-icon">

            <button 
            className={currentView === "notification" ? "active" : ""}
                onClick={() => setCurrentView("notification")}>
                <i className='bi bi-bell'></i>
            </button>

            {notificationCount > 0 && 
                <div className="noti-count">
                    {notificationCount}
                </div>
            }
            
        </div>

        <button 
         className={currentView === "profile" ? "active" : ""}
        onClick={() => setCurrentView("profile")}>
            <i className="bi bi-person"></i>
        </button>

        <button onClick={() => setShowLogOut(true)}>
            <i className="bi bi-box-arrow-left"></i>
        </button>
      </div>
    </div>
  )
}

export default Tabs

Tabs.propTypes = {
    currentView: PropTypes.string.isRequired,
    setCurrentView: PropTypes.func,
    setShowLogOut: PropTypes.func
}

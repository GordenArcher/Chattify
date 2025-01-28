import RecievedRequest from "../../components/RecievedRequest"
import { FetchRecievedRequest } from "../../utils/hooks/FetchRequests"
import PropTypes from "prop-types"

const Notifications = () => {

    const { received, isLoading, setReceived} = FetchRecievedRequest()


  return (
    <div className="notification">
        <div className="all_notification">
            <div className="notify">
                <div className="notification_head">
                    <h4>Notifications</h4>
                </div>

                <div className="incoming_request">
                    <div className="recieved_title">
                        <h3>Friend Requests</h3>
                    </div>

                    <div className="recieved_-">
                        {isLoading ? (
                        <div className="loader-recieved"></div>
                    ) : (
                      (received.length > 0 ? (
                        (received.map((noti, index) => {
                            return(
                                <RecievedRequest key={index} setReceived={setReceived} {...noti} />
                            )
                        }))
                      ) : (
                        <div>
                            <span>No Friend Request</span>
                        </div>
                      )) 
                    )}
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

Notification.propTypes = {
    setNotificationCount: PropTypes.func,
    setReceived: PropTypes.func
}

export default Notifications

import { useState } from "react"
import { Load } from "./Load"
import { toast } from "react-toastify"
import api from "../utils/axios"

const RecievedRequest = ( request, setReceived ) => {
    const [isLoading, setIsLoading] = useState(false)

    const user = request.request_type === "sent" ? request.to_user : request.from_user

    const acceptRequest = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
        const response = await api.post(`/accept-friend-request/${user?.username}/`)
        if (response) {
            toast.success(response.data.message)
            setReceived((prev) => prev.filter((r) => r.id !== request.id))
        }
        } catch (error) {
        toast.error("Failed to accept friend request")
        return error
        } finally {
        setIsLoading(false)
        }
    }

  // Determine which user to show (if you sent or received)
  

    const profilePic = user?.profile?.profile_picture
        ? `http://localhost:8000${user.profile.profile_picture}`
        : null

    return (
        <div className="user_container">
            <div className="user_cont">
                <div className="user_conatiner_profile">
                    <div className="friendProfile">
                        {profilePic ? (
                            <img src={profilePic} alt={`${user.username}'s profile`} />
                            ) : (
                            <div className="profile_name">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div className="user_friend_name">
                        <h3 style={{ fontWeight: "bold" }}>{user.username}</h3>
                    </div>
                </div>

                <div className="user_friend_action">
                    <div className="user_friend_options">
                        {request.status === "accept" ? (
                            <div className="options">
                                <div className="accept ch">
                                    <button onClick={acceptRequest}>
                                        {isLoading ? (
                                            <Load />
                                            ) : (
                                            <>
                                                <i className="bi bi-person-fill-check"></i>
                                                <span>Accept</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="decline ch">
                                    <button onClick={acceptRequest}>
                                        {isLoading ? (
                                            <Load />
                                            ) : (
                                            <>
                                               <i className="bi bi-person-x"></i>
                                                <span>Decline</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="pending-status">
                                <i className="bi bi-clock"></i> Pending
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecievedRequest

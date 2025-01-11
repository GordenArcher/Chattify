import PropTypes from "prop-types"
import { useEffect, useState } from "react"

const FriendInfo = ({f, loading, setShowFriendInfo, chatMessages}) => {
    const [chatMedia, setChatMedia] = useState({})
    console.log(chatMedia)
    console.log(chatMessages.media)

    useEffect(() => {
        setChatMedia(chatMessages.media)
    }, [chatMessages.media])

    const [activeTab, setActiveTab] = useState("media")
  return (
    <div className='friend_info_data'>
        <div className="close_state">
            <button id="close" onClick={() => setShowFriendInfo(false)}>
                <i className="bi bi-x"></i>
            </button>
        </div>
        <div className="info_wrap_chat_data">
            <div className="conta">
                <div className="firnd_iii">
                    <div className="info_profile_picture">
                        <div className="friend_profile profile_picture">
                            {loading ? (
                                <div className="loading">loading</div>
                            ) : (
                            (f.profile.profile_picture ? (
                                <img src={`http://localhost:8000${f.profile.profile_picture}`} alt={`${f.username}'s profile`} />
                            ) : (
                                <div className="no_profile i">{f.username[0].toUpperCase()}</div>
                            ))  
                            )}
                        </div>
                    </div>

                    <div className="friend_del_ob">
                        <div className="friend_n_bi">
                            <div className="friends_name">
                                <div className="f_nameei">
                                {loading ? (
                                        "Loading..."
                                    ) : (
                                        <span> {f.username} </span>
                                    )}
                                </div>
                            </div>

                            <div className="f_bio_n">
                                <div className="f_oib">
                                    {loading ? (
                                        "Loading..."
                                    ) : (
                                    (f.profile.bio ? (
                                        <span>{f.profile.bio}</span> 
                                    ) : (
                                        <span>
                                            Hey there it&apos;s <span className="n">{f.username}</span>
                                        </span>
                                    ))
                                     
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="media">
                <div className="chat_media">
                    <div className="tab">
                        <div className="media-tab">
                            <button onClick={() => setActiveTab("media")}>
                                <span>
                                    <i className="bi bi-images"></i>
                                </span>
                                <span>
                                    Media
                                </span>
                            </button>
                        </div>
                    </div>

                    {activeTab === "media" && (
                        <div className="media-files">
                            <div className="med_file">
                                
                            </div>
                        </div>
                    ) }
                </div>
            </div>
        </div>
    </div>
  )
}

FriendInfo.propTypes = {
    loading: PropTypes.bool.isRequired,
    setShowFriendInfo: PropTypes.func.isRequired,
    f: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            bio: PropTypes.string.isRequired,
            profile_picture: PropTypes.string.isRequired,
            cover_picture: PropTypes.string.isRequired,
        })
    }),
    chatMessages: PropTypes.shape({
        media: PropTypes.string
    })
}

export default FriendInfo


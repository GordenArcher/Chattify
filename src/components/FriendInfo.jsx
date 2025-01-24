import PropTypes from "prop-types"
import { useState } from "react"
import { toast } from "react-toastify"

const FriendInfo = ({f, loading, setShowFriendInfo, messages, previewImage, setPreviewImage}) => {


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
                                <div className="no_profile i" style={{cursor:'pointer'}} onClick={() => toast.info("no profile")} >{f.username[0].toUpperCase()}</div>
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
                    <div className="tabs">
                        <div className="media-tab tab">
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
                                <div className="media_flex-grid">
                                {messages.map((media) => (
                                    (media.media && 
                                        <div key={media.id} onClick={() => setPreviewImage(media.media)} className="media_image">
                                            {media.media.match(/\.(jpeg|jpg|png|svg|gif)$/i) ? (
                                                <img src={`http://localhost:8000${media.media}/`} alt="media" />
                                            ) : (
                                                <video src={`http://localhost:8000${media.media}/`}></video>
                                            )}
                                            
                                        </div>
                                    )
                                ))}
                                    
                                </div>
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
            bio: PropTypes.string,
            profile_picture: PropTypes.string,
            cover_picture: PropTypes.string,
        })
    }),
    messages: PropTypes.array
}

export default FriendInfo


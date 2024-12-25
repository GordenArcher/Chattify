import PropTypes from "prop-types"

const FriendInfo = ({f, loading, setShowFriendInfo}) => {
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
        </div>
    </div>
  )
}

FriendInfo.propTypes = {
    loading: PropTypes.bool.isRequired,
    setShowFriendInfo: PropTypes.func.isRequired,
    f: PropTypes.shape(
        // bio: PropTypes.string.isRequired,
        // profile_picture: PropTypes.string.isRequired,
        // cover_picture: PropTypes.string.isRequired,
        // bio: PropTypes.string.isRequired,
    )
}

export default FriendInfo



import '../../assets/CSS/chatbox.css'
import PropTypes from 'prop-types'
import UserCard from '../../components/userCard'
import SkeletonLoading from '../../components/FriendLoad'
import GetMessages from '../../api/GetMessages'
import { useState } from 'react'

export const Leftbox = ({ setCurrentChatView,
    setCurrentView, 
    typingIndicator,
    friendsStatus
    // userStatus
 }) => {
    
    const [searchFriends, setSearchFriends] = useState("")


    const { data, isLoading, error} = GetMessages()

  
    const refresh = () => {
        location.reload()
    }

  return (

    <div className="leftChatbox">
        <div className="leftchatboxwrap">
            <div className="leftchatheader">
                <div className="lefthead">     
                    <h3>Chattify</h3>

                    <div className="f_frr">
                        <button onClick={() => setCurrentView("find_friends")}>
                            <i className='bi bi-person-plus'></i>
                        </button>
                    </div>
                </div>

                <div className="leftsearchlist">
                    <div className="searchlistfriends">
                        <input 
                        type='text' 
                        value={searchFriends} 
                        id="search" 
                        autoComplete="off"
                        name="search" 
                        onChange={(e) => setSearchFriends(e.target.value)}
                        placeholder="Search for friends" 
                        />
                        <i className='bi bi-search'></i>
                    </div>
                </div>
            </div>

            <div className="listfriends">
                <div className="lists">
                    {error ? 
                        (
                            <div className='errorFri'>
                                <span>Something went wrong</span>
                                <div className='err_re_bu'>
                                    <button onClick={refresh}>
                                        <span>Refresh</span>
                                        <span>
                                            <i className='bi bi-arrow-repeat'></i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ) 
                        : (
                        (isLoading ? (
                            <div className='loading...'>
                                <SkeletonLoading />
                                <SkeletonLoading />
                                <SkeletonLoading />
                            </div>
                        ) : (
                        <div className="listswrap">
                            {data.length > 0 ? (
                                data.map(friends => {
                                    const username = friends.friend.username.toLowerCase()
                                    const search = searchFriends.toLowerCase();

                                    const isMatch = !search || username.includes(search);
                                
                                    return (
                                        <UserCard
                                            searchFriends={searchFriends}
                                            setCurrentChatView={setCurrentChatView}
                                            key={friends.friend.id}
                                            friends={friends}
                                            highlight={isMatch}
                                            typingIndicator={typingIndicator}
                                            friendsStatus={friendsStatus}
                                            onlineStatus={friendsStatus[friends.friend.username] || "Offline"} // NEW: Pass specific user status
                                        />
                                    );
                                
                                }
                                )
                            ) : (
                                <div className='n_fie'>
                                    <div className="no_friends">
                                        <div className="brow_friends">
                                            <span>Hey! there,</span> <br />
                                            <span>No friends yet ? <br /> Browse throught some of your colleque to send them a request</span>
                                        </div>

                                        <div className="friends_searcch_but">
                                            <button onClick={() => setCurrentView("find_friends")}>
                                                <i className='bi bi-magic'></i>
                                                <span>Browse here</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        ))
                    )}
                    
                    
                </div>
            </div>
        </div>
    </div>
  )
}

Leftbox.propTypes = {
    setCurrentChatView: PropTypes.func.isRequired,
    setCurrentView: PropTypes.func.isRequired,
    typingIndicator: PropTypes.object,
    userStatus: PropTypes.object,
    friendsStatus: PropTypes.object,
}

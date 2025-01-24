
import '../../assets/CSS/chatbox.css'
import PropTypes from 'prop-types'
import UserCard from '../../components/userCard'
import FriendLoad from '../../components/FriendLoad'
import { useContext, useState } from 'react'
import { AuthContext } from '../../utils/contexts/AuthContextProvider'

export const Leftbox = ({ setCurrentChatView, incomingMessage, setCurrentView, typingIndicator }) => {

    const {friends, isLoadingFriends, errorFriend} = useContext(AuthContext)
    const [searchFriends, setSearchFriends] = useState("")

    const refresh = () => {
        location.reload()
    }

  return (  

    <div className="leftChatbox">
        <div className="leftchatboxwrap">
            <div className="leftchatheader">
                <div className="lefthead">     
                    <h3>Chattify</h3>
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
                    {errorFriend ? 
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
                        (isLoadingFriends ? (
                            <FriendLoad />
                        ) : (
                        <div className="listswrap">
                            {friends.length > 0 ? (
                                friends.map(friend => {
                                    const username = friend.from_user.username.toLowerCase()
                                    const search = searchFriends.toLowerCase();

                                    const isMatch = !search || username.includes(search); 
                                
                                    return (
                                        <UserCard
                                            incomingMessage={incomingMessage}
                                            searchFriends={searchFriends}
                                            friend={friend}
                                            setCurrentChatView={setCurrentChatView}
                                            key={friend.id}
                                            highlight={isMatch}
                                            typingIndicator={typingIndicator}
                                        />
                                    );
                                
                                }
                                )
                                
                            // <div>HI</div>
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
    incomingMessage: PropTypes.object,
    setCurrentView: PropTypes.func.isRequired,
    typingIndicator: PropTypes.string
}
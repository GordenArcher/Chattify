
import '../../assets/CSS/chatbox.css'
import PropTypes from 'prop-types'
import { FetchUsers } from '../../utils/hooks/FetchUsers'
import UserCard from '../../components/userCard'
import FriendLoad from '../../components/FriendLoad'

export const Leftbox = ({ setCurrentChatView }) => {

    const {usersData, loading, error} = FetchUsers()

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
                        <input type='text' id="search" name="search" placeholder="Search" />
                        <i className='bi bi-search'></i>
                    </div>
                </div>
            </div>

            <div className="listfriends">
                <div className="lists">
                    {error ? 
                        (
                            <div className='errorFri'>
                                <h2>Error</h2>
                                <p>Please click the button to  refresh</p>

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
                        (loading ? (
                            <FriendLoad />
                        ) : (
                        <div className="listswrap">
                            {usersData.length > 0 ? (
                                (usersData.map((friend) => {
                                    return (
                                        <UserCard friends={friend} setCurrentChatView={setCurrentChatView} key={friend.id} />
                                    );
                                }))
                            ) : (
                                <div>
                                    No Friends 
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
    setCurrentChatView: PropTypes.func.isRequired
}
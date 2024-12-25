import { useContext, useEffect, useRef, useState } from 'react';
import '../../assets/css/mainview.css';
import '../../assets/CSS/ch.css'
import EmojiPicker from 'emoji-picker-react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../utils/contexts/AuthContextProvider';
import FriendInfo from '../../components/FriendInfo';
import { U } from '../../utils/hooks/FetchUsers';

export const MainViewChat = ({ currentChatView, setCurrentChatView, setIncomingMessage }) => {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const [messages, setMessages] = useState([])
  const [showPicker, setShowPicker] = useState(false);
  const [showFriendInfo, setShowFriendInfo] = useState(false);
  const websocket = useRef(null)
  const { token } = useContext(AuthContext)
  const [showOptions, setShowOptions] = useState(false)
  const {data, loading} = U(currentChatView)
  const [friendProfile, setFriendProfile] = useState({})
  const [chatMessages, setChatMessages] = useState([])
  // console.log(chatMessages)

  useEffect(() => {

    setFriendProfile(data.profile)
    setChatMessages(data.messages)

  }, [data.profile, data.messages])

  useEffect(() => {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
}, []);

const showNotification = (sender, message) => {
  if (Notification.permission === "granted") {
      new Notification(`New message from ${sender}`, {
          body: message,
          // icon: "/static/images/notification_icon.png",÷\
      });
  } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
          if (permission === "granted") {
              new Notification(`New message from ${sender}`, {
                  body: message,
                  // icon: "/static/images/notification_icon.png",
              });
          }
      });
  }
}


    const CHAT_BASE_URL = "localhost:8000"

    websocket.current = new WebSocket(`ws://${CHAT_BASE_URL}/ws/chat/${currentChatView}/?token=${token}`)

    websocket.current.onopen = () => {
      console.log("websockets opened")
    }

    websocket.current.onerror = (Error) => {
      console.log("error", Error)
    }

    websocket.current.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);

          setMessages((prevMessages) => [...prevMessages, data]);
          setIncomingMessage(data)

          if(document.hasFocus()){
            showNotification(data.sender, data.message);
          }

          if(Notification.permission === 'granted'){
          const notification = new Notification(data.username, 
            {
              body: data.message,
            }
          )

          notification.onclick = () => {
            window.focus()
            open(data.username)
          }
        }
        
          console.log("incoming message", data);
        
      } catch (error) {
        console.error("Error parsing message data", error);
      }
    }

    websocket.current.onclose = () => {
      console.log("Websocket closed")
    }
    

    const sendMessages = () => {
      websocket.current.send(JSON.stringify({ message: message}))
      setMessage("")
    }

  const togglePicker = () => {
    setShowPicker((prev) => !prev);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  // useEffect(() => {
  //   const checkInternetConnection = async () => {
  //     try {
  //       const response = await fetch("https://www.google.com", { mode: "no-cors" });
  //       console.log(response)
  //       if (response.ok || response.type === "opaque") {
  //         setStatus("Online");
  //       }
  //     } catch {
  //       setStatus("Offline");
  //     }
  //   };
    

  //   document.addEventListener("click", checkInternetConnection);

  //   return () => {
  //     document.removeEventListener("click", checkInternetConnection);
  //   };
  // }, []);



  useEffect(() => {

    const chectOnlineStatus = () => {
      if(navigator.onLine){
        setStatus("Online")
        console.log("Online...")
      }else{
        console.log("Offline")
        setStatus("Offline")
      }
    } 

    window.addEventListener("online", chectOnlineStatus)
    window.addEventListener("offline", chectOnlineStatus);

    return () => {
      window.removeEventListener("online", chectOnlineStatus)
      window.addEventListener("offline", chectOnlineStatus);
    }
  }, [])
  

  return (
    <div className="userchat">
      <div className="userchatcontainer">
        <div className="chatcontent">
          <div className="chathead">
            <div className="chat_banner">
              <div className="h_banner">
                <div className="friend_banner_details">
                  <div className="banner_user_details">
                  <div className="h_banner_u" onClick={() => setShowFriendInfo(true)}>
                    <div className="banner_image_profile">
                      <div className='no_profile'>
                        {currentChatView.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="h_user_details">
                      <div className="banner_username">
                          <div className="b_u_name">
                            <h4>{currentChatView}</h4>
                          </div>

                          <div className="online_status">
                            <div className="state">
                              <span>{status}</span>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className="banner_del">
                    <div className="search_chat">
                      <div className="chat_s ud">
                        <button>
                          <span>
                            <i className='bi bi-search'></i>
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="chat_user_actions">
                      <div className="actions ud">
                        <button onClick={(e) => {
                          setShowOptions((currentOption) => !currentOption)
                          e.stopPropagation()}}>
                            <span>
                              <i className='bi bi-three-dots-vertical'></i>
                            </span>
                          </button>
                      </div>

                      {showOptions && 
                        <div className="banner_actions_children">
                          <div className="actions_children">
                            <ul>
                              <li onClick={() => setShowFriendInfo((currentState) => !currentState)}>
                                <div className='children_item'>
                                  <div className="view_friend_info bf">
                                    <p>Friend Info</p>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <div className='children_item'>
                                  <div className="del_friend_chat bf">
                                    <p>Delete Chat</p>
                                  </div>
                                </div>
                              </li>
                              <li onClick={() => setCurrentChatView("")}>
                                <div className='children_item'>
                                  <div className="close_chat bf">
                                    <p>Close Chat</p>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mainchatview">
            <div className="chatview">
              <div className="incoming">
                <div className="cm">
                    {messages.map((msg, index) => {
                      return (
                        <div key={index}>{msg.message}</div>
                      )
                    })}
                
                </div>
              </div>
            </div>
            <div className="chatinput">
              <div className="messagecontent">
                <div className="emoji">
                  <button 
                  type="button" 
                  onClick={(e) => {
                    e.stopPropagation(); 
                    togglePicker();
                  }}>
                    <i className="bi bi-emoji-smile"></i>
                  </button>
                </div>
                <div className="attachFile">
                <input type="file" name='media' id="file" hidden />
                  <label htmlFor="file">
                    <i className="bi bi-images"></i>
                   
                  </label>
                </div>

                <div className="messagebox">
                  <div className="sendmessage">
                    <input
                      type="text"
                      name="message"
                      id="message"
                      value={message}
                      placeholder="Send a Message"
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                    />
                  </div>

                    <div className="send">
                      <button ref={websocket} type="submit" onClick={sendMessages}>
                        <i className="bi bi-send"></i>
                      </button>
                    </div>
                </div>
              </div>
            </div>

            {showPicker && (
              <div style={{ position: "absolute", bottom: "100px", left: "450px" }} onClick={(e) => e.stopPropagation()}>
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              </div>
            )}
          </div>
        </div>
      </div>
      {
        showFriendInfo &&
       <div className='side'>
          <FriendInfo f={friendProfile} setShowFriendInfo={setShowFriendInfo} loading={loading} />
       </div>
      }
      
    </div>
  );
};

MainViewChat.propTypes = {
  currentChatView: PropTypes.string.isRequired,  
  setCurrentChatView : PropTypes.func.isRequired,
  setIncomingMessage: PropTypes.func
}
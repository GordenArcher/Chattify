import { useContext, useEffect, useRef, useState } from 'react';
import '../../assets/css/mainview.css';
import '../../assets/CSS/ch.css'
import EmojiPicker from 'emoji-picker-react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../utils/contexts/AuthContextProvider';
import FriendInfo from '../../components/FriendInfo';
import { U } from '../../utils/hooks/FetchUsers';
import AppIcon from '../../assets/images/G-KANAD.jpg';
import { toast } from 'react-toastify';

export const MainViewChat = ({ currentChatView, setCurrentChatView, setIncomingMessage }) => {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const [mediaPreview, setMediaPreview] = useState(null)
  const [mediaMessage, setMediaMessage] = useState("")
  const [showPicker, setShowPicker] = useState(false);
  const [showFriendInfo, setShowFriendInfo] = useState(false);
  const websocket = useRef(null)
  const { token, setMessages, messages } = useContext(AuthContext)
  const [showOptions, setShowOptions] = useState(false)
  const {data, loading} = U(currentChatView)
  const [friendProfile, setFriendProfile] = useState({})
  const [chatMessages, setChatMessages] = useState([])
  const [searchChat, setSearchChat] = useState(false)
  const [searchChatInput, setSearchChatInput] = useState("")

  useEffect(() => {
    setFriendProfile(data.profile)
    setChatMessages(data.messages)
    setStatus("Online")
  }, [data.profile, data.messages])

  useEffect(() => {
    if(Notification.permission !== "granted") {
        Notification.requestPermission();
    }
  }, []);



    const CHAT_BASE_URL = "localhost:8000"

    websocket.current = new WebSocket(`ws://${CHAT_BASE_URL}/ws/chat/${currentChatView}/?token=${token}`)

    websocket.current.onopen = () => {
      console.log("websockets opened")
    }

    websocket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    
      setTimeout(() => {
        console.log("Attempting to reconnect...");
        if (websocket.current.readyState !== WebSocket.CLOSED) {
          websocket.current.close();
        }
    
        websocket.current = new WebSocket(`ws://${CHAT_BASE_URL}/ws/chat/${currentChatView}/?token=${token}`);
        
        websocket.current.onopen = () => {
          console.log("WebSocket connection reopened.");
        };
    
        websocket.current.onmessage = (message) => {
          console.log("Message received:", message);
          // Add your message-handling logic here
        };
    
        websocket.current.onerror = (err) => {
          console.error("WebSocket error after reconnect:", err);
        };
    
      }, 2000);
    };
    

    websocket.current.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);

        if(data.type === 'chat_message'){
          setMessages((prevMessages) => {
            const isDuplicate = prevMessages.some(
              (message) => message.message_id === data.message_id
            );
            return isDuplicate ? prevMessages : [...prevMessages, data];
          });



          setIncomingMessage(data)
          showNotification("Gorden", "Hiii");
          // if(document.hasFocus()){
            
          // }
            console.log("incoming message", data);
        }
        else{
          toast.error(data)
        }

        
      } catch (error) {
        console.error("Error parsing message data", error);
      }
    }

    const showNotification = (sender, message) => {
      if (Notification.permission === "granted") {
          new Notification(`New message from ${sender}`, {
              body: message,
              icon: AppIcon,
          });
      } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(permission => {
              if (permission === "granted") {
                  new Notification(`New message from ${sender}`, {
                      body: message,
                      icon: AppIcon,
                  });
              }
          });
      }
    }

    websocket.current.onclose = () => {
      console.log("Websocket closed")
    }

    const handleMediaChange = (e) => {
        const file = e.target.files[0]; 
        if (file) {
          setMediaMessage(file);
          
          const reader = new FileReader();
          reader.onloadend = () => {
            setMediaPreview(reader.result);  
          };
          reader.readAsDataURL(file); 
        }
      };

    const sendMessages = (e) => {
      e.preventDefault()
  
      if(mediaMessage) {
        const reader = new FileReader();

        reader.onload = () => {
          const base64 = reader.result; 
          websocket.current.send(
            JSON.stringify({ "media": base64 }) 
          );
          setMediaMessage(null)
          setMediaPreview(null)
        };
      
        reader.readAsDataURL(mediaMessage);
      } else {

        if(!message.trim()) return toast.error("No message sent")

        websocket.current.send(JSON.stringify({ message }))

        setMessage("")
      }

    }

  const togglePicker = () => {
    setShowPicker((prev) => !prev);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  useEffect(() => {

    const closeEmogi = () => {
      setShowPicker(false)
      setShowOptions(false)
    } 

    document.addEventListener("click", closeEmogi)

    return () => {
      document.removeEventListener("click", closeEmogi)
    }
  }, [])
  

  return (
    <div className="userchat">
      <div className="userchatcontainer">
        <div className="chatcontent">
          <div className="chathead">
            <div className="chat_banner">
              {searchChat ? (
                <div className="serach_chat">
                  <div className="search__c">
                    <div className="searc_friend_chat">
                      <div className="serach_in">
                        <input 
                        type="text"
                        id='chat-search'
                        value={searchChatInput}
                        onChange={(e) => setSearchChatInput(e.target.value)}
                        placeholder='Search for a specific text'
                        />

                      </div>
                    </div>

                    <div className="close_search">
                      <div className="cl_sea">
                        <button onClick={() => setSearchChat(false)}>
                          <i className='bi bi-x-circle'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h_banner">
                <div className="friend_banner_details">
                  <div className="banner_user_details">
                  <div className="h_banner_u" onClick={() => setShowFriendInfo(true)}>
                    <div className="banner_image_profile">
                      {friendProfile ? (
                          (friendProfile.profile?.profile_picture ? (
                              <div className='friendProfile fp'>
                                <img src={`http://localhost:8000${friendProfile.profile?.profile_picture}`} alt={`${friendProfile.username}'s profile`}/>
                              </div>
                            ) : (
                              
                              <div className='no_profile'>
                                {currentChatView[0].toUpperCase()}
                              </div>
                            ))
                      ) : (
                        <div className='no_profile'>
                          {currentChatView[0].toUpperCase()}
                        </div>
                      )}
                    
                      
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
                        <button onClick={() => setSearchChat(true)}>
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
              )}
              
            </div>
          </div>
          <div className="mainchatview">
            <div className="chatview">
              <div className="incoming">
                <div className="cm">
                    {messages.map((msg) => {
                      const time = new Date(msg.timestamp)
                      const timestamp = `${time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`;
                      return (
                        <div key={msg.id} className='inbox'>
                          {msg.loggedInUser === msg.sender ? (
                            <div className='sender msg'>
                              <div className="box">
                                <div className="msg_wrap">
                                  <div className="msg_div">
                                    <span>{msg.message}</span>
                                  </div>
                                </div>

                                <div className="msg_t">
                                  <div className="msg_tst">
                                    <p>{timestamp}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className='reciever msg'>
                              <div className="box">
                                <div className="msg_wrap">
                                  <div className="msg_div">
                                    <span>{msg.message}</span>
                                  </div>
                                </div>

                                <div className="msg_t">
                                  <div className="msg_tst">
                                    <p>{timestamp}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>

          <div className="chatinput">

              {mediaPreview && <div className="preview_media_image">
                <div className="preview">
                  <img src={mediaPreview} alt="message media" />
                </div>
              </div>}
              
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
                <input 
                type="file" 
                name='media'
                id="file" 
                onChange={handleMediaChange}
                hidden />

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
      {
        showFriendInfo &&
       <div className='side'>
          <FriendInfo chatMessages={chatMessages} f={friendProfile} setShowFriendInfo={setShowFriendInfo} loading={loading} />
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
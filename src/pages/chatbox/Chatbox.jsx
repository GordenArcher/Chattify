import {useEffect, useRef, useState, useCallback, useContext, } from "react"
import { Leftbox } from "./Leftbox"
import { MainViewChat } from "./MainViewChat"
import '../../assets/CSS/chatbox.css'
import { LeftTab } from "../../components/LeftTab"
// import { Settings } from "../Settings"
import FindFrinds from "./FindFrinds"
import Profile from "./Profile"
import Selected from "../../components/!Selected"
import Notification from "./Notifications"
import AppIcon from '../../assets/images/G-KANAD.jpg';
import { AuthContext } from "../../utils/contexts/AuthContextProvider"
import { toast } from "react-toastify"
import { GetUserProfile } from "../../utils/hooks/GetProfile"
import { Load } from "../../components/Load"
import Tabs from "../../components/Tabs"
import LogOut from "../../api/LogOut"
import { MessagesContext } from "../../utils/contexts/MessagesProvider"
import AI from "./AI"

export const Chatbox = () => {
  const [showLogOut, setShowLogOut] = useState(false)
  const [currentView, setCurrentView] = useState("chat");
  const [currentChatView, setCurrentChatView] = useState("");
  const [typingIndicator, setTypingIndicator] = useState({})
  const [mediaPreview, setMediaPreview] = useState(null)
  const [mediaMessage, setMediaMessage] = useState(null)
  const [message, setMessage] = useState("")
  const websocketRef = useRef(null);
  const [u, setU] = useState()
  const [friendsStatus, setFriendsStatus] = useState({})
  const [isMobileView, setIsMobileView] = useState(false);
  const [userStatus, setUserStatus] = useState({
    user: "",
    Ostatus:""
  });

  const { logoutUser, isLoggingOut } = LogOut()

  const { usersDataDet } = GetUserProfile()
  const { setLastMessage } = useContext(MessagesContext)

    useEffect(() => {
      if(usersDataDet){
          setU(usersDataDet)
      }
    }, [usersDataDet])


    useEffect(() => {
        if(Notification.permission === "granted") {
            Notification.requestPermission();
        }
    }, []);
    

    const CHAT_BASE_URL = import.meta.env.VITE_WEBSOCKET_URL
    const { setMessages } = useContext(AuthContext);
  
    const showNotification = useCallback((sender, message) => {
      if (Notification.permission === "granted") {
        new Notification(`New message from ${sender}`, {
          body: message,
          icon: AppIcon,
        });
      } else if (Notification.permission === "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(`New message from ${sender}`, {
              body: message,
              icon: AppIcon,
            });
          }
        });
      }
    }, []);

  const handleWebSocketMessage = useCallback(
    (e) => {
      try {
        const data = JSON.parse(e.data);

        console.log("📨 Received WebSocket message:", data);

        if (data.type === "typing") {
          console.log("⌨️ Typing event:", data);
          
          setTypingIndicator(prev => ({
            ...prev,
            [data.loggedInUser]: true,
          }));
          
          if (websocketRef.current.typingTimeouts?.[data.loggedInUser]) {
            clearTimeout(websocketRef.current.typingTimeouts[data.loggedInUser]);
          }

          if (!websocketRef.current.typingTimeouts) {
            websocketRef.current.typingTimeouts = {};
          }

          websocketRef.current.typingTimeouts[data.loggedInUser] = setTimeout(() => {
            setTypingIndicator(prev => {
              const updated = { ...prev };
              delete updated[data.loggedInUser];
              return updated;
            });
          }, 2000);
        }

        if (data.type === 'user_status') {
          const { username, status } = data;
          console.log("👤 User status:", data);
          setUserStatus((prevDel) => ({ ...prevDel, user: username, Ostatus: status }));
        }

        if (data.type === 'friends_status') {
          console.log("👥 Friends status:", data.friends_statuses);
          setFriendsStatus(data.friends_statuses);
          // Update your friends list with online statuses
        }

        if (data.type === "chat_message") {
          console.log("💬 Chat message:", data);
          setMessages((prevMessages) => {
            const isDuplicate = prevMessages.some(
              (message) => message.message_id === data.message_id
            );

            return isDuplicate ? prevMessages : [...prevMessages, data];
          });

          showNotification(data.user, data.message);
          // toast(`New message from ${data.user}`);
          setLastMessage(data);
        }

        if (data.error) {
          console.error("❌ Error from server:", data.error);
          toast.error(data.error);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    },
    [setMessages, showNotification, setLastMessage]
  );
  
  useEffect(() => {

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    
    const wsUrl = `${protocol}://${CHAT_BASE_URL}/ws/chat/`;

    console.log("Connecting to:", wsUrl);

    const ws = new WebSocket(wsUrl);

    websocketRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onmessage = handleWebSocketMessage;

    ws.onclose = (event) => {
      console.log("WebSocket connection closed");
      console.log("Close code:", event.code);
      console.log("Close reason:", event.reason);
      
      // Handle specific close codes
      if (event.code === 4001) {
        console.error("Authentication failed. Please log in again.");
        // Redirect to login or show error
      } else if (event.code === 4002) {
        console.error("Invalid chat recipient.");
      }
    };

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [currentChatView, handleWebSocketMessage, CHAT_BASE_URL]);

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (websocketRef && websocketRef.current.readyState === WebSocket.OPEN) {
          
          websocketRef.current.send(JSON.stringify({ type: 'heartbeat', online: true }));
        }
      }, 60000);
  
      return () => {
        clearInterval(intervalId);
      };

    },[])

    const sendMessages = (e) => {
        e.preventDefault()
    
        if(mediaMessage) {
          const reader = new FileReader();
  
          reader.onload = () => {
            const base64 = reader.result; 
            websocketRef.current.send(
              JSON.stringify({ 
                type: "message",
                "media": base64,
                recipient: currentChatView,
               })
            );
            setMediaMessage(null)
            setMediaPreview(null)
          };
        
          reader.readAsDataURL(mediaMessage);
        } else {
  
          if(!message.trim()) return toast.error("No message sent")
  
          websocketRef.current.send(JSON.stringify({
            type: "message", 
            message ,
            recipient: currentChatView,
          }))
          
          setMessage("")
        }
    }    

    const messageChange = (e) => {
        const newMessage = e.target.value; 
        setMessage(newMessage); 
      
        if (websocketRef.current && websocketRef.current.readyState === websocketRef.current.OPEN) {
          if (newMessage.length > 0) {
            websocketRef.current.send(
              JSON.stringify({
                type: "typing",
                typing: true,
                recipient: currentChatView,
              })
            )
          }
        } else {
          console.error("websocketRef is not open.");
        }
      }

      useEffect(() => {
        const checkMobileView = () => {
          if (window.innerWidth <= 800) {
            setIsMobileView(true);
          } else {
            setIsMobileView(false);
          }
        };
    
        checkMobileView();
        window.addEventListener("resize", checkMobileView);
    
        return () => window.removeEventListener("resize", checkMobileView);
      }, []);

      const one = {
        display:currentChatView === "" ? "block" : "none",
        opacity:currentChatView === "" ? 1 : 0, 
        pointerEvents:currentChatView === "" ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }

      const two = {
        display: currentChatView !== "" ? "block" : "none",
        opacity: currentChatView !== "" ? 1 : 0, 
        pointerEvents: currentChatView !== "" ? "auto" : "none", 
        transition: "opacity 0.3s ease",
      }
    

  return (
    <div className="chatbox">
        <div className="boxcontainer">
            <div className="chatwrapper">
                <div className="tabi">
                    <LeftTab setCurrentView={setCurrentView} setShowLogOut={setShowLogOut} setCurrentChatView={setCurrentChatView} />
                </div>

                <div className="leftbox"style={ isMobileView ? one : {}} >
                    <div className="content">
                        {currentView === "chat" && 
                        <Leftbox 
                          userStatus={userStatus}
                          typingIndicator={typingIndicator} 
                          setCurrentView={setCurrentView} 
                          setCurrentChatView={setCurrentChatView} 
                          friendsStatus={friendsStatus}
                        />}
                        {/* {currentView === "settings" && <Settings />} */}
                        {currentView === "find_friends" && <FindFrinds />} 
                        {currentView === "profile" && <Profile />}
                        {currentView === "notification" && <Notification />}
                        {currentView === "ai" && <AI />}
                    </div>
                </div>
                
                <div className="viewchat" style={ isMobileView ? two : {} }>
                    {
                        currentChatView === "" ?
                        (<Selected />)
                        :
                        (
                            <MainViewChat 
                                currentChatView={currentChatView}
                                setCurrentChatView={setCurrentChatView}
                                typingIndicator={typingIndicator}
                                websocketRef={websocketRef}
                                sendMessages={sendMessages}
                                mediaPreview={mediaPreview}
                                setMediaMessage={setMediaMessage}
                                setMediaPreview={setMediaPreview}
                                messageChange={messageChange}
                                message={message}
                                setMessage={setMessage}
                                userStatus={userStatus}
                            />
                            
                        )
                      
                    }

                    {currentChatView === "ai" && <div>AI</div>}
                    
                </div>
            </div>
        </div>

        {currentChatView === "" && (
          <Tabs currentView={currentView} setCurrentView={setCurrentView} setShowLogOut={setShowLogOut} />
        )}

        {showLogOut && (
          <div className="show_logout">
            <div className="modalogO">
              <div className="log_off_pop">
                <div className="modal_txt">
                  <span>Are you sure you want to <br /> log-out ? </span>
                </div>

                <div className="logout_options">
                  <div className="cancel_no logO">
                    <button onClick={() => setShowLogOut(false)} >No</button>
                  </div>

                  <div className="yex logO">
                    <button onClick={logoutUser}>{isLoggingOut ? <Load /> : 'Yes! Logout'}</button>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
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
import { useNavigate } from "react-router-dom"
import { Load } from "../../components/Load"
import Tabs from "../../components/Tabs"


export const Chatbox = () => {
  const [showLogOut, setShowLogOut] = useState(false)
    const [currentView, setCurrentView] = useState("chat");
    const [currentChatView, setCurrentChatView] = useState("");
    const [typingIndicator, setTypingIndicator] = useState({})
    const [mediaPreview, setMediaPreview] = useState(null)
    const [mediaMessage, setMediaMessage] = useState("")
    const [message, setMessage] = useState("")
    const websocketRef = useRef(null);
    const [u, setU] = useState()
    const [isMobileView, setIsMobileView] = useState(false);
    const [userStatus, setUserStatus] = useState({
      user: "",
      Ostatus:""
    });

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const { usersDataDet } = GetUserProfile()

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
    

    const CHAT_BASE_URL = "localhost:8000";
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
    
          
          if (data.type === "typing" && data.loggedInUser) {
            console.log("Typing event:", data);
            
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
            setUserStatus((prevDel) => ({...prevDel, user:username, Ostatus: status}))
        }

          if (data.type === "chat_message") {
            console.log(data)
            setMessages((prevMessages) => {
              const isDuplicate = prevMessages.some(
                (message) => message.message_id === data.message_id
              );
    
              return isDuplicate ? prevMessages : [...prevMessages, data];
            });
    
            showNotification(data.user, data.message);
            toast(data.user);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      },
      [setMessages, showNotification]
    );

    function getCookie(name) {
      const cookies = document.cookie.split('; ');
      for (let cookie of cookies) {
          const [key, value] = cookie.split('=');
          if (key === name) return value;
      }
      return null;
  }
  
    useEffect(() => {
      const token = getCookie("access_token");
      console.log(token)
      console.log(document.cookie);
      // const inbox = "http://localhost:5173"

      const ws = new WebSocket(
        `ws://${CHAT_BASE_URL}/ws/chat/${currentChatView}`, null, {credentials: 'same-origin'});
  

      websocketRef.current = ws;
  
      ws.onopen = () => {
        console.log("WebSocket connection opened");
      };
  
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
  
      ws.onmessage = handleWebSocketMessage;
  
      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };
  
      return () => {
        if (ws) {
          ws.close();
        }
      };
    }, [currentChatView, handleWebSocketMessage, websocketRef, u]);
  

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
                "media": base64
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
            message 
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
              })
            )
          }
        } else {
          console.error("websocketRef is not open.");
        }
      }

      const logoutUser = async () => {
        setIsLoading(true)
    
        try {
          const response = await fetch("http://localhost:8000/api/auth/logout/", {method:"POST", headers: {
            "Content-Type": "application/json",
          }, credentials:"include"}
        )
      
          if(response.ok){
            const data = await response.json()
            localStorage.removeItem("token")
            setShowLogOut(false)
            toast.success(data.message)
            
            setTimeout(() => {
              navigate('/auth/login')
            },3000)
            
            
          }else{
            const errordata = await response.json()
            console.log(errordata)
          }
        } catch (error) {
          console.log(error)
        }finally{
          setIsLoading(false)
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
                    <LeftTab setCurrentView={setCurrentView} setShowLogOut={setShowLogOut}/>
                </div>

                <div className="leftbox"style={ isMobileView ? one : {}} >
                    <div className="content">
                        {currentView === "chat" && 
                        <Leftbox 
                        userStatus={userStatus}
                        typingIndicator={typingIndicator} 
                        setCurrentView={setCurrentView} 
                        setCurrentChatView={setCurrentChatView} 
                        />}
                        {/* {currentView === "settings" && <Settings />} */}
                        {currentView === "find_friends" && <FindFrinds />} 
                        {currentView === "profile" && <Profile />}
                        {currentView === "notification" && <Notification />}
                    </div>
                </div>

                <div className="viewchat" style={ isMobileView ? two : {} }>
                    {
                        currentChatView === "" ?
                        (<Selected />)
                        :
                        (
                            <MainViewChat 
                                setCurrentChatView={setCurrentChatView} 
                                currentChatView={currentChatView}
                                typingIndicator={typingIndicator}
                                setTypingIndicator={setTypingIndicator}
                                websocketRef={websocketRef}
                                sendMessages={sendMessages}
                                mediaPreview={mediaPreview}
                                setMediaPreview={setMediaPreview}
                                messageChange={messageChange}
                                message={message}
                                setMessage={setMessage}
                                userStatus={userStatus}
                            />
                            
                        )
                      
                    }
                    
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
                    <button onClick={logoutUser}>{isLoading ? <Load /> : 'Yes! Logout'}</button>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
import {useEffect, useRef, useState, useCallback, useContext } from "react"
import { Leftbox } from "./Leftbox"
import { MainViewChat } from "./MainViewChat"
import '../../assets/CSS/chatbox.css'
import { LeftTab } from "../../components/LeftTab"
import { Settings } from "../Settings"
import FindFrinds from "./FindFrinds"
import Profile from "./Profile"
import Selected from "../../components/!Selected"
import Notification from "./Notifications"
import AppIcon from '../../assets/images/G-KANAD.jpg';
import { AuthContext } from "../../utils/contexts/AuthContextProvider"
import { toast } from "react-toastify"
import { GetUserProfile } from "../../utils/hooks/GetProfile"


export const Chatbox = () => {
    const [currentView, setCurrentView] = useState("chat");
    const [currentChatView, setCurrentChatView] = useState("");
    const [typingIndicator, setTypingIndicator] = useState(null)
    const [mediaPreview, setMediaPreview] = useState(null)
    const [mediaMessage, setMediaMessage] = useState("")
    const [message, setMessage] = useState("")
    const websocketRef = useRef(null);
    const [u, setU] = useState()

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
    const { token, setMessages } = useContext(AuthContext);
  
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

  
    const typing = useCallback((data) => {
      setTypingIndicator(data);
  
      if (websocketRef.current.typingTimeout) {
        clearTimeout(websocketRef.current.typingTimeout);
      }
  
      websocketRef.current.typingTimeout = setTimeout(() => {
        setTypingIndicator("");
      }, 2000);
    }, [setTypingIndicator, websocketRef]);
  

    const handleWebSocketMessage = useCallback(
      (e) => {
        try {
          const data = JSON.parse(e.data);
          // console.log(data)
  
          if (data.type === "typing") {
            typing(data.loggedInUser);
          }
  
          if (data.type === "chat_message") {
            setMessages((prevMessages) => {
              const isDuplicate = prevMessages.some(
                (message) => message.message_id === data.message_id
              );
              
              return isDuplicate ? prevMessages : [...prevMessages, data];
              
            })
            showNotification(data.sender, data.message);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      },
      [typing, setMessages, showNotification]
    );
  
    useEffect(() => {
        const inbox = currentChatView === "" ?  u : currentChatView

      const ws = new WebSocket(
        `ws://${CHAT_BASE_URL}/ws/chat/${inbox}/?token=${token}`
      );
  
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
    }, [currentChatView, token, handleWebSocketMessage, websocketRef, u]);
  

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
          } else {
            websocketRef.current.send(
              JSON.stringify({
                type: "typing",
                typing: false,
              })
            )
          }
        } else {
          console.error("websocketRef is not open.");
        }
      }

  return (
    <div className="chatbox">
        <div className="boxcontainer">
            <div className="chatwrapper">
                <div className="tabi">
                    <LeftTab setCurrentView={setCurrentView}/>
                </div>

                <div className="leftbox">
                    <div className="content">
                        {currentView === "chat" && 
                        <Leftbox 
                        typingIndicator={typingIndicator} 
                        setCurrentView={setCurrentView} 
                        setCurrentChatView={setCurrentChatView} 
                        />}
                        {currentView === "settings" && <Settings />}
                        {currentView === "find_friends" && <FindFrinds />} 
                        {currentView === "profile" && <Profile />}
                        {currentView === "notification" && <Notification />}
                    </div>
                </div>

                <div className="viewchat">
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
                            />
                        )
                      
                    }
                    
                </div>
            </div>
        </div>
    </div>
  )
}
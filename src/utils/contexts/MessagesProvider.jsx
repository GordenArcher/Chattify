import PropTypes from "prop-types"
import { createContext, useState } from "react"


export const MessagesContext = createContext()


const MessagesProvider = ({ children }) => {

    const [unreadMessages, setUnreadMessages] = useState("")
    const [messages, setMessages] = useState([])
    const [loadingMessages, setLoadingMessages] = useState(false)
    const [friendProfile, setFriendProfile] = useState({})

  return (
    <MessagesContext.Provider value={{
    unreadMessages, 
    setUnreadMessages, 
    messages, 
    setMessages, 
    loadingMessages, 
    setLoadingMessages,
    friendProfile,
    setFriendProfile
    }}>
        {children}
    </MessagesContext.Provider>
  )
}

export default MessagesProvider

MessagesProvider.propTypes = {
    children: PropTypes.node
}
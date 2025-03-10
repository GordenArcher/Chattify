import PropTypes from "prop-types"
import { createContext, useState } from "react"


export const MessagesContext = createContext()


const MessagesProvider = ({ children }) => {

    const [lastMessage, setLastMessage] = useState([])
    const [messages, setMessages] = useState([])
    const [loadingMessages, setLoadingMessages] = useState(false)

  return (
    <MessagesContext.Provider value={{lastMessage, setLastMessage, messages, setMessages, loadingMessages, setLoadingMessages}}>
        {children}
    </MessagesContext.Provider>
  )
}

export default MessagesProvider

MessagesProvider.propTypes = {
    children: PropTypes.node
}
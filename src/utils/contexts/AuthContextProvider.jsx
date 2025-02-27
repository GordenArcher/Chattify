import PropTypes from 'prop-types'
import { createContext, useState, useEffect, useCallback } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [received, setReceived] = useState([])
    const [receivedLoading, setReceivedLoading] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [usersData, setusersData] = useState([])
    const [error, setIsError] = useState("")
    const [notificationCount, setNotificationCount] = useState(0)
    const [isLoadingFriends, setIsLoadingFriends] = useState(false)
    const [errorFriend, setErrorFriend] = useState(false)
    const [friends, setFriends] = useState([])
    const [messages, setMessages] = useState([])

    const url = import.meta.env.VITE_API_URL
    
    const refreshToken = useCallback(
        async () => {
          try {
            const response = await fetch(`${url}api/auth/refresh/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log('Access token refreshed:', data);
              return true;
            } else {
              console.error('Failed to refresh token');
              return false;
            }
          } catch (error) {
            console.error('Error refreshing token:', error);
            return false;
          }
        },
        [url]
      );
      
      const call_refresh = useCallback(
        async (error, func) => {
          if (error.response && error.response.status === 401) {
            const refreshed = await refreshToken();
            if (refreshed) {
              return func();
            }
          }
          return null; 
        },
        [refreshToken]
      );
      
      useEffect(() => {
        const getAuthenticated = async () => {
          try {
            const response = await fetch(`${url}api/isAuthenticated/`, {
              method: 'GET',
              credentials: 'include',
            });
      
            if (response.ok) {
              const data = await response.json();
              setIsAuthenticated(data.auth);
            } else {
              const err = await response.json();
              console.log(err);
            }
          } catch (error) {
            await call_refresh(error, getAuthenticated);
          }
        };
      
        getAuthenticated();
      }, [url, call_refresh]);
      

    // const refreshToken = () => {
    //     const res = axios.post(`${url}ap`)
    // }


  return (
    <AuthContext.Provider value={{
        isAuthenticated, 
        setIsAuthenticated,
        received, 
        setReceived,
        setReceivedLoading,
        receivedLoading,
        loading,
        setIsLoading,
        usersData,
        setusersData,
        error,
        setIsError,
        notificationCount,
        setNotificationCount,
        setFriends,
        friends,
        setErrorFriend,
        errorFriend,
        setIsLoadingFriends,
        isLoadingFriends,
        messages,
        setMessages,
        }}>
        {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}
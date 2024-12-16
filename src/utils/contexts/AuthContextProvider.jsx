import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState("")
    const [username, setUsername] = useState("")

    useEffect(() => {
        const getuser = localStorage.getItem("token")
        const getusename = localStorage.getItem("u")

        if (getusename) setUsername(getusename.trim().toLowerCase());

        if(getuser){
            setToken(getuser)
        }
    }, [])

    const saveToken = (userToken) => {
        localStorage.setItem("token", userToken)
        setToken(userToken)
    }

    const saveUsername = (userN) => {
        localStorage.setItem("u", userN)
    }

    const logout = () => {
        localStorage.clear()
    }


  return (
    <AuthContext.Provider value={{saveToken, token, logout, saveUsername, username}}>
        {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}
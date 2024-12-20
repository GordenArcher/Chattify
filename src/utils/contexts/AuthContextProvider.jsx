import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [token, setToken] = useState("") 
    const navigate = useNavigate()

    useEffect(() => {
        const getuser = localStorage.getItem("token")

        if(getuser){
            setToken(getuser)
        }
    }, [])

    const saveToken = (userToken) => {
        localStorage.setItem("token", userToken)
        setToken(userToken)
    }

    const logout = () => {
        localStorage.clear()
        navigate("/")
    }

  return (
    <AuthContext.Provider value={{saveToken, token, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}
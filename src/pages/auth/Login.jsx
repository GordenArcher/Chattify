import './auth.css'
import LoginImg from '../../assets/images/login-D1gCEgnq.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import {toast} from 'react-toastify';
import { Loader } from '../../components/Loader'
import { AuthContext } from '../../utils/contexts/AuthContextProvider';
// import axios from 'axios'

export const Login = () => {
    
    const [viewPassword, setViewPassword] = useState(false)
    const [loader, setLoader] = useState(false)
    const { saveToken } = useContext(AuthContext)

    const navigate = useNavigate()

    const [LoginData, setLoginData] = useState({
        username : "",
        password : "",
    })

    const iconStyle = {
        position : 'absolute',
        right : '20px',
        top : '50px',
        fontSize : '1.4rem'
    }
    
    const leftimage = {
        width : '500px',
        marginTop : '-120px',
        marginLeft : '-100px'
    }

    const loginUser = async (e) => {

        e.preventDefault()

        const loginApiUrl = 'http://127.0.0.1:8000/api/auth/login/'

        if(!LoginData.username || !LoginData.password) return toast.error("Input Fields are enpty");
        
        try {
            setLoader(true)
            const response = await fetch(loginApiUrl, {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    username : LoginData.username,
                    password : LoginData.password,
                })
            })

            if(response.ok){
                const data = await response.json()
                if(data.status === 'success'){
                console.log(data)
                setLoader(false)
                toast.success(data.message);
                saveToken(data.token)
                setTimeout(() => {
                    navigate('/chat')
                }, 2000)    
                }
                
            }
            else{
                const errorData = await response.json()
                if (errorData) {
                    console.log(errorData)
                    toast.error(errorData.message)
                    setLoader(false)
                } else {
                    setLoader(false)
                    console.error('Error:', errorData);
                }
            }

        } catch (error) {
            console.log(error)
        }finally{
            setLoader(false)
        }

    }
    

  return (
    <div className="authlogin">
        <div className="loginContainer">
            <div className="loginWrap">
                <div className="loginLeft">
                    <div className="leftWrapper">
                        <div className="leftHeader">
                            <i className='bi bi-chat-fill' style={{fontSize : '2.3rem'}}></i>
                            <h1>Chattify</h1>
                        </div>

                        <div className="left-wel-mes">
                            <h3>Hey there 👋, Welcome Back. Login to chat with your friends & colleagues</h3>
                        </div>

                        <div className="leftimage">
                            <img src={LoginImg} alt="login image" style={leftimage} />
                        </div>
                    </div>
                </div>

                <div className="appLine"></div>

                <div className="loginRight">
                    <div className="loginrightform">
                        <form onSubmit={loginUser}>
                            <div className="loginform">
                                <div className="formhead">
                                    <div className="sm-head" style={{color:'#cccccc88'}}>
                                        <p>Start For Free</p>
                                    </div>

                                    <div className="bghead">
                                        <h2>Login to Chattify</h2>
                                    </div>
                                </div>

                                <div className="formi">
                                    <div className="actualform">
                                        <div className="finputs">
                                            <div className="inputs">
                                                <div className='email o'>
                                                    <label htmlFor="email">username</label>
                                                    <input 
                                                    type="text" 
                                                    name='username' 
                                                    value={LoginData.username} 
                                                    id='email' 
                                                    onChange={(e) => {
                                                        setLoginData((currentValue) => ({
                                                            ...currentValue, username : e.target.value
                                                        }))
                                                    }} 
                                                    />
                                                    <i className='bi bi-person' style={iconStyle}></i>
                                                </div>

                                                <div className='password o'>
                                                    <label htmlFor="password">Password</label>
                                                    <input 
                                                    type={viewPassword ? 'text' : 'password'} 
                                                    name='password' 
                                                    value={LoginData.password} 
                                                    id='password' 
                                                    autoComplete='false'
                                                    onChange={(e) => {
                                                        setLoginData((currentValue) => ({
                                                            ...currentValue, password : e.target.value
                                                        }))
                                                    }}
                                                    />
                                                    <i className='bi bi-lock' style={iconStyle}></i>
                                                </div>
                                            </div>

                                            <div className="slayer">
                                                <div className="viewpassword">
                                                    <div className="slide">
                                                        <input type="checkbox" name="viewPassword" id="view" hidden />
                                                        <label onClick={() => {
                                                            setViewPassword(!viewPassword)
                                                        }} htmlFor="view"></label>
                                                    </div>

                                                    <div className="s-text">
                                                        <p>Show Password</p>
                                                    </div>
                                                </div>

                                                <div className="fpassword">
                                                    <span>Forgotten Password ?</span>
                                                    <Link to='/reset-password'>Reset</Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sub">
                                            <div className="loginbutton">
                                                <button>
                                                {loader ? <Loader /> : "Sign In"}
                                                </button>
                                            </div>

                                            <div className="registerp">
                                                <span>Don&apos; have an account ?</span>
                                                <Link to='/auth/register'>Register</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

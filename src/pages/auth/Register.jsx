import './auth.css'
import RegisterImg from '../../assets/images/signup-BJI-YnLt.svg'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast} from 'react-toastify';
import { Loader } from '../../components/Loader'

export const Register = () => {

  const [loader, setLoader] = useState(false)

  const navigate = useNavigate()

  const [registerData, setRegisterData] = useState({
    username : "",
    email : "",
    password : "",
    password2 : "",
  })

  const iconStyle = {
    position : 'absolute',
    right : '20px',
    top : '50px',
    fontSize : '1.4rem'
  } 

  const registerUser = async (e) => {
    e.preventDefault()
    if (!registerData.username || !registerData.email || !registerData.password || !registerData.password2 ) return toast.error("All Fields are required");

          const fetchApiUrl = 'http://127.0.0.1:8000/api/auth/register/';
          

          try {
            setLoader(true);
            const response = await axios.post(fetchApiUrl, {
              username: registerData.username,
              email: registerData.email,
              password: registerData.password,
              password2: registerData.password2
            }, { withCredentials: true });


            console.log(response.data.message)
            toast.success(response.message || 'You Registered Successfully!');
            navigate('/');
        
            
          } catch (error) {
              toast.error(error.response.data.message);
          } finally {
            setLoader(false);
          }
          
  }

  return (
    <div className="authRegister">
      <div className="registerWrapper">
        <div className="registerContainer">
          <div className="registerLeft">
            <div className="leftWrapper">
              <div className="leftHeader">
                <i className='bi bi-chat-fill' style={{fontSize : '2.3rem'}}></i>
                <h1>Chattify</h1>
              </div>

              <div className="left-wel-mes">
                  <h3>Join Chattify & experience the modern way to connect with people</h3>
              </div>

              <div className="left-image">
                  <img src={RegisterImg} alt="register image" />
              </div>
            </div>            
          </div>

          <div className="appLine"></div>

          <div className="registerRight">
            <div className="registerrightform">
              <div className="registerform">
                <div className="formhead">
                  <div className="sm-head" style={{color:'#cccccc88'}}>
                      <p>Start For Free</p>
                  </div>

                  <div className="bghead">
                      <h2>Sign Up to Chattify</h2>
                  </div>
                </div>

                <div className="formi">
                  <form 
                  method='post' 
                  onSubmit={registerUser}>

                    <div className="actualform">
                      <div className="finputs">
                        <div className="inputs" style={{gap : '10px'}}>
                          <div className={`name o`}>
                            <label htmlFor="name">Name</label>
                            <input 
                            type="text" 
                            name='username' 
                            value={registerData.username} 
                            id='name' 
                            autoComplete='false'
                            onChange={(e) => {
                              setRegisterData((currentValue) => ({
                                    ...currentValue, username : e.target.value
                                }))
                            }} 
                            />

                            <i className='bi bi-person' style={iconStyle}></i>
                          </div>

                          <div className={`email o`}>
                              <label htmlFor="email">Email</label>
                              <input 
                              type="email" 
                              name='email' 
                              value={registerData.email} 
                              id='email' 
                              onChange={(e) => {
                                setRegisterData((currentValue) => ({
                                      ...currentValue, email : e.target.value
                                  }))
                              }} 
                              />
                              <i className='bi bi-envelope' style={iconStyle}></i>
                          </div>

                          <div className={`password o`}>
                              <label htmlFor="password">Password</label>
                              <input 
                              type='password' 
                              name='password' 
                              value={registerData.password} 
                              id='password' 
                              onChange={(e) => {
                                setRegisterData((currentValue) => ({
                                      ...currentValue, password : e.target.value
                                  }))
                              }}
                              />
                              <i className='bi bi-lock' style={iconStyle}></i>
                          </div>

                          <div className={`password2 o`}>
                            <label htmlFor="password2">Confirm Password</label>
                            <input 
                            type='password' 
                            name='password2' 
                            value={registerData.password2} 
                            id='password2' 
                            onChange={(e) => {
                              setRegisterData((currentValue) => ({
                                    ...currentValue, password2 : e.target.value
                                }))
                            }}
                            />
                            <i className='bi bi-lock' style={iconStyle}></i>
                          </div>
                        </div>
                      </div>

                      <div className="sub">
                          <div className="loginbutton">
                              <button>
                                {loader ? <Loader /> : "register"}
                              </button>
                          </div>

                          <div className="registerp">
                              <span>Already have an account ?</span>
                              <Link to='/'>Login</Link>
                          </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

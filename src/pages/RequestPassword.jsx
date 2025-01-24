import { useState } from "react"
import resetImage from '../assets/images/email-reqeust.svg'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Load } from "../components/Load"

const PasswordReset = () => {

    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()


    const sendMail = async (e) => {
        e.preventDefault()

        if(!email ||!email.trim()){
            return toast.error("Enter your email")
        }

        try {
            setIsLoading(true)

            const response = await fetch("https://gordenarcher.pythonanywhere.com/api/v1/send_reset_password_mail/", {
                method:'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({email : email})
            })

            if(response.ok){
                setIsLoading(false)
                const data = await response.json()
                toast.success(data.success)    
                setEmail("")
                setTimeout(() => {
                    navigate("/email-done")
                }, 3000)
            }else{
                setIsLoading(false)
                const errorData = await response.json()
                toast.error(errorData.error)
            }

        } catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    document.addEventListener('keypress', (e) => {
        if (e.key === "Enter"){
            sendMail()
        }
    })


  return (
    <div className="rp">

        <div className="em" onClick={() => navigate("/")}>
            <button>
            <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
            <span>Back</span>
            </button>
        </div>

        <div className="password_request">
            <div className="request_wrapper">
                <div className="request_left">
                    <div className="reset_left_image">
                        <img src={resetImage} alt="image" />
                    </div>
                </div>

                <div className="request_right">
                    <div className="right_wrapper">
                        <div className="right_mess">
                            <h1>Enter your email to recieve your password reset link</h1>
                        </div>
                        <form onSubmit={sendMail}>

                            <div className="request_form">
                                <div className="request_form_input">
                                    <label htmlFor="email" >Email</label>
                                    <input 
                                      
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    autoComplete="off"
                                    value={email} 
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} />
                                    
                                    <i className="bi bi-envelope"></i>
                                    
                                </div>

                                <div className="sent_request">
                                    <button>{isLoading ? <Load /> : <span>Reset</span>}</button>
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

export default PasswordReset;
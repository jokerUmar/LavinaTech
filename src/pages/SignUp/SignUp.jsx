import React,{useState , useContext} from 'react'
import "./signUp.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AlertTitle, SvgIcon } from '@mui/material';
import { MD5 } from 'crypto-js';
import axios from 'axios';
import { LoginContext } from '../../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

function SignUp() {

        let {loginData, setLoginData} = useContext(LoginContext)
        let navigate = useNavigate()
        
        const [email, setEmail] = useState("");
        const [name, setName] = useState("");
        const [secret, setSecret] = useState("");
        const [errorValue, setErrorValue] = useState(null);

       let method = 'POST' 
       let url = "https://no23.lavina.tech/signup"
       let body = {
        isbn:"9781118464465"
       }
       


    function Login() {
        axios.post(`https://no23.lavina.tech/signup`,{  
          name: name,
          email:email,
          key: String(Math.random()*1000000),
          secret:String(Math.random()*10000000)
        })
        .then(res => {
            setSecret(res?.data?.data)
            
            if (name.length > 0 && email.length>0) {
                   localStorage.setItem("user" , JSON.stringify(res?.data?.data))
                    setErrorValue(true)
                }else if(name.length == 0 && email.length == 0) {
                    setErrorValue(undefined)
                }
                
                if (JSON.parse(localStorage.getItem("user"))) {
                    navigate("/home")
                }
        })
        .catch(err => { 
            if (err) {
                setErrorValue(false)
            }
        })


      }
      

return (
<div className='sign'>
    {
        errorValue === undefined ? <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
            iltimos ma'lumotlarni kiriting
      </Alert> : errorValue == false ? 
       <Alert severity="error">
       <AlertTitle>Error</AlertTitle>
        bunday foydalanuvchi mavjud
     </Alert> : ""
       
    }
    <div className="container">
        <div className="form">
            <label id="login">
                <AccountCircleIcon sx={{fontSize:"28px",color:"white"}} />
               <input type="text" name='login' placeholder='Email' onChange={(e)=>{e.target.value.length > 0 ? setEmail(e.target.value) : console.log("ishlamadi")}} />
            </label>
            <label>
                <AccountCircleIcon sx={{fontSize:"28px",color:"white"}} />
               <input type="text" placeholder='Name' onChange={(e)=>{e.target.value.length > 0 ? setName(e.target.value) : ""}}/>
            </label>

            <button className='login_btn' onClick={Login}>LOGIN</button>
        </div>
    </div>
</div>
)
}

export default SignUp
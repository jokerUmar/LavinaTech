import React,{useState} from 'react'
import "./signUp.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { SvgIcon } from '@mui/material';
import axios from 'axios';
import { MD5 } from 'crypto-js';

function SignUp() {

        const [email, setEmail] = useState("");
        const [name, setName] = useState("");
        const [secret, setSecret] = useState("");


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
            console.log(res?.data?.data)
            localStorage.setItem("user" , JSON.stringify(res?.data?.data))
            setSecret(res?.data?.data)
        })
        .catch(err => console.log(err))
      }
      

return (
<div className='sign'>
    <div className="container">
        <div className="form">
            <label id="login">
                <AccountCircleIcon sx={{fontSize:"28px",color:"white"}} />
               <input type="text" name='login' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} />
            </label>
            <label>
                <AccountCircleIcon sx={{fontSize:"28px",color:"white"}} />
               <input type="text" placeholder='Name' onChange={(e)=>{setName(e.target.value)}}/>
            </label>

            <button className='login_btn' onClick={Login}>LOGIN</button>
        </div>
    </div>
</div>
)
}

export default SignUp
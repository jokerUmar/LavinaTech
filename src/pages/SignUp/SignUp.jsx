import React,{useState , useContext} from 'react'
import "./signUp.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AlertTitle, Button, CircularProgress, SvgIcon } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { SearchingContext } from '../../context/SearchingContext';

function SignUp() {

        let navigate = useNavigate()
        const [signLoad, setSignLoad] = useState(true);
        
        const [email, setEmail] = useState("");
        const [name, setName] = useState("");
        const [secret, setSecret] = useState("");
        const [errorValue, setErrorValue] = useState(null);


        let key =  "MyUserKey" + Math.floor(Math.random()*1000000)
        let mySecret = "MyUserSecret" + String(Math.floor(Math.random()*10000000))


    function Login() {
        axios.post(`https://no23.lavina.tech/signup`,{  
          name: name,
          email:email,
          key: key,
          secret: mySecret
        })
        .then(res => {
                setSecret(res?.data?.data)
             if (name.length > 0 && email.length>0) {
                   localStorage.setItem("user" , JSON.stringify(res?.data?.data))
                    setErrorValue(true)
                    navigate("/home")
            } else if(name.length == 0 && email.length == 0) {
                    setErrorValue(undefined)
            }
        })
        .catch(err => { 
            if (err) {
                setErrorValue(false)
                console.log(err);
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
            
             {
                signLoad ?  <Button className='login_btn' style={{marginTop:"15px"}} variant="contained" onClick={Login}>LOGIN</Button> :  <CircularProgress color="success" />
             }
        </div>
    </div>
</div>
)
}

export default SignUp
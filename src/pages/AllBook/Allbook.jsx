import React,{useContext, useEffect, useState} from 'react'
import "./allBook.css"
import axios from 'axios';
import { MD5 } from 'crypto-js';
import { DataContext } from '../../context/DataContext';
import Body from '../../components/Body/Body';
import Sidebar from '../../components/Sidebar/Sidebar';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function AllBook() {

const [bars, setBars] = useState(true);
const [bool, setBool] = useState(true);

let {data, setData} = useContext(DataContext)

function handleClick(e) {
if (e.target != document.querySelector(".sidebar") && bars == false) {
setBars(true)
}
}

const hashGenerator = (string) => {
return MD5(string).toString();
};


useEffect(()=>{
getAllBooks()
},[bool])


function getAllBooks() {
let {key, secret} = JSON.parse(localStorage.getItem('user'))

let str ="GEThttps://no23.lavina.tech/books" + secret;

let sign = hashGenerator(str);


axios.get(`https://no23.lavina.tech/books`,{
headers:{
Key: key ,
Sign : sign
}
})
.then(res => {
setData(res?.data?.data)
})
.catch(err => console.log(err))

}


function handleLogout() {
    localStorage.removeItem("user")
    navigate("/")
}



return (
<div className='AllBook' onClick={(e)=>handleClick(e)}>

    <div className="header">
        <div className="container">
            {
            <span onClick={()=>{setBars(false)}} className={`${bars ? "" : "visibilty" }`} >
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </span>

            }

            <button className='logout' onClick={handleLogout}>logout</button>
        </div>
    </div>

    <div className="container">
        <Body data={data} setData={setData} getAllBooks={getAllBooks} bool={bool} setBool={setBool} />
    </div>

    {
    bars ? "" :
    <Sidebar setBars={setBars} bars={bars} />
    }

</div>
)
}

export default AllBook
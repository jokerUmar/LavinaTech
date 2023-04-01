import React,{useContext, useEffect, useState} from 'react'
import "./add.css"
import Card from '../../components/Card/Card'
import axios from 'axios';
import { MD5 , CryptoJS } from 'crypto-js';
import { CircularProgress, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Sidebar from '../../components/Sidebar/Sidebar';

function Add() {
  let navigate = useNavigate()


const [isbn, setIsbn] = useState("");
const [data, setData] = useState({});
const [bars, setBars] = useState(true);
const [addLoad, setAddLoad] = useState(false);

const hashGenerator = (string) => {
return MD5(string).toString();
};


function handleIsbn(e) {
setIsbn(e.target.value)
}

function handleSubmit(e) {
let isbnEl = document.querySelector('.isbn-element')
if (isbnEl.value.length != 0 && isbnEl.value.length===13 ) {
  createBook()
}
}

function handleLogout() {
  localStorage.removeItem("user")
  navigate("/")
}

function handleClick(e) {
  if (e.target != document.querySelector(".sidebar") && bars == false) {
  setBars(true)
  }
  }

const createBook = () => {
let { key, secret } = JSON.parse(localStorage.getItem("user"));

let body = {isbn:isbn};

let str ="POSThttps://no23.lavina.tech/books" + JSON.stringify(body) + secret;

let sign = hashGenerator(str);

setAddLoad(false)

axios.post("https://no23.lavina.tech/books", body, {
  headers: {
    Key: key,
    Sign: sign,
  },
  body: {
    isbn: isbn,
  }
  
})
.then((res) => {
  setData(res.data?.data)
  setAddLoad(true)
  setTimeout(() => {
    setAddLoad(false)    
  }, 500);
  
}).catch(err=>{
  setAddLoad(true)
  setTimeout(() => {
    setAddLoad(false)    
  }, 500);
  alert("bunday kitob mavjud")
})
};

return (
<div className='add' onClick={(e)=>handleClick(e)}>

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


    <div className="take-data">
      <input type="number" min={4} minLength={1} maxLength={13} className='isbn-element' onChange={handleIsbn}
        placeholder='isbn' />
      <Button style={{marginTop:"10px"}} variant="contained"  onClick={handleSubmit}>{addLoad ?  <CircularProgress color="secondary" /> :  "submit" }</Button>
    </div>

    <ul className='list'>
      <Card Name={data.title} Author={data.author} Published={data.published} img={data.cover} />
    </ul>
  </div>
  {
    bars ? "" :
    <Sidebar setBars={setBars} bars={bars} />
    }

</div>
)
}

export default Add
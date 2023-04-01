import React,{useContext, useEffect, useState,useCallback} from 'react'
import "./header.css"
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MD5 } from 'crypto-js';
import { SearchingContext } from '../../context/SearchingContext';

function Header({bars,setBars,setHeaderValue,headerValue,setHomeLoad,setResponseload,responseload}) {

    let {dataSearch,setDataSearch} = useContext(SearchingContext)

    let navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem("user")
        navigate("/")
    }

    useEffect(()=>{
          getSearchBooks()
    },[headerValue])
        
    
    
    function handleKeyUp(e) {
        if (e.key == "Enter") {
            setHeaderValue(e.target.value)
        }
    }

        

  const hashGenerator = (string) => {
    return MD5(string).toString();
  };

  
  function getSearchBooks() {

      setHomeLoad(false)
      setResponseload(false)

    let {key, secret} = JSON.parse(localStorage.getItem('user'))

    let str =`GEThttps://no23.lavina.tech/books/${headerValue}` + secret;
    
    let sign = hashGenerator(str);
    axios.get(`https://no23.lavina.tech/books/${headerValue}`,{
        headers:{
            Key: key ,
            Sign : sign
        }
    })
    .then(res => {
        setDataSearch(res.data.data)
        setHomeLoad(false)
        setResponseload(true)
    })
    .catch(err =>{
        console.log(err);
        setHomeLoad(true)
        setResponseload(false)
    })
  }



return (
<div className='header'>
    <div className="container">
        {
        <span onClick={()=>{setBars(false)}} className={`${bars ? "" : "visibilty" }`}  >
            <Toolbar  variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </span>

        }

        <label  className='header_label'>
            <SearchIcon color='action' />
            <input onKeyUp={handleKeyUp} type="text" placeholder='Search...' className='header_input' />
        </label>
        <button className='logout' onClick={handleLogout}>logout</button>
    </div>
</div>
)
}

export default Header
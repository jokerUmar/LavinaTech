import React,{useState} from 'react'
import "./header.css"
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function Header({bars,setBars}) {

    let navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem("user")
        navigate("/")
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
            <input  type="text" placeholder='Search...' className='header_input' />
        </label>
        <button className='logout' onClick={handleLogout}>logout</button>
    </div>
</div>
)
}

export default Header
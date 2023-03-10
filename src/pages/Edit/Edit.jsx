import React,{useState,useContext, useEffect} from 'react'
import "./edit.css"
import axios from 'axios'
import { IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Navigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DataContext } from '../../context/DataContext';

function Edit() {

let {data,setData} = useContext(DataContext)
const [bars, setBars] = useState(true);
const [selectValue, setSelectValue] = useState(0);

const handleChange = (event) => {
setSelectValue(event.target.value);
};

function handleLogout() {
localStorage.removeItem("user")
Navigate("/")
}

function handleClick(e) {
if (e.target != document.querySelector(".sidebar") && bars == false) {
setBars(true)
}
}

function filterData() {
let filter = data.filter(e => e.status == selectValue)
return filter
}

useEffect(()=>{
filterData()
},[selectValue])



return (
<div className='edit' onClick={handleClick}>
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
      <div>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-autowidth-label">edit</InputLabel>
          <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth" value={selectValue}
            onChange={handleChange} autoWidth label="Age">
            <MenuItem sx={{ m: 1, minWidth: 170 }} value={0}>new</MenuItem>
            <MenuItem sx={{ m: 1, minWidth: 170 }} value={1}>Reading</MenuItem>
            <MenuItem sx={{ m: 1, minWidth: 170 }} value={2}>Finished</MenuItem>
          </Select>
        </FormControl>
      </div>

      <button className='logout' onClick={handleLogout}>logout</button>
    </div>
  </div>

  {
  bars ? "" :
  <Sidebar setBars={setBars} bars={bars} />
  }

  <ul>
    {

    filterData() && filterData().map(e => {
    return String(e.title+e.author).length > 0 ?
    <li className='item' key={e.book.title+e.book.author+e.book.isbn+e.id}>

      <img src={ !e.book.cover ? "https://picsum.photos/200/300" : e.book.cover } alt={e.book?.cover ? "" : "image is not defined"
        } width={"200px"} height={"200px"} />

      <p className='name_title'>{ !e.book.title ? "kitob nomi" : e.book.title}</p>
      <p className='author'>{ !e.book.author ? "yozuvchi" : e.book.author}</p>
      <p className='year'>{ !e.book.published ? "kitob nomi" : e.book.published}</p>
    </li> : ""

    })
    }
  </ul>


</div>
)
}

export default Edit
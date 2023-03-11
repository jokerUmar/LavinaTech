import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import "./delete.css"
import Sidebar from '../../components/Sidebar/Sidebar';
import { MD5 } from 'crypto-js';
import axios from 'axios';
import { DataContext } from '../../context/DataContext';
import { Button } from '@mui/material';

function Delete() {

const [bars, setBars] = useState(true);
const [headerValue, setHeaderValue] = useState("");
let {data,setData} = useContext(DataContext)

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
  },[headerValue])


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
        console.log(res.data.data);
    })
    .catch(err => console.log(err))
    
}

  function DeleteBooks(id) {
      let {key, secret} = JSON.parse(localStorage.getItem('user'))
      
      let str =`DELETEhttps://no23.lavina.tech/books/${id}` + secret;
      
      let sign = hashGenerator(str);
      
      axios.delete("https://no23.lavina.tech/books/"+id, {
        headers: {
          Key: key,
          Sign: sign,
        },
    })
    .then(res => setData(res.data.data))
    .catch(err => console.log(err))
    
}


return (
    <div className='delete' onClick={handleClick}>
    <Header setBars={setBars} bars={bars} />

    <div className="container">
    <div className='body'>
    <ul className='list-box'>
        {
            data != null ? data.map(e => {
            return String(e.book.author + e.book.title+ e.book.cover).length > 0 ? 
            <li className='item' key={e.book.id}>

              <img src={e?.book?.cover.length>0 ? e?.book?.cover :  "https://picsum.photos/200/300" }  alt={e.book.cover ? "" : "image is not defined"} width={"200px"} height={"200px"} />
            
              <p className='name_title'>{e.book.title ? e.book.title : "kitob nomi"}</p>
              <p className='author'>{e.book.author ? e.book.author : "yozuvchi"}</p>
              <p className='year'>{e.book.published ? e.book.published : "yil"}</p>
             <Button variant='contained'  onClick={()=>DeleteBooks(e.book.id)}  className='delete_btn' style={{backgroundColor:"red",marginTop:"10px"}} >delete</Button>
           </li> : ""

            }) : <h1 style={{color:"red"}}>empty</h1>
        }
    </ul>
</div>    </div>

    {
    bars ? "" : <Sidebar setBars={setBars} bars={bars} />
    }

</div>

)
}

export default Delete
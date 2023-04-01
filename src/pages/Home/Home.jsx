import React,{useContext, useEffect, useState} from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar';
import "./home.css"
import { SearchingContext } from '../../context/SearchingContext';
import { MD5 } from 'crypto-js';
import axios from 'axios';
import { DataContext } from '../../context/DataContext';
import { Button, CircularProgress } from '@mui/material';

function Home() {

  let {data, setData} = useContext(DataContext)
  let {dataSearch,setDataSearch} = useContext(SearchingContext)
    
  const [bars, setBars] = useState(true);           
  const [headerValue, setHeaderValue] = useState("");
  const [homeLoad, setHomeLoad] = useState(true);
  const [responseload, setResponseload] = useState(false);

  function handleClick(e) {
    if (e.target != document.querySelector(".sidebar") && bars == false) {
      setBars(true)
    }
  }

  
  const hashGenerator = (string) => {
    return MD5(string).toString();
  };

  
  const createBook = (e) => {
    let { key, secret } = JSON.parse(localStorage.getItem("user"));

    let body = {isbn:e.isbn};

    let str ="POSThttps://no23.lavina.tech/books" + JSON.stringify(body) + secret;

    let sign = hashGenerator(str);

    axios.post("https://no23.lavina.tech/books", body, {
        headers: {
          Key: key,
          Sign: sign,
        },
          body: {
            isbn: e.isbn,
          }
        
    })
      .then((res) => {
        data.push(res.data.data)
      })
      .catch(err=>{
        // console.log(err?.response?.data?.message)
      })
  };

  return (
    <div className='home' onClick={(e)=>handleClick(e)}>
      
      <Header setResponseload={setResponseload} setHomeLoad={setHomeLoad} setBars={setBars} bars={bars} headerValue={headerValue} setHeaderValue={setHeaderValue} />

      <div className="container">
      <ul className='list-box'>
        {

          responseload?   dataSearch.map(e => {
            return  <li className='item' key={e.title+e.isbn+e.cover}>

              <img src={ !e.cover ?  "https://picsum.photos/200/300" : e.cover }  alt={e.book?.cover ? "" : "image is not defined"} width={"200px"} height={"200px"} />
            
              <p className='name_title'>{ !e.title ? "kitob nomi" : e.title}</p>
              <p className='author'>{ !e.author ? "yozuvchi" : e.author}</p>
              <p className='year'>{ !e.published ? "kitob nomi" : e.published}</p>
              <Button style={{
                    fontSize: "14px",
                    width: "100%",
                    padding: "7px 0",
                    backgroundColor: "#FFD80D",
                    borderRadius: "4px",
                
              }} onClick={()=>{createBook(e)}} className='add_btn' >add</Button>
           </li>

            }) 
          : homeLoad ? <h1 style={{color:"red",width:"100%",textAlign:"center"}}> no data </h1> : <div style={{color:"red",width:"100%",textAlign:"center"}} > <CircularProgress color="success" /></div>
        }
    </ul>

      </div>

      {
        bars ? "" : <Sidebar  setBars={setBars} bars={bars} />  
      }

    </div>
  )
}

export default Home
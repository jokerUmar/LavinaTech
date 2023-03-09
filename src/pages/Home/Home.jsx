import React,{useEffect, useState} from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar';
import Body from '../../components/Body/Body';
import "./home.css"
import axios from 'axios';
import { MD5 } from 'crypto-js';

function Home() {

  const [bars, setBars] = useState(true);           
  const [data, setData] = useState([]);
  const [headerValue, setHeaderValue] = useState("");


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
  },[])


  function getAllBooks() {
    let {key, secret} = JSON.parse(localStorage.getItem('user'))

    let str ="GEThttps://no23.lavina.tech/books" + secret;
    
    let sign = hashGenerator(str);

    
    axios.get("https://no23.lavina.tech/books",{
        headers:{
          Key: key ,
          Sign : sign
        }
      })
      .then(res => setData(res?.data?.data))
      .catch(err => console.log(err))

  }

  

  return (
    <div className='home' onClick={(e)=>handleClick(e)}>
      
      <Header setBars={setBars} bars={bars} headerValue={headerValue} setHeaderValue={setHeaderValue} />

      <div className="container">
        <Body data={data}  />  
      </div>

      {
        bars ? "" : <Sidebar  setBars={setBars} bars={bars} />  
      }

    </div>
  )
}

export default Home
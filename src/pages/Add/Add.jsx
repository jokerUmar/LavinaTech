import React,{useContext, useEffect, useState} from 'react'
import "./add.css"
import Card from '../../components/Card/Card'
import axios from 'axios';
import { MD5 , CryptoJS } from 'crypto-js';

function Add() {
    
    const [isbn, setIsbn] = useState("");
    const [data, setData] = useState({});
    
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
    
    console.log(data);
    
    const createBook = () => {
        let { key, secret } = JSON.parse(localStorage.getItem("user"));
    
        let body = {isbn:isbn};
    
        let str ="POSThttps://no23.lavina.tech/books" + JSON.stringify(body) + secret;
    
        let sign = hashGenerator(str);
    
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
          }).catch(err=>{
            console.log(err?.response?.data?.message)
          })
      };
    
return (
<div className='add'>
    <div className="container">


        <div className="take-data">
            <input type="number" min={4} minLength={1} maxLength={13} className='isbn-element' onChange={handleIsbn} placeholder='isbn'/>
            <button onClick={handleSubmit} className='submit' >submit</button>
        </div>

        <ul className='list'>
            <Card  Name={data.title} Author={data.author} Published={data.published} img={data.cover}  />
        </ul>
    </div>
</div>
)
}

export default Add
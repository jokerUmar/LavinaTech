import React,{useState} from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar';
import Body from '../../components/Body/Body';
import "./home.css"

function Home() {
  const [bars, setBars] = useState(true);

  function handleClick(e) {
    if (e.target != document.querySelector(".sidebar") && bars == false) {
      setBars(true)
    }
  }

  return (
    <div className='home' onClick={(e)=>handleClick(e)}>
      <Header setBars={setBars} bars={bars} />
      <div className="container">
        <Body/>  

      </div>
      {
        bars ? "" : <Sidebar  setBars={setBars} bars={bars} />  
      }
          

    </div>
  )
}

export default Home
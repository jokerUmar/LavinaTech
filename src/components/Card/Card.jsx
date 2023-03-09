import React from 'react'
import "./card.css"


function Card({Name,Author,Published , img}) {
  return (
    <>
        <li className='item'>
            <img src={img} alt="" width={"200px"} height={"200px"} />
            <h3 className='name_title'>{Name ? Name : "kitob nomi"}</h3>
            <p className='author'>{Author ? Author : "yozuvchi"}</p>
            <p className='year'>{Published ? Published : "yil"}</p>
        </li>
    </>
  )
}

export default Card
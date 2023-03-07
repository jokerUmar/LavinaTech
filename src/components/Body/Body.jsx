import React,{useState} from 'react'
import "./body.css"
import img from "../../assets/image/Login-bg.jpg"
function Body() {
return (
<div className='body'>
    <ul className='list'>
        <li className='item'>
            <img src={img} alt="" width={"200px"} height={"200px"} />
            <h3 className='name_title'>Python</h3>
            <p className='author'>David M. Beazley</p>
            <p className='year'>2009</p>
        </li>
    </ul>
</div>
)
}

export default Body
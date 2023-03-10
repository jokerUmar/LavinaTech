import React from 'react'
import "./sidebar.css"
import {Link} from 'react-router-dom'

function Sidebar({bars , setBars}) {



  return (
    <div className='sidebar' >
        <Link className='sidebar_link' to={'/home'}>
          Home
        </Link>
        <Link className='sidebar_link' to={'/allBook'}>
          allBook
        </Link>
        <Link className='sidebar_link' to={'/add'}>
          Add
        </Link>
        <Link className='sidebar_link' to={'/delete'}>
          delete
        </Link>
        <Link className='sidebar_link' to={'/add'}>
          edit
        </Link>
    </div>
  )
}

export default Sidebar
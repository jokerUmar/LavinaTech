import React,{useState} from 'react'
import "./body.css"

function Body({data}) {

  console.log(data);

return (
<div className='body'>
    <ul className='list-box'>
        {
          data != null &&  data.map(e => {
            return String(e.book?.title+e.book?.author).length > 0 ? 
            <li className='item' key={e.book?.id}>

              <img src={e.book?.cover.length>0 ? e.book?.cover :  "https://picsum.photos/200/300" }  alt={e.book?.cover ? "" : "image is not defined"} width={"200px"} height={"200px"} />
            
              <p className='name_title'>{e.book?.title ? e.book?.title : "kitob nomi"}</p>
              <p className='author'>{e.book?.author ? e.book?.author : "yozuvchi"}</p>
              <p className='year'>{e.book?.published ? e.book?.published : "yil"}</p>
              {
                console.log(e.status)
              }
           </li> : ""

            }) 
        }
    </ul>
</div>
)
}

export default Body
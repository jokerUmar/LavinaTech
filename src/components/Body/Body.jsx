import React,{useState, useContext, useEffect} from 'react'
import "./body.css"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MD5 } from 'crypto-js';
import axios from 'axios';


function Body({data,setData,setBool,bool}) {


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [itemData, setItemData] = useState({});
  
  const [valueInput, setValueInput] = useState(0);

  const handleChange = (event) => {
    setValueInput(event.target.value*1);
  };
  
  function handleValue(e) {
    setItemData(e)
  }
  
 
  const hashGenerator = (string) => {
    return MD5(string).toString();
  };
  
  const editBook = () => {
    let { key, secret } = JSON.parse(localStorage.getItem("user"));
    let body = {
      status : valueInput
    };


    let str =`PATCHhttps://no23.lavina.tech/books/${itemData.book.id}` + JSON.stringify(body) + secret;


    let sign = hashGenerator(str);

    axios.patch(`https://no23.lavina.tech/books/${itemData.book.id}`, body, {
        headers: {
          Key: key,
          Sign: sign,
        },
          body: {
           status : valueInput
          }
        
    })
      .then((res) => {
        console.log(res.data)
      }).catch(err=>{
        console.log(err?.response?.data?.message)
      })

      setData(data)
    };
    console.log(data);


return (
<div className='body'>
  <ul className='list-box'>
    {
    data != null && data.map(e => {
    return String(e.book?.title+e.book?.author).length > 0 ?
    <li className='item' key={e.book?.id}>

      <img src={e.book?.cover.length>0 ? e.book?.cover : "https://picsum.photos/200/300" } alt={e.book?.cover ? "" :
      "image is not defined"} width={"200px"} height={"200px"} />

      <p className='name_title'>{e.book?.title ? e.book?.title : "kitob nomi"}</p>
      <p className='author'>{e.book?.author ? e.book?.author : "yozuvchi"}</p>
      <p className='year'>{e.book?.published ? e.book?.published : "yil"}</p>
      <div>
        <Button style={{
            fontSize: "14px",
            width: "100%",
            padding:" 7px 0",
            backgroundColor: "#FFD80D",
            borderRadius:" 4px",
            color:"black"
        }} onClick={()=>{
          handleValue(e)
          handleOpen()
        }}>Edit</Button>
        <Modal keepMounted open={open} onClose={handleClose} aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description">
          <Box sx={style}>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
              change status
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>

              <select onClick={handleChange} className='select' name="" id="">
                <option value="0">New</option>
                <option value="1">Reading</option>
                <option value="2">Finished</option>

              </select>
            <br />  
              <button onClick={()=>{
                editBook()
                handleClose()
              }} style={{marginTop:"5px",fontSize:"16px",padding:"1px 4px"}}>submit</button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </li> : ""


    })
    }
  </ul>
</div>
)
}

export default Body
import React,{ useState , useContext} from 'react'
import './App.css'
import SignUp from './pages/SignUp/SignUp'
import { Route , Routes } from 'react-router-dom'
import { LoginContext } from './context/LoginContext'
import Home from './pages/Home/Home'
import Add from './pages/Add/Add'
import Delete from './pages/Delete/Delete'
import AllBook from './pages/AllBook/AllBook'
import Edit from './pages/Edit/Edit'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/add' element={<Add/>} />
        <Route path='/delete' element={<Delete/>} />
        <Route path='/allbook' element={<AllBook/>} />
        <Route path='/edit' element={<Edit/>} />
      </Routes>
    </div>
  )
}

export default App

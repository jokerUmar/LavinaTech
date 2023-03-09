import React,{ useState , useContext} from 'react'
import './App.css'
import SignUp from './pages/SignUp/SignUp'
import { Route , Routes } from 'react-router-dom'
import { LoginContext } from './context/LoginContext'
import Home from './pages/Home/Home'
import Add from './pages/Add/Add'

function App() {

  let {loginData, setLoginData} = useContext(LoginContext)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/add' element={<Add/>} />
      </Routes>
    </div>
  )
}

export default App

import React,{ useState , useContext} from 'react'
import './App.css'
import SignUp from './pages/SignUp/SignUp'
import { Route , Routes } from 'react-router-dom'
import Login from './APi/Login'
import { LoginContext } from './context/LoginContext'
import Home from './pages/Home/Home'

function App() {

  let {loginData, setLoginData} = useContext(LoginContext)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/home' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App

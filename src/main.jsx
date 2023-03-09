import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import LoginProvider from './context/LoginContext'
import SearchingProvider from './context/SearchingContext'

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
  <LoginProvider>
    <SearchingProvider>
        <App />
    </SearchingProvider>
  </LoginProvider>
</BrowserRouter>
)
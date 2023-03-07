import React,{createContext,useState} from 'react';

export const LoginContext = createContext();

export default function LoginProvider({children}) {

    const [loginData, setLoginData] = useState(false);

  return (
    <LoginContext.Provider value={{loginData,setLoginData}}>
        {children}
    </LoginContext.Provider>
  )
}
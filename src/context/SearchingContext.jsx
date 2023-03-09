import React,{createContext,useState} from 'react';

export const SearchingContext = createContext();

export default function SearchingProvider({children}) {

    const [data, setData] = useState({});

  return (
    <SearchingContext.Provider value={{data,setData}}>
        {children}
    </SearchingContext.Provider>
  )
}
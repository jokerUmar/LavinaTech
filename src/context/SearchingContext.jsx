import React,{createContext,useState} from 'react';

export const SearchingContext = createContext();

export default function SearchingProvider({children}) {

    const [dataSearch, setDataSearch] = useState([]);

  return (
    <SearchingContext.Provider value={{dataSearch,setDataSearch}}>
        {children}
    </SearchingContext.Provider>
  )
}
import React,{createContext,useState} from 'react';

export const DataContext = createContext();

export default function DataProvider({children}) {

    const [data, setData] = useState([]);

  return (
    <DataContext.Provider value={{data,setData}}>
        {children}
    </DataContext.Provider>
  )
}
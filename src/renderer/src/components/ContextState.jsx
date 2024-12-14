/* eslint-disable prettier/prettier */
import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [rows,setrows]=useState([])
    const [isDis,setDis]=useState('')
  return (
    <MyContext.Provider value={{ rows,setrows,isDis,setDis }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
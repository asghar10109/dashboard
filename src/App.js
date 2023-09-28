import React, { useEffect } from 'react'
 import { useDispatch, useSelector } from 'react-redux'
import { token } from "./store/slices/userSlice"
import Layout from './components/Layout/Layout';
import ContextProvider from "./context/context"
 
function App() { 
  const dispatch = useDispatch()  

  useEffect(() => {
    try { 
      dispatch(token())
    } catch (error) {
      console.log(error)
    }
  }, [])

  
  return (
    <ContextProvider >
      <Layout />
    </ContextProvider>
  );
}

export default App;

import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './slices/userSlice';
 
const Store = configureStore({
    reducer: {
      users: usersReducer 
     } 
  })
export default Store  
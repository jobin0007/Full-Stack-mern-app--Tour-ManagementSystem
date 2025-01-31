import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tourReducer from './tourSlice'
import adminReducer from './adminSlice'
import requestReducer from './requestSlice'
import tourOperatorReducer from './tourOperatoSlice'




const store = configureStore({
  reducer: {
    
    user: userReducer,
    admin:adminReducer,
    tourOperator:tourOperatorReducer

  },
});

export default store;

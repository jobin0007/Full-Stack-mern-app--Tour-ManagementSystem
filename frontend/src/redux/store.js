import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tourReducer from './tourSlice'
import adminReducer from './adminSlice'
import requestReducer from './requestSlice'



const store = configureStore({
  reducer: {
    user: userReducer,
    admin:adminReducer,
    tours:tourReducer,
    request:requestReducer

  },
});

export default store;

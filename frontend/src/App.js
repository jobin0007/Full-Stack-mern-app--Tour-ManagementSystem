import "./App.css";
import React from "react";

import { Outlet, Route, Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Index from "./route";
import UserDashBoard from "./pages/userPages";
import Register from "./pages/userPages/Register";
import UserLogin from "./pages/userPages/UserLogin";
import Home from "./pages/Home";
import TourOperatorDashBoard from "./pages/tourOperator";
import AdminDashBoard from "./pages/adminPage";
import AdminLogin from "./pages/adminPage/AdminLogin";

function App() {
  return <>
 
        <Header/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='user/login' element={<UserLogin/>}/>
            <Route path ="admin/login" element={<AdminLogin/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='/user/:id' element={<UserDashBoard/>}/>
            <Route path='admin' element={<AdminDashBoard/>}/>
            <Route path='tour-operator' element={<TourOperatorDashBoard/>}/>

        </Routes>
        <Footer />
   
  
  </>;
}

export default App;

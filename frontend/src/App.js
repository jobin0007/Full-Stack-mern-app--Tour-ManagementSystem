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
import TourOperatorLogin from "./pages/tourOperator/tourOperatorLogin";
import CreateTourPage from "./pages/tours/CreateTourPage";
import CreateCustomTour from "./pages/userPages/CreateCustomTour";



const LayoutWithHeader = () => {
  return (
      <>
          <Header />
          <Outlet /> {/* Renders the nested route components */}
         
      </>
  );
};
 
// Layout for routes without a Header
const LayoutWithoutHeader = () => {
  return (
      <>
          <Outlet /> {/* Renders the nested route components */}
         
      </>
  );
};


function App() {
  return <>
 
      
        <Routes>
               {/* Home Route without Header */}
               <Route element={<LayoutWithoutHeader />}>
                <Route path="/" element={<Home />} />
            </Route>
            {/* <Route path='/' element={<Home/>}/> */}
            
            <Route element={<LayoutWithHeader />}>
                <Route path="user/login" element={<UserLogin />} />
                <Route path="admin/login" element={<AdminLogin />} />
                <Route path="user/register" element={<Register />} />
                <Route path="user/:id" element={<UserDashBoard />} />
                <Route path="admin" element={<AdminDashBoard />} />
                <Route path="tour-operator/:id" element={<TourOperatorDashBoard />} />
                <Route path="tour-operator/login" element={<TourOperatorLogin />} />
                <Route path="/create-tour" element={<CreateTourPage/>}/>
                <Route path="/user/:id/create-custom-tour" element={<CreateCustomTour/>}/>
            </Route>
        </Routes>
        <Footer />
   
  
  </>;
}

export default App;

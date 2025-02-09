import "./App.css";
import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/userPages/Register";
import UserLogin from "./pages/userPages/UserLogin";
import AdminLogin from "./pages/adminPage/AdminLogin";
import UserDashBoard from "./pages/userPages";
import AdminDashBoard from "./pages/adminPage";
import TourOperatorDashBoard from "./pages/tourOperator";
import TourOperatorLogin from "./pages/tourOperator/tourOperatorLogin";
import CreateTourPage from "./pages/tours/CreateTourPage";
import CreateCustomTour from "./pages/userPages/CreateCustomTour";
import Viewebookings from "./pages/userPages/Viewebookings";
import VIewAcceptedTours from "./pages/tourOperator/VIewAcceptedTours";
import { useSelector } from "react-redux";
import RoleRequests from "./pages/adminPage/RoleRequests";
import NotFound from "./NotFound";
import GetAllUsers from "./pages/adminPage/GetAllUsers";
import GetAllTourOperators from "./pages/adminPage/GetAllTourOperators";

function App() {
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);
  const tourOperator = useSelector((state) => state.tourOperator);

  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/tour-operator/login" element={<TourOperatorLogin />} />

      
        {user && (
          <>
            <Route path="/user/:id" element={<UserDashBoard />} />
            <Route path="/user/:id/create-custom-tour" element={<CreateCustomTour />} />
            <Route path="/user/:userId/view-Bookings" element={<Viewebookings />} />
          </>
        )}

       
        {admin && (
          <>
            <Route path="/admin/:id" element={<AdminDashBoard />} />
            <Route path="/admin/:id/role-requset" element={<RoleRequests />} />
            <Route path="/admin/:id/get-All-users" element={<GetAllUsers />} />
            <Route path="/admin/:id/get-All-tour-operators" element={<GetAllTourOperators />} />

          </>
        )}

      
        {tourOperator && (
          <>
            <Route path="/tour-operator/:tourOperatorId" element={<TourOperatorDashBoard />} />
            <Route path="/tour-operator/:tourOperatorId/view-accepted-tours" element={<VIewAcceptedTours />} />
            <Route path="/create-tour" element={<CreateTourPage />} />
          </>
        )}

        {!user && !tourOperator && !admin && (
          <Route path="/*" element={<NotFound />} />
        )}

        <Route path="/*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

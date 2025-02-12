import "./App.css";
import React from "react";
import { Route, BrowserRouter, Routes, useLocation } from "react-router-dom";
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
import Tours from "./pages/tours";
import TourDetail from "./pages/tours/TourDetail";
import CustomTourStatus from "./pages/userPages/CustomTourStatus";

function App() {
  const location = useLocation();

  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);
  const tourOperator = useSelector((state) => state.tourOperator);

  // Hide footer on these routes
  const hideFooterRoutes = ["/user/login"]

  return (
    <>
      <Routes>
    
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<UserLogin isOpen={true} />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/tour-operator/login" element={<TourOperatorLogin />} />
        <Route path="/tours" element={<Tours/>}/>
         <Route path="/tour/:tourId" element={<TourDetail/>}/>
         <Route path="tour/:tourId" element={<TourDetail/>}/>

        {user && (
          <>
            <Route path="/user/:id" element={<UserDashBoard />} />

            <Route path="/user/:id/create-custom-tour" element={<CreateCustomTour />} />
            <Route path="/user/:userId/view-Bookings" element={<Viewebookings />} />
            <Route path="/user/:userId/view-status-custom" element={<CustomTourStatus />} />
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

    
       {!hideFooterRoutes.includes(location.pathname) && <Footer />}
       </>
  );
}

export default App;

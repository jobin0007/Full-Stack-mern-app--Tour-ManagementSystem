import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Banner from '../../components/Banner'
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineFileText,
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineDollarCircle,
  AiOutlineMenu,
  AiOutlineLogout,
} from "react-icons/ai";
import {
  FaUserEdit,
  FaBook,
  FaTrashAlt,
  FaBars,
  FaUserCircle,
} from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import {
  getBookingStatusAPI,
  getOneUserAPI,
  operatorRequestAPI,
  userLogOutAPI,
} from "../../services/userServices";
import { IoHome } from "react-icons/io5";
import Tours from "../tours";
import Search from "../../components/Search";
import Header from '../../components/Header';
import TourDetail from "../tours/TourDetail";
import useLogout from "../../hooks/useLogout";



const UserDashboard = () => {
  const logoutMutation = useLogout()
  const { id: userId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [notification, setNotification] = useState(null);
  const showNotification = (message, type) => {
    setNotification({ message, type });
  
    setTimeout(() => {
      setNotification(null);
    }, 3000); 
  };

  const [message, setMessage] = useState({ text: "", type: "" });
  const [filters, setFilters] = useState({});  


  const handleSearch = (filterData) => {
    setFilters(filterData);
  };


 



  const { data, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getOneUserAPI(userId),
    onError: (err) =>
    showNotification(  err?.response?.data?.error, "error"  )

    
  });

  const {
    data: bookingResponse
  } = useQuery({
    queryKey: ["bookingData"],
    queryFn: getBookingStatusAPI,
  });

  const bookingStatuses = bookingResponse?.status || [];
  const hasBookings = bookingStatuses.length > 0;

  const { mutateAsync, isLoading: isMutationLoading } = useMutation({
    mutationFn: operatorRequestAPI,
    onSuccess: (response) => {
      showNotification(  response.message, "success"  )

      
    },
    onError: (err) => {
      showNotification( err.response?.data?.message || "Something went wrong.", "error"  )
    
    },
  });

  const handleRoleChangeRequest = async () => {
    
    await mutateAsync();
  };

  if (isLoading) return <div className="text-center py-6">Loading...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center py-6">
        Error: {error.message}
      </div>
    );

  const { userFound } = data;

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-gray-800 p-3">
     <div className="grid grid-cols-2 sm:grid-cols-4 items-center  px-4 py-3 shadow-md">
        <button
          onClick={() => setShowSidebar(true)}
          className="text-gray-700 text-2xl"
        >
          <AiOutlineMenu />
        </button>
        <div className="flex col-span-3 justify-end gap-2">
          <AiOutlineHome className="text-gray-700  xs:text-xs  sm:text-xs lg:text-lg" />
          <Link to={'/'}>
          <span className=" xs:text-xs  sm:text-xs lg:text-lg ">Home</span>

          </Link>
          <button className="flex items-center gap-2 text-red-600 hover:text-red-800"
            onClick={() => logoutMutation.mutate()} 
            >
            <AiOutlineLogout className="text-lg" /> Logout
          </button>
          <div className="flex items-center gap-2">
            <AiOutlineUser className="text-gray-700  xs:text-xs  sm:text-xs lg:text-lg" />
            <span className=" xs:text-xs  sm:text-xs lg:text-lg ">{userFound?.name}</span>
          </div>
        </div>
      </div>
     
      {/* <Header /> */}
      <div className=" p-4 ">
     
      </div>
  
      <div className="max-w-full  mx-auto px-4 py-6 grid lg:grid-cols-4 gap-4">
        {
          showSidebar && (
            <div className="fixed inset-0 z-50 bg-black  bg-opacity-50 flex">
            <div className="bg-white w-3/4 max-w-xs p-4 flex flex-col">
              <button
                onClick={() => setShowSidebar(false)}
                className="ml-auto text-gray-700 text-xl"
              >
                <AiOutlineClose />
              </button>
              <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm hover:text-indigo-600 cursor-pointer transition duration-200">
              <FaUserEdit /> Update Profile
            </li>
            <li className="flex items-center gap-2 text-sm hover:text-indigo-600 cursor-pointer transition duration-200">
              <FaUserEdit /> Edit Contact Details
            </li>
            <Link
            to={`/user/${userFound?._id}/view-Bookings`}
            className="flex items-center gap-2 text-sm hover:text-indigo-600 cursor-pointer transition duration-200">
              <FaBook />  Status of Booked Tour
            </Link>
            <Link
              to={`/user/${userFound?._id}/create-custom-tour`}
              className="flex items-center gap-2 text-sm hover:text-indigo-600 cursor-pointer transition duration-200"
              
            >
              <MdCreateNewFolder /> Customize Your Tours
            </Link>
            <Link
            to={`/user/${userFound?._id}/view-status-custom`}
            className="flex items-center gap-2 text-sm hover:text-indigo-600 cursor-pointer transition duration-200">
              <FaBook />  Status of Custom Tour
            </Link>


            <button
              className="mt-6 text-sm text-indigo-500 underline cursor-pointer hover:text-indigo-700 transition duration-200"
              onClick={handleRoleChangeRequest}
              disabled={isMutationLoading}
            >
              {isMutationLoading
                ? "Processing..."
                : "Request Role Change to Tour Operator"}
            </button>
          </ul>
            </div>
          </div>
  

          )
        }
      
        <div className=" p-6 lg:col-span-4">
          {message.text && (
            <div
              className={`p-4 mb-4 rounded-md text-white ${
                message.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {message.text}
            </div>
          )}


             <Search onSearch={handleSearch} />
  

          <Tours  filters={filters} />

        </div>
      </div>
      <Banner />

      {notification && (
        <div className={`fixed  right-4 z-50 bottom-4  px-4 py-2 rounded-md text-white shadow-lg flex items-center space-x-2 
          ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="text-white ml-2">
            <AiOutlineClose />
          </button>
        </div>
      )}

    </div>
    
  );
};

export default UserDashboard;

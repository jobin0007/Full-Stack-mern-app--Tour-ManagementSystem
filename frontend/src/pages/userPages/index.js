import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
} from "../../services/userServices";
import { IoHome } from "react-icons/io5";
import Tours from "../tours";
import Search from "../../components/Search";
import Header from '../../components/Header'

const UserDashboard = () => {
  const { id: userId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const [message, setMessage] = useState({ text: "", type: "" });
  const [filters, setFilters] = useState({});  // Store search filters

  // Update filters when user searches
  const handleSearch = (filterData) => {
    setFilters(filterData);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getOneUserAPI(userId),
    onError: (err) =>
      setMessage({ text: "Failed to load user data.", type: "error" }),
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
      setMessage({ text: response.message, type: "success" });
    },
    onError: (err) => {
      setMessage({
        text: err.response?.data?.message || "Something went wrong.",
        type: "error",
      });
    },
  });

  const handleRoleChangeRequest = async () => {
    setMessage({ text: "", type: "" });
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
    <div className="min-h-screen bg-white text-gray-800 p-3">
     <div className="grid grid-cols-2 sm:grid-cols-4 items-center bg-white px-4 py-3 shadow-md">
        <button
          onClick={() => setShowSidebar(true)}
          className="text-gray-700 text-2xl"
        >
          <AiOutlineMenu />
        </button>
        <div className="flex col-span-3 justify-end gap-2">
          <AiOutlineHome className="text-gray-700 xs:text-xs  sm:text-xs lg:text-lg" />
          <span className=" xs:text-xs  sm:text-xs lg:text-lg ">Support</span>
          <div className="flex items-center gap-2">
            <AiOutlineUser className="text-gray-700  xs:text-xs  sm:text-xs lg:text-lg" />
            <span className=" xs:text-xs  sm:text-xs lg:text-lg ">{userFound?.name}</span>
          </div>
        </div>
      </div>
     
      {/* <Header /> */}
      <div className=" p-4 bg-white">
     
      </div>
  
      <div className="max-w-full mx-auto px-4 py-6 grid lg:grid-cols-4 gap-4">
        {
          showSidebar && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
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
{/* 
            {hasBookings && (
              <div>
                <h2 className="font-bold text-lg">Booking Status:</h2>
                {bookingStatuses.map((status, index) => (
                  <p key={index} className="text-gray-700">
                    <span className="font-medium">Status:</span> {status}
                  </p>
                ))}
              </div>
            )} */}

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

{/* <FaUserCircle className="text-indigo-500 text-4xl text-right" /> */}
          {/* <h1 className="text-2xl font-bold mb-4 ">
            Welcome, <span className="text-indigo-500">{userFound?.name}</span>
          </h1> */}
             <Search onSearch={handleSearch} />
          <Tours userData={userFound} filters={filters} />
        </div>
      </div>
      <Banner />
    </div>
    
  );
};

export default UserDashboard;

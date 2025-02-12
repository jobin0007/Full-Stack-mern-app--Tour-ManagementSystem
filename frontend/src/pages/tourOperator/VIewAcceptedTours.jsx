import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { viewAcceptedToursAPI } from '../../services/tourOperatorServices';
import { FaCalendarAlt, FaMoneyBillWave, FaBook, FaUser, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { CiMobile3 } from "react-icons/ci";
import { GiTakeMyMoney } from "react-icons/gi";
import {AiOutlineClose} from "react-icons/ai";


const VIewAcceptedTours = () => {
  const [notification, setNotification] = useState(null);
  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000); 
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ['acceptedTours'],
    queryFn: viewAcceptedToursAPI,
    onError: (error) => {
      showNotification( error?.response?.data?.message, "error"  )

    }
  });

  const response = data?.allAcceptedBookings || [];

  return (
    <div className="container mx-auto max-w-7xl p-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Accepted Tours</h2>

  
   

      {isLoading && (
        <div className="text-center text-gray-500">Loading accepted tours...</div>
      )}


      {!isLoading && response.length === 0 ? (
        <p className="text-center text-gray-500 text-sm md:text-base">No accepted tours found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {response.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="space-y-4">
               
                <div className="flex items-center gap-2">
                  <FaUser className="text-blue-500" />
                  <span className="font-semibold">User Name:</span> {booking.userId?.name || 'N/A'}
                </div>
                <div className="flex items-center gap-2">
                  <CiMobile3 className="text-blue-500" />
                  <span className="font-semibold">Contact Number:</span> {booking.userId?.mobile_number || 'N/A'}
                </div>
                <div className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-yellow-500" />
                  <span className="font-semibold">Total Price:</span> ₹{booking.total_price}
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-500" />
                  <span className="font-semibold">Start Date:</span> {new Date(booking.start_date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-teal-500" />
                  <span className="font-semibold">End Date:</span> {new Date(booking.end_date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold ${booking.booking_status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
                    {booking.booking_status === 'accepted' ? <FaCheckCircle /> : <FaTimesCircle />}
                    {booking.booking_status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                <GiTakeMyMoney className="text-green-500" />

                  <span className="font-semibold">Payment Status:</span> {booking.payment_status}
                </div>
              </div>
            </div>
          ))}
        </div>
      


  
      )}

      
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

export default VIewAcceptedTours;

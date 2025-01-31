import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { viewAcceptedToursAPI } from '../../services/tourOperatorServices';
import { FaCalendarAlt, FaMoneyBillWave, FaBook, FaUser, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { CiMobile3 } from "react-icons/ci";
import { GiTakeMyMoney } from "react-icons/gi";

const VIewAcceptedTours = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ['acceptedTours'],
    queryFn: viewAcceptedToursAPI,
    onError: (error) => {
      setErrorMessage(error?.response?.data?.message || "An error occurred");
    }
  });

  const response = data?.allAcceptedBookings || [];

  return (
    <div className="container mx-auto max-w-7xl p-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Accepted Tours</h2>

      {/* Error Message */}
      {isError && (
        <div className="text-red-500 text-center mb-4">
          <FaTimesCircle className="inline-block mr-2" /> {errorMessage}
        </div>
      )}

      {/* Loader */}
      {isLoading && (
        <div className="text-center text-gray-500">Loading accepted tours...</div>
      )}

      {/* Booking Data */}
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
                {/* <div className="flex items-center gap-2">
                  <GiTakeMyMoney className="text-green-500" />
                  <span className="font-semibold">Tour:</span> {booking.tourId?.title || 'N/A'}
                </div> */}
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

      {/* Success/Backend Message Popup */}
      {errorMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-lg shadow-md w-80">
          <FaTimesCircle className="inline-block mr-2" />
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default VIewAcceptedTours;

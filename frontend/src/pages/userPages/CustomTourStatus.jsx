import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { statusCustomTourAPI } from "../../services/customTourServices";
import { MdCheckCircle, MdError, MdAccessTime } from "react-icons/md";
import {AiOutlineClose} from "react-icons/ai";

const CustomTourStatus = () => {


  const { userId } = useParams();
  const [notification, setNotification] = useState(null);
  const showNotification = (message, type) => {
    setNotification({ message, type });
  
    setTimeout(() => {
      setNotification(null);
    }, 3000); 
  };



  const { data, isLoading, isError } = useQuery({
    queryKey: ["userBookings", userId],
    queryFn: () => statusCustomTourAPI(userId),
  });

  if (isLoading)
    return (
      <div className="p-4 text-gray-600 text-center">Loading status...</div>
    );

  if (isError)
    return (
      <div className="p-4 text-red-500 text-center">
        <MdError className="inline text-2xl mr-2" /> Error fetching tour status.
      </div>
    );

  const bookings = data?.bookings || []; 

  if (bookings.length === 0)
    return (
      <div className="p-4 text-gray-600 text-center">
        <MdAccessTime className="inline text-2xl mr-2" /> No bookings found.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-6 mb-4">
    
      <div className="flex items-center gap-2 mb-4">
        <MdCheckCircle className="text-green-500 text-2xl" />
        <h1 className="text-xl font-semibold">Custom Tour Status</h1>
      </div>
      <p className="text-gray-600 mb-4">{data.message}</p>

      {/* Map through all bookings */}
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="border-t pt-4 pb-4 mb-4 bg-gray-50 p-4 rounded-lg"
        >
          <h2 className="text-lg font-medium text-gray-800 mb-2">
            Tour Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong>Title:</strong> {booking.title}
            </p>
            <p>
              <strong>Location:</strong> {booking.location}
            </p>
            <p>
              <strong>Budget:</strong> ${booking.budget}
            </p>
            <p>
              <strong>Participants:</strong> {booking.participants}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {new Date(booking.start_date).toLocaleDateString()}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {new Date(booking.end_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  booking.status === "accepted"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {booking.status}
              </span>
            </p>
          </div>
        </div>
      ))}

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

export default CustomTourStatus;

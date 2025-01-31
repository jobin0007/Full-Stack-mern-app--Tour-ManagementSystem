import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { IoShieldCheckmarkOutline } from "react-icons/io5";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllCustomToursAPI } from "../../services/customTourServices";
import { getTourOperatorAPI } from "../../services/tourOperatorServices";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { CiMobile3 } from "react-icons/ci";
import {
  acceptBookingAPI,
  getUserBookingsAPI,
  rejectBookingAPI,
} from "../../services/bookingServices";

const TourOperatorDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [totalPrice, setTotalPrice] = useState("");

  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["customTourRequests"],
    queryFn: getAllCustomToursAPI,
  });
  const { tourOperatorId } = useParams();
  const { data: profile } = useQuery({
    queryKey: ["operatorProfile", tourOperatorId],
    queryFn: () => getTourOperatorAPI(tourOperatorId),
  });

  const { mutateAsync: acceptBooking } = useMutation({
    mutationKey: ["accept"],
    mutationFn: acceptBookingAPI,
  });

  const{mutateAsync:rejectBooking}= useMutation({
   mutationKey:['reject'],
   mutationFn:rejectBookingAPI

  })
  const RejectBooking =async(bookingId)=>{
    const response = await rejectBooking(bookingId)
  } 

  const AcceptBooking = async (bookingId) => {
    const response = await acceptBooking(bookingId);
  };

  const { data: bookingsData, error } = useQuery({
    queryKey: ["book"],
    queryFn: getUserBookingsAPI,
  });

  const booking = bookingsData?.bookings;
  // const bookings = bookingsData?.bookings
  console.log(bookingsData);
  const tourOperator = profile?.findPerson;
  const requests = data?.foundTours || [];

  const handleAccept = (request) => {
    setSelectedRequest(request);
    setShowPopup(true);
  };

  const handleReject = (id) => {
    console.log(`Rejected Request ID: ${id}`);
  };

  const handlePopupSubmit = () => {
    console.log(
      `Accepted Request ID: ${selectedRequest?._id}, Total Price: ${totalPrice}`
    );
    setShowPopup(false);
    navigate(`/accepted-tour/${selectedRequest?._id}`);
  };

  if (isLoading) return <div>Loading custom tour requests...</div>;
  if (isError) return <div>Error fetching tour requests!</div>;

  return (
    <div className=" min-h-screen bg-gray-100">
      <header className=" p-4  items-center justify-center">
        <button
          onClick={() => setShowSidebar(true)}
          className="text-gray-700 text-2xl mr-4 "
        >
          <AiOutlineMenu />
        </button>
        <div className="flex flex-col  items-center">
          {/* User Icon */}
          <PiBuildingOfficeBold className="text-gray-700 text-4xl mb-2" />
          <h1 className="text-xl lg:text-2xl font-semibold">
            {tourOperator?.name}
          </h1>
          <p className="text-gray-600 text-sm lg:text-base">
            {tourOperator?.role}
          </p>
        </div>
      </header>

      {showSidebar && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
          <div className="bg-white w-3/4 max-w-xs p-4 flex flex-col">
            <button
              onClick={() => setShowSidebar(false)}
              className="ml-auto text-gray-700 text-xl"
            >
              <AiOutlineClose />
            </button>
            <ul className="space-y-4 mt-4">
              <li>
                <Link
                  to="#"
                  className=" hover:underline flex items-center space-x-2"
                >
                  <CiMobile3 size={24} className="" />

                  <span>Change Mobile Number</span>
                </Link>
              </li>
             
                <Link
                  to="/tours"
                  className=" hover:underline flex items-center space-x-2"
                >
                  <AiOutlineFileText size={24} className="" />
                  <span>Get My Tours</span>
                </Link>
              
             
                <Link
                  to="/create-tour"
                  className=" hover:underline flex items-center space-x-2"
                >
                  <AiOutlineCalendar size={24} className="" />
                  <span>Create Tour</span>
                </Link>
             <Link
             to={`/tour-operator/${tourOperatorId}/view-accepted-tours`}
              className=" hover:underline flex items-center space-x-2">
                <IoShieldCheckmarkOutline size={24}/>
             <span>Accepted Bookings</span>
             </Link>
            </ul>
          </div>
        </div>
      )}
      <div className="p-3 mx-5 flex">
        <p className="font-bold font-serif text-lg">Welcome , </p>
        <p className="mx-3"> {tourOperator.name}</p>
      </div>
      {/* Main Content */}
      <main className="p-4 sm:p-6">
        {/* Custom Tour Requests and Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          <section className="bg-white shadow-lg p-4 rounded-lg">
            <h1 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <AiOutlineFileText size={24} />
              <span>Custom Tour Requests</span>
            </h1>
            <div className="grid grid-cols-1 gap-4">
              {requests.length > 0 ? (
                requests.map((request) => (
                  <div
                    key={request._id}
                    className="bg-white shadow-md p-4 rounded-md flex flex-col space-y-4"
                  >
                    <div className="space-y-2">
                      <h2 className="text-lg font-medium">{request.title}</h2>
                      <p className="text-sm text-gray-600 flex items-center space-x-2">
                        <AiOutlineCalendar />
                        <span>Location: {request.location}</span>
                      </p>
                      <p className="text-sm text-gray-600 flex items-center space-x-2">
                        <AiOutlineFileText />
                        <span>Description: {request.description}</span>
                      </p>
                      <p className="text-sm text-gray-600 flex items-center space-x-2">
                        <AiOutlineDollarCircle />
                        <span>Budget: ${request.budget}</span>
                      </p>
                      <p className="text-sm text-gray-600 flex items-center space-x-2">
                        <AiOutlineUser />
                        <span>Participants: {request.participants}</span>
                      </p>
                      <p className="text-sm text-gray-600 flex items-center space-x-2">
                        <AiOutlineCalendar />
                        <span>
                          Start Date:{" "}
                          {new Date(request.start_date).toLocaleDateString()}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 flex items-center space-x-2">
                        <AiOutlineCalendar />
                        <span>
                          End Date:{" "}
                          {new Date(request.end_date).toLocaleDateString()}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 flex items-center space-x-2">
                        <AiOutlineFileText />
                        <span>Status: {request.status}</span>
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleAccept(request)}
                        className="bg-green-500 text-white px-4 py-2 text-sm rounded-md hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(request._id)}
                        className="bg-red-500 text-white px-4 py-2 text-sm rounded-md hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No custom tour requests at the moment.
                </p>
              )}
            </div>
          </section>
          <section className="bg-white shadow-lg p-6 rounded-lg">
            <h1 className="text-lg lg:text-xl font-semibold mb-6 flex items-center space-x-2">
              <AiOutlineFileText size={24} className="text-blue-500" />
              <span>Bookings</span>
            </h1>
            {booking && booking.length > 0 ? (
              <div className="space-y-4">
                {booking.map((booking) => {
                  const { name, email, mobile_number } = booking.userId;
                  const { total_price, start_date, payment_status } = booking;
                  return (
                    <div
                      key={booking._id}
                      className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                        <h2 className="text-base lg:text-lg font-medium text-gray-800">
                          {name}
                        </h2>
                        <p className="text-sm lg:text-base text-gray-500">
                          {new Date(start_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-sm lg:text-base space-y-2">
                        <p>
                          <span className="font-medium text-gray-700">
                            Email:
                          </span>{" "}
                          {email}
                        </p>
                        <p>
                          <span className="font-medium text-gray-700">
                            Mobile Number:
                          </span>{" "}
                          {mobile_number}
                        </p>
                        <p>
                          <span className="font-medium text-gray-700">
                            Payment Status:
                          </span>{" "}
                          {payment_status}
                        </p>
                        <p>
                          <span className="font-medium text-gray-700">
                            Total Price:
                          </span>{" "}
                          ${total_price.toLocaleString()}
                        </p>
                        <div className="flex flex-row gap-10">
                          <button
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                            onClick={() => AcceptBooking(booking._id)}
                          >
                            Accept
                          </button>
                          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition "
                          onClick={()=>RejectBooking(booking._id)}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500">No bookings found.</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default TourOperatorDashboard;

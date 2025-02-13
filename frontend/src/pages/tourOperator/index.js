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
  AiOutlineLogout,
} from "react-icons/ai";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

import { useMutation, useQuery } from "@tanstack/react-query";
import { acceptCustomTourAPI, getAllCustomToursAPI, rejectCustomTourAPI } from "../../services/customTourServices";
import { getTourOperatorAPI } from "../../services/tourOperatorServices";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { CiMobile3 } from "react-icons/ci";
import {
  acceptBookingAPI,
  getUserBookingsAPI,
  rejectBookingAPI,
} from "../../services/bookingServices";
import useLogout from "../../hooks/useLogout";

const TourOperatorDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [totalPrice, setTotalPrice] = useState("");
  const [notification, setNotification] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const logoutMutation = useLogout()

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

  const { mutateAsync: rejectBooking } = useMutation({
    mutationKey: ['reject'],
    mutationFn: rejectBookingAPI

  })
  const RejectBooking = async (bookingId) => {
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
 
  const tourOperator = profile?.findPerson.name;
  const requests = data?.foundTours || [];


  const { mutateAsync: rejectCustomTour } = useMutation({
    mutationKey: ["rejectCustomTour"],
    mutationFn: rejectCustomTourAPI,
  });

  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleAccept = async () => {
    try {
      if (!selectedRequest) {
        showNotification(" No tour selected!", "error");
        return;
      }
      if (!totalPrice) {
        showNotification(" Enter total price!", "error");
        return;
      }

      await acceptCustomTourAPI(selectedRequest, totalPrice);

      showNotification(" Tour accepted successfully!", "success");
      setShowModal(false);
      setTotalPrice("");
    } catch (error) {
      console.error("API Error:", error);
      showNotification(" Failed to accept the tour.", "error");
    }
  };


  const handleReject = async (foundTourId) => {

    await rejectCustomTour(foundTourId);
    console.log("Tour rejected successfully");

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
    <div className=" min-h-screen p-5 bg-gray-100">
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
            <span className=" xs:text-xs  sm:text-xs lg:text-lg ">{tourOperator}</span>
          </div>
        </div>
      </div>

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
                <IoShieldCheckmarkOutline size={24} />
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
     
      <main className="p-4 sm:p-6">
      
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
                        onClick={() => {
                          setSelectedRequest(request._id);
                          setShowModal(true);
                        }}
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
                    {showModal && (
                      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-md w-96">
                          <h2 className="text-lg font-medium mb-4">Enter Total Price</h2>
                          <input
                            type="number"
                            value={totalPrice}
                            onChange={(e) => setTotalPrice(e.target.value)}
                            placeholder="Enter price"
                            className="w-full p-2 border rounded-md mb-4"
                          />
                          <div className="flex justify-end space-x-4">
                            <button
                              onClick={() => setShowModal(false)}
                              className="bg-gray-500 text-white px-4 py-2 text-sm rounded-md"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleAccept}
                              className="bg-green-500 text-white px-4 py-2 text-sm rounded-md"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
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
                            onClick={() => RejectBooking(booking._id)}
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

export default TourOperatorDashboard;


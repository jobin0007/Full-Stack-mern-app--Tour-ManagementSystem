import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookingAPI } from "../../services/bookingServices";
import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";

import {
  createOrderAPI,
  verifyPaymentAPI,
} from "../../services/paymentServices";
import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaBook,
  FaClock,
  FaUser,
  FaInfoCircle,
  FaTrash,
  FaCreditCard,
} from "react-icons/fa";
import { getStatusIcon } from "../../hooks/status";
import {AiOutlineClose} from "react-icons/ai";
import { viewUserBookingsAPI } from "../../services/userServices";

const ViewBookings = () => {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const [notification, setNotification] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userBookings", userId],
    queryFn: () => viewUserBookingsAPI(userId),
  });
  
 
  const showNotification = (message, type) => {
    setNotification({ message, type });
  
    setTimeout(() => {
      setNotification(null);
    }, 3000); 
  };
  const deleteBookingMutation = useMutation({
    mutationFn: deleteBookingAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["userBookings", userId]);
      showNotification("Booking deleted successfully!", "success"  )
     
    },
    onError: (error) => {
      showNotification(error.response?.data?.message || "Failed to delete booking.", "error"  )
    },
  });

  const initiatePayment = async (bookingId) => {
    const orderData = await createOrderAPI(bookingId);


    const { order_id, amount, currency } = orderData;

    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: amount,
      currency: currency,
      name: "Tour Management",
      description: "Payment for your tour booking",
      order_id: order_id,
      handler: async (response) => {
        const paymentDetails = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          bookingId,
        };

        const verifyResponse = await verifyPaymentAPI(paymentDetails);
        if (verifyResponse.success) {
          alert("Payment successful!");
          queryClient.invalidateQueries(["userBookings", userId]);
        } else {
          alert("Payment verification failed.");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
   console.log("book",data)
  const bookings = data?.bookings|| [];
  const message = data?.message || "";

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">
        Your Bookings
      </h2>

      {isLoading && <p>Loading bookings...</p>}
      {isError && (
        <p className="text-center text-red-500">Failed to load bookings.</p>
      )}

      {!isLoading && bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col gap-3">
                <p className="flex items-center gap-2">
                  <FaBook className="text-green-500" />
                  <strong>Tour:</strong> {booking.tourId?.title || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FaUser className="text-blue-500" />
                  <strong>Operator:</strong>{" "}
                  {booking.tourOperatorId?.name || "N/A"}
                </p>
                <p className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-yellow-500" />
                  <strong>Total Price:</strong> ${booking.total_price}
                </p>
                <p className="flex items-center gap-2">
                  <AlertTriangle className="text-yellow-500" />
                  <strong>Booking Status:</strong>{" "}
                  {getStatusIcon(booking.booking_status)}
                  <span className="capitalize">{booking.booking_status}</span>
                </p>
                <p className="flex items-center gap-2">
                  <FaInfoCircle className="text-red-500" />
                  <strong>Payment Status:</strong> {booking.payment_status}
                </p>
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-teal-500" />
                  <strong>Booking Date:</strong>{" "}
                  {new Date(booking.booking_date).toLocaleString()}
                </p>
                <p className="flex mx-auto font-bold gap-2 ">
               {message}
                </p>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => deleteBookingMutation.mutate(booking._id)}
                    className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition duration-300 text-sm"
                    disabled={deleteBookingMutation.isLoading}
                  >
                    <FaTrash />{" "}
                    {deleteBookingMutation.isLoading ? "Deleting..." : "Delete"}
                  </button>
                  {booking.payment_status !== "paid" && (
                    <button
                      onClick={() => initiatePayment(booking._id)}
                      className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition duration-300 text-sm"
                    >
                      <FaCreditCard /> Make Payment
                    </button>
                  )}
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

export default ViewBookings;

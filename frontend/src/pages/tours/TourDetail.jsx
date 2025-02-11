import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { createBookingAPI } from '../../services/bookingServices';
import { tourDetailAPI } from '../../services/tourServices';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
// import jwtDecode from "jwt-decode";


const TourDetail = () => {
    const token = Cookies.get('UserData')
    const decode  = jwtDecode(token)
    const id = decode.userId
    console.log("Received User Data in TourDetail:", decode.userId);  
       const { tourId } = useParams();
    const queryClient = useQueryClient();
    const [message, setMessage] = useState({ type: "", text: "" });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["searchTours", tourId],
        queryFn: () => tourDetailAPI(tourId)
    });
   console.log(data)
    const bookingMutation = useMutation({
        mutationKey: ["bookings"],
        mutationFn: ({ tourId }) => createBookingAPI(tourId),
        onSuccess: () => {
            setMessage({ type: "success", text: "Booking successful!" });
            queryClient.invalidateQueries(["searchTours"]);
        },
        onError: (error) => {
            setMessage({ type: "error", text: error?.response?.data?.error || "Booking failed" });
        },
    });

    const handleBookingSubmit = async (tourId) => {
        if (!id) {
            setMessage({ type: "error", text: "You must be logged in to book a tour." });
            return;
        }
        if (decode?.role !== "user") {
            setMessage({ type: "error", text: "Only users can book a tour." });
            return;
        }
        try {
            await bookingMutation.mutateAsync({ tourId });
        } catch (error) {
            setMessage({ type: "error", text: error?.response?.data?.error || "Booking failed" });
        }
    };

    if (isLoading) return <p className="text-center text-lg">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load tour details.</p>;

    // Ensure data exists and provide a fallback for `images`
    const coverImage = data?.tour.coverImage|| "https://via.placeholder.com/600"; // Default placeholder image
    const images = data?.tour?.galleryImages|| []; // Default to an empty array
   const tour = data?.tour
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
                {/* Left Section: Cover Image & Additional Images */}
                <div>
                    <img src={coverImage} alt="Tour Cover" className="w-full h-80 object-cover rounded-lg shadow-md" />
                    {images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-4">
                            {images.map((img, index) => (
                                <img key={index} src={img} alt="Tour" className="w-full h-20 object-cover rounded-md shadow-sm" />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Section: Tour Details */}
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-gray-800">{tour?.title || "Tour Title"}</h1>

                    <p className="flex items-center gap-2 text-gray-600">
                        <FaMapMarkerAlt className="text-blue-500" /> {tour.destinations || "Unknown Location"}
                    </p>

                    <p className="flex items-center gap-2 text-gray-600">
                        <FaCalendarAlt className="text-green-500" /> Starting Date: {new Date(tour.start_date).toLocaleDateString() || "N/A"}
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                        <FaCalendarAlt className="text-red-500" /> End Date: {new Date(tour.end_date).toLocaleDateString() || "N/A"}
                    </p>

                    <p className="flex items-center gap-2 text-gray-600">
                        <FaUsers className="text-orange-500" />Operator: {tour.tourOperatorId?.name || "N/A"}
                    </p>

                    <p className="flex items-center gap-2 text-gray-600">
                        <FaMoneyBillWave className="text-yellow-500" /> ${tour.price || "N/A"}
                    </p>

                    <p className="text-gray-700">{tour.description || "No description available."}</p>

                    {/* Booking Button */}
                    <button 
                        onClick={() => handleBookingSubmit(tour?._id)} 
                        className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                    >
                        <FaCheckCircle className="text-lg" /> Book Now
                    </button>
                </div>
            </div>

            {/* Success/Error Message */}
            {message.text && (
                <div className={`fixed bottom-4 right-4 p-4 rounded shadow-md flex items-center gap-2 ${message.type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
                    {message.type === "success" ? <FaCheckCircle className="text-xl" /> : <FaTimesCircle className="text-xl" />}
                    <p>{message.text}</p>
                    <button onClick={() => setMessage({ type: "", text: "" })} className="ml-4 bg-white text-black px-2 py-1 rounded">
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default TourDetail;

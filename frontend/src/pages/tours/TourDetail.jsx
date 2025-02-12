import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { createBookingAPI } from '../../services/bookingServices';
import { tourDetailAPI } from '../../services/tourServices';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import {AiOutlineClose} from "react-icons/ai";


const TourDetail = () => {
    const token = Cookies.get('UserData');
    const decode = token ? jwtDecode(token) : null; 
    const id = decode?.userId;
    

    const { tourId } = useParams();
    const queryClient = useQueryClient();
    const [notification, setNotification] = useState(null);
  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000); 
  };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["searchTours", tourId],
        queryFn: () => tourDetailAPI(tourId)
    });


    const bookingMutation = useMutation({
        mutationKey: ["bookings"],
        mutationFn: ({ tourId }) => createBookingAPI(tourId),
        onSuccess: () => {
            
            showNotification(  "Booking successful!", "success"  )
            queryClient.invalidateQueries(["searchTours"]);
        },
        onError: (error) => {
            showNotification(  error?.response?.data?.error, "error"  )
        },
    });

    const handleBookingSubmit = async (tourId) => {
        if (!id) {
        
            showNotification(  "You must be logged in to book a tour", "error"  )
           
            return;
        }
        if (decode?.role !== "user") {
            showNotification(  "Only users can book a tour", "error"  )
          
            return;
        }
        try {
            await bookingMutation.mutateAsync({ tourId });
        } catch (error) {
            showNotification(  error?.response?.data?.error || "Booking failed", "error"  )
          
        }
    };

    if (isLoading) return <p className="text-center text-lg">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load tour details.</p>;

    const coverImage = data?.tour?.coverImage || "https://via.placeholder.com/600";
    const images = data?.tour?.galleryImages || [];
    const tour = data?.tour;

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
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
                        <FaUsers className="text-orange-500" /> Operator: {tour.tourOperatorId?.name || "N/A"}
                    </p>

                    <p className="flex items-center gap-2 text-gray-600">
                        <FaMoneyBillWave className="text-yellow-500" /> ${tour.price || "N/A"}
                    </p>

                    <p className="text-gray-700">{tour.description || "No description available."}</p>

                    
                        <button 
                            onClick={() => handleBookingSubmit(tour?._id)} 
                            className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                        >
                            <FaCheckCircle className="text-lg" /> Book Now
                        </button>
                   
                </div>
            </div>

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


export default TourDetail;

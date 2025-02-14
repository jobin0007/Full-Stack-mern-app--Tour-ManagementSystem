// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import React, { useState } from 'react';
// import { createBookingAPI } from '../../services/bookingServices';
// import { tourDetailAPI } from '../../services/tourServices';
// import { useParams } from 'react-router-dom';
// import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode';
// import {AiOutlineClose} from "react-icons/ai";


// const TourDetail = () => {
//     const token = Cookies.get('UserData');
//     const decode = token ? jwtDecode(token) : null; 
//     const id = decode?.userId;
    

//     const { tourId } = useParams();
//     const queryClient = useQueryClient();
//     const [notification, setNotification] = useState(null);
//   const showNotification = (message, type) => {
//     setNotification({ message, type });

//     setTimeout(() => {
//       setNotification(null);
//     }, 3000); 
//   };

//     const { data, isLoading, isError } = useQuery({
//         queryKey: ["searchTours", tourId],
//         queryFn: () => tourDetailAPI(tourId)
//     });


//     const bookingMutation = useMutation({
//         mutationKey: ["bookings"],
//         mutationFn: ({ tourId }) => createBookingAPI(tourId),
//         onSuccess: () => {
            
//             showNotification(  "Booking successful!", "success"  )
//             queryClient.invalidateQueries(["searchTours"]);
//         },
//         onError: (error) => {
//             showNotification(  error?.response?.data?.error, "error"  )
//         },
//     });

//     const handleBookingSubmit = async (tourId) => {
//         if (!id) {
        
//             showNotification(  "You must be logged in to book a tour", "error"  )
           
//             return;
//         }
//         if (decode?.role !== "user") {
//             showNotification(  "Only users can book a tour", "error"  )
          
//             return;
//         }
//         try {
//             await bookingMutation.mutateAsync({ tourId });
//         } catch (error) {
//             showNotification(  error?.response?.data?.error || "Booking failed", "error"  )
          
//         }
//     };

//     if (isLoading) return <p className="text-center text-lg">Loading...</p>;
//     if (isError) return <p className="text-center text-red-500">Failed to load tour details.</p>;

//     const coverImage = data?.tour?.coverImage || "https://via.placeholder.com/600";
//     const images = data?.tour?.galleryImages || [];
//     const tour = data?.tour;

//     return (
//         <div className="container mx-auto px-4 py-6">
//             <div className="grid grid-cols-2 lg:grid-cols-2 gap-8">
//                 <div>
//                     <img src={coverImage} alt="Tour Cover" className="w-full h-80 object-cover rounded-lg shadow-md" />
//                     {images.length > 0 && (
//                         <div className="grid grid-cols-3 gap-2 mt-4">
//                             {images.map((img, index) => (
//                                 <img key={index} src={img} alt="Tour" className="w-full h-20 object-cover rounded-md shadow-sm" />
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 <div className="space-y-4">
//                     <h1 className="text-2xl font-bold text-gray-800">{tour?.title || "Tour Title"}</h1>

//                     <p className="flex items-center gap-2 text-gray-600">
//                         <FaMapMarkerAlt className="text-blue-500" /> {tour.destinations || "Unknown Location"}
//                     </p>

//                     <p className="flex items-center gap-2 text-gray-600">
//                         <FaCalendarAlt className="text-green-500" /> Starting Date: {new Date(tour.start_date).toLocaleDateString() || "N/A"}
//                     </p>
//                     <p className="flex items-center gap-2 text-gray-600">
//                         <FaCalendarAlt className="text-red-500" /> End Date: {new Date(tour.end_date).toLocaleDateString() || "N/A"}
//                     </p>

//                     <p className="flex items-center gap-2 text-gray-600">
//                         <FaUsers className="text-orange-500" /> Operator: {tour.tourOperatorId?.name || "N/A"}
//                     </p>

//                     <p className="flex items-center gap-2 text-gray-600">
//                         <FaMoneyBillWave className="text-yellow-500" /> ${tour.price || "N/A"}
//                     </p>

//                     <p className="text-gray-700">{tour.description || "No description available."}</p>

                    
//                         <button 
//                             onClick={() => handleBookingSubmit(tour?._id)} 
//                             className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
//                         >
//                             <FaCheckCircle className="text-lg" /> Book Now
//                         </button>
                   
//                 </div>
//             </div>

//             {notification && (
//         <div className={`fixed  right-4 z-50 bottom-4  px-4 py-2 rounded-md text-white shadow-lg flex items-center space-x-2 
//           ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
//           <span>{notification.message}</span>
//           <button onClick={() => setNotification(null)} className="text-white ml-2">
//             <AiOutlineClose />
//           </button>
//         </div>
//       )}
//         </div>
//     );
// };


// export default TourDetail;


// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import React, { useState } from 'react';
// import { createBookingAPI } from '../../services/bookingServices';
// import { tourDetailAPI } from '../../services/tourServices';
// import { useParams } from 'react-router-dom';
// import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";
// import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode';
// import { AiOutlineClose } from "react-icons/ai";

// const TourDetail = () => {
//     const token = Cookies.get('UserData');
//     const decode = token ? jwtDecode(token) : null; 
//     const id = decode?.userId;
//     const { tourId } = useParams();
//     const queryClient = useQueryClient();
//     const [notification, setNotification] = useState(null);

//     const showNotification = (message, type) => {
//         setNotification({ message, type });
//         setTimeout(() => {
//             setNotification(null);
//         }, 3000);
//     };

//     const { data, isLoading, isError } = useQuery({
//         queryKey: ["searchTours", tourId],
//         queryFn: () => tourDetailAPI(tourId)
//     });

//     const bookingMutation = useMutation({
//         mutationKey: ["bookings"],
//         mutationFn: ({ tourId }) => createBookingAPI(tourId),
//         onSuccess: () => {
//             showNotification("Booking successful!", "success");
//             queryClient.invalidateQueries(["searchTours"]);
//         },
//         onError: (error) => {
//             showNotification(error?.response?.data?.error, "error");
//         },
//     });

//     const handleBookingSubmit = async (tourId) => {
//         if (!id) {
//             showNotification("You must be logged in to book a tour", "error");
//             return;
//         }
//         if (decode?.role !== "user") {
//             showNotification("Only users can book a tour", "error");
//             return;
//         }
//         try {
//             await bookingMutation.mutateAsync({ tourId });
//         } catch (error) {
//             showNotification(error?.response?.data?.error || "Booking failed", "error");
//         }
//     };

//     if (isLoading) return <p className="text-center text-lg">Loading...</p>;
//     if (isError) return <p className="text-center text-red-500">Failed to load tour details.</p>;

//     const coverImage = data?.tour?.coverImage || "https://via.placeholder.com/600";
//     const images = data?.tour?.galleryImages || [];
//     const tour = data?.tour;

//     return (
//         <div className="container mx-auto px-4 py-6">
//             <h1 className="text-4xl font-bold text-gray-800 text-left mb-4">{tour?.title || "Tour Title"}</h1>
//             <div className="relative bg-white shadow-md rounded-lg p-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <img src={coverImage} alt="Tour Cover" className="w-full h-[400px] object-cover rounded-lg shadow-md" />
//                     <div className="flex flex-col justify-between">
//                         <div className="border p-4 rounded-lg shadow-md text-center">
//                             <p className="text-3xl font-bold text-gray-800 underline decoration-wavy">${tour.price || "N/A"}</p>
//                             <button 
//                                 onClick={() => handleBookingSubmit(tour?._id)}
//                                 className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all w-full"
//                             >
//                                 <FaCheckCircle className="inline-block mr-2" /> Book Now
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <p className="text-lg text-gray-700 mt-6">{tour.description || "No description available."}</p>
//                 <h2 className="text-3xl font-bold text-gray-800 mt-6">Photo Gallery</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 border p-4 rounded-lg shadow-md">
//                     {images.length > 0 ? images.map((img, index) => (
//                         <img key={index} src={img} alt="Tour" className="w-full h-40 object-cover rounded-md shadow-sm" />
//                     )) : <p className="text-center">No images available</p>}
//                 </div>
//                 <div className="mt-6 space-y-3 text-lg">
//                     <p className="flex items-center gap-2 text-gray-600">
//                         <FaMapMarkerAlt className="text-blue-500" /> {tour.destinations || "Unknown Location"}
//                     </p>
//                     <p className="flex items-center gap-2 text-gray-600">
//                         <FaCalendarAlt className="text-green-500" /> Starting Date: {new Date(tour.start_date).toLocaleDateString() || "N/A"}
//                     </p>
//                     <p className="flex items-center gap-2 text-gray-600">
//                         <FaCalendarAlt className="text-red-500" /> End Date: {new Date(tour.end_date).toLocaleDateString() || "N/A"}
//                     </p>
//                     <p className="flex items-center gap-2 text-gray-600">
//                         <FaUsers className="text-orange-500" /> Operator: {tour.tourOperatorId?.name || "N/A"}
//                     </p>
//                 </div>
//             </div>
//             {notification && (
//                 <div className={`fixed right-4 bottom-4 z-50 px-4 py-2 rounded-md text-white shadow-lg flex items-center space-x-2 ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
//                     <span>{notification.message}</span>
//                     <button onClick={() => setNotification(null)} className="text-white ml-2">
//                         <AiOutlineClose />
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TourDetail;

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { createBookingAPI } from '../../services/bookingServices';
import { tourDetailAPI } from '../../services/tourServices';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaCheckCircle } from "react-icons/fa";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { AiOutlineClose } from "react-icons/ai";

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
            showNotification("Booking successful!", "success");
            queryClient.invalidateQueries(["searchTours"]);
        },
        onError: (error) => {
            showNotification(error?.response?.data?.error, "error");
        },
    });

    const handleBookingSubmit = async (tourId) => {
        if (!id) {
            showNotification("You must be logged in to book a tour", "error");
            return;
        }
        if (decode?.role !== "user") {
            showNotification("Only users can book a tour", "error");
            return;
        }
        try {
            await bookingMutation.mutateAsync({ tourId });
        } catch (error) {
            showNotification(error?.response?.data?.error || "Booking failed", "error");
        }
    };

    if (isLoading) return <p className="text-center text-lg">Loading...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load tour details.</p>;

    const coverImage = data?.tour?.coverImage || "https://via.placeholder.com/600";
    const images = data?.tour?.galleryImages || [];
    const tour = data?.tour;

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl  text-gray-800 text-left mb-4 font-bold font-montserrat">
                {tour?.title || "Tour Title"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 w-full">
    {/* Image Section */}
    <div className="flex justify-center">
        <img 
            src={coverImage} 
            alt="Tour Cover" 
            className="w-full max-w-[1200px] h-auto object-cover rounded-lg shadow-md"
        />
    </div>

    {/* Price & Booking Section */}
    <div className="flex flex-col items-center justify-center px-4">
        <div className="border p-6 rounded-lg shadow-md text-center w-full max-w-xs bg-gray-50">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl  text-gray-800 font-bold font-montserrat">
                INR:  {tour.price || "N/A"}
            </p>
            <div className="w-4/5 border-b-2 border-gray-500 mx-auto"></div>

            <button 
                onClick={() => handleBookingSubmit(tour?._id)}
                className="mt-4 px-6 py-2 text-sm sm:text-base bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-all flex items-center justify-center mx-auto"
            >
                <FaCheckCircle className="mr-2" /> Book Now
            </button>
        </div>
    </div>
</div>


            <p className="text-xs sm:text-sm md:text-md lg:text-lg text-gray-700 text-center mt-6 font-bold font-montserrat">{tour.description || "No description available."}</p>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-bold text-gray-800 mt-6 font-montserrat">Photo Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 p-8">
                {images.length > 0 ? images.map((img, index) => (
                    <img key={index} src={img} alt="Tour" className="w-full h-48 object-cover rounded-md border border-black shadow-sm" />
                )) : <p className="text-center">No images available</p>}
            </div>

            <div className="grid grid-cols-1 gap-3 mt-6 text-xs sm:text-sm md:text-md lg:text-lg font-montserrat">
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
            </div>

            {notification && (
                <div className={`fixed right-4 bottom-4 z-50 px-4 py-2 rounded-md text-white shadow-lg flex items-center space-x-2 
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

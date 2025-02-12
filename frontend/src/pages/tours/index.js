import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { searchToursAPI } from "../../services/tourServices";
import { createBookingAPI } from "../../services/bookingServices";
import { useNavigate, useParams } from "react-router-dom";
import {AiOutlineClose} from "react-icons/ai";

const Tours = ({ filters}) => {
  
  const navigate = useNavigate()

  const [filteredTours, setFilteredTours] = useState([]);
  const [notification, setNotification] = useState(null);
  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000); 
  };


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["searchTours", filters],
    queryFn: () => searchToursAPI(filters),
    
  });

  useEffect(() => {
    if (data?.results) {
      setFilteredTours(data.results);
    }
  }, [data]);


  const handleBookingSubmit = async (tourId) => {
    navigate(`/tour/${tourId}`)
  };

  if (isLoading) return <div className="text-center p-4">Loading tours...</div>;
  if (filteredTours.length === 0) return <div className="text-center mt-4">No tours available at the moment.</div>;
  if (isError)
    return <div className="text-red-500 text-center mt-4">Error: {error?.message || "Failed to fetch tours"}</div>;

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 font-vollkorn text-center">Available Tours</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
        {filteredTours.map((tour) => (
          <div key={tour._id} className="border rounded-lg shadow-md p-4 hover:shadow-lg flex flex-col justify-between">
             <button
              onClick={() => handleBookingSubmit(tour._id)}
             
            >
            <div>
              <img
                src={tour.coverImage}
                alt="Tour Cover"
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover rounded-md shadow-md"
              />
           
              <h2 className="text-lg sm:text-xl font-vollkorn mt-3">{tour.title}</h2>
              <p className="text-gray-500 text-sm sm:text-base font-vollkorn">Destinations: {tour.destinations || "N/A"}</p>
              <p className="text-gray-500 text-sm sm:text-base font-vollkorn">Price: ${tour.price}</p>
            </div>
           
              
            </button>
          </div>
        ))}
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

export default Tours;

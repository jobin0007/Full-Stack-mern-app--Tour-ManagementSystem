import React, { useState } from "react";
import Tours from "../tours";
import { toursAPI } from "../../services/tourServices";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTourAPI } from "../../services/adminServices";

  
// if (isLoading) {
//   return <div className="text-center mt-4">Loading tours...</div>;
// }

// if (isError) {
//   return <div className="text-red-500 text-center mt-4">Error: {error?.message || "Failed to fetch tours"}</div>;
// }

// if (displayedTours.length === 0) {
//   return <div className="text-center mt-4">No tours available at the moment.</div>;
// }

const Tour = () => {
  const [message, setMessage] = useState({ text: "", type: "" });

  const queryClient = useQueryClient(); // Hook to interact with React Query cache

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tours"],
    queryFn: toursAPI,
  });

  const handleDelete = async (tourId) => {
    try {
      await deleteTourAPI(tourId);
  
      queryClient.invalidateQueries(["tours"]);
  
      setMessage({ text: "Tour deleted successfully", type: "success" });
      setTimeout(() => {
        setMessage({ text: "", type: "" }); 
      }, 3000);
    } catch (error) {
      console.error("Error deleting Tour:", error);
    
      setMessage({ text: "Failed to delete Tur", type: "error" });
      setTimeout(() => {
        setMessage({ text: "", type: "" }); 
      }, 2000);
    }
  };
  
 

  const tours = data?.getTour || [];
  return (
    <div>
      <h2 className="text-xl font-semibold text-sky-500 mb-4">All Tours</h2>
      {message.text && (
            <div
              className={`text-center p-4 mb-6 rounded-md ${
                message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg flex flex-col justify-between"
          >
            <div>
            <img 
          // key={index} 
          src={tour?.coverImage
            
          } 
          alt={`Gallery Image `} 
          className="w-full h-40 object-fill bg-cover  rounded-md shadow-md"
        />
         <div className="grid grid-cols-3 gap-2 mt-2">
              {tour.galleryImages?.slice(0, 3).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="h-20 w-full object-cover rounded-md shadow-sm"
                />
              ))}
            </div>
              
              <h2 className="text-xl font-semibold mb-2">{tour.title}</h2>
              <p className="text-gray-700 mb-2">{tour.description}</p>
              <p className="text-gray-500 mb-1">Price: ${tour.price}</p>
              <p className="text-gray-500">Operator: {tour.tourOperatorId?.name || "N/A"}</p>
            </div>
            <button
             onClick={() => handleDelete(tour?._id)}
              // onClick={() => handleTourClick()}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
            >
             Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Tour;

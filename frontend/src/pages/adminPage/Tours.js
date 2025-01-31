import React from "react";
import Tours from "../tours";
import { toursAPI } from "../../services/tourServices";
import { useQuery } from "@tanstack/react-query";


  
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
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tours"],
    queryFn: toursAPI,
  });

  const tours = data?.getTour || [];
  return (
    <div>
      <h2 className="text-xl font-semibold text-sky-500 mb-4">All Tours</h2>
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
              
              <h2 className="text-xl font-semibold mb-2">{tour.title}</h2>
              <p className="text-gray-700 mb-2">{tour.description}</p>
              <p className="text-gray-500 mb-1">Price: ${tour.price}</p>
              <p className="text-gray-500">Operator: {tour.tourOperatorId?.name || "N/A"}</p>
            </div>
            <button
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


import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { searchToursAPI } from "../../services/tourServices";
import { createBookingAPI } from "../../services/bookingServices";

const Tours = ({ userData, filters }) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState({ type: "", text: "" });
  const [filteredTours, setFilteredTours] = useState([]);

  // Fetch Tours based on filters
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["searchTours", filters],
    queryFn: () => searchToursAPI(filters),
  });

  useEffect(() => {
    if (data?.results) {
      setFilteredTours(data.results);
    }
  }, [data]);

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
    if (!userData) {
      setMessage({ type: "error", text: "You must be logged in to book a tour." });
      return;
    }
    if (userData?.role !== "user") {
      setMessage({ type: "error", text: "Only users can book a tour." });
      return;
    }
    
    try {
      await bookingMutation.mutateAsync({ tourId });
    } catch (error) {
      setMessage({ type: "error", text: error?.response?.data?.error || "Booking failed" });
    }
  };

  if (isLoading) return <div>Loading tours...</div>;
  if (isError)
    return <div className="text-red-500 text-center mt-4">Error: {error?.message || "Failed to fetch tours"}</div>;
  if (filteredTours.length === 0) return <div className="text-center mt-4">No tours available at the moment.</div>;

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Available Tours</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredTours.map((tour) => (
          <div key={tour._id} className="border rounded-lg shadow-md p-4 hover:shadow-lg flex flex-col">
            <img
              src={tour.coverImage}
              alt="Tour Cover"
              className="w-full h-56 md:h-64 lg:h-80 object-cover rounded-md shadow-md"
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
            <h2 className="text-xl font-semibold mt-3">{tour.title}</h2>
            <p className="text-gray-700">{tour.description}</p>
            <p className="text-gray-500">Destinations: {tour.destinations || "N/A"}</p>
            <p className="text-gray-500">Price: ${tour.price}</p>
            <p className="text-gray-500">Operator: {tour.tourOperatorId?.name || "N/A"}</p>
            <p className="text-gray-500">Starting Date: {new Date(tour.start_date).toLocaleDateString() || "N/A"}</p>
            <p className="text-gray-500">Ending Date: {new Date(tour.end_date).toLocaleDateString() || "N/A"}</p>
            <button
              onClick={() => handleBookingSubmit(tour._id)}
              className="bg-blue-500 border text-white py-2 px-4 rounded mt-4 mx-auto hover:bg-white hover:text-blue-500 w-1/2 transition duration-300"
            >
              Book the Tour
            </button>
          </div>
        ))}
      </div>

      {message.text && (
        <div className={`fixed bottom-4 right-4 p-4 rounded shadow-md ${message.type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
          <p>{message.text}</p>
          <button onClick={() => setMessage({ type: "", text: "" })} className="mt-2 bg-white text-black px-2 py-1 rounded">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Tours;


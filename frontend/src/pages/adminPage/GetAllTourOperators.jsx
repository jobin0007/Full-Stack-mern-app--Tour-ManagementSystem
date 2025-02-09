// src/components/GetAllTourOperators.js
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Import Trash icon from React Icons
import { deleteTourOpeartorAPI, getAllTourOPeartorsAPI, getAllUsersAPI } from '../../services/adminServices';

const GetAllTourOperators = () => {
    const [message, setMessage] = useState({ text: "", type: "" });
    const queryClient = useQueryClient(); // Hook to interact with React Query cache
  
    // Fetch users data using React Query
    const { data, isLoading, isError, error } = useQuery({
      queryKey: ["operators"],
      queryFn: getAllTourOPeartorsAPI,
    });
  console.log(data)
    const operators = data?.allOperators|| [];
  console.log(operators);
    // Handle delete user
    const handleDelete = async (operatorId) => {
      try {
        // Call the API to delete the user
        await deleteTourOpeartorAPI(operatorId);
  
        // After successfully deleting, invalidate the query to refetch the data
        queryClient.invalidateQueries(["operators"]);
  
        // Show success message and hide after 3 seconds
        setMessage({ text: "Tour Operator deleted successfully", type: "success" });
        setTimeout(() => {
          setMessage({ text: "", type: "" }); // Clear message after 3 seconds
        }, 3000);
      } catch (error) {
        console.error("Error deleting user:", error);
        // Show error message and hide after 3 seconds
        setMessage({ text: "Failed to delete user", type: "error" });
        setTimeout(() => {
          setMessage({ text: "", type: "" }); // Clear message after 2 seconds
        }, 2000);
      }
    };
  
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

  return (

    
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">All Users</h1>
    
          {/* Show message if available */}
          {message.text && (
            <div
              className={`text-center p-4 mb-6 rounded-md ${
                message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}
    
          {/* Show "No users found" message if there are no users */}
          {operators.length === 0 ? (
            <div className="text-center p-4 mb-6 bg-yellow-100 text-yellow-700 rounded-md">
              No Tour Operators found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {operators.map((user) => (
                <div
                  key={user.id}
                  className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center text-center"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h2>
                  <p className="text-gray-600 mb-4">{user.email}</p>
                  <button
                    onClick={() => handleDelete(user?._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt className="inline-block text-xl" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
  );
};

export default GetAllTourOperators;

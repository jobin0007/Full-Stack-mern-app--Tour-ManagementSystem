import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import {
  deleteTourOpeartorAPI,
  getAllTourOPeartorsAPI,
 
} from "../../services/adminServices";

const GetAllTourOperators = () => {
  const queryClient = useQueryClient();

  const [notification, setNotification] = useState(null);
  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["operators"],
    queryFn: getAllTourOPeartorsAPI,
  });

  const operators = data?.allOperators || [];

  const handleDelete = async (operatorId) => {
    try {
      await deleteTourOpeartorAPI(operatorId);

      queryClient.invalidateQueries(["operators"]);

      showNotification("Tour Operator deleted successfully", "success");
    } catch (error) {
      showNotification("Failed to delete user", "error");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        All Users
      </h1>
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
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {user.name}
              </h2>
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
      {notification && (
        <div
          className={`fixed  right-4 z-50 bottom-4  px-4 py-2 rounded-md text-white shadow-lg flex items-center space-x-2 
          ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="text-white ml-2"
          >
            <AiOutlineClose />
          </button>
        </div>
      )}
    </div>
  );
};

export default GetAllTourOperators;

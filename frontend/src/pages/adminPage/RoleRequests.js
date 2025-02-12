import React, { useState } from "react";
import { acceptRoleRequestAPI, cancelRoleRequestAPI, getAllRoleRequestsAPI } from "../../services/adminServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import {AiOutlineClose} from "react-icons/ai";

const RoleRequests = () => {

  const [notification, setNotification] = useState(null);
  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000); 
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["requests"],
    queryFn: getAllRoleRequestsAPI,
  });

  const acceptMutation = useMutation( {
    mutationFn: acceptRoleRequestAPI,
    mutationKey: ["acceptRoleRequest"],
    onSuccess: (response) => {
      
      showNotification( response?.message , "success" )

    },
    onError: (err) => {
      showNotification(  err?.response?.data?.message, "error" )
      
    },
  });



  const cancelMutation = useMutation({
    mutationFn:cancelRoleRequestAPI,
    mutationKey:["cancelRoleRequest"],
    onSuccess: (response) => {
      showNotification( response?.message , "success" )
    },
    onError: (err) => {
      showNotification(  err?.response?.data?.message, "error" )
    },
  });
  const handleAccept = async (requestId) => {
    await acceptMutation.mutateAsync(requestId);
  };

  const handleCancel = async (requestId) => {
    await cancelMutation.mutateAsync(requestId);
  };



  if (isLoading) return <div>Loading role requests...</div>;

  if (isError) {
    return (
      <div className="text-red-500">
        Error: {error?.message || "Failed to fetch role requests."}
      </div>
    );
  }

  const requests = data?.requests || [];

  return (
    <div>
      <h2 className="p-5 text-xl font-semibold text-sky-500 mb-4">Role Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-700 p-5 border shadow-md w-1/2 mx-auto">No role change requests found.</p>
      ) : (
        <ul className="space-y-3">
          {requests.map((req) => (
            <li
              key={req._id}
              className="bg-sky-50 p-4 rounded-md flex flex-col space-y-3 shadow-sm"
            >
              <div>
                <p className="text-gray-700 font-medium">
                  <span className="text-sky-500">Role:</span> {req?.userId?.role || "N/A"}
                </p>
                <p className="text-gray-700">
                  <span className="text-sky-500">Name:</span> {req?.userId?.name || "N/A"}
                </p>
                <p className="text-gray-700">
                  <span className="text-sky-500">Email:</span> {req?.userId?.email || "N/A"}
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleAccept(req._id)}
                  className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition'
                >
                  Accept
                </button>
                <button
                  onClick={() => handleCancel(req._id)}
                  className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition '
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="bg-white shadow-md rounded-md p-6 lg:col-span-4">
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
    </div>
  );
};

export default RoleRequests;

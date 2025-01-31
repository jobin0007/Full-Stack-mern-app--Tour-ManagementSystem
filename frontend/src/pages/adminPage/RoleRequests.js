import React, { useState } from "react";
import { acceptRoleRequestAPI, cancelRoleRequestAPI, getAllRoleRequestsAPI } from "../../services/adminServices";
import { useMutation, useQuery } from "@tanstack/react-query";

const RoleRequests = () => {

  const[message,setMessage]=  useState({ text: "", type: "" });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["requests"],
    queryFn: getAllRoleRequestsAPI,
  });

  // const { mutateAsync, isLoading: isMutating } = useMutation({
  //   mutationFn: acceptRoleRequestAPI,
  //   mutationKey: ["acceptRoleRequest"],
  // });
  // const {cancelAsync}=useMutation({
  //   mutationFn:cancelRoleRequestAPI,
  //   mutationKey:["cancelRoleRequest"]
  // })
  // Accept and cancel role request mutations
  const acceptMutation = useMutation( {
    mutationFn: acceptRoleRequestAPI,
    mutationKey: ["acceptRoleRequest"],
    onSuccess: (response) => {
      setMessage({ text: response?.message , type: "success" });
    },
    onError: (err) => {
      setMessage({ text: err?.response?.data?.message , type: "error" });
    },
  });



  const cancelMutation = useMutation({
    mutationFn:cancelRoleRequestAPI,
    mutationKey:["cancelRoleRequest"],
    onSuccess: (response) => {
      setMessage({ text: response?.message , type: "success" });
    },
    onError: (err) => {
      setMessage({ text: err?.response?.data?.error || "Failed to cancel request", type: "error" });
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
      <h2 className="text-xl font-semibold text-sky-500 mb-4">Role Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-700">No role change requests found.</p>
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
        {
          message.text && (
            <div
            className={`p-4 mb-4 rounded-md text-white ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message.text}
          </div>
          )
        }
      </div>
    </div>
  );
};

export default RoleRequests;

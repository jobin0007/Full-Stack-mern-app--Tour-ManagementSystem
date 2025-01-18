import React from "react";
import {  acceptRoleRequestAPI, getAllRoleRequestsAPI } from "../../services/adminServices";
import { useMutation, useQuery } from "@tanstack/react-query";


const RoleRequests = () => {


  const { mutateAsync} = useMutation({
    mutationFn:acceptRoleRequestAPI,
    mutationKey:["request"]
    })


    const handleAccept = async (requestId) => {
      try {
        const response = await mutateAsync(requestId);
        console.log("Response from accept API:", response);
        // Optionally refetch the role requests after a successful mutation
      } catch (error) {
        console.error("Error handling accept:", error.message);
      }
    };
    const { data, isLoading, isError, error } = useQuery({
      // Cookies.set("AdminData", data?.token);
      // const decoded = jwtDecode(data.token);
      // dispatch(login({ admin: decoded, token: data.token }));
        queryKey: ["requests"], 

        queryFn: getAllRoleRequestsAPI, 
        
      });
       
    
      const request = data?.requests  

    
      
      if (isLoading) return <div>Loading tours...</div>;
    
     
      if (isError) {
        return (
          <div className="text-red-500">
            Error: {error?.message || "Failed to fetch tours"}
          </div>
        );
      }
    
      
    //   if (tours.length === 0) {
    //     return <div>No tours available at the moment.</div>;
    //   }







  return (
    <div>
    <h2 className="text-xl font-semibold text-sky-500 mb-4">Role Requests</h2>
    <ul className="space-y-3">
      {request.map((request) => (
        <li
          key={request._id}
          className="bg-sky-50 p-3 rounded-md flex items-center justify-between shadow-sm"
        >
          <div>
            <p className="text-gray-700 font-medium">
              <span className="text-sky-500">{request?.userId?.role}</span>
            </p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => handleAccept(request?._id)}
              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Accept
            </button>
            <button
              // onClick={() => handleCancel(request._id)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default RoleRequests;

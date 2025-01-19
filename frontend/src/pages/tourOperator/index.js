import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCheck, AiOutlineClose, AiOutlineHome } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { getAllCustomToursAPI } from "../../services/customTourServices";

const TourOperatorDashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [totalPrice, setTotalPrice] = useState("");
  const navigate = useNavigate();

  // Fetching custom tour requests from the API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["customTourRequests"],
    queryFn: getAllCustomToursAPI,
  });

  const requests = data?.foundTours || [];

  const handleAccept = (request) => {
    setSelectedRequest(request);
    setShowPopup(true);
  };

  const handleReject = (id) => {
    console.log(`Rejected Request ID: ${id}`);
    // Add logic for rejecting a tour request (e.g., API call or state update)
  };

  const handlePopupSubmit = () => {
    console.log(
      `Accepted Request ID: ${selectedRequest?._id}, Total Price: ${totalPrice}`
    );
    setShowPopup(false);
    navigate(`/accepted-tour/${selectedRequest?._id}`);
  };

  // Handle loading and error states
  if (isLoading) return <div>Loading custom tour requests...</div>;
  if (isError) return <div>Error fetching tour requests!</div>;

  return (
    <div className="min-h-screen p-3 grid grid-cols-1 lg:grid-cols-4 bg-gray-100">
      {console.log("data", data)}

      {/* Sidebar */}
      <aside className="bg-white shadow-lg p-4">
        <div className="text-center mb-8">
          <AiOutlineHome className="text-sky-500 mx-auto mb-2" size={40} />
          <h2 className="text-xl font-semibold">Tour Operator</h2>
        </div>
        <ul className="space-y-4">
          <li>
            <Link to="#" className="text-sky-500 hover:underline">
              Change Mobile Number
            </Link>
          </li>
          <li>
            <Link to="/tours" className="text-sky-500 hover:underline">
              Get My Tours
            </Link>
          </li>
          <li>
            <Link to="/create-tour" className="text-sky-500 hover:underline">
              Create Tour
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="col-span-3 p-4">
        <h1 className="text-2xl font-semibold mb-4">Custom Tour Requests</h1>

        <div className="space-y-4">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div
                key={request._id}
                className="bg-white shadow-md p-4 rounded-md flex justify-between items-start"
              >
                <div>
                  <h2 className="text-lg font-medium">{request.title}</h2>
                  <p className="text-gray-600">Location: {request.location}</p>
                  <p className="text-gray-600">Budget: ${request.budget}</p>
                  <p className="text-gray-600">
                    Participants: {request.participants}
                  </p>
                  <p className="text-gray-600">
                    Start Date:{" "}
                    {new Date(request.start_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    End Date: {new Date(request.end_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">Status: {request.status}</p>
                </div>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleAccept(request)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    <AiOutlineCheck size={20} />
                  </button>
                  <button
                    onClick={() => handleReject(request._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    <AiOutlineClose size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No custom tour requests at the moment.</p>
          )}
        </div>
      </main>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-medium mb-4">
              Enter Total Price for {selectedRequest?.title}
            </h3>
            <input
              type="number"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              placeholder="Enter total price"
              className="border w-full px-4 py-2 rounded-md mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handlePopupSubmit}
                className="bg-sky-500 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourOperatorDashboard;

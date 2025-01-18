import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaUserEdit, FaBook, FaTrashAlt, FaBars } from "react-icons/fa";
import { getOneUserAPI } from "../../services/userServices";
import Tours from "../tours";

const UserDashboard = () => {
  const { id: userId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getOneUserAPI(userId),
  });

  // State to manage sidebar visibility on small screens
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  const { userFound } = data;

  const deleteTour = (id) => {
    console.log(`Tour with ID ${id} deleted`);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-5 gap-4">
        {/* Left Sidebar */}
        <div
          className={`bg-white shadow-md rounded-md p-4 lg:col-span-1 transition-transform ${
            isSidebarOpen ? "block" : "hidden lg:block"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">Menu</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-sm hover:text-indigo-600 cursor-pointer transition duration-200">
              <FaUserEdit /> Update Profile
            </li>
            <li className="flex items-center gap-2 text-sm hover:text-indigo-600 cursor-pointer transition duration-200">
              <FaUserEdit /> Edit Contact Details
            </li>
            <li className="flex items-center gap-2 text-sm hover:text-indigo-600 cursor-pointer transition duration-200">
              <FaBook /> View Booked Tours
            </li>
            <li className="mt-6 text-sm text-indigo-500 underline cursor-pointer hover:text-indigo-700 transition duration-200">
              Request Role Change to Tour Operator
            </li>
          </ul>
        </div>

        {/* Toggle Button for Small Screens */}
        <button
          className="lg:hidden text-xl p-2 rounded-md text-gray-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>

        {/* Middle Content */}
        <div className="bg-white shadow-md rounded-md p-6 lg:col-span-4">
          <h1 className="text-2xl font-bold mb-4">
            Welcome, <span className="text-indigo-500">{userFound.name}</span>
          </h1>
          <h2 className="text-lg font-semibold mb-4">Tours</h2>
          <Tours userData={userFound}/>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
// import React, { useState } from "react";
// import { FaUserCircle, FaUserEdit, FaBook, FaTrashAlt, FaBars } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getOneUserAPI } from "../../services/userServices";
// import Tours from "../tours"; // Assuming you have a separate component for showing tours

// const UserDashboard = () => {
//   const { id: userId } = useParams();
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["user", userId],
//     queryFn: () => getOneUserAPI(userId),
//   });

//   // State to manage the sidebar visibility
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // State for tracking number of bookings
//   const [bookingCount, setBookingCount] = useState(0);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">Error: {error.message}</div>;

//   const { userFound } = data;

//   // Function to handle booking
//   const handleBookTour = () => {
//     setBookingCount(bookingCount + 1); // Increase the booking count when the "Book" button is clicked
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-800">
//       <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-5 gap-4">

//         {/* Left Sidebar */}
//         <div
//           className={`bg-white shadow-md rounded-md p-4 lg:col-span-1 transition-all transform ${
//             isSidebarOpen ? "block" : "hidden lg:block"
//           }`}
//         >
//           <h2 className="text-lg font-semibold mb-4">User Info</h2>
//           <div className="flex items-center gap-4 mb-6">
//             <FaUserCircle className="text-indigo-500 text-4xl" />
//             <div>
//               <h3 className="font-bold text-xl">{userFound.name}</h3>
//               <p className="text-sm text-gray-600">{userFound.role}</p>
//             </div>
          

            
//           </div>

//           <div className="flex items-center gap-2 mb-4">
//             <FaBook className="text-indigo-500 text-3xl" />
//             <div>
//               <h4 className="text-lg font-semibold">Bookings</h4>
//               <span className="text-xl font-bold">{bookingCount}</span>
//             </div>
//           </div>
//           {/* <button
//             onClick={handleBookTour}
//             className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition"
//           >
//             Book
//           </button> */}
       

//           <h3 className="text-lg font-semibold">Duties</h3>
//           <ul className="space-y-3">
//             <li className="flex items-center gap-2 text-sm">
//               <FaUserEdit className="text-indigo-600" /> Update Profile
//             </li>
//             <li className="flex items-center gap-2 text-sm">
//               <FaUserEdit className="text-indigo-600" /> Edit Contact Details
//             </li>
//             <li className="flex items-center gap-2 text-sm">
//               <FaBook className="text-indigo-600" /> View Booked Tours
//             </li>
//             <li className="mt-6 text-sm text-indigo-500 underline cursor-pointer hover:text-indigo-700">
//               Request Role Change to Tour Operator
//             </li>
//           </ul>
//         </div>

//         {/* Toggle Button for Small Screens */}
//         <button
//           className="lg:hidden text-xl p-2 rounded-md text-gray-600"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         >
//           <FaBars />
//         </button>

//         {/* Top Header with Booking Info */}
       

//         {/* Right Section: Tours */}
//         <div className="bg-white shadow-md rounded-md p-6 lg:col-span-3">
//           <h1 className="text-2xl font-bold mb-4">
//             Welcome, <span className="text-indigo-500">{userFound.name}</span>
//           </h1>
//           <h2 className="text-lg font-semibold mb-4">Booked Tours</h2>
//           <Tours  userDetails={userFound} /> {/* The Tours component will display the user's tours */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDashboard;
// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { FaUserCircle, FaBook, FaBars } from "react-icons/fa";
// import { getOneUserAPI } from "../../services/userServices";
// import Tours from "../tours";
// import Toast from "./Toast";
// // Importing Toast for messages

// const UserDashboard = () => {
// const { id: userId } = useParams();
// const { data, isLoading, error } = useQuery({
//   queryKey: ["user", userId],
//   queryFn: () => getOneUserAPI(userId),
// });

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [bookingCount, setBookingCount] = useState(0);
//   const [toastMessage, setToastMessage] = useState(null); // For displaying toast messages

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">Error: {error.message}</div>;

//   const { userFound } = data;

//   const handleBookingSuccess = () => {
//     setBookingCount(bookingCount + 1);
//     setToastMessage("Tour booked successfully!");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-800">
//       <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-5 gap-4">
//         {/* Sidebar */}
//         <div className={`bg-white shadow-md p-4 lg:col-span-1 ${isSidebarOpen ? "block" : "hidden lg:block"}`}>
//           <h2 className="text-lg font-semibold mb-4">User Info</h2>
//           <div className="flex items-center gap-4 mb-6">
//             <FaUserCircle className="text-indigo-500 text-4xl" />
//             <div>
//               <h3 className="font-bold text-xl">{userFound.name}</h3>
//               <p className="text-sm text-gray-600">{userFound.role}</p>
//             </div>
//           </div>
//         </div>

//         {/* Booking Info */}
//         <div className="bg-white shadow-md p-4 lg:col-span-1 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <FaBook className="text-indigo-500 text-3xl" />
//             <div>
//               <h4 className="text-lg font-semibold">Bookings</h4>
//               <span className="text-xl font-bold">{bookingCount}</span>
//             </div>
//           </div>
//         </div>

//         {/* Tours Section */}
//         <div className="bg-white shadow-md p-6 lg:col-span-3">
//           <h1 className="text-2xl font-bold mb-4">
//             Welcome, <span className="text-indigo-500">{userFound.name}</span>
//           </h1>
//           <Tours userDetails={userFound} onBookingSuccess={handleBookingSuccess} />
//         </div>
//       </div>

//       {/* Toast Message */}
//       {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />} 
//     </div>
//   );
// };

// export default UserDashboard;



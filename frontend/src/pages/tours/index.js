// import React, { useEffect, useState } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { searchToursAPI, toursAPI } from "../../services/tourServices";
// import { Formik, Form, Field } from "formik";
// import { AiOutlineClose } from "react-icons/ai";
// import * as Yup from "yup";
// import {  createBookingAPI } from "../../services/bookingServices";

// const Tours = ({ userData , filters }) => {
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [selectedTourId, setSelectedTourId] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [filteredTours, setFilteredTours] = useState([]);


//   const { mutateAsync } = useMutation({
//     mutationKey: "bookings",
//     mutationFn: ({ tourId, start_date, end_date }) =>
//       createBookingAPI(tourId, { start_date, end_date }),
//   });

//   // const { data, isLoading, isError, error } = useQuery({
//   //   queryKey: ["tours"],
//   //   queryFn: toursAPI,
//   // });

//   // const tours = data?.getTour || [];

  

//   // Fetch tours based on filters
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["searchTours", filters],  
//     queryFn: () => searchToursAPI(filters),
//     // keepPreviousData: true,
//   });

//   useEffect(() => {
//     if (data?.results) {
//       setFilteredTours(data.results);
//     }
//   }, [filteredTours]);
// {console.log('filter',filteredTours)}

//   const handleTourClick = (id) => {
//     if (!isUserLoggedIn) {
//       setErrorMessage("You must be logged in to book a tour.");
//       return;
//     }
//     if (!isUserRole) {
//       setErrorMessage("Only users with the role 'user' can book a tour.");
//       return;
//     }
//     setSelectedTourId(id);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setSelectedTourId(null);
//   };





//   const handleBookingSubmit = async (values) => {
//     try {
//       const response = await mutateAsync({
//         tourId: selectedTourId,
//         start_date: values.start_date,
//         end_date: values.end_date,
//       });
//       alert(response.message);
//       handleCloseModal();
//     } catch (error) {
//       alert(error?.response?.data?.error);
//     }
//   };

//   const isUserLoggedIn = !!userData;
//   const isUserRole = userData?.role === "user";

//   const BookingSchema = Yup.object().shape({
//     start_date: Yup.date().required("Start date is required"),
//     end_date: Yup.date()
//       .required("End date is required")
//       .min(Yup.ref("start_date"), "End date must be after start date"),
//   });

//   if (isLoading) return <div className="text-center mt-4">Loading tours...</div>;
//   if (isError)
//     return (
//       <div className="text-red-500 text-center mt-4">
//         Error: {error?.message || "Failed to fetch tours"}
//       </div>
//     );
//   if (filteredTours.length === 0)
//     return <div className="text-center mt-4">No tours available at the moment.</div>;
//   return (
//     <div className="p-4 md:p-8">
//       <h1 className="text-2xl font-bold mb-6 text-center">Available Tours</h1>
//       <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {filteredTours.map((tour) => (
//           <div
//             key={tour._id}
//             className="border rounded-lg shadow-md p-4 hover:shadow-lg flex flex-col justify-between"
//           >
//             <div>
//             <img 
//           // key={index} 
//           src={tour?.coverImage
            
//           } 
//           alt={`Gallery Image `} 
//           className="w-full h-40 object-fill bg-cover  rounded-md shadow-md"
//         />
              
//               <h2 className="text-xl font-semibold mb-2">{tour.title}</h2>
//               <p className="text-gray-700 mb-2">{tour.description}</p>
//               <p className="text-gray-500 mb-1">Price: ${tour.price}</p>
//               <p className="text-gray-500">Operator: {tour.tourOperatorId?.name || "N/A"}</p>
//             </div>
//             <button
//               onClick={() => handleTourClick(tour._id)}
//               className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
//             >
//               Book the Tour
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Modal for Booking */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
//             <button
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//               onClick={handleCloseModal}
//             >
//               <AiOutlineClose size={24} />
//             </button>
//             <h2 className="text-xl font-bold mb-4">Book the Tour</h2>
//             <Formik
//               initialValues={{ start_date: "", end_date: "" }}
//               validationSchema={BookingSchema}
//               onSubmit={handleBookingSubmit}
//             >
//               {({ errors, touched }) => (
//                 <Form className="space-y-4">
//                   <div>
//                     <label
//                       htmlFor="start_date"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Start Date
//                     </label>
//                     <Field
//                       type="date"
//                       name="start_date"
//                       className="w-full border rounded-md p-2"
//                       disabled={!isUserLoggedIn || !isUserRole}
//                     />
//                     {errors.start_date && touched.start_date && (
//                       <div className="text-red-500 text-sm mt-1">{errors.start_date}</div>
//                     )}
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="end_date"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       End Date
//                     </label>
//                     <Field
//                       type="date"
//                       name="end_date"
//                       className="w-full border rounded-md p-2"
//                       disabled={!isUserLoggedIn || !isUserRole}
//                     />
//                     {errors.end_date && touched.end_date && (
//                       <div className="text-red-500 text-sm mt-1">{errors.end_date}</div>
//                     )}
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                     disabled={!isUserLoggedIn || !isUserRole}
//                   >
//                     Submit
//                   </button>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       )}

//       {/* Error Popup */}
//       {errorMessage && (
//         <div
//           className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded shadow-md z-50 text-sm sm:text-base"
//           role="alert"
//         >
//           <p>{errorMessage}</p>
//           <button
//             onClick={() => setErrorMessage(null)}
//             className="mt-2 bg-white text-red-500 px-2 py-1 rounded"
//           >
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tours;





// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { searchToursAPI } from "../../services/tourServices";  // API call function

// const Tours = ({ filters }) => {
//   // Fetch tours based on filters
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["searchTours", filters],  
//     queryFn: () => searchToursAPI(filters),
//     keepPreviousData: true,
//   });

//   const tours = data?.results || [];

//   if (isLoading) return <div>Loading tours...</div>;
//   if (isError) return <div className="text-red-500 text-center mt-4">Error: {error?.message || "Failed to fetch tours"}</div>;

//   if (tours.length === 0) return <div className="text-center mt-4">No tours available for the selected filters.</div>;

//   return (
//     <div className="p-4 md:p-8">
//       <h1 className="text-2xl font-bold mb-6 text-center">Available Tours</h1>
//       <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {tours.map((tour) => (
//           <div key={tour._id} className="border rounded-lg shadow-md p-4 hover:shadow-lg flex flex-col justify-between">
//             <div>
//               <h2 className="text-xl font-semibold mb-2">{tour.title}</h2>
//               <p className="text-gray-700 mb-2">{tour.description}</p>
//               <p className="text-gray-500 mb-1">Price: ${tour.price}</p>
//               <p className="text-gray-500 mb-1">Destinations: {tour.destinations}</p>
//             </div>
//             <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600">
//               Book the Tour
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tours;



// import React, { useEffect, useState } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { searchToursAPI } from "../../services/tourServices";
// import { Formik, Form, Field } from "formik";
// import { AiOutlineClose } from "react-icons/ai";
// import * as Yup from "yup";
// import { createBookingAPI } from "../../services/bookingServices";

// const Tours = ({ userData, filters }) => {
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [selectedTourId, setSelectedTourId] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [filteredTours, setFilteredTours] = useState([]);

//   const { mutateAsync } = useMutation({
//     mutationKey: "bookings",
//     mutationFn: ({ tourId, start_date, end_date }) =>
//       createBookingAPI(tourId, { start_date, end_date }),
//   });

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["searchTours", filters],
//     queryFn: () => searchToursAPI(filters),
//   });

//   useEffect(() => {
//     if (data?.results) {
//       setFilteredTours(data.results);
//     }
//   }, [data]);

//   const handleTourClick = (id) => {
//     if (!isUserLoggedIn) {
//       setErrorMessage("You must be logged in to book a tour.");
//       return;
//     }
//     if (!isUserRole) {
//       setErrorMessage("Only users with the role 'user' can book a tour.");
//       return;
//     }
//     setSelectedTourId(id);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setSelectedTourId(null);
//   };

//   const handleBookingSubmit = async (values) => {
//     try {
//       const response = await mutateAsync({
//         tourId: selectedTourId,
//         start_date: values.start_date,
//         end_date: values.end_date,
//       });
//       alert(response.message);
//       handleCloseModal();
//     } catch (error) {
//       alert(error?.response?.data?.error);
//     }
//   };

//   const isUserLoggedIn = !!userData;
//   const isUserRole = userData?.role === "user";

//   const BookingSchema = Yup.object().shape({
//     start_date: Yup.date().required("Start date is required"),
//     end_date: Yup.date()
//       .required("End date is required")
//       .min(Yup.ref("start_date"), "End date must be after start date"),
//   });

//   if (isLoading) return <div className="text-center mt-4">Loading tours...</div>;
//   if (isError)
//     return (
//       <div className="text-red-500 text-center mt-4">
//         Error: {error?.message || "Failed to fetch tours"}
//       </div>
//     );
//   if (filteredTours.length === 0)
//     return <div className="text-center mt-4">No tours available at the moment.</div>;

//   return (
//     <div className="p-4 md:p-8">
//       <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
//         Available Tours
//       </h1>
//       <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {filteredTours.map((tour) => (
//           <div
//             key={tour._id}
//             className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 bg-white"
//           >
//             {/* Cover Image */}
//             <img
//               src={tour?.coverImage}
//               alt="Tour Cover"
//               className="w-full h-56 md:h-64 lg:h-80 object-cover"
//             />

//             {/* Gallery Images */}
//             {tour.galleryImages && tour.galleryImages.length > 0 && (
//               <div className="grid grid-cols-3 gap-1 p-2">
//                 {tour.galleryImages.slice(0, 3).map((img, index) => (
//                   <img
//                     key={index}
//                     src={img}
//                     alt={`Gallery Image ${index + 1}`}
//                     className="w-full h-20 object-cover rounded-md shadow-sm"
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Tour Details */}
//             <div className="p-4">
//               <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
//                 {tour.title}
//               </h2>
//               <p className="text-gray-600 text-sm md:text-base mb-2">
//                 {tour.description}
//               </p>
//               <p className="text-gray-700 font-semibold text-sm md:text-base mb-1">
//                 Price: ${tour.price}
//               </p>
//               <p className="text-gray-500 text-sm md:text-base">
//                 Operator: {tour.tourOperatorId?.name || "N/A"}
//               </p>

//               {/* Book Now Button */}
//               <button
//                 onClick={() => handleTourClick(tour._id)}
//                 className="w-full bg-blue-500 text-white py-2 px-4 mt-4 rounded-lg hover:bg-blue-600 transition duration-300"
//               >
//                 Book the Tour
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for Booking */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
//             <button
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//               onClick={handleCloseModal}
//             >
//               <AiOutlineClose size={24} />
//             </button>
//             <h2 className="text-xl font-bold mb-4">Book the Tour</h2>
//             <Formik
//               initialValues={{ start_date: "", end_date: "" }}
//               validationSchema={BookingSchema}
//               onSubmit={handleBookingSubmit}
//             >
//               {({ errors, touched }) => (
//                 <Form className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Start Date
//                     </label>
//                     <Field
//                       type="date"
//                       name="start_date"
//                       className="w-full border rounded-md p-2"
//                       disabled={!isUserLoggedIn || !isUserRole}
//                     />
//                     {errors.start_date && touched.start_date && (
//                       <div className="text-red-500 text-sm mt-1">{errors.start_date}</div>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       End Date
//                     </label>
//                     <Field
//                       type="date"
//                       name="end_date"
//                       className="w-full border rounded-md p-2"
//                       disabled={!isUserLoggedIn || !isUserRole}
//                     />
//                     {errors.end_date && touched.end_date && (
//                       <div className="text-red-500 text-sm mt-1">{errors.end_date}</div>
//                     )}
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                     disabled={!isUserLoggedIn || !isUserRole}
//                   >
//                     Submit
//                   </button>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tours;

// import React, { useEffect, useState } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { searchToursAPI, toursAPI } from "../../services/tourServices";
// import { Formik, Form, Field } from "formik";
// import { AiOutlineClose } from "react-icons/ai";
// import * as Yup from "yup";
// import {  createBookingAPI } from "../../services/bookingServices";

// const Tours = ({ userData , filters }) => {
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [selectedTourId, setSelectedTourId] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [filteredTours, setFilteredTours] = useState([]);


//   const { mutateAsync } = useMutation({
//     mutationKey: "bookings",
//     mutationFn: ({ tourId, start_date, end_date }) =>
//       createBookingAPI(tourId, { start_date, end_date }),
//   });

//   // const { data, isLoading, isError, error } = useQuery({
//   //   queryKey: ["tours"],
//   //   queryFn: toursAPI,
//   // });

//   // const tours = data?.getTour || [];

  

//   // Fetch tours based on filters
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["searchTours", filters],  
//     queryFn: () => searchToursAPI(filters),
//     // keepPreviousData: true,
//   });

//   useEffect(() => {
//     if (data?.results) {
//       setFilteredTours(data.results);
//     }
//   }, [data]);

//   const handleTourClick = (id) => {
//     if (!isUserLoggedIn) {
//       setErrorMessage("You must be logged in to book a tour.");
//       return;
//     }
//     if (!isUserRole) {
//       setErrorMessage("Only users with the role 'user' can book a tour.");
//       return;
//     }
//     setSelectedTourId(id);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setSelectedTourId(null);
//   };

//   const handleBookingSubmit = async (values) => {
//     try {
//       const response = await mutateAsync({
//         tourId: selectedTourId,
//         start_date: values.start_date,
//         end_date: values.end_date,
//       });
//       alert(response.message);
//       handleCloseModal();
//     } catch (error) {
//       alert(error?.response?.data?.error);
//     }
//   };

//   const isUserLoggedIn = !!userData;
//   const isUserRole = userData?.role === "user";

//   const BookingSchema = Yup.object().shape({
//     start_date: Yup.date().required("Start date is required"),
//     end_date: Yup.date()
//       .required("End date is required")
//       .min(Yup.ref("start_date"), "End date must be after start date"),
//   });

//   if (isLoading) return <div className="text-center mt-4">Loading tours...</div>;
//   if (isError)
//     return (
//       <div className="text-red-500 text-center mt-4">
//         Error: {error?.message || "Failed to fetch tours"}
//       </div>
//     );
//   if (filteredTours.length === 0)
//     return <div className="text-center mt-4">No tours available at the moment.</div>;

//   return (
//     <div className="p-4 md:p-8">
//       <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
//         Available Tours
//       </h1>
//       <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {filteredTours.map((tour) => (
//           <div
//             key={tour._id}
//             className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 bg-white"
//           >
//             {/* Cover Image */}
//             <img
//               src={tour?.coverImage}
//               alt="Tour Cover"
//               className="w-full h-56 md:h-64 lg:h-80 object-cover"
//             />

//             {/* Gallery Images */}
//             {tour.galleryImages && tour.galleryImages.length > 0 && (
//               <div className="grid grid-cols-3 gap-1 p-2">
//                 {tour.galleryImages.slice(0, 3).map((img, index) => (
//                   <img
//                     key={index}
//                     src={img}
//                     alt={`Gallery Image ${index + 1}`}
//                     className="w-full h-20 object-cover rounded-md shadow-sm"
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Tour Details */}
//             <div className="p-4">
//               <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
//                 {tour.title}
//               </h2>
//               <p className="text-gray-600 text-sm md:text-base mb-2">
//                 {tour.description}
//               </p>
//               <p className="text-gray-700 font-semibold text-sm md:text-base mb-1">
//                 Price: ${tour.price}
//               </p>
//               <p className="text-gray-500 text-sm md:text-base">
//                 Operator: {tour.tourOperatorId?.name || "N/A"}
//               </p>

//               {/* Book Now Button */}
//               <button
//                 onClick={() => handleTourClick(tour._id)}
//                 className="w-full bg-blue-500 text-white py-2 px-4 mt-4 rounded-lg hover:bg-blue-600 transition duration-300"
//               >
//                 Book the Tour
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for Booking */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
//             <button
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//               onClick={handleCloseModal}
//             >
//               <AiOutlineClose size={24} />
//             </button>
//             <h2 className="text-xl font-bold mb-4">Book the Tour</h2>
//             <Formik
//               initialValues={{ start_date: "", end_date: "" }}
//               validationSchema={BookingSchema}
//               onSubmit={handleBookingSubmit}
//             >
//               {({ errors, touched }) => (
//                 <Form className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Start Date
//                     </label>
//                     <Field
//                       type="date"
//                       name="start_date"
//                       className="w-full border rounded-md p-2"
//                       disabled={!isUserLoggedIn || !isUserRole}
//                     />
//                     {errors.start_date && touched.start_date && (
//                       <div className="text-red-500 text-sm mt-1">{errors.start_date}</div>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       End Date
//                     </label>
//                     <Field
//                       type="date"
//                       name="end_date"
//                       className="w-full border rounded-md p-2"
//                       disabled={!isUserLoggedIn || !isUserRole}
//                     />
//                     {errors.end_date && touched.end_date && (
//                       <div className="text-red-500 text-sm mt-1">{errors.end_date}</div>
//                     )}
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                     disabled={!isUserLoggedIn || !isUserRole}
//                   >
//                     Submit
//                   </button>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tours;
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { searchToursAPI } from "../../services/tourServices";
import { createBookingAPI } from "../../services/bookingServices";
import { Formik, Form, Field } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import * as Yup from "yup";

const Tours = ({ userData, filters }) => {
  const queryClient = useQueryClient(); // Hook to interact with React Query cache

  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedTourId, setSelectedTourId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
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
    mutationFn: ({ tourId }) =>
      createBookingAPI(tourId),
    onSuccess: () => {
      alert("Booking successful!");
      handleCloseModal();
    },
    onError: (error) => {
      setErrorMessage(error?.response?.data?.error || "Booking failed");
    },
  });

  const handleTourClick = (id) => {
    if (!userData) {
      setErrorMessage("You must be logged in to book a tour.");
      return;
    }
    if (userData?.role !== "user") {
      setErrorMessage("Only users can book a tour.");
      return;
    }
    setSelectedTourId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTourId(null);
  };

  const handleBookingSubmit = async (values) => {
    if (!selectedTourId) {
      setErrorMessage("Tour selection error! Please try again.");
      return;
    }

    try {
      await bookingMutation.mutateAsync({
        tourId: selectedTourId,
      });
      queryClient.invalidateQueries(["searchTours"]);

    } catch (error) {
      setErrorMessage(error?.response?.data?.error || "Booking failed");
    }
  };

  // **Validation Schema**
  const BookingSchema = Yup.object().shape({
    start_date: Yup.date().required("Start date is required"),
    end_date: Yup.date()
      .required("End date is required")
      .min(Yup.ref("start_date"), "End date must be after start date"),
  });

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
            {/* Cover Image */}
            <img
              src={tour.coverImage}
              alt="Tour Cover"
              className="w-full h-56 md:h-64 lg:h-80 object-cover rounded-md shadow-md"
            />
            
            {/* Gallery Images */}
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

            <button
              onClick={() => handleTourClick(tour._id)}
              className="bg-blue-500 border text-white py-2 px-4 rounded mt-4 mx-auto hover:bg-white hover:text-blue-500 w-1/2 transition duration-300"
            >
              Book the Tour
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleCloseModal}>
              <AiOutlineClose size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Book the Tour</h2>
            <Formik
              initialValues={{ start_date: "", end_date: "" }}
              validationSchema={BookingSchema}
              onSubmit={handleBookingSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <Field type="date" name="start_date" className="w-full border rounded-md p-2" />
                    {errors.start_date && touched.start_date && (
                      <div className="text-red-500 text-sm mt-1">{errors.start_date}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <Field type="date" name="end_date" className="w-full border rounded-md p-2" />
                    {errors.end_date && touched.end_date && (
                      <div className="text-red-500 text-sm mt-1">{errors.end_date}</div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {errorMessage && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded shadow-md">
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage(null)} className="mt-2 bg-white text-red-500 px-2 py-1 rounded">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Tours;

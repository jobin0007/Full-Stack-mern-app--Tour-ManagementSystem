import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toursAPI } from "../../services/tourServices";
import { Formik, Form, Field } from "formik";
import { AiOutlineClose } from "react-icons/ai";
import * as Yup from "yup";
import { createBookingAPI } from "../../services/bookingServices";

const Tours = ({ userData }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedTourId, setSelectedTourId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const { mutateAsync } = useMutation({
    mutationKey: "bookings",
    mutationFn: ({ tourId, start_date, end_date }) =>
      createBookingAPI(tourId, { start_date, end_date }),
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tours"],
    queryFn: toursAPI,
  });

  const tours = data?.getTour || [];

  const handleTourClick = (id) => {
    if (!isUserLoggedIn) {
      setErrorMessage("You must be logged in to book a tour.");
      return;
    }
    if (!isUserRole) {
      setErrorMessage("Only users with the role 'user' can book a tour.");
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
    try {
      const response = await mutateAsync({
        tourId: selectedTourId,
        start_date: values.start_date,
        end_date: values.end_date,
      });
      alert(response.message);
      handleCloseModal();
    } catch (error) {
      alert(error?.response?.data?.error);
    }
  };

  const isUserLoggedIn = !!userData;
  const isUserRole = userData?.role === "user";

  const BookingSchema = Yup.object().shape({
    start_date: Yup.date().required("Start date is required"),
    end_date: Yup.date()
      .required("End date is required")
      .min(Yup.ref("start_date"), "End date must be after start date"),
  });

  if (isLoading) return <div>Loading tours...</div>;
  if (isError)
    return (
      <div className="text-red-500 text-center mt-4">Error: {error?.message || "Failed to fetch tours"}</div>
    );
  if (tours.length === 0) return <div className="text-center mt-4">No tours available at the moment.</div>;

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Available Tours</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{tour.title}</h2>
              <p className="text-gray-700 mb-2">{tour.description}</p>
              <p className="text-gray-500 mb-1">Price: ${tour.price}</p>
              <p className="text-gray-500">Operator: {tour.tourOperatorId?.name || "N/A"}</p>
            </div>
            <button
              onClick={() => handleTourClick(tour._id)}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
            >
              Book the Tour
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Booking */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
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
                    <label
                      htmlFor="start_date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Start Date
                    </label>
                    <Field
                      type="date"
                      name="start_date"
                      className="w-full border rounded-md p-2"
                      disabled={!isUserLoggedIn || !isUserRole}
                    />
                    {errors.start_date && touched.start_date && (
                      <div className="text-red-500 text-sm mt-1">{errors.start_date}</div>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="end_date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      End Date
                    </label>
                    <Field
                      type="date"
                      name="end_date"
                      className="w-full border rounded-md p-2"
                      disabled={!isUserLoggedIn || !isUserRole}
                    />
                    {errors.end_date && touched.end_date && (
                      <div className="text-red-500 text-sm mt-1">{errors.end_date}</div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    disabled={!isUserLoggedIn || !isUserRole}
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
        <div
          className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded shadow-md z-50 text-sm sm:text-base"
          role="alert"
        >
          <p>{errorMessage}</p>
          <button
            onClick={() => setErrorMessage(null)}
            className="mt-2 bg-white text-red-500 px-2 py-1 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Tours;

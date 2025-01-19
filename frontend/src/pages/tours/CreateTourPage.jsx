// import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createTourAPI } from "../../services/tourServices";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import backgroundimg from '../../assets/world-landmarks-design_1132-14.avif'
const CreateTourPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const { mutateAsync } = useMutation({
    mutationFn: createTourAPI,
    onError: (error) => {
      setErrorMessage(error.response?.data?.error || "An Unexpected Error Occurred");
    },
  });

  const CreateTourSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    duration: Yup.number().required("Duration is required").positive(),
    price: Yup.number().required("Price is required").positive(),
    destinations: Yup.string().required("Destinations are required"),
    availableSpots: Yup.number().required("Available spots are required").positive(),
  });

  const handleSubmit = async (values) => {
    console.log("New Tour:", values);
    await mutateAsync(values);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:text-sm">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-2 lg:grid-cols-2 w-full max-w-5xl">
        {/* Left Section - Single Image */}
        <div className=" flex items-center justify-center bg-sky-100">
          <img
            src={backgroundimg}
            alt="Tour Preview"
            className=" shadow-md w-full h-full"
          />
        </div>

        {/* Right Section - Form */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-sky-500 mb-6 text-center lg:text-left">
            Create a Tour
          </h2>
          <Formik
            initialValues={{
              title: "",
              description: "",
              duration: "",
              price: "",
              destinations: "",
              availableSpots: "",
            }}
            validationSchema={CreateTourSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Title</label>
                  <Field
                    name="title"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  {errors.title && touched.title && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1">Description</label>
                  <Field
                    name="description"
                    as="textarea"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  {errors.description && touched.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1">Duration (days)</label>
                  <Field
                    name="duration"
                    type="number"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  {errors.duration && touched.duration && (
                    <p className="text-red-500 text-sm">{errors.duration}</p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1">Price</label>
                  <Field
                    name="price"
                    type="number"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  {errors.price && touched.price && (
                    <p className="text-red-500 text-sm">{errors.price}</p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1">Destinations</label>
                  <Field
                    name="destinations"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  {errors.destinations && touched.destinations && (
                    <p className="text-red-500 text-sm">{errors.destinations}</p>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1">Available Spots</label>
                  <Field
                    name="availableSpots"
                    type="number"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  {errors.availableSpots && touched.availableSpots && (
                    <p className="text-red-500 text-sm">{errors.availableSpots}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600 transition duration-300"
                >
                  Create Tour
                </button>
              </Form>
            )}
          </Formik>
          {errorMessage && (
            <div
              className="mt-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-md flex items-center justify-between"
              role="alert"
            >
              <span>{errorMessage}</span>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-red-700 hover:text-red-900 transition"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTourPage;

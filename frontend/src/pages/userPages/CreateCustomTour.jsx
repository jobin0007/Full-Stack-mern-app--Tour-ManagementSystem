import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createCustomTourAPI } from "../../services/customTourServices";

const CreateCustomTour = () => {
const [errorMessage,setErrorMessage]= useState(null)


const { mutateAsync } = useMutation({
    mutationFn: createCustomTourAPI,
   
    onError: (error) => {
     
      setErrorMessage(error.response?.data?.error || "An Unexpected Error Occurred") 
   
    },
   

  });


  // Form validation schema
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    location: Yup.string().required("Location is required"),
    description: Yup.string().required("Description is required"),
    start_date: Yup.date().required("Start date is required"),
    end_date: Yup.date()
      .min(Yup.ref("start_date"), "End date must be after the start date")
      .required("End date is required"),
    budget: Yup.number()
      .min(1, "Budget must be at least 1")
      .required("Budget is required"),
    participants: Yup.number()
      .min(1, "Participants must be at least 1")
      .required("Participants is required"),
  });

  // Initial form values
  const initialValues = {
    title: "",
    location: "",
    description: "",
    start_date: "",
    end_date: "",
    budget: "",
    participants: "",
  };

  // Form submission handler
  const handleSubmit = async(values) => {
    console.log("Form Values:", values);
     await mutateAsync(values)
    alert();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-500 text-center mb-8">
          Create Custom Tour
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <Field
                  name="title"
                  type="text"
                  placeholder="Enter tour title"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <ErrorMessage name="title" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <Field
                  name="location"
                  type="text"
                  placeholder="Enter tour location"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <ErrorMessage name="location" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Field
                  name="description"
                  as="textarea"
                  placeholder="Enter tour description"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  rows="4"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Start Date */}
              <div>
                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <Field
                  name="start_date"
                  type="date"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <ErrorMessage
                  name="start_date"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* End Date */}
              <div>
                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <Field
                  name="end_date"
                  type="date"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <ErrorMessage
                  name="end_date"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Budget */}
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                  Budget
                </label>
                <Field
                  name="budget"
                  type="number"
                  placeholder="Enter budget"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <ErrorMessage name="budget" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Participants */}
              <div>
                <label htmlFor="participants" className="block text-sm font-medium text-gray-700">
                  Participants
                </label>
                <Field
                  name="participants"
                  type="number"
                  placeholder="Enter number of participants"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
                <ErrorMessage
                  name="participants"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 focus:outline-none transition-all"
                >
                  Create Tour
                </button>
              </div>
            </Form>
          )}
        </Formik>
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
    </div>
  );
};

export default CreateCustomTour;

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createCustomTourAPI } from "../../services/customTourServices";
import {AiOutlineClose} from "react-icons/ai";

const CreateCustomTour = () => {
const [errorMessage,setErrorMessage]= useState(null)




const [notification, setNotification] = useState(null);
const showNotification = (message, type) => {
  setNotification({ message, type });

  setTimeout(() => {
    setNotification(null);
  }, 3000); 
};


const { mutateAsync } = useMutation({
    mutationFn: createCustomTourAPI,
   
    onError: (error) => {
      showNotification(  error?.response?.data?.error, "error"  )

   
    },
   

  });


 
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


  const initialValues = {
    title: "",
    location: "",
    description: "",
    start_date: "",
    end_date: "",
    budget: "",
    participants: "",
  };


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

export default CreateCustomTour;

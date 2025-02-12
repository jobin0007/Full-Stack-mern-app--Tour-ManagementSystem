
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createTourAPI } from "../../services/tourServices";
import backgroundimg from "../../assets/world-landmarks-design_1132-14.avif";
import {AiOutlineClose} from "react-icons/ai";

const CreateTourPage = () => {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000); 
  };

  const { mutateAsync } = useMutation({
    mutationFn: createTourAPI,
    onSuccess: (response) => {
      showNotification(response?.message, "success"  )
  
     
      setLoading(false);
    },
    onError: (error) => {
      showNotification( error?.response?.data?.message, "error"  )

      
      setLoading(false);
    },
  });

  const CreateTourSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required").positive(),
    start_date: Yup.date().required("Start date is required"),
    end_date: Yup.date()
      .required("End date is required")
      .min(Yup.ref("start_date"), "End date must be after start date"),
    destinations: Yup.string().required("Destinations are required"),
    availableSpots: Yup.number().required("Available spots are required").positive(),
    coverImage: Yup.mixed().required("Cover image is required"),
    galleryImages: Yup.array().min(1, "At least one gallery image is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    if (loading) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("start_date", values.start_date);
      formData.append("end_date", values.end_date);
      formData.append("destinations", values.destinations);
      formData.append("availableSpots", values.availableSpots);
      if (values.coverImage) formData.append("coverImage", values.coverImage);
      if (values.galleryImages && values.galleryImages.length > 0) {
        values.galleryImages.forEach((file) => {
          formData.append("galleryImages", file);
        });
      }
      await mutateAsync(formData);
      resetForm();
    } catch (error) {
      console.error("Tour creation failed:", error);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:text-sm">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-2 lg:grid-cols-2 w-full max-w-5xl">
        {/* Left Section - Image */}
        <div className="flex items-center justify-center bg-sky-100">
          <img
            src={backgroundimg}
            alt="Tour Preview"
            className="shadow-md w-full h-full"
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
              start_date: "",
              end_date: "",
              price: "",
              destinations: "",
              availableSpots: "",
              coverImage: null,
              galleryImages: [],
            }}
            validationSchema={CreateTourSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block font-medium mb-1">Title</label>
                  <Field
                    name="title"
                    className="w-full px-4 py-2 border rounded-md focus:ring-sky-500"
                  />
                  {errors.title && touched.title && (
                    <p className="text-red-500 text-sm">{errors.title}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block font-medium mb-1">Description</label>
                  <Field
                    name="description"
                    as="textarea"
                    className="w-full px-4 py-2 border rounded-md focus:ring-sky-500"
                  />
                  {errors.description && touched.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                </div>

                {/* Start Date & End Date */}
                <div>
                  <label className="block font-medium mb-1">Start Date</label>
                  <Field
                    type="date"
                    name="start_date"
                    className="w-full border rounded-md p-2"
                  />
                  {errors.start_date && touched.start_date && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.start_date}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block font-medium mb-1">End Date</label>
                  <Field
                    type="date"
                    name="end_date"
                    className="w-full border rounded-md p-2"
                  />
                  {errors.end_date && touched.end_date && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.end_date}
                    </div>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block font-medium mb-1">Price</label>
                  <Field
                    name="price"
                    type="number"
                    className="w-full px-4 py-2 border rounded-md focus:ring-sky-500"
                  />
                  {errors.price && touched.price && (
                    <p className="text-red-500 text-sm">{errors.price}</p>
                  )}
                </div>

                {/* Destinations */}
                <div>
                  <label className="block font-medium mb-1">Destinations</label>
                  <Field
                    name="destinations"
                    className="w-full px-4 py-2 border rounded-md focus:ring-sky-500"
                  />
                  {errors.destinations && touched.destinations && (
                    <p className="text-red-500 text-sm">
                      {errors.destinations}
                    </p>
                  )}
                </div>

                {/* Available Spots */}
                <div>
                  <label className="block font-medium mb-1">
                    Available Spots
                  </label>
                  <Field
                    name="availableSpots"
                    type="number"
                    className="w-full px-4 py-2 border rounded-md focus:ring-sky-500"
                  />
                  {errors.availableSpots && touched.availableSpots && (
                    <p className="text-red-500 text-sm">
                      {errors.availableSpots}
                    </p>
                  )}
                </div>

                {/* Cover Image Upload */}
                <div>
                  <label className="block font-medium mb-1">Cover Image</label>
                  <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={(event) =>
                      setFieldValue("coverImage", event.currentTarget.files[0])
                    }
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  {errors.coverImage && touched.coverImage && (
                    <p className="text-red-500 text-sm">{errors.coverImage}</p>
                  )}
                </div>

                {/* Gallery Images Upload */}
                <div>
                  <label className="block font-medium mb-1">
                    Gallery Images (Max 5)
                  </label>
                  <input
                    type="file"
                    name="galleryImages"
                    accept="image/*"
                    multiple
                    onChange={(event) =>
                      setFieldValue(
                        "galleryImages",
                        Array.from(event.currentTarget.files)
                      )
                    }
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" className={`w-full py-2 rounded-md text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600"}`} disabled={loading}>
                  {loading ? "Creating..." : "Create Tour"}
                </button>
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
    </div>
  );
};

export default CreateTourPage;

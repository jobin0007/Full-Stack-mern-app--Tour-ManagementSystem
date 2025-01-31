// import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createTourAPI } from "../../services/tourServices";
import { AiOutlineClose } from "react-icons/ai";
import backgroundimg from "../../assets/world-landmarks-design_1132-14.avif";
import { useState } from "react";

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
    coverImage: Yup.mixed().required("Cover image is required"),
    galleryImages: Yup.array().min(1, "At least one gallery image is required"),
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("duration", values.duration);
    formData.append("price", values.price);
    formData.append("destinations", values.destinations);
    formData.append("availableSpots", values.availableSpots);
    formData.append("coverImage", values.coverImage); // Single file

    for (let i = 0; i < values.galleryImages.length; i++) {
      formData.append("galleryImages", values.galleryImages[i]); // Multiple files
    }

    await mutateAsync(formData);
    alert("Tour successfully created!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:text-sm">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-2 lg:grid-cols-2 w-full max-w-5xl">
        {/* Left Section - Single Image */}
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
              duration: "",
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
                  <Field name="title" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  {errors.title && touched.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block font-medium mb-1">Description</label>
                  <Field name="description" as="textarea" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  {errors.description && touched.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                {/* Duration */}
                <div>
                  <label className="block font-medium mb-1">Duration (days)</label>
                  <Field name="duration" type="number" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  {errors.duration && touched.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                </div>

                {/* Price */}
                <div>
                  <label className="block font-medium mb-1">Price</label>
                  <Field name="price" type="number" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  {errors.price && touched.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>

                {/* Destinations */}
                <div>
                  <label className="block font-medium mb-1">Destinations</label>
                  <Field name="destinations" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  {errors.destinations && touched.destinations && <p className="text-red-500 text-sm">{errors.destinations}</p>}
                </div>

                {/* Available Spots */}
                <div>
                  <label className="block font-medium mb-1">Available Spots</label>
                  <Field name="availableSpots" type="number" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
                  {errors.availableSpots && touched.availableSpots && <p className="text-red-500 text-sm">{errors.availableSpots}</p>}
                </div>

                {/* Cover Image Upload */}
                <div>
                  <label className="block font-medium mb-1">Cover Image</label>
                  <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={(event) => setFieldValue("coverImage", event.currentTarget.files[0])}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  {errors.coverImage && touched.coverImage && <p className="text-red-500 text-sm">{errors.coverImage}</p>}
                </div>

                {/* Gallery Images Upload */}
                <div>
                  <label className="block font-medium mb-1">Gallery Images (Max 5)</label>
                  <input
                    type="file"
                    name="galleryImages"
                    accept="image/*"
                    multiple
                    onChange={(event) => setFieldValue("galleryImages", Array.from(event.currentTarget.files))}
                    className="w-full px-4 py-2 border rounded-md"
                  />
                  {errors.galleryImages && touched.galleryImages && <p className="text-red-500 text-sm">{errors.galleryImages}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600 transition duration-300">
                  Create Tour
                </button>
              </Form>
            )}
          </Formik>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-md flex items-center justify-between" role="alert">
              <span>{errorMessage}</span>
              <button onClick={() => setErrorMessage(null)} className="text-red-700 hover:text-red-900 transition">
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

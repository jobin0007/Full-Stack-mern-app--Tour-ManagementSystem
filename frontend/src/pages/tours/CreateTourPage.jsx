// // import React, { useState } from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { useMutation } from "@tanstack/react-query";
// import { createTourAPI } from "../../services/tourServices";
// import { AiOutlineClose } from "react-icons/ai";
// import backgroundimg from "../../assets/world-landmarks-design_1132-14.avif";
// import { useState } from "react";

// const CreateTourPage = () => {
//   const[message,setMessage]=  useState({ text: "", type: "" });

//   const { mutateAsync } = useMutation({
//     mutationFn: createTourAPI,
//     onSuccess: (response) => {
//       setTimeout(()=>{
//         setMessage({ text: response?.message , type: "success" });

//       },2000)
//     },
//     onError: (error) => {
//       setTimeout(() => {
//         setMessage({ text: error?.response?.data?.message , type: "error" });  
//       }, 3000);
//        },
//   });

//   const CreateTourSchema = Yup.object().shape({
//     title: Yup.string().required("Title is required"),
//     description: Yup.string().required("Description is required"),
//     duration: Yup.number().required("Duration is required").positive(),
//     price: Yup.number().required("Price is required").positive(),
//     start_date: Yup.date().required("Start date is required"),
//     end_date: Yup.date()
//       .required("End date is required")
//       .min(Yup.ref("start_date"), "End date must be after start date"),
//     destinations: Yup.string().required("Destinations are required"),
//     availableSpots: Yup.number().required("Available spots are required").positive(),
//     coverImage: Yup.mixed().required("Cover image is required"),
//     galleryImages: Yup.array().min(1, "At least one gallery image is required"),
//   });

//   const handleSubmit = async (values) => {
//     const formData = new FormData();
//     formData.append("title", values.title);
//     formData.append("description", values.description);
//     formData.append("price", values.price);
//     formData.append('start_date',values.start_date);
//     formData.append('end_date',values.end_date);
//     formData.append("destinations", values.destinations);
//     formData.append("availableSpots", values.availableSpots);
//     formData.append("coverImage", values.coverImage); 

//     for (let i = 0; i < values.galleryImages.length; i++) {
//       formData.append("galleryImages", values.galleryImages[i]); 
//     }

//     await mutateAsync(formData);
//     alert("Tour successfully created!");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:text-sm">
//       <div className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-2 lg:grid-cols-2 w-full max-w-5xl">
//         {/* Left Section - Single Image */}
//         <div className="flex items-center justify-center bg-sky-100">
//           <img
//             src={backgroundimg}
//             alt="Tour Preview"
//             className="shadow-md w-full h-full"
//           />
//         </div>

//         {/* Right Section - Form */}
//         <div className="p-8">
//           <h2 className="text-2xl font-semibold text-sky-500 mb-6 text-center lg:text-left">
//             Create a Tour
//           </h2>
//           <Formik
//             initialValues={{
//               title: "",
//               description: "",
//              start_date:"",
//              end_date:"",
//               price: "",
//               destinations: "",
//               availableSpots: "",
//               coverImage: null,
//               galleryImages: [],
//             }}
//             validationSchema={CreateTourSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ errors, touched, setFieldValue }) => (
//               <Form className="space-y-4">
//                 {/* Title */}
//                 <div>
//                   <label className="block font-medium mb-1">Title</label>
//                   <Field name="title" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
//                   {errors.title && touched.title && <p className="text-red-500 text-sm">{errors.title}</p>}
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block font-medium mb-1">Description</label>
//                   <Field name="description" as="textarea" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
//                   {errors.description && touched.description && <p className="text-red-500 text-sm">{errors.description}</p>}
//                 </div>

//                 {/* Duration */}
//                 <div>
//                     <label className="block font-medium mb-1">Start Date</label>
//                     <Field type="date" name="start_date" className="w-full border rounded-md p-2" />
//                     {errors.start_date && touched.start_date && (
//                       <div className="text-red-500 text-sm mt-1">{errors.start_date}</div>
//                     )}
//                   </div>
//                   <div>
//                     <label className="block font-medium mb-1">End Date</label>
//                     <Field type="date" name="end_date" className="w-full border rounded-md p-2" />
//                     {errors.end_date && touched.end_date && (
//                       <div className="text-red-500 text-sm mt-1">{errors.end_date}</div>
//                     )}
//                   </div>

//                 {/* Price */}
//                 <div>
//                   <label className="block font-medium mb-1">Price</label>
//                   <Field name="price" type="number" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
//                   {errors.price && touched.price && <p className="text-red-500 text-sm">{errors.price}</p>}
//                 </div>

//                 {/* Destinations */}
//                 <div>
//                   <label className="block font-medium mb-1">Destinations</label>
//                   <Field name="destinations" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
//                   {errors.destinations && touched.destinations && <p className="text-red-500 text-sm">{errors.destinations}</p>}
//                 </div>

//                 {/* Available Spots */}
//                 <div>
//                   <label className="block font-medium mb-1">Available Spots</label>
//                   <Field name="availableSpots" type="number" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" />
//                   {errors.availableSpots && touched.availableSpots && <p className="text-red-500 text-sm">{errors.availableSpots}</p>}
//                 </div>

//                 {/* Cover Image Upload */}
//                 <div>
//                   <label className="block font-medium mb-1">Cover Image</label>
//                   <input
//                     type="file"
//                     name="coverImage"
//                     accept="image/*"
//                     onChange={(event) => setFieldValue("coverImage", event.currentTarget.files[0])}
//                     className="w-full px-4 py-2 border rounded-md"
//                   />
//                   {errors.coverImage && touched.coverImage && <p className="text-red-500 text-sm">{errors.coverImage}</p>}
//                 </div>

//                 {/* Gallery Images Upload */}
//                 <div>
//                   <label className="block font-medium mb-1">Gallery Images (Max 5)</label>
//                   <input
//                     type="file"
//                     name="galleryImages"
//                     accept="image/*"
//                     multiple
//                     onChange={(event) => setFieldValue("galleryImages", Array.from(event.currentTarget.files))}
//                     className="w-full px-4 py-2 border rounded-md"
//                   />
//                   {errors.galleryImages && touched.galleryImages && <p className="text-red-500 text-sm">{errors.galleryImages}</p>}
//                 </div>

//                 {/* Submit Button */}
//                 <button type="submit" className="w-full bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600 transition duration-300">
//                   Create Tour
//                 </button>
//               </Form>
//             )}
//           </Formik>

//           {/* Error Message */}
//           {message.text && (
//         <div
//           className={`text-center p-4 mb-6 rounded-md ${
//             message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//           }`}
//         >
//           {message.text}
//         </div>
//       )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateTourPage;




import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createTourAPI } from "../../services/tourServices";
import backgroundimg from "../../assets/world-landmarks-design_1132-14.avif";

const CreateTourPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({ text: "", type: "" });

  const { mutateAsync } = useMutation({
    mutationFn: createTourAPI,
    onSuccess: (response) => {
      setMessage({ text: response?.message || "Tour successfully created!", type: "success" });
    },
    onError: (error) => {
      setMessage({ text: error?.response?.data?.message || "Something went wrong!", type: "error" });
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
    if (loading || isSubmitted) return;
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

      // Ensure cover image is added correctly
      if (values.coverImage) {
        formData.append("coverImage", values.coverImage);
      }

      // Ensure gallery images are properly appended
      if (values.galleryImages && values.galleryImages.length > 0) {
        values.galleryImages.forEach((file) => {
          formData.append("galleryImages", file);
        });
      }

      // Call API using React Query
      await mutateAsync(formData);
      setIsSubmitted(true); // Freeze the button permanently after success

      // Clear form after success
      resetForm();
    } catch (error) {
      console.error("Tour creation failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:text-sm">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-2 lg:grid-cols-2 w-full max-w-5xl">
        {/* Left Section - Image */}
        <div className="flex items-center justify-center bg-sky-100">
          <img src={backgroundimg} alt="Tour Preview" className="shadow-md w-full h-full" />
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
                  <Field name="title" className="w-full px-4 py-2 border rounded-md focus:ring-sky-500" />
                  {errors.title && touched.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block font-medium mb-1">Description</label>
                  <Field name="description" as="textarea" className="w-full px-4 py-2 border rounded-md focus:ring-sky-500" />
                  {errors.description && touched.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                {/* Start Date & End Date */}
                <div>
                  <label className="block font-medium mb-1">Start Date</label>
                  <Field type="date" name="start_date" className="w-full border rounded-md p-2" />
                  {errors.start_date && touched.start_date && <div className="text-red-500 text-sm mt-1">{errors.start_date}</div>}
                </div>
                <div>
                  <label className="block font-medium mb-1">End Date</label>
                  <Field type="date" name="end_date" className="w-full border rounded-md p-2" />
                  {errors.end_date && touched.end_date && <div className="text-red-500 text-sm mt-1">{errors.end_date}</div>}
                </div>

                {/* Price */}
                <div>
                  <label className="block font-medium mb-1">Price</label>
                  <Field name="price" type="number" className="w-full px-4 py-2 border rounded-md focus:ring-sky-500" />
                  {errors.price && touched.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                </div>

                {/* Destinations */}
                <div>
                  <label className="block font-medium mb-1">Destinations</label>
                  <Field name="destinations" className="w-full px-4 py-2 border rounded-md focus:ring-sky-500" />
                  {errors.destinations && touched.destinations && <p className="text-red-500 text-sm">{errors.destinations}</p>}
                </div>

                {/* Available Spots */}
                <div>
                  <label className="block font-medium mb-1">Available Spots</label>
                  <Field name="availableSpots" type="number" className="w-full px-4 py-2 border rounded-md focus:ring-sky-500" />
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
                </div>

                {/* Submit Button */}
                <button type="submit" className={`w-full py-2 rounded-md ${isSubmitted ? "bg-gray-400 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600 text-white"}`}
                  disabled={loading || isSubmitted}

                >
  {loading ? "Creating..." : "Craete Tour"}
  {isSubmitted && 
  "Created Tour"
  }
 
                </button>
              </Form>
            )}
          </Formik>

          {/* Success/Error Message */}
          {message.text && <div className={`p-4 mt-4 rounded-md ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{message.text}</div>}
        </div>
      </div>
    </div>
  );
};

export default CreateTourPage;


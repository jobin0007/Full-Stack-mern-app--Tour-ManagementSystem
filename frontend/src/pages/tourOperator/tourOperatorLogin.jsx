import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import {AiOutlineClose} from "react-icons/ai";
import exampleImage from "../../assets/travel-concept-with-worldwide-landmarks_23-2149153263.avif";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tourOperatorLoginAPI } from "../../services/tourOperatorServices";
import { useMutation } from "@tanstack/react-query";
import {jwtDecode} from "jwt-decode";
import { login } from "../../redux/tourOperatoSlice";
import Cookies from "js-cookie";

const TourOperatorLogin = () => {
 
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000); 
  };


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: tourOperatorLoginAPI,
    onError: (error) => {
      showNotification(error.response?.data?.error, "error");
     
    },
    onSuccess: (data) => {
      if (data) {
     
        try {
          Cookies.set("tourOperatorData", data?.token);
          const decoded = jwtDecode(data?.token);
          console.log('decoded',decoded);
          dispatch(login({ tourOperator: decoded, token: data.token }));
          const tourOperatorId = decoded?.tourOperatorId;
          navigate(`/tour-operator/${tourOperatorId}`);
        } catch (err) {
       
          showNotification("Invalid token received from server.", "error");
        }
      } else {
      
        showNotification("Login failed: No token received from server", "error");
      }
    },
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values) => {
    await mutateAsync(values);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl">
        <div className="relative">
          <img
            src={exampleImage}
            alt="Travel landmarks"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-8 md:px-12 bg-gray-50">
          <h2 className="text-2xl md:text-3xl font-bold text-sky-500 text-center mb-6">
            Tour Operator Login
          </h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6 w-full max-w-sm">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="relative mt-1">
                    <AiOutlineUser
                      className="absolute top-3 left-3 text-gray-400"
                      size={20}
                    />
                    <Field
                      type="email"
                      name="email"
                      className="w-full pl-10 p-2 border rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="bg-white p-2 flex border rounded-md">
                    <AiOutlineLock
                      className="mr-3 text-gray-400"
                      size={20}
                    />
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      className="w-full h-full outline-none bg-transparent"
                    />
                    <div
                      className="cursor-pointer ml-2 flex items-center"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 focus:outline-none transition-all"
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        
        </div>
      </div>
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
  );
};

export default TourOperatorLogin;

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../../services/userServices";
import Cookies from "js-cookie";
import {jwtDecode }from "jwt-decode"; // Correct import
import { register } from "../../redux/userSlice";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: registerAPI,
    onError: (error) => {
      setErrorMessage(
        error.response?.data?.error || "An unexpected error occurred."
      );
    },
    onSuccess: (data) => {
      if (data?.token) {
        Cookies.set("UserData", data.token);
        const decoded = jwtDecode(data.token); // Decode token
        dispatch(register({ user: decoded, token: data.token }));
        navigate("/user/login"); // Redirect after successful registration
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    },
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    mobile_number: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    address: Yup.string().required("Address is required"),
    role: Yup.string()
      .oneOf(["user", "tour-operator", "admin"], "Invalid role")
      .required("Role is required"),
  });

  const handleSubmit = async (values) => {
    setErrorMessage(null);
    try {
      await mutateAsync(values);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Register
        </h2>
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded-md">
            {errorMessage}
          </div>
        )}
        <Formik
          initialValues={{
            name: "",
            email: "",
            mobile_number: "",
            address: "",
            password: "",
            role: "user", // Default role as "user"
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Mobile Number Field */}
              <div>
                <label
                  htmlFor="mobile_number"
                  className="block text-gray-700 font-medium"
                >
                  Mobile Number
                </label>
                <Field
                  type="text"
                  id="mobile_number"
                  name="mobile_number"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="mobile_number" // Fixed name
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Address Field */}
              <div>
                <label htmlFor="address" className="block text-gray-700 font-medium">
                  Address
                </label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;

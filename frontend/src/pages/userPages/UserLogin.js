import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { loginAPI } from "../../services/userServices";
import { login } from "../../redux/userSlice";

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: loginAPI,
    onError: (error) => {
      window.alert(error.response?.data?.error || "An Unexpected Error Occurred");
    },
    onSuccess: (data) => {
      Cookies.set("UserData", data?.token);
      const decoded = jwtDecode(data.token);
      dispatch(login({ user: decoded, token: data.token }));
      navigate(`/user/${decoded?.userId}`);
    },
  });

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    await mutateAsync(values);
  };

  return (
    <section className="flex justify-center items-center mt-6 mb-9 bg-gradient-to-r  px-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl border border-black">
        <h2 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            {/* Email Field */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Field
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full pl-10 text-xs sm:text-xs md:text-sm lg:text-lg pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Password Field */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-xs md:text-sm lg:text-lg"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* <Link
              to="/forget-password"
              className="block text-right text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r bg-white border border-black text-black py-2 px-4 rounded-md font-medium hover:bg-gray-600 hover:text-white hover:border-none transition duration-300
              text-xs sm:text-xs md:text-sm lg:text-lg"
            >
              Login
            </button>
          </Form>
        </Formik>

        <p className="text-center text-xs sm:text-xs md:text-sm lg:text-lg text-gray-600 mt-5">
          Don’t have an account?{' '}
          <Link to="/user/register" className="text-blue-600 text-xs sm:text-xs md:text-sm lg:text-lg hover:underline">
            Create New Account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default UserLogin;

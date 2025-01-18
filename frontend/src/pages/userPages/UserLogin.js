import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import {jwtDecode} from "jwt-decode";
import { loginAPI } from '../../services/userServices';
import { login } from '../../redux/userSlice';

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { mutateAsync } = useMutation({
    mutationFn: loginAPI,
   
    onError: (error) => {
     
       window.alert(error.response?.data?.error || "An Unexpected Error Occurred") 
   
    },
    onSuccess: (data) => {
      Cookies.set("UserData", data?.token);
      const decoded = jwtDecode(data.token);
      dispatch(login({ user: decoded, token: data.token }));
      const userId= decoded?.userId
      console.log(decoded.userId);
      navigate(`/user/${userId}`);
    },

  });

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values) => {
   
    await mutateAsync(values);
    console.log("values",values)
  };

 
  return (
    <section id="login">
      <div className="mx-auto container py-5 px-4">
        <div className="bg-white w-full p-5 border shadow-xl max-w-sm mx-auto">
       
         
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="pt-6">
              <div className="grid mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Email:
                </label>
                <div className="bg-slate-100 p-2 rounded-md">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                  Password:
                </label>
                <div className="bg-slate-100 p-2 flex rounded-md">
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
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                <Link
                  to={'/forget-password'}
                  className="w-fit ml-auto block hover:underline hover:text-cyan-500 mt-2"
                >
                  Forget password?
                </Link>
              </div>

              <button
                type="submit"
                className="bg-cyan-500 text-white px-5 py-2 w-full max-w-[150px] rounded-md hover:scale-105 transition-all mx-auto block"
              >
                Login
              </button>
            </Form>
          </Formik>

          <p className="my-5 text-center">
            Don&#39;t have an account?{' '}
            <Link
              className="hover:text-cyan-500 hover:underline"
              to={'/register'}
            >
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserLogin;

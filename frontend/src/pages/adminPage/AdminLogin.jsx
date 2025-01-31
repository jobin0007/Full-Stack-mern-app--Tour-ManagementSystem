import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import {jwtDecode} from "jwt-decode";
import { login } from '../../redux/adminSlice';
import loginImage from '../../assets/Login-page-character1.png'
import { adminLoginAPI } from '../../services/adminServices';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { mutateAsync } = useMutation({
    mutationFn: adminLoginAPI,
   
    onError: (error) => {
      window.alert(  error.response?.data?.error || "An Unexpected Error Occurred" )
    
    },
    onSuccess: (data) => {
      Cookies.set("AdminData", data?.token);
      const decoded = jwtDecode(data.token);
      const adminId= decoded?.adminId
      dispatch(login({ admin: decoded, token: data.token }));
      navigate(`/admin/${adminId}`);
    },

  });

  
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values) => {
    await mutateAsync(values);
  };

  return (


    <div className="min-h-screen flex items-center justify-center bg-gray-100">

    <div className="grid grid-cols-2 w-full max-w-6xl p-4 bg-white">


      <div className="flex justify-center items-center mb-8 md:mb-0 ">
      
      <img src={loginImage} className="w-full" alt="Home" />
      </div>
      <div className="flex justify-center items-center">
       <section id="login">
       <h1 className='underline text-lg font-bold'>Admin Login</h1>
       
          
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

        
      
    
    </section>      </div>
    </div>
  </div>



  
  );
};

export default AdminLogin;

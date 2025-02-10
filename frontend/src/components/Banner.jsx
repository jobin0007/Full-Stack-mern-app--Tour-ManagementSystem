import React from "react";
import ExampleImage from "../assets/360_F_818523251_T67ETZ2Dx8YMq9aQKgTeRw4ok5mCaeou.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="relative w-full h-[70vh] sm:h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center mb-4 "
      style={{
        backgroundImage: `url(${ExampleImage})`,
      }}
    >
      {/* Dim Overlay */}
      <div className="absolute inset-0  bg-black bg-opacity-50"></div>

      {/* Quote Section */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 font-vollkorn">
          "Travel far, travel wide, and discover yourself"
        </h1>
        <p className="text-sm sm:text-lg md:text-xl font-light mb-6 font-garamond">
          Start your journey with RêveWelt
        </p>
        <Link
         to={"/tours"}
        className="px-4 py-2 sm:px-6 sm:py-3 bg-gray-500 hover:bg-white text-white hover:text-black font-medium rounded transition duration-300 transform hover:scale-105">
          Book Your Travel Now
        </Link>
      </div>
    </div>
  );
};

export default Banner;


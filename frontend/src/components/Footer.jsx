import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CiFacebook, CiTwitter, CiInstagram } from "react-icons/ci";
import { TiSocialGooglePlus } from "react-icons/ti";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#c2b7ae] p-6 md:p-10">
        <div className="container mx-auto grid grid-cols-1 gap-8">
          {/* Follow Us Section */}
          <div>
            <h2 className="text-2xl md:text-3xl text-white text-center">
              Follow Us
            </h2>
          </div>

          {/* Social Icons */}
          <div className="grid grid-flow-row grid-cols-3 sm:grid-cols-6 justify-items-center gap-4">
            <Link to="https://www.facebook.com">
              <CiFacebook className="h-8 w-8 text-white md:h-10 md:w-10 lg:h-12 lg:w-12 transition-transform duration-300 transform hover:scale-110" />
            </Link>
            <Link to="https://twitter.com">
              <CiTwitter className="h-8 w-8 text-white md:h-10 md:w-10 lg:h-12 lg:w-12 transition-transform duration-300 transform hover:scale-110" />
            </Link>
            <Link to="https://instagram.com">
              <CiInstagram className="h-8 w-8 text-white md:h-10 md:w-10 lg:h-12 lg:w-12 transition-transform duration-300 transform hover:scale-110" />
            </Link>
            <Link to="https://plus.google.com">
              <TiSocialGooglePlus className="h-8 w-8 text-white md:h-10 md:w-10 lg:h-12 lg:w-12 transition-transform duration-300 transform hover:scale-110" />
            </Link>
            <Link to="https://github.com">
              <FaGithub className="h-8 w-8 text-white md:h-10 md:w-10 lg:h-12 lg:w-12 transition-transform duration-300 transform hover:scale-110" />
            </Link>
            <Link to="https://linkedin.com">
              <FaLinkedin className="h-8 w-8 text-white md:h-10 md:w-10 lg:h-12 lg:w-12 transition-transform duration-300 transform hover:scale-110" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center items-center gap-4 text-gray-600 text-sm md:text-base">
            <Link className="hover:text-gray-800 transition-colors duration-200" to="/">
              Home
            </Link>
            <span>|</span>
            <Link className="hover:text-gray-800 transition-colors duration-200" to="/about">
              About
            </Link>
            <span>|</span>
            <Link className="hover:text-gray-800 transition-colors duration-200" to="/contact">
              Contact
            </Link>
          </div>

          {/* Email Subscription */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg mx-auto max-w-3xl w-full ">
            <h2 className="text-lg md:text-xl font-semibold text-gray-600 whitespace-nowrap text-center sm:text-left">
              Get Our Updates
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
              <div className="relative w-full sm:flex-1">
                <span className="absolute inset-y-0 left-2 flex items-center text-gray-500">
                  <MdEmail />
                </span>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="pl-8 pr-4 py-2 text-sm md:text-base w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="w-full sm:w-auto px-6 py-2 text-sm md:text-base font-semibold text-white bg-[#612255] rounded hover:bg-[#80327a] transition-transform duration-300 transform hover:scale-105">
                Submit
              </button>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-center text-white text-xs md:text-sm">
            <h2>
              Copyright &copy; 2025 by RêveWelt. Design by Irohub. All rights
              reserved.
            </h2>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

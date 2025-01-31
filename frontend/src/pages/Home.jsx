import React, { useState } from "react";
import Banner from "../components/Banner";
import Tours from "./tours";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
import ExampleImage from "../assets/travel.png"; // Replace with your actual image path
import Search from "../components/Search";
import SubscriptionSection from "../components/Subcription";
import Slideshow from "../components/Slideshow";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [filters, setFilters] = useState({});  // Store search filters

  // Update filters when user searches
  const handleSearch = (filterData) => {
    setFilters(filterData);
  };


  return (
    <div className="grid grid-cols-1 grid-flow-row ">
    
      <header className="bg-gradient-to-r head  shadow-md">
     
        <div className="grid grid-cols-3 items-center p-4">
          <div />
          <h1 className="text-lg md:text-3xl font-bold text-center text- font-mono">
            RêveWelt
          </h1>
          <div className="flex justify-end relative items-center gap-2">
          <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-sky-600 hover:text-sky-800 text-2xl "
            >
              <FaBars />
            </button>
            <span className="hidden md:block text-sm text-gray-700">
              Welcome to RêveWelt!
            </span>

            <button
              onClick={() => setShowPopup(!showPopup)}
              className="text-sky-600 hover:text-sky-800 text-3xl"
            >
              <FaUserCircle />
            </button>

           

            {showPopup && (
              <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    User Options
                  </h2>
                  <p className="mb-2">
                    <Link to="/new-user" className="text-sky-600 mr-4 underline">
                      New User ?
                    </Link>
                    <Link to="/user/register" className="text-sky-600 hover:underline">
                      Sign In
                    </Link>
                  </p>
                  <p className="mb-2">
                   
                  </p>
                  <p>
                    <Link to="/user/login" className="text-sky-600 hover:underline">
                      Login
                    </Link>
                  </p>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center p-6">
          <img
            src={ExampleImage}
            alt="Logo"
            className="mx-auto mb-4 w-14 sm:w-20 md:w-28 lg:w-36  transition-transform duration-300 hover:scale-110"
          />
          <p className="text-gray-700 text-xl font-semibold font-mono">
          “When preparing to travel, lay out all your clothes and all your money. Then take half the clothes and twice the money.” – Susan Heller          </p>
          <p className="text-gray-600 text-lg font-mono">
            We selected the 2635 homes worth renting in this location.
          </p>
        </div>
  {/* Place Search Bar Here and Pass handleSearch */}
  <Search onSearch={handleSearch} />
      </header>
    
         {/* Pass filters to Tours */}
         <Tours filters={filters} />
         <Slideshow/>
         <SubscriptionSection/>
      <Banner  />
     
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import SearcBox from "./SearcBox";
import ExampleImage from "../assets/travel.png"; // Your background image
import { Link } from "react-router-dom";
import register from '../assets/registered.png'
import support from "../assets/support.png";
import home from "../assets/home.png";
import about from "../assets/id-card.png";
import services from "../assets/customer-service.png";
import Examplemage from "../assets/360_F_818523251_T67ETZ2Dx8YMq9aQKgTeRw4ok5mCaeou.jpg";
import { GrSearch } from "react-icons/gr";



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To control dropdown visibility
  const [isRegistered, setIsRegistered] = useState(false); // Default is not registered
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // Toggle dropdown visibility
  
  return (
    <header className=" w-full h-fit  bg-white shadow-md">
    <div className=" container  mx-auto px-4 py-5 flex justify-between items-center">
      {/* Logo */}
      <Link
        to={''}
        >
      <div className="flex flex-col items-center space-y-2 font-semibold">
      
        <img
          src={ExampleImage}
          alt=""
          className="text-sm w-14 sm:text-lg md:text-1xl lg:text-2xl xl:text-2xl transition-transform duration-300 hover:scale-110"
        />
        <span className="font-serif text-blue-500 text-sm sm:text-lg md:text-1xl lg:text-2xl xl:text-2xl">
          RêveWelt
        </span>
       
      </div>
      </Link>
      <div className=' hidden lg:flex '>
        <button className="transition-transform duration-300 hover:scale-110">
        <SearcBox  className='w-full'/>
        </button>
      

                 </div>
      {/* Navigation Menu for Desktop */}
      <nav className="hidden md:flex items-center space-x-8 text-gray-700">
  
      
     
      {/* Main Button */}
    
      {/* Dropdown Menu */}
      <div className="relative inline-block text-left">
      {/* Logo and Question */}
      <div className="flex items-center space-x-4">
      
        <button
          onClick={toggleDropdown}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white "
        >
          <img
          src={register}
          alt="Logo"
         className="w-8 transition-transform duration-300 hover:scale-110"
        />
         
   
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-transform duration-300 hover:scale-110"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          
          <div className="py-1">
        <div className=" flex flex-row">
        <span className="px-4 py-2 underline">New user ?</span>  
          
          <button
            className="block  py-2 text-sm text-gray-700  "
            role="menuitem"
          >
            <Link to={'/register'}>Sign In</Link>
         
          </button>
        </div>
            <button
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
            >
            <Link to={'user/login'}> Login</Link>
            </button>
          </div>
        </div>
      )}
    </div>
        
 
    
  
    
        <Link
          href="#"
          to={""}
          className="relative group hover:text-blue-300 transition duration-300 transform hover:scale-105 "
        >
          <img src={home} className="w-8" alt="Home" />
          {/* Hover text above the icon */}
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition">
            Home
          </span>
        </Link>
        <Link
          href="#"
          to={""}
          className="relative group hover:text-blue-300 transition duration-300 transform hover:scale-105"
        >
          <img src={services} className="w-8" alt="Home" />
          {/* Hover text above the icon */}
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition">
            Services
          </span>
        </Link>
        <Link
          href="#"
          to={'about'}
          className="relative group hover:text-blue-300 transition duration-300 transform hover:scale-105"
        >
          <img src={about} className="w-8" alt="Home" />
          {/* Hover text above the icon */}
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition">
            About
          </span>
        </Link>
        <Link
          href="#"
          to={""}
          className="relative group hover:text-blue-300 transition duration-300 transform hover:scale-105"
        >
          <img src={support} className="w-8" alt="Home" />
          {/* Hover text above the icon */}
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition">
            Contact
          </span>
        </Link>
       
      </nav>
  
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={toggleMenu}
        className="block md:hidden focus:outline-none hover:text-blue-400 transition duration-300 transform hover:scale-105"
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  
    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className=" md:hidden text-sm">
        {/* Mobile Search Box */}
        <div className="justify-items-center m-auto w-56">
        <SearcBox />
        </div>
    
        <a
          href="#"
          className="block px-4 py-2 hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Home
        </a>
        <a
          href="#"
          className="block px-4 py-2 hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          About
        </a>
        <a
          href="#"
          className="block px-4 py-2 hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Services
        </a>
        <a
          href="#"
          className="block px-4 py-2 hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        >
          Contact
        </a>
      </div>
    )}
      </header>
   );
};

export default Header;

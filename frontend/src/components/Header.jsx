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
import Search from "./Search";


 

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

  const phoneNumber = "+918593826584";
  const message = "Hello,I would like to chat with you.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  
  return (
    <header className=" w-full h-fit  bg-white ">
    <div className=" container  mx-auto px-10 py-10 flex justify-between items-center">
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
 
      

                 </div>
      {/* Navigation Menu for Desktop */}
      <nav className="hidden md:flex items-center space-x-20 font-montserrat font-bold text-gray-700">
  
      
     
      
      
        
 
    
  
    
        <Link
          href="#"
          to={""}
          className="relative group  hover:text-blue-300 transition duration-300 transform hover:scale-105 "
        >
    
          {/* Hover text above the icon */}
            Home
     
        </Link>
        <Link
          href="#"
          to={"/tours"}
          className="relative group hover:text-blue-300 transition duration-300 transform hover:scale-105"
        >
   
         
          
Our Packages
         
        </Link>
        <Link
          href="#"
          to={'about'}
          className="relative group hover:text-blue-300 transition duration-300 transform hover:scale-105"
        >
        
       
            About
         
        </Link>
        <Link
          href="#"
          to={whatsappLink}
          className="relative group hover:text-blue-300 transition duration-300 transform hover:scale-105"
        >
     
          {/* Hover text above the icon */}
            Contact
        
        </Link>
       
      </nav>
  
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={toggleMenu}
        className="block md:hidden font-montserrat font-bold focus:outline-none hover:text-blue-400 transition duration-300 transform hover:scale-105"
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
    
    
       
        <Link
          href="#"
          to={""}
          className="block px-4 py-2 group  hover:text-blue-300 transition duration-300 transform hover:scale-105 "
        >
    
          {/* Hover text above the icon */}
            Home
     
        </Link>
        <Link
          href="#"
          to={"/tours"}
          className="block px-4 py-2 group hover:text-blue-300 transition duration-300 transform hover:scale-105"
        >
   
         
          
Our Packages
         
        </Link>
        <Link
          href="#"
          to={'about'}
          className="block px-4 py-2 group hover:text-blue-300 transition duration-300 transform hover:scale-105"
        >
        
       
            About
         
        </Link>
        <Link
          href="#"
          to={whatsappLink}
          className="block px-4 py-2 group hover:text-blue-300 transition duration-300 transform hover:scale-105"
        >
     
          {/* Hover text above the icon */}
            Contact
        
        </Link>
       
      </div>
    )}
      </header>
   );
};

export default Header;

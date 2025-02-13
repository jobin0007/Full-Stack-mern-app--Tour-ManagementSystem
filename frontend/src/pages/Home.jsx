// import React, { useState } from "react";
// import Banner from "../components/Banner";
// import Tours from "./tours";
// import { IoClose, IoPersonAdd, IoLogIn } from "react-icons/io5";
// import { Link } from "react-router-dom";
// import { FaUserCircle, FaBars } from "react-icons/fa";
// import ExampleImage from "../assets/travel.png"; // Replace with your actual image path
// import Search from "../components/Search";
// import SubscriptionSection from "../components/Subcription";
// import Slideshow from "../components/Slideshow";
// import UserLogin from "./userPages/UserLogin";

// const Home = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [filters, setFilters] = useState({});
//   const [isLoginOpen, setIsLoginOpen] = useState(false);

//   const handleSearch = (filterData) => {
//     setFilters(filterData);
//   };

//   return (
//     <div className="grid grid-cols-1 grid-flow-row ">
//       <header className="bg-gradient-to-r head  shadow-md">
//         <div className="grid grid-cols-3 items-center p-4">
//           <div />
//           <h1 className="text-lg md:text-3xl font-bold text-center text- font-mono">
//             RêveWelt
//           </h1>
//           <div className="flex justify-end relative items-center gap-2">
//             <button
//               onClick={() => setShowMenu(!showMenu)}
//               className="text-sky-600 hover:text-sky-800 text-2xl "
//             >
//               <FaBars />
//             </button>
//             <span className="hidden md:block font-vollkorn text-sm text-gray-700">
//               Welcome to RêveWelt!
//             </span>

//             <button
//               onClick={() => setShowPopup(!showPopup)}
//               className="text-sky-600 hover:text-sky-800 text-3xl"
//             >
//               <FaUserCircle />
//             </button>

//             {showPopup && (
//               <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4 sm:p-6">
//                 <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center">
//                   <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
//                     User Options
//                   </h2>

//                   <div className="flex justify-center space-x-4 mb-3">
//                     <Link
//                       to="/new-user"
//                       className="flex items-center text-sky-600 text-sm sm:text-base"
//                     >
//                       <IoPersonAdd className="mr-1" /> New User.......... ?
//                     </Link>
//                     <Link
//                       to="/user/register"
//                       className="flex items-center text-sky-600 hover:underline text-sm sm:text-base"
//                     >
//                       <IoLogIn className="mr-1" /> Sign In
//                     </Link>
//                   </div>

//                   <div>
//                     <button
//                       onClick={() => setIsLoginOpen(true)}
//                       className="flex mx-auto items-center justify-center text-sky-600 hover:underline text-sm sm:text-base"
//                     >
//                       <IoLogIn className="mr-1" /> Login
//                     </button>
//                     <UserLogin
//                       isOpen={isLoginOpen}
//                       onClose={() => setIsLoginOpen(false)}
//                     />
//                   </div>

//                   <button
//                     onClick={() => setShowPopup(false)}
//                     className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 w-full max-w-[150px] mx-auto"
//                   >
//                     <IoClose className="text-lg" /> Close
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="text-center p-6">
//           <img
//             src={ExampleImage}
//             alt="Logo"
//             className="mx-auto mb-4 w-14 sm:w-20 md:w-28 lg:w-36  transition-transform duration-300 hover:scale-110"
//           />
//           <p className="text-gray-700 text-xl font-semibold font-mono">
//             “When preparing to travel, lay out all your clothes and all your
//             money. Then take half the clothes and twice the money.” – Susan
//             Heller{" "}
//           </p>
//           <p className="text-gray-600 text-lg font-mono">
//             We selected the 2635 homes worth renting in this location.
//           </p>
//         </div>
//         {/* Place Search Bar Here and Pass handleSearch */}
//         <Search onSearch={handleSearch} />
//       </header>

//       {/* Pass filters to Tours */}
//       <Tours filters={filters} />
//       <Slideshow />
//       <SubscriptionSection />
//       <Banner />
//     </div>
//   );
// };

// export default Home;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoClose, IoPersonAdd, IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import Banner from "../components/Banner";
import Tours from "./tours";
import Search from "../components/Search";
import SubscriptionSection from "../components/Subcription";
import Slideshow from "../components/Slideshow";
import UserLogin from "./userPages/UserLogin";
import ExampleImage from "../assets/travel.png";
import Aboutus from "../components/Aboutus";
import Modern from "../components/Modern";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [filters, setFilters] = useState({});
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const phoneNumber = "+918593826584";
  const message = "Hello,I would like to chat with you.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  

  const handleSearch = (filterData) => {
    setFilters(filterData);
  };

  return (
    <div className="grid grid-cols-1 grid-flow-row">
    
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-gradient-to-r head shadow-md"
      >
        <div className="grid grid-cols-3 items-center p-4">
          <div />
          <h1 className="text-lg md:text-3xl font-bold text-center font-mono">
            RêveWelt
          </h1>
          <div className="flex justify-end relative items-center gap-2">
            {/* <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-sky-600 hover:text-sky-800 text-2xl"
            >
              <FaBars />
            </button> */}
              <button
        onClick={() => setShowMenu(!showMenu)}
        className="text-sky-600 hover:text-sky-800 text-2xl"
        aria-label="Toggle Menu"
      >
        <FaBars />
      </button>
            <span className="hidden md:block font-vollkorn text-sm text-gray-700">
              Welcome to RêveWelt!
            </span>
            <button
              onClick={() => setShowPopup(!showPopup)}
              className="text-sky-600 hover:text-sky-800 text-3xl"
            >
              <FaUserCircle />
            </button>
          </div>
        </div>

        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center p-6"
        >
          <img
            src={ExampleImage}
            alt="Logo"
            className="mx-auto mb-4 w-14 sm:w-20 md:w-28 lg:w-36 transition-transform duration-300 hover:scale-110"
          />
          <p className="text-gray-700 text-xl font-semibold font-mono">
            “When preparing to travel, lay out all your clothes and all your
            money. Then take half the clothes and twice the money.” – Susan
            Heller
          </p>
          <p className="text-gray-600 text-lg font-mono">
            We selected the 2635 homes worth renting in this location.
          </p>
        </motion.div>

     
        <motion.div
          whileInView={{ x: 0, opacity: 1 }}
          initial={{ x: -100, opacity: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Search onSearch={handleSearch} />
        </motion.div>
      </motion.header>

      {showMenu && (
        <div className="fixed inset-0 z-50 flex">
          {/* Sidebar Content */}
          <div className="bg-white w-64 p-4 shadow-lg h-full relative">
            {/* Close Button */}
            <button
              onClick={() => setShowMenu(false)}
              className="absolute top-2 right-2 text-2xl text-sky-600 hover:text-sky-800"
              aria-label="Close Menu"
            >
              <FaTimes />
            </button>

            {/* Navigation Links */}
            <nav className="mt-10 space-y-4">
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
            </nav>
          </div>

          {/* Overlay to Close Menu */}
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setShowMenu(false)}
          ></div>
        </div>
      )}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <Tours filters={filters} />
      </motion.div>
    

      <motion.div
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 50 }}
    transition={{ duration: 1, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.3 }}
      >
        <Slideshow />
        <motion.div
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 50 }}
    transition={{ duration: 1, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.3 }}
      >
      <Aboutus/>
      </motion.div>

      </motion.div>
      <motion.div
        whileInView={{ y: 0, opacity: 1 }}
        initial={{ y: 50, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 1,
        }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <Banner />
      </motion.div>
      <motion.div
   whileInView={{ opacity: 1, y: 0 }}
   initial={{ opacity: 0, y: 50 }}
   transition={{ duration: 1, ease: "easeOut" }}
   viewport={{ once: false, amount: 0.3 }}
      >
        <Modern />
      </motion.div>
  
      <motion.div
   whileInView={{ opacity: 1, y: 0 }}
   initial={{ opacity: 0, y: 50 }}
   transition={{ duration: 1, ease: "easeOut" }}
   viewport={{ once: false, amount: 0.3 }}
      >
        <SubscriptionSection />
      </motion.div>

 
      


  
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4 sm:p-6"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              User Options
            </h2>

            <div className="flex justify-center space-x-4 mb-3">
              <Link
                to="/new-user"
                className="flex items-center text-sky-600 text-sm sm:text-base"
              >
                <IoPersonAdd className="mr-1" /> New User.......... ?
              </Link>
              <Link
                to="/user/register"
                className="flex items-center text-sky-600 hover:underline text-sm sm:text-base"
              >
                <IoLogIn className="mr-1" /> Sign In
              </Link>
            </div>

            <div>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="flex mx-auto items-center justify-center text-sky-600 hover:underline text-sm sm:text-base"
              >
                <IoLogIn className="mr-1" /> Login
              </button>
              <UserLogin isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            </div>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 w-full max-w-[150px] mx-auto"
            >
              <IoClose className="text-lg" /> Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;


import React, { useState, useEffect } from "react";
import exma from '../assets/The-Best-Places-to-visit-in-Armenia (1).jpg'
import jjkk from '../assets/shutterstock_1522090874-scaled.jpg'
import kll from '../assets/Holy land.jpg'
import { MdOutlineKeyboardArrowLeft,MdKeyboardArrowRight } from "react-icons/md";

const Slideshow = () => {
  const slides = [
    {
      image: exma, // Replace with your image URLs
      title: "Explore the Beautiful Beaches",
      description: "Enjoy the serenity and beauty of tropical beaches around the world.",
    },
    {
      image: jjkk,
      title: "Adventure in the Mountains",
      description: "Experience the thrill of hiking and exploring the majestic mountains.",
    },
    {
      image:kll,
      title: "Discover Ancient Ruins",
      description: "Step back in time and explore ancient civilizations and their ruins.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative w-full  mx-auto mt-6">
      <div className="relative w-full h-96 sm:h-[400px] md:h-[500px]">
        <img
          src={slides[currentSlide].image}
          alt="Tour"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="space-y-4 px-6 sm:px-12 md:px-24">
            <h2 className="text-3xl md:text-4xl font-bold">{slides[currentSlide].title}</h2>
            <p className="text-lg md:text-xl">{slides[currentSlide].description}</p>
            <button className="mt-6 px-8 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition duration-300">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between px-6 md:px-12">
        <button
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)
          }
          className=" text-white p-2  "
        >
      <MdOutlineKeyboardArrowLeft className="text-white mr-2" size={70} />
        </button>
        <button
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className=" text-white p-2 "
        >
      <MdKeyboardArrowRight className="text-white mr-2" size={70} />
        </button>
      </div>
    </div>
  );
};

export default Slideshow;

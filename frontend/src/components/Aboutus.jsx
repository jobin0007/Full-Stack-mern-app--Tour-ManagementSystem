import React from 'react';
import { Link } from 'react-router-dom';

const Aboutus = () => {
  return (
    <div className="flex flex-col items-center w-full py-2  mt-3 mb-4 text-center [word-spacing:6px] tracking-wide">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 font-garamond">About Us</h1>
      <div className="space-y-4 p-8 font-montserrat w-11/12">
        <p className="text-lg md:text-xl">
          We are an independent company with a worldwide global network of travel agency partners, and corporate business partners.
        </p>
        <p className="text-lg md:text-xl">
          We are committed to support our local communities through our well-studied tourist programs, creating once-in-a-lifetime experiences for our guests.
        </p>
        <p className="text-lg md:text-xl">
          Our long experience in the tourism field allows us to provide our clients with tailor-made tours that suit their specifications and needs with meticulous attention to detail.
        </p>
        <p className="text-lg md:text-xl">
          Our program categories cover various types of travelers' anticipations for Jordan, Holy Land, UAE, Bulgaria, Romania, Georgia, and Armenia.
        </p>
        <p className="text-lg md:text-xl">
          Modern Tours’ travel experts are fully prepared with high customer-care expertise to assist clients with maximum care and attention.
        </p>
        <p className="text-lg md:text-xl">
          Our staff possess unique operational coordination skills across hotels, drivers, guides, and daily activities to ensure a smooth, enjoyable experience.
        </p>
        <p className="text-lg md:text-xl">
          Modern Tours creates valuable holiday packages, private tours, and tailor-made experiences across different countries.
        </p>
        <p className="text-lg md:text-xl">
          We hire highly respected native guides who bring years of expertise in cultural, desert, nature, and leisure tours.
        </p>
        <p className="text-lg md:text-xl">
          Our focus is on delivering high-quality, personalized services while sharing the beauty of local cultures.
        </p>
        <p className="text-lg md:text-xl">
          We prioritize customer satisfaction by providing exceptional services at competitive prices without compromising quality.
        </p>
      </div>
      <div className="mt-6 text-lg">
        <Link to="/about" className="font-bold text-black hover:underline font-vollkorn">
          Read More...
        </Link>
        <span className="ml-2 ">About us</span>
      </div>
    </div>
  );
};

export default Aboutus;

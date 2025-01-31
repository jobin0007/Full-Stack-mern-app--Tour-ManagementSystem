import React from "react";
import { AiOutlineMail } from "react-icons/ai";

const SubscriptionSection = () => {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full bg-white p-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Stay updated with our latest tours and offers.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center ">
          <div className="relative w-full sm:w-auto">
            {/* Icon inside the input box */}
            <AiOutlineMail
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto border pl-10 pr-4 py-3  focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-sky-500 text-white  hover:bg-sky-600 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionSection;

// import React, { useState } from 'react'

// const Search = () => {
    
  
//   return (
//     <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-6 bg-white">
//           {/* Search by Location */}
//           <div className="w-full md:w-1/4">
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Search Location
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Enter location"
              
//                 className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
//               />
             
             
//             </div>
//           </div>

//           {/* Search by Title */}
//           <div className="w-full md:w-1/4">
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Title
//             </label>
//             <input
//               type="text"
//               placeholder="Search by title"
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
//             />
//           </div>

//           {/* Search by Price */}
//           <div className="w-full md:w-1/4">
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Price
//             </label>
//             <input
//               type="text"
//               placeholder="Search by price"
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
//             />
//           </div>
//         </div>
//   )
// }

// export default Search



import React, { useState } from "react";
import { TfiSearch } from "react-icons/tfi";
import { AiOutlineSearch } from "react-icons/ai";

const Search = ({ onSearch }) => {
  const [destinations, setDestinations] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleSearch = () => {
    onSearch({ destinations, title, price });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-6 bg-white">
      <div className="w-full md:w-1/4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Search Location
        </label>
        <input
          type="text"
          value={destinations}
          onChange={(e) => setDestinations(e.target.value)}
          placeholder="Enter location"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="w-full md:w-1/4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search by title"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="w-full md:w-1/4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Price
        </label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Search by price"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      {/* <div className="flex w-full md:w-1/4 mt-6">
      <button onClick={handleSearch} className="w-full  text-black py-2 px-4 rounded">
        <TfiSearch/>
          Search
        </button>
      </div> */}

<div className="w-44 h-7  flex items-end mt-12">
        <button
          onClick={handleSearch}
          className="w-full flex items-center justify-center gap-2 border  text-black py-3 px-4 rounded-md hover:bg-gray-800  hover:text-white transition-all duration-200"
        >
          <AiOutlineSearch size={20} />
          <span>Search</span>
        </button>
      </div>
      
    </div>
  );
};

export default Search;

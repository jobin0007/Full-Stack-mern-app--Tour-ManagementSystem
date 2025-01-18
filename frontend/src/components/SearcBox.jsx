import React, { useState } from "react";
import { GrSearch } from "react-icons/gr";
const SearcBox = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Stores the search query

  

  return (


    
    <div className='flex items-center w-full justify-between max-w-sm border border-cyan-500 rounded-full pl-5     '>
    <input type='text ' placeholder='search.....' className='w-full outline-none '
    
          value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
    >

    </input>
    <div className='text-lg w-13 bg-cyan-600 min-w-[50px] h-8 flex items-center justify-center rounded-r-full text-white'>
        <GrSearch />
    </div>
</div>



    // <div className="relative  p-3 w-full ">
    //   {/* Conditionally render the input field */}
     
    //     <input
    //       type="text"
    //       value={searchQuery}
    //       onChange={(e) => setSearchQuery(e.target.value)}
    //       className="w-full px-2 py-1 p-2 text-xs sm:px-3 sm:py-2 sm:text-xs md:text-sm lg:text-sm xl:text-lg rounded-full bg-white border border-gray-500 text-gray-700 focus:outline-none"
    //       placeholder="Search..."
    //     />
     
    //   <button
        
    //     className="absolute right-2  sm:text-xs md:text-sm lg:text-lg xl:text-lg top-1/2 transform -translate-y-1/2  px-2 py-1 text-xs sm:px-3 sm:py-2  "
    //   >
    //     <FaSearch />
    //   </button>
    // </div>
  );
};

export default SearcBox;

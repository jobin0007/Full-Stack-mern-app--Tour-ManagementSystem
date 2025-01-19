import React, { useState } from 'react'

const Search = () => {
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const locations = ["New York", "Los Angeles", "Miami", "Chicago", "Houston"];
  
    const handleSearchChange = (e) => {
      const query = e.target.value.toLowerCase();
      if (query) {
        const suggestions = locations.filter((location) =>
          location.toLowerCase().includes(query)
        );
        setSearchSuggestions(suggestions);
      } else {
        setSearchSuggestions([]);
      }
    };
  
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-6 bg-white">
          {/* Search by Location */}
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Search Location
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter location"
                onChange={handleSearchChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              {searchSuggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 mt-1 rounded-md shadow-lg w-full z-10">
                  {searchSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-sky-100 cursor-pointer"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Search by Title */}
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Search by title"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Search by Price */}
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Price
            </label>
            <input
              type="text"
              placeholder="Search by price"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
  )
}

export default Search
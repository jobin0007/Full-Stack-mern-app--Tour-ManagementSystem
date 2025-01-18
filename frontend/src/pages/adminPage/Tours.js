import React from "react";

const Tours = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-sky-500 mb-4">All Tours</h2>
      <div className="bg-sky-50 p-4 rounded-md shadow-sm">
        <p className="text-gray-700">
          No tours available. Add tours or fetch from the server.
        </p>
      </div>
    </div>
  );
};

export default Tours;

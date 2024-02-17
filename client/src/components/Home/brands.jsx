/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Brands = ({ title, brands, message }) => {
  const [showAllBrands, setShowAllBrands] = useState(false);

  const toggleShowAllBrands = () => {
    setShowAllBrands(!showAllBrands);
  };

  return (
    <div className="border border-gray-300 p-4 mb-4 w-full bg-white">
      <h2 className="text-xl font-bold mb-4 text-black">{title}</h2>
      <p className="text-md font-bold mb-4">{message}</p>
      <hr />
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {brands.slice(0, showAllBrands ? brands.length : 5).map((brand, index) => (
          <div key={index}>
            <div className="border border-gray-300 rounded-sm p-4 mb-2 justify-between items-center">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-48 w-full mr-4 mt-1 rounded-sm"
              />
            </div>
          </div>
        ))}
      </div>
      {brands.length > 5 && (
        <button
          onClick={toggleShowAllBrands}
          className="mt-4 font-semibold text-orange-600 focus:outline-none hover:text-orange-800"
          style={{ float: "right" }}
        >
          {showAllBrands ? "Collapse" : "View all brands"}
        </button>
      )}
    </div>
  );
};

export default Brands;

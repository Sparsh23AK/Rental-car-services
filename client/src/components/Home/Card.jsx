/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

const Card = ({ car }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { name, price, image1, image2, image3 } = car;
  const images = [image1, image2, image3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="border border-gray-300 rounded-sm p-2 mb-2 justify-between items-center">
      <div className="relative h-48">
        <img
          src={images[currentImageIndex]}
          alt={name}
          className="h-full w-full object-cover rounded-md"
        />
        <div className="absolute top-0 left-0 p-2 bg-black bg-opacity-50 text-white font-bold">
          {name}
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="text-lg font-bold">&#x20B9; {price}</p>
        <button className="px-4 py-2 bg-white text-black border border-black rounded-lg transition-all hover:bg-orange-500 hover:text-white hover:border-white">
          Show Details
        </button>
      </div>
    </div>
  );
};

export default Card;

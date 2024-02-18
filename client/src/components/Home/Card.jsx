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

  const formatPrice = (price) => {
    if (price < 100000) {
      return `₹ ${price}`;
    } else if (price < 10000000) {
      return `₹ ${(price / 100000).toFixed(1)} Lakh`;
    } else {
      return `₹ ${(price / 10000000).toFixed(1)} Crore`;
    }
  };

  return (
    <div className="border border-gray-300 rounded-sm justify-between items-center">
      <div className="relative h-48">
        <img
          src={images[currentImageIndex]}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white font-bold">
          {name}
        </div>
      </div>
      <div className="pt-4 bottom-0 left-0 right-0">
        <p className="text-lg font-bold p-2"> {formatPrice(price)}</p>
        <button className="mt-2 w-full px-4 py-2 bg-white text-black border border-black  transition-all hover:bg-orange-500 hover:text-white hover:border-white">
          Show Details
        </button>
      </div>
    </div>
  );
};


export default Card;

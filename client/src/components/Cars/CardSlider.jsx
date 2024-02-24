/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { MdOutlineElectricalServices } from "react-icons/md";

const CardSlider = ({ car, isElectric }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { name, price, image1, image2, image3, brand } = car;
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
    <div className="rounded-sm justify-between items-center">
      <div className="relative h-60">
        <img
          src={images[currentImageIndex]}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      </div>
      <h3 className="p-3 text-lg font-bold">{name}</h3>
      <div className="bottom-0 left-0 right-0">
        <img
          src={brand.logo}
          alt={brand.make}
          className="h-16 w-12 ml-2 object-contain"
        />
        <p className="text-md font-bold p-2 ml-1"> {formatPrice(price)}</p>
        <button
          className={`mt-2 w-full px-4 py-2 rounded-lg bg-white text-black border border-black  transition-all
          hover:text-white hover:border-white ${
            isElectric ? "hover:bg-green-300" : "hover:bg-orange-400"
          }`}
        >
          Show Details
        </button>
      </div>
    </div>
  );
};

export default CardSlider;

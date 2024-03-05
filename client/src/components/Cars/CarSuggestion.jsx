/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CardSlider from "./CardSlider";
import Brands from "../Home/brands";

const CarSuggestions = ({ type, currentBrand, currentCarType, fuelType }) => {
  const { cars: allCars } = useSelector((state) => state.car);
  const { brands } = useSelector((state) => state.brand);
  const [isEmpty, setIsEmpty] = useState(false);

  let suggestions = [];
  let brandsArray = [];
  let title = "";

  if (type === "carType") {
    // Logic to suggest cars of the same type
    suggestions = allCars.filter((car) => car.carType === currentCarType);
    title = "Cars";
  } else if (type === "brand") {
    brandsArray = brands.filter((brand) => brand.make !== currentBrand);
    title = "Brands";
  }

  // Function to shuffle array
  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  return (
    <div className="shadow-lg rounded-md mt-8 p-4 mb-8">
      <h2 className="font-bold text-2xl">Suggested {title} </h2>
      {type === "carType" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shuffleArray(suggestions).slice(0, 4).map((car, index) => (
            <CardSlider key={index} car={car} />
          ))}
        </div>
      ) : (
        <div className="container max-w-7xl mx-auto mt-8">
          <Brands
            title=""
            message="Explore Cars by Brand."
            brands={brandsArray}
          />
        </div>
      )}
    </div>
  );
};

export default CarSuggestions;

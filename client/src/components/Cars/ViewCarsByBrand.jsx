/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CardSlider from "./CardSlider";
import Loader from "../Home/Loader";
import { useParams } from "react-router-dom";
import CarSuggestions from "./CarSuggestion";

const ViewCarsByBrand = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cars: allCars } = useSelector((state) => state.car);
  const { make } = useParams();
  const { brands } = useSelector((state) => state.brand);
  const [currentBrand, setCurrentBrand] = useState({});

  useEffect(() => {
    setLoading(true);
    if (make) {
      const filteredCars = allCars.filter((car) => car.brand.make === make);
      const cb = brands.filter((brand) => brand.make === make);
      setCurrentBrand(cb[0]);
      setCars(filteredCars);
      setLoading(false);
    }
  }, [make, allCars]);

  return (
    <div>
      {loading ? (
        <Loader /> 
      ) : (
        <div className="container max-w-7xl mx-auto p-2 mb-4 w-full bg-white">
          <div className="border border-gray-300 mt-8 mb-8 shadow-lg p-8 flex rounded-md">
            <img
              src={currentBrand.logo}
              alt={currentBrand.make}
              className="h-28 w-36 pl-2 pr-2 rounded-md"
            />
            <div className="pl-4 text-justify">
              <h3 className="font-bold text-xl">Did you know?</h3>
              <p>{currentBrand.facts}</p>
            </div>
          </div>
          <h2 className="text-4xl font-semibold text-gray-700 mb-4 mt-2 rounded-sm">
            {`Available Cars by ${make}`}
          </h2>
          <div className="border border-gray-300 p-6 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cars.map((card, index) => (
              <CardSlider key={index} car={card} isElectric={false} />
            ))}
          </div>
          <CarSuggestions
            type="brand"
            currentBrand={currentBrand.make}
            currentCarType=""
          />
        </div>
      )}
    </div>
  );
};

export default ViewCarsByBrand;

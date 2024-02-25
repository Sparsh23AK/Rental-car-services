/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../Home/Loader";
import { useParams } from "react-router-dom";
import CarSuggestions from "./CarSuggestion";

const ViewCar = () => {
  const [car, setCar] = useState({});
  const [loading, setLoading] = useState(true);
  const { cars: allCars } = useSelector((state) => state.car);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchCarById(id);
  }, [id, allCars]);

  const fetchCarById = async (id) => {
    try {
      const url = `/api/cars/getCarById/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setCar(data);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching car", error);
      setLoading(false);
    }
  };

  const renderBasicDetails = () => {
    return (
      <div className="flex flex-wrap items-center justify-between">
        <div className="w-full md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-semibold">{car.name}</h1>
          <p className="text-gray-500">{car.description}</p>
          <div className="flex items-center mt-4">
            <div className="flex items-center">
              <span className="text-lg font-semibold mr-1">Rating:</span>
              <div className="flex">
                {[...Array(5)].map((star, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 fill-current ${
                      index < car.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L10 13.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 8.124a.75.75 0 01.416-1.28l4.21-.612L9.327 2.42A.75.75 0 0110 2zM10 16a.75.75 0 01.375.102l3.391 1.782-.643-3.747a.75.75 0 01.217-.666l2.74-2.674-3.793-.551a.75.75 0 01-.563-.41L10 4.934 7.193 8.145a.75.75 0 01-.563.41l-3.793.55 2.74 2.675a.75.75 0 01.217.665l-.643 3.747 3.391-1.782a.75.75 0 01.375-.102z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </div>
            <p className="ml-4">({car.rating} out of 5 stars)</p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold">Price: ${car.price}</p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img src={car.image1} alt={car.name} className="w-full h-auto" />
        </div>
      </div>
    );
  };

  const renderKeyFeatures = () => {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Key Features</h2>
        <ul className="list-disc pl-4 mt-4">
          <li>Mileage: {car.mileage}</li>
          {car.fuelType !== "Electric" && <li>Engine: {car.engine}</li>}
          <li>Power: {car.power}</li>
          {car.fuelType !== "Electric" && <li>Drive Type: {car.driveType}</li>}
          {car.fuelType === "Electric" && <li>Charging Time: {car.chargingTime}</li>}
        </ul>
      </div>
    );
  };

  return (
    <div>
      {loading ? (
        <Loader /> // Render a loader while data is loading
      ) : (
        <div className="relative max-w-7xl mx-auto h-full ">
          <div className="border border-gray-300 p-6 mt-4">
            <div className="container mx-auto">
              {renderBasicDetails()}
              {renderKeyFeatures()}
            </div>
          </div>
          <CarSuggestions
            type="carType"
            currentBrand=""
            currentCarType={car.carType}
          />
        </div>
      )}
    </div>
  );
};

export default ViewCar;

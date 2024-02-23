/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CardSlider from "./CardSlider";
import Loader from "../Home/Loader";
import { useNavigate, useParams } from "react-router-dom";
import ElectricVehicleDetails from "./ElectricVehicleDetails";

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cars: allCars } = useSelector((state) => state.car);
  const { fuelType, priceRange, carType } = useParams();

  useEffect(() => {
    setLoading(true);
    let filteredCars = [];
    if (fuelType === "Electric") {
      filteredCars = allCars.filter((car) => car.fuelType === fuelType);
      setLoading(false);
    } else {
      fetchCarsByPriceRange(priceRange, carType)
        .then((cars) => {
          setCars(cars);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching cars:", error);
          setLoading(false);
        });
    }
  }, [fuelType, priceRange, carType, allCars]);

  const fetchCarsByPriceRange = async (priceRange, carType) => {
    try {
      const url = `/api/cars/fetchCarsByPriceRangeAndType?priceRange=${priceRange}&carType=${carType}`;
      const response = await fetch(url);
      const data = await response.json();
      return data; // Assuming data is an array of cars
    } catch (error) {
      console.error(
        "Error fetching cars by price range and vehicle type:",
        error
      );
      throw error;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const subImage = document.getElementById("subImage");
      if (subImage) {
        subImage.style.opacity = 1;
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const mainImageRef = useRef(null);

  useEffect(() => {
    if (mainImageRef.current) {
      mainImageRef.current.classList.add("img-tint");
      setTimeout(() => {
        if (mainImageRef.current) {
          mainImageRef.current.classList.remove("img-tint");
          mainImageRef.current.classList.add("img-tint1");
        }
      }, 3000);
      setTimeout(() => {
        if (mainImageRef.current) {
          mainImageRef.current.classList.remove("img-tint1");
        }
      }, 3000);
    }
  }, []);

  return (
    <div>
      {loading ? (
        <Loader /> // Render a loader while data is loading
      ) : (
        <div className="relative">
          {fuelType === "Electric" && (
            <div>
              <img
                ref={mainImageRef}
                alt="main-1"
                src="https://images5.alphacoders.com/132/1323577.png"
                className="w-full h-screen md:h-[75vh] object-cover"
              />
              <div className="absolute top-20 left-10 p-8 text-black z-10">
                <h2 className="text-6xl font-bold">Electric Cars Bringing</h2>
                <h2 className="text-6xl font-bold">Revolution to India</h2>
              </div>
              <img
                id="subImage"
                alt="sub-1"
                src="https://spn-sta.spinny.com/blog/20230907221752/Tata-Nexon-EV-5-jpg.webp?compress=true&quality=80&w=275&dpr=2.6"
                className="md:absolute md:top-10 md:right-10 opacity-0 max-w-screen-sm transition-opacity duration-1000 object-cover rounded-3xl m-8"
              />
            </div>
          )}
          <div className="container max-w-7xl mx-auto p-4 mb-4 w-full bg-white">
            {fuelType === "Electric" ? (
              <div>
                <h2 className="text-4xl font-semibold text-gray-700 mb-4 rounded-sm">
                  Electric Cars in India
                </h2>
                <p>
                  Currently, there are 37 electric cars on sale in India. Of
                  these, the MG Comet EV is the cheapest EV while the BMW i7 is
                  the most expensive electric car in India. Upcoming electric
                  cars in India include Volvo EX90, BYD Seal and Vayve Mobility
                  EVA among others. Locate a charging station in your city.
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-4xl font-semibold text-gray-700 mb-4 rounded-sm">
                  Available Cars
                </h2>
                <p>
                  
                </p>
              </div>
            )}

            <div className="border border-gray-300 p-8 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allCars.map((card, index) => (
                <CardSlider
                  key={index}
                  car={card}
                  isElectric={fuelType === "Electric" ? true : false}
                />
              ))}
            </div>
            {fuelType === "Electric" && <ElectricVehicleDetails />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCars;

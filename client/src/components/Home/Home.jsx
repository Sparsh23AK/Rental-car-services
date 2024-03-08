/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchBrandFailure,
  fetchBrandStart,
  fetchBrandSuccess,
} from "../../redux/car/brandSlice";
import {
  fetchCarsSuccess,
  fetchCarsFailure,
  fetchCarsStart,
} from "../../redux/car/carSlice";

import Accordion from "./Accordion";
import dashboard from "../../assets/dashboard.jpg";
import Brands from "./brands";
import Loader from "./Loader"; // Import a loader component

export default function Home() {
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState("");
  const [carType, setCarType] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state
  const { brands } = useSelector((state) => state.brand);
  const { cars } = useSelector((state) => state.car);
  const [trendingCars, setTrendingCars] = useState([]);
  const [upComingCars, setUpcomingCars] = useState([]);
  const [electricCars, setElectricCars] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData(); // Initial data fetch when the component mounts
    fetchBrands(); // Fetching brands
  }, []);

  const fetchData = async () => {
    try {
      dispatch(fetchCarsStart());
      const response = await fetch("/api/cars/getCars", {
        method: "GET",
        headers:{
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      console.log(data);
      dispatch(fetchCarsSuccess(data));
      setElectricCars(() => cars.filter((car) => car.fuelType === "Electric"));
      setUpcomingCars(() => cars.filter((car) => car.isUpcoming === true));
      setTrendingCars(() => cars.filter((car) => car.isTrending === true));
      setLoading(false);
    } catch (error) {
      dispatch(fetchCarsFailure(error));
      console.error("Error fetching data:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      dispatch(fetchBrandStart());
      const response = await fetch("/api/cars/getBrands", {
        method: "GET",
        headers:{
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(fetchBrandFailure(data));
        return;
      }
      dispatch(fetchBrandSuccess(data));
    } catch (error) {
      dispatch(fetchBrandFailure(error));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (priceRange && carType) {
      const encodedPriceRange = encodeURIComponent(priceRange);
      const encodedCarType = encodeURIComponent(carType);
      navigate(`/cars/viewcars/${encodedPriceRange}/${encodedCarType}`);
    }
  };

  const fetchCarsByPriceRange = async (priceRange, carType) => {
    try {
      const url = `/api/cars/fetchCarsByPriceRangeAndType?priceRange=${priceRange}&carType=${carType}`;
      const response = await fetch(url, {
        headers: {
          accept: "application/json",
        },
      });
      const data = await response.json();
      // Handle the data (array of cars) received from the backend
    } catch (error) {
      console.error(
        "Error fetching cars by price range and vehicle type:",
        error
      );
    }
  };

  const fetchCarsByBrand = async (brandId) => {
    try {
      const response = await fetch(`/api/cars/brand?brandId=${brandId}`, {
        headers: {
          accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cars by brand");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div className="bg-[#f6f6f6] pb-10">
      {loading ? (
        <Loader /> // Render a loader component while data is loading
      ) : (
        <>
          <div className="relative w-full h-full">
            <img
              src={dashboard}
              className="w-full h-screen md:h-[75vh] object-cover"
              alt="Car Interior"
            />
            <div className="absolute top-36 left-20 p-10 leading-10">
              <h1 className="text-5xl font-bold text-white pb-2">
                Buying your dream car?
              </h1>
              <p className="text-white text-3xl font-semibold">Check Now!!</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2">
                    <select
                      id="budget"
                      name="budget"
                      className="px-6 py-4 rounded-l-lg border border-gray-100 focus:outline-none focus:border-black-500 group hover:border-t-2 hover:border-orange-500"
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                    >
                      <option value="">Select Budget</option>
                      <option value="100000 to 1000000">1 - 10 Lakh</option>
                      <option value="1000000 to 1500000">10 - 15 Lakh</option>
                      <option value="1500000 to 2000000">15 - 20 Lakh</option>
                      <option value="2000000 to 5000000">20 - 50 Lakh</option>
                      <option value="5000000 to 10000000">Above 50 Lakh</option>
                      <option value=" ">All Budget</option>
                    </select>
                    <select
                      id="vehical_type"
                      name="vehical_type"
                      className="px-6 py-4 rounded-tr-lg border border-gray-100 focus:outline-none focus:border-black-500 group hover:border-t-2 hover:border-orange-500"
                      value={carType}
                      onChange={(e) => setCarType(e.target.value)}
                    >
                      <option value="">All Vehicle Types</option>
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedan</option>
                      <option value="HatchBack">HatchBack</option>
                      <option value="MUV">MUV</option>
                      <option value="Luxury">Luxury</option>
                      <option value=" ">All</option>
                    </select>
                    <div className="flex items-end justify-end col-span-2">
                      <button
                        type="submit"
                        disabled={!priceRange || !carType}
                        className={`mt-1 px-4 py-2 rounded-b-lg font-medium border ${
                          !priceRange || !carType
                            ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                            : "bg-white border-gray-100 hover:border-t-2 hover:border-orange-500"
                        }`}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Trending cars */}
          <div className="container max-w-7xl mx-auto mt-8">
            <Accordion
              title="Trending Cars"
              message="Find out the trending Cars."
              cards={trendingCars}
              btn=""
              viewOnly={true}
            />
          </div>

          {/* Top Brands */}
          <div className="container max-w-7xl mx-auto mt-8">
            <Brands
              title="Top Brands"
              message="Explore Cars by Brand."
              brands={brands}
            />
          </div>

          {/* Explore Electric cars */}
          <div className="container max-w-7xl mx-auto mt-8">
            <Accordion
              title="Electric Cars"
              message="Check out latest EVs."
              cards={electricCars}
              btn="View more Electric Cars"
              viewOnly={false}
            />
          </div>

          {/* Explore up Coming cars */}
          <div className="container max-w-7xl mx-auto mt-8">
            <Accordion
              title="Up Coming Cars"
              message="Check out up coming cars."
              cards={upComingCars}
              viewOnly={true}
              btn=""
            />
          </div>
          <div className="container object-contain max-w-full">
            <img
              src="https://bmw.scene7.com/is/image/BMW/iX_Banner:16to9?fmt=webp&wid=2560&hei=1440"
              className="w-full h-[75vh] object-cover"
              alt="BMW iX Banner"
            />
          </div>
        </>
      )}
    </div>
  );
}

/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CardSlider from "./CardSlider";
import Loader from "../Home/Loader";
import { useNavigate, useParams } from "react-router-dom";
import ElectricVehicleDetails from "./ElectricVehicleDetails";
import { CiFilter } from "react-icons/ci";

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cars: allCars } = useSelector((state) => state.car);
  const { fuelType, priceRange, carType } = useParams();
  const { brands } = useSelector((state) => state.brand);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCarType, setSelectedCarType] = useState("");

  useEffect(() => {
    setLoading(true);
    if (fuelType === "Electric") {
      setCars(allCars.filter((car) => car.fuelType === fuelType));
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
      const response = await fetch(url, {
        headers:{
          accept: 'application/json',
        }
      });
      const data = await response.json();
      return data;
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

  const handleSortByPrice = (order) => {
    const sortedCars = [...cars].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setCars(sortedCars);
  };

  const handleFilterByBrand = (brand) => {
    setSelectedBrand(brand);
    const filteredCars = allCars.filter((car) => car.brand.make === brand);
    setCars(filteredCars);
  };

  const handleFilterByCarType = (type) => {
    setSelectedCarType(type)
    const filteredCars = allCars.filter((car) => car.carType === type);
    setCars(filteredCars);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      {loading ? (
        <Loader /> // Render a loader while data is loading
      ) : (
        <div className="relative w-full h-full">
          {fuelType === "Electric" ? (
            <div>
              <img
                ref={mainImageRef}
                alt="main-1"
                src="https://images5.alphacoders.com/132/1323577.png"
                className="w-full h-screen md:h-[75vh] object-cover"
              />
              <div className="md:absolute top-36 left-20 p-10 leading-10">
                <h2 className="text-6xl font-bold">Electric Cars Bringing</h2>
                <h2 className="text-4xl font-bold">Revolution to India</h2>
              </div>
              <img
                id="subImage"
                alt="sub-1"
                src="https://spn-sta.spinny.com/blog/20230907221752/Tata-Nexon-EV-5-jpg.webp?compress=true&quality=80&w=275&dpr=2.6"
                className="md:absolute md:top-10 md:right-10 opacity-0 max-w-screen-sm transition-opacity duration-1000 object-cover rounded-3xl m-8"
              />
            </div>
          ) : (
            <div>
              <img
                ref={mainImageRef}
                alt="main-1"
                src="https://www.avis.co.in/images/carrental4.webp"
                className="w-full h-screen md:h-[75vh] object-cover opacity-95"
              />
              <div className="md:absolute top-36 left-20 p-10 leading-10 text-white bg-orange-400 md:rounded-full z-10 opacity-100">
                <h2 className="text-4xl font-bold">
                  Get behind the wheel of your dream car
                </h2>
                <h2 className="text-2xl font-bold">
                  With our wide range of options
                </h2>
              </div>
            </div>
          )}
          <div className="container max-w-7xl mx-auto p-2 mb-4 w-full bg-white">
            {fuelType === "Electric" ? (
              <div>
                <h2 className="text-4xl font-semibold text-gray-700 mb-4 mt-2 rounded-sm">
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
                <h2 className="text-4xl font-semibold text-gray-700 mb-4 mt-2 rounded-sm">
                  New Cars
                </h2>
                <p>
                  Are you planning on buying a new car? Well, we know that with
                  so many car options available out there, it gets really
                  difficult to find a good car which suits your need. Hence, we
                  have put together a complete list of new cars. Maruti Suzuki,
                  Tata and Toyota are the 3 most popular car brands. These
                  popular car brands cater to a wide spectrum of budgets and
                  needs, offering a variety of cars from fuel-efficient
                  hatchbacks to spacious SUVs.
                </p>
              </div>
            )}
            <div className="flex justify-end text-sm">
              <CiFilter className="text-lg text-orange-600 " />
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mr-2  text-orange-600 "
              >
                {isExpanded ? "Collapse" : "Filters"}
              </button>
              {isExpanded && (
                <div className="flex gap-4 bg-white ">
                  <button
                    onClick={() => handleSortByPrice("asc")}
                    className=" text-orange-400 rounded-md"
                  >
                    Sort Price &#x2193;
                  </button>
                  <button
                    onClick={() => handleSortByPrice("desc")}
                    className=" text-orange-400 rounded-md"
                  >
                    Sort Price &#x2191;
                  </button>
                  <select
                    id="brand"
                    name="brand"
                    value={selectedBrand}
                    onChange={(e) => handleFilterByBrand(e.target.value)}
                    className="text-orange-400 rounded-md"
                  >
                    <option value="" disabled>
                      By Brand
                    </option>
                    {brands.map((brand, index) => (
                      <option value={brand.make} key={index}>
                        {brand.make}
                      </option>
                    ))}
                  </select>
                  <select
                    id="carType"
                    name="carType"
                    value={selectedCarType}
                    onChange={(e) =>
                      handleFilterByCarType(e.target.value)
                    }
                    className="text-orange-400 rounded-md"
                  >
                    <option value="" disabled>
                      By Car type
                    </option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="HatchBack">HatchBack</option>
                    <option value="MUV">MUV</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                 
                </div>
              )}
            </div>
            <div className="border border-gray-300 p-6 mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {cars.map((card, index) => (
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

/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../Home/Loader";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import CarSuggestions from "./CarSuggestion";
import { TbEngine } from "react-icons/tb";
import { FaRotate } from "react-icons/fa6";
import { GiPowerLightning } from "react-icons/gi";
import { BsSpeedometer2 } from "react-icons/bs";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { BsSpeedometer } from "react-icons/bs";
import { BiSolidCarBattery } from "react-icons/bi";
import { RiChargingPile2Line } from "react-icons/ri";
import { GiPathDistance } from "react-icons/gi";
import { GiGears } from "react-icons/gi";
import { BsFuelPumpDiesel } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { GiRotaryPhone } from "react-icons/gi";
import ErrorPopUp from "../utils/errorPopUp";
import SuccessPopUp from "../utils/successPopUp";

const ViewCar = () => {
  const [car, setCar] = useState({});
  const [loading, setLoading] = useState(true);
  const { cars: allCars } = useSelector((state) => state.car);
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const location = useLocation();
  const [errorPopup, seterrorPopup] = useState(false);
  const [successPopup, setsuccessPopup] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [formData, setFormData] = useState({
    date: "",
    phoneNumber: "+91 ",
    car: "",
    user: currentUser._id,
  });

  useEffect(() => {
    setLoading(true);
    fetchCarById(id);
  }, [id, allCars]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 2 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "phoneNumber") {
      if (!/^\+91 [1-9]\d{9}$/.test(value)) {
        setPhoneNumberError(
          "Please enter a valid Indian phone number starting with +91"
        );
      } else {
        setPhoneNumberError("");
      }
    }
    setFormData({
      ...formData,
      [id]: value,
      car: car._id
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      // User is not logged in, show login popup
      setShowLoginPopup(true);
    } else {
      try {
        const response = await fetch("/api/user/bookAppointment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success === "false" || data.statusCode === 500) {
          seterrorPopup(true);
        } else {
          setsuccessPopup(true);
        }
      } catch (error) {
        seterrorPopup(true);
      }
    }
  };

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

  const formatPrice = (price) => {
    if (price < 100000) {
      return `₹ ${price}`;
    } else if (price < 10000000) {
      return `₹ ${(price / 100000).toFixed(2)} Lakh`;
    } else {
      return `₹ ${(price / 10000000).toFixed(2)} Crore`;
    }
  };

  const handleLoginPopupCancel = () => {
    setShowLoginPopup(false);
  };

  const handleLoginPopupRedirect = () => {
    setShowLoginPopup(false);
    navigate("/sign-in", { state: { from: location } });
  };

  const renderBasicDetails = () => {
    const rating = parseFloat(car.rating);
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;

    return (
      <div className="flex shadow-md flex-wrap items-center justify-between">
        <div className="w-full md:w-1/2 h-full p-2">
          <div className="p-2 text-justify">
            <h1 className="text-3xl p-2 font-semibold">{car.name}</h1>
            <div className="flex items-center p-2">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(fullStars)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 fill-current text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L10 13.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 8.124a.75.75 0 01.416-1.28l4.21-.612L9.327 2.42A.75.75 0 0110 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                  {decimal > 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 fill-current text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L10 13.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 8.124a.75.75 0 01.416-1.28l4.21-.612L9.327 2.42A.75.75 0 0110 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <p className="text-gray-500 p-2">{car.description}</p>
            <div className="mt-4 mb-4 p-2">
              <p className="text-2xl font-semibold">{formatPrice(car.price)}</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <img
            src={car[`image${currentImageIndex + 1}`]}
            alt={car.name}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  };

  const renderKeyFeatures = () => {
    return (
      <div className="mt-8 shadow-lg p-4">
        <h2 className="text-xl font-semibold">Key Features of {car.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="flex items-center">
            <GiGears className="mr-2" />
            <span className="">Transmission Type:</span>{" "}
            <span className="pl-4 font-semibold">
              {car.transmissionType || "NA"}
            </span>
          </div>
          <div className="flex items-center">
            <BsFuelPumpDiesel className="mr-2" />
            <span className="">Fuel Type:</span>{" "}
            <span className="pl-4 font-semibold">{car.fuelType || "NA"}</span>
          </div>
          <div className="flex items-center">
            <BsSpeedometer className="mr-2" />
            <span className="">Top Speed:</span>{" "}
            <span className="pl-4 font-semibold">{car.topSpeed || "NA"}</span>
          </div>
          <div className="flex items-center">
            <BsSpeedometer2 className="mr-2" />
            <span className="">Mileage:</span>{" "}
            <span className="pl-4 font-semibold">{car.mileage || "NA"}</span>
          </div>
          <div className="flex items-center">
            <FaRotate className="mr-2" />
            <span className="">Torque:</span>{" "}
            <span className="pl-4 font-semibold">{car.torque || "NA"}</span>
          </div>
          <div className="flex items-center">
            <GiPowerLightning className="mr-2" />
            <span className="">Power:</span>{" "}
            <span className="pl-4 font-semibold">{car.power}</span>
          </div>
          {car.fuelType !== "Electric" && (
            <>
              <div className="flex items-center">
                <TbEngine className="mr-2" />
                <span className="">Engine:</span>{" "}
                <span className="pl-4 font-semibold">{car.engine}</span>
              </div>
              <div className="flex items-center">
                <FaScrewdriverWrench className="mr-2" />
                <span className="">Drive Type:</span>{" "}
                <span className="pl-4 font-semibold">
                  {car.driveType || "NA"}
                </span>
              </div>
            </>
          )}
          {car.fuelType === "Electric" && (
            <>
              <div className="flex items-center">
                <BiSolidCarBattery className="mr-2" />
                <span className="">Battery Capacity:</span>{" "}
                <span className="pl-4 font-semibold">
                  {car.batteryCapacity || "NA"}
                </span>
              </div>
              <div className="flex items-center">
                <RiChargingPile2Line className="mr-2" />
                <span className="">Charging Time:</span>{" "}
                <span className="pl-4 font-semibold">
                  {car.chargingTime || "NA"}
                </span>
              </div>
              <div className="flex items-center">
                <GiPathDistance className="mr-2" />
                <span className="">Range:</span>{" "}
                <span className="pl-4 font-semibold">{car.range || "NA"}</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const closeErrorPopUp = () => {
    seterrorPopup(false);
  };
  const closeSuccessPopUp = () => {
    setsuccessPopup(false);
    navigate("/profile")
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="relative max-w-7xl mx-auto h-full">
          <div className="p-6 mt-4 mb-8">
            {renderBasicDetails()}
            {renderKeyFeatures()}
          </div>
          {car.status !== "upcoming" && (
            <div className="shadow-xl text-center max-w-lg mx-auto">
              <h1 className="font-bold text-xl">Book an Appointment</h1>
              <form className="w-3/4 mx-auto p-8 mt-4" onSubmit={handleSubmit}>
                <div className="flex gap-2 flex-col mb-4">
                  <label
                    htmlFor="date"
                    className="flex font-semibold items-center mb-2"
                  >
                    <FaCalendarAlt className="mr-2 text-orange-500" />
                    <span>Select Date:</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={formData.date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={handleChange}
                    className="border-b border-gray-300 rounded-md p-1 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="flex gap-2 flex-col mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="flex font-semibold items-center mb-2"
                  >
                    <GiRotaryPhone className="mr-2 text-red-500" />
                    <span>Phone Number:</span>
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="border-b border-gray-300 rounded-md p-1 focus:outline-none focus:border-orange-500"
                    placeholder="+91"
                  />
                  {phoneNumberError && (
                    <p className="text-red-500">{phoneNumberError}</p>
                  )}
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-gray-400 hover:bg-orange-400 text-white py-2 px-4 rounded-md"
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          )}
          <CarSuggestions
            type="carType"
            currentBrand=""
            currentCarType={car.carType}
          />
        </div>
      )}
      {showLoginPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white p-12 rounded-lg">
            <p className="mb-4">
              You must log in first to book an appointment.
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleLoginPopupCancel}
                className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleLoginPopupRedirect}
                className="bg-orange-400 hover:bg-orange-600 text-white py-2 px-4 rounded-md"
              >
                Redirect to Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      {errorPopup && (
        <ErrorPopUp
          message={"Something went wrong! Please try again Later."}
          close={closeErrorPopUp}
        />
      )}
      {successPopup && (
        <SuccessPopUp
          message={
            "Succesfully Booked an Appointment!! Check your profile you see appointment history."
          }
          close={closeSuccessPopUp}
        />
      )}
    </div>
  );
};

export default ViewCar;

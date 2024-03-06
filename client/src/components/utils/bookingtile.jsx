/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Bookingtile = ({ booking, cancelAppointment }) => {
  const { _id, car, date, phoneNumber, user } = booking;
  const navigate = useNavigate();
  const date1 = new Date(date);
  const formattedDate = date1.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
 

  const viewCar = () => {
    navigate(`/cars/viewcar/${car._id}`);
  };

  

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl flex">
      <img
        src={car.image1}
        alt={car.name}
        className="w-44 h-44 p-3 object-cover mb-4 rounded hover:cursor-pointer"
        onClick={() => viewCar()}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Booking id : {_id}</h2>
        <p className="text-gray-600">
          Your Booking of {car.name} is confirmed on {formattedDate}.
        </p>
        <p className="text-gray-500 mt-2">Contact Info: {phoneNumber}</p>
        <button
          className="rounded-md bg-orange-400 text-white hover:bg-orange-600 py-2 px-6 mt-4"
          onClick={() => cancelAppointment(_id)}
        >
          Cancel Appointment
        </button>
      </div>
      
    </div>
  );
};

export default Bookingtile;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Accordion.js
import React from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const Accordion = ({ title, cards, message, btn, viewOnly }) => {
  const navigate = useNavigate();
  const handleViewMoreElectricCars = () => {
    navigate(`/cars/viewcars/Electric`);
  };

  return (
    <div className="border border-gray-300 p-4 mb-4 w-full bg-white">
      <h2 className="text-xl font-bold mb-4 text-black">{title}</h2>
      <p className="text-md font-bold mb-4">{message}</p>
      <hr />
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card key={index} car={card} />
        ))}
      </div>
      {!viewOnly && (
        <div className="mt-4 border-t border-gray-300 pt-4">
          <button
            onClick={handleViewMoreElectricCars}
            className="px-6 py-2 bg-white text-black border border-black transition-all hover:bg-orange-500 hover:text-white hover:border-white justify-self-start"
          >
            {btn}
          </button>
        </div>
      )}
    </div>
  );
};

export default Accordion;

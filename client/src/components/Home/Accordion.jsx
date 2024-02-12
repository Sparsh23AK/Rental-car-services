/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Accordion.js
import React from 'react';
import Card from '../common/Card';

const Accordion = ({ title, cards, message }) => {
    return (
      <div className="border border-gray-300 p-4 mb-4 w-full bg-white">
        <h2 className="text-xl font-bold mb-4 text-black">{title}</h2>
        <p className="text-md font-bold mb-4">{message}</p>
        <hr/>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    );
  };

export default Accordion;

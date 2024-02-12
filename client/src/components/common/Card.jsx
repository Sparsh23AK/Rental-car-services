/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const Card = ({ title, content, imageSrc }) => {
  return (
    <div className="border border-gray-300 rounded-sm p-2 mb-2 justify-between items-center">
      <img src={imageSrc} alt={title} className="h-48 w-full mr-4 mt-1 rounded-sm" />
      <div className="flex flex-col justify-between mt-1">
        <h2 className="text-lg font-bold rou">{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Card;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

const Bookingtile = ({ booking }) => {
  const { id, title, content, imageUrl } = booking;


  return (
    <div className="bg-white p-4 rounded-lg shadow-xl flex">
      <img
        src={imageUrl}
        alt={title}
        className="w-44 h-44 p-3 object-cover mb-4 rounded"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{content.substring(0, 300)}...</p>
        <Link
          to={`/blogs/${id}`}
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default Bookingtile;

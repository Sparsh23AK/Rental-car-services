/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

export default function ErrorPopUp(props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 max-w-md w-full rounded-lg">
        <div className="flex items-center mb-4">
          <FaExclamationCircle className="text-red-500 mr-2" size={24} />
          <h2 className="text-2xl font-bold">Error</h2>
        </div>
        <p className="text-red-500 mb-4">{props.message}</p>
        <button
          onClick={() => {
            props.close();
          }}
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
}

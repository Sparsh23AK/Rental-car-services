/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function SuccessPopUp(props) {
  return (
    <div
      id="popup-modal"
      className="overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full  max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-yellow-300">
          <div className="p-4 md:p-5 text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-700">
              {props.message}
            </h3>
            <button
              onClick={() => {
                props.close();
              }}
              data-modal-hide="popup-modal"
              type="button"
              className="text-white bg-red-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const UpdateCarForm = (props) => {
  return (
    <form onSubmit={(e) =>props.handleUpdate(e)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={props.selectedCar.name}
                  onChange={(e) => props.handleUpdateChange(e.target.name, e.target.value)}
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="make"
                  className="block text-sm font-medium text-gray-700"
                >
                  Make
                </label>
                <input
                  type="text"
                  id="make"
                  name="make"
                  value={props.selectedCar.make}
                  onChange={(e) => props.handleUpdateChange(e.target.name, e.target.value)}
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Make"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-gray-700"
                >
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={props.selectedCar.model}
                  onChange={(e) => props.handleUpdateChange(e.target.name, e.target.value)}
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Model"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700"
                >
                  Year
                </label>
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={props.selectedCar.year}
                  onChange={(e) => props.handleUpdateChange(e.target.name, e.target.value)}
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="year"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="transmissionType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Transmission Type
                </label>
                <select
                  id="transmissionType"
                  name="transmissionType"
                  value={props.selectedCar.transmissionType}
                  onChange={(e) => props.handleUpdateChange(e.target.name, e.target.value)}
                  className="mt-1 p-2 w-full border rounded"
                >
                  <option value="" disabled >
                    Select Transmission type..
                  </option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fuelType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fuel Type
                </label>
                <select
                  id="fuelType"
                  name="fuelType"
                  value={props.selectedCar.fuelType}
                  onChange={(e) => props.handleUpdateChange(e.target.name, e.target.value)}
                  className="mt-1 p-2 w-full border rounded"
                >
                  <option value="" disabled >
                    Select Fuel type..
                  </option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diseal">Diseal</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="mileage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mileage
                </label>
                <input
                  type="text"
                  id="mileage"
                  name="mileage"
                  value={props.selectedCar.mileage}
                  onChange={(e) => props.handleUpdateChange(e.target.name, e.target.value)}
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Mileage"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={props.selectedCar.status}
                  onChange={(e) => props.handleUpdateChange(e.target.name, e.target.value)}
                  className="mt-1 p-2 w-full border rounded"
                >
                  <option value="" disabled>
                    Select Status...
                  </option>
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                  <option value="sold">Sold</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image 1
                </label>
                <input
                  type="file"
                  id="image1"
                  name="image1"
                  accept="image/*"
                  onChange={(e) => props.handleUpdateFileUpload(e)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image 2
                </label>
                <input
                  type="file"
                  id="image2"
                  name="image2"
                  accept="image/*"
                  onChange={(e) => {props.handleUpdateFileUpload(e)}}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="image3"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image 3
                </label>
                <input
                  type="file"
                  id="image3"
                  name="image3"
                  accept="image/*"
                  onChange={(e) => {props.handleUpdateFileUpload(e)}}
                />
                <p className="text-sm self-center">
                  {props.uploadError ? (
                    <span className="text-red-700">
                      Error while uploading! (File size must be less than 2mb)
                    </span>
                  ) : props.uploadPercent > 0 && props.uploadPercent < 100 ? (
                    <span className="text-slate-700">{`Uploading: ${props.uploadPercent} %`}</span>
                  ) : props.uploadPercent == 100 ? (
                    <span className="text-green-700">
                      Uploading successful!
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {props.handleUpdateModalClose()}}
                  className="bg-gray-400 text-white px-4 py-2 rounded mr-2 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
                >
                  Update Car
                </button>
              </div>
            </form>
  );
};

export default UpdateCarForm;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const AddCarForm = (props) => {
  return (
    <form onSubmit={(e) => props.handleAddCar(e)}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={props.formData.name}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          required
          className="mt-1 p-2 w-full border rounded"
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="make"
          className="block text-sm font-medium text-gray-700"
        >
          Brand<span className="text-red-500">*</span>
        </label>
        <select
          id="brand"
          name="brand"
          value={props.formData.brand}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
        >
          <option value="" disabled>
            Select Brand..
          </option>
          {props.brands.map((brand, index) => (
            <option value={brand._id} key={index}>
              {brand.make}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="model"
          className="block text-sm font-medium text-gray-700"
        >
          Model<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="model"
          name="model"
          value={props.formData.model}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          required
          className="mt-1 p-2 w-full border rounded"
          placeholder="Model"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="year"
          className="block text-sm font-medium text-gray-700"
        >
          Year<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="year"
          name="year"
          value={props.formData.year}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          required
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
          value={props.formData.transmissionType}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
        >
          <option value="" disabled>
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
          value={props.formData.fuelType}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
        >
          <option value="" disabled>
            Select Fuel type..
          </option>
          <option value="Petrol">Petrol</option>
          <option value="Diseal">Diseal</option>
          <option value="Electric">Electric</option>
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
          value={props.formData.mileage}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
          placeholder="Mileage"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="rental_price"
          className="block text-sm font-medium text-gray-700"
        >
          Rental Price
        </label>
        <input
          type="text"
          id="rental_price"
          name="rental_price"
          value={props.formData.rental_price}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
          placeholder="Rental Price"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="text"
          id="price"
          name="price"
          value={props.formData.price}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
          placeholder="Price"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="carType"
          className="block text-sm font-medium text-gray-700"
        >
          Car Type
        </label>
        <select
          id="carType"
          name="carType"
          value={props.formData.carType}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
        >
          <option value="" disabled>
            Select Car type..
          </option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="HatchBack">HatchBack</option>
          <option value="MUV">MUV</option>
          <option value="Luxury">Luxury</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status<span className="text-red-500">*</span>
        </label>
        <select
          id="status"
          name="status"
          value={props.formData.status}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
        >
          <option value="" disabled>
            Select Status...
          </option>
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="sold">Sold</option>
          <option value="upcoming">Up Coming</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="isTrending"
          className="block text-sm font-medium text-gray-700"
        >
          Is Trending ?
        </label>
        <select
          id="isTrending"
          name="isTrending"
          value={props.formData.isTrending}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="isUpcoming"
          className="block text-sm font-medium text-gray-700"
        >
          Is Upcoming ?
        </label>
        <select
          id="isUpcoming"
          name="isUpcoming"
          value={props.formData.isUpcoming}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="image1"
          className="block text-sm font-medium text-gray-700"
        >
          Image 1<span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          id="image1"
          name="image1"
          accept="image/*"
          onChange={(e) => props.handleFileUpload(e)}
          // required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="image2"
          className="block text-sm font-medium text-gray-700"
        >
          Image 2<span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          id="image2"
          name="image2"
          accept="image/*"
          onChange={(e) => props.handleFileUpload(e)}
          // required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="image3"
          className="block text-sm font-medium text-gray-700"
        >
          Image 3<span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          id="image3"
          name="image3"
          accept="image/*"
          onChange={(e) => props.handleFileUpload(e)}
          // required
        />
        <p className="text-sm self-center">
          {props.uploadError ? (
            <span className="text-red-700">
              Error while uploading! (File size must be less than 2mb)
            </span>
          ) : props.uploadPercent > 0 && props.uploadPercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${props.uploadPercent} %`}</span>
          ) : props.uploadPercent == 100 ? (
            <span className="text-green-700">Uploading successful!</span>
          ) : (
            ""
          )}
        </p>
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="image1"
          name="image1"
          value={props.formData.image1}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          required
          className="mt-1 p-2 w-full border rounded"
          placeholder="Enter URL 1"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="image2"
          name="image2"
          value={props.formData.image2}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          required
          className="mt-1 p-2 w-full border rounded"
          placeholder="Enter URL 2"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="image3"
          name="image3"
          value={props.formData.image3}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          required
          className="mt-1 p-2 w-full border rounded"
          placeholder="Enter URL 3"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="description"
          name="description"
          value={props.formData.description}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          required
          className="mt-1 p-2 w-full border rounded"
          placeholder="Enter description"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="engine"
          name="engine"
          value={props.formData.engine}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
          placeholder="Enter Engine"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="power"
          name="power"
          value={props.formData.power}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
          placeholder="Enter Power"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="driveType"
          name="driveType"
          value={props.formData.driveType}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
          placeholder="Enter Drive Type"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="torque"
          name="torque"
          value={props.formData.torque}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
          placeholder="Enter Torque"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="batteryCapacity"
          name="batteryCapacity"
          value={props.formData.batteryCapacity}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
          placeholder="Enter Battery Capacity"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="topSpeed"
          name="topSpeed"
          value={props.formData.topSpeed}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
          placeholder="Enter Top Speed"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="chargingTime"
          name="chargingTime"
          value={props.formData.chargingTime}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
          placeholder="Enter Charging Time"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          id="range"
          name="range"
          value={props.formData.range}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
          placeholder="Enter Range"
        />
      </div>
      <div className="mb-4">
        <input
          type= "text"
          id="rating"
          name="rating"
          value={props.formData.rating}
          onChange={(e) =>
            props.handleInputChange(e.target.name, e.target.value)
          }
          className="mt-1 p-2 w-full border rounded"
          placeholder="Enter Rating Out of 5"
        />
      </div>


      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => props.closeAddCarModal()}
          className="bg-gray-400 text-white px-4 py-2 rounded mr-2 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
        >
          Add Car
        </button>
      </div>
    </form>
  );
};

export default AddCarForm;

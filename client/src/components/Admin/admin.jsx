/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { app } from "../../firebase.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [isAddCarModalOpen, setAddCarModalOpen] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    make: "",
    model: "",
    year: "",
    transmissionType: "",
    fuelType: "",
    mileage: "",
    status: "",
    image1: null,
    image2: null,
    image3: null,
  });

  // Fetch cars data from backend (replace with actual fetch logic)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/api/cars'); // Replace with your actual API endpoint
  //       const data = await response.json();
  //       setCars(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleFileUpload = async (e) => {
    console.log("On change called");
    const { name, files } = e.target;
    const imageFile = files[0];
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, `Cars/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadPercent(Math.round(progress));
        },
        (error) => {
          setUploadError(true);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // Set the download URL in the form data
            setFormData({
              ...formData,
              [name]: downloadURL,
            });
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const openAddCarModal = () => {
    setAddCarModalOpen(true);
  };

  const closeAddCarModal = () => {
    setAddCarModalOpen(false);
  };

  const handleAddCar = (e) => {
    e.preventDefault();
    // Handle adding car logic here
    console.log("Adding car:", formData);
    // Close the modal after adding car
    closeAddCarModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between mb-4 mx-auto max-w-7xl items-center p-3">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={openAddCarModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          <span className="flex justify-between pl-3 pr-3">
            <FaPlus className="mr-2 " /> Add Car
          </span>
        </button>
      </div>

      {/* Dynamic Table */}
      <table className="table-auto justify-between w-5/6 items-center mx-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Make</th>
            <th className="border px-4 py-2">Model</th>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <td className="border px-4 py-2">{car.name}</td>
              <td className="border px-4 py-2">{car.make}</td>
              <td className="border px-4 py-2">{car.model}</td>
              <td className="border px-4 py-2">{car.year}</td>
              <td className="border px-4 py-2">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                  <FaEdit />
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Car Modal */}
      {isAddCarModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-md rounded-lg shadow-2xl w-full h-3/4 overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Add Car Info</h2>
            <form onSubmit={handleAddCar}>
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
                  value={formData.name}
                  onChange={handleInputChange}
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
                  Make<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="make"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Make"
                />
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
                  value={formData.model}
                  onChange={handleInputChange}
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
                  value={formData.name}
                  onChange={handleInputChange}
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
                <input
                  type="text"
                  id="transmissionType"
                  name="transmissionType"
                  value={formData.transmissionType}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Transmission Type"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fuelType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fuel Type
                </label>
                <input
                  type="text"
                  id="fuelType"
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Fuel Type"
                />
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
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                >
                  <option value="Available">Available</option>
                  <option value="Rented">Rented</option>
                  <option value="Sold">Sold</option>
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
                  onChange={handleFileUpload}
                  required
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
                  onChange={handleFileUpload}
                  required
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
                  onChange={handleFileUpload}
                  required
                />
                <p className="text-sm self-center">
                  {uploadError ? (
                    <span className="text-red-700">
                      Error while uploading! (File size must be less than 2mb)
                    </span>
                  ) : uploadPercent > 0 && uploadPercent < 100 ? (
                    <span className="text-slate-700">{`Uploading: ${uploadPercent} %`}</span>
                  ) : uploadPercent == 100 ? (
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
                  onClick={closeAddCarModal}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

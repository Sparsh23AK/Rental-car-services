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
  const [errorAddCar, setAddCarError] = useState(false);
  const [errorDeleteCar, setDeleteCarError] = useState(false);
  const [selectedCar, setSelectedCar] = useState({
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
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
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

  const getInitialFormData = () => ({
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
  //Fetch cars data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/getCars");
        const data = await response.json();
        setCars(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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

  const handleAddCar = async (e) => {
    e.preventDefault();
    // Handle adding car logic here
    try {
      const response = await fetch("/api/admin/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.statusCode != 201) {
        setAddCarError(true);
        return;
      } else {
        setFormData(getInitialFormData());
        setUploadPercent(0);
      }
    } catch (error) {
      setAddCarError(true);
    } finally {
      closeAddCarModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDelete = async (car) => {
    try {
      const res = await fetch(`/api/admin/delete/${car._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        setDeleteCarError(true);
        return;
      }
      //create Success pop up
    } catch (error) {
      setDeleteCarError(true);
    }
  };

  const selectCar = (car) => {
    setSelectedCar(car);
    setUpdateModalOpen(true);
  };

  const handleUpdate = (car) => {
    // Set the selected car for update
    const { name, value } = car.target;
    setSelectedCar({
      ...selectedCar,
      [name]: value,
    });
    console.log(selectedCar);
    // Open the update modal
    setUpdateModalOpen(false);
  };

  const handleUpdateModalClose = () => {
    // Close the update modal
    setUpdateModalOpen(false);
    // Clear the selected car
    setSelectedCar(null);
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
            <th className="border px-4 py-2">Transmission Type</th>
            <th className="border px-4 py-2">Fuel Type</th>
            <th className="border px-4 py-2">Mileage</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr className="text-center" key={car._id}>
              <td className="border px-4 py-2">{car.name}</td>
              <td className="border px-4 py-2">{car.make}</td>
              <td className="border px-4 py-2">{car.model}</td>
              <td className="border px-4 py-2">{car.year}</td>
              <td className="border px-4 py-2">{car.transmissionType}</td>
              <td className="border px-4 py-2">{car.fuelType}</td>
              <td className="border px-4 py-2">{car.mileage}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => selectCar(car)}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(car)}
                >
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
                  value={formData.year}
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
                <select
                  id="transmissionType"
                  name="transmissionType"
                  value={formData.transmissionType}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                >
                  <option value="" disabled selected>
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
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                >
                  <option value="" disabled selected>
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
                  value={formData.mileage}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Mileage"
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
                  <option value="" disabled selected>
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
      {/* Update Car Modal */}
      {isUpdateModalOpen && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-md rounded-lg shadow-2xl w-full h-3/4 overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Update Car</h2>
            <form onSubmit={handleUpdate}>
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
                  value={selectedCar.name}
                  onChange={handleInputChange}
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
                  value={selectedCar.make}
                  onChange={handleInputChange}
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
                  value={selectedCar.model}
                  onChange={handleInputChange}
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
                  value={selectedCar.year}
                  onChange={handleInputChange}
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
                  value={selectedCar.transmissionType}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                >
                  <option value="" disabled selected>
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
                  value={selectedCar.fuelType}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                >
                  <option value="" disabled selected>
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
                  value={selectedCar.mileage}
                  onChange={handleInputChange}
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
                  value={selectedCar.status}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                >
                  <option value="" disabled selected>
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
                  Image 1<span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  id="image1"
                  name="image1"
                  accept="image/*"
                  onChange={handleFileUpload}
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
                  onChange={handleFileUpload}
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
                  onChange={handleFileUpload}
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
                  Update Car
                </button>
              </div>
            </form>
            <button onClick={handleUpdateModalClose}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

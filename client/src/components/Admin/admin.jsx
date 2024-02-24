/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { app } from "../../firebase.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import AddCarForm from "./addCarForm";
import UpdateCarForm from "./updateCarForm";
import ErrorPopUp from "../utils/errorPopUp";
import SuccessPopUp from "../utils/successPopUp";

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [isAddCarModalOpen, setAddCarModalOpen] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [errorAddCar, setAddCarError] = useState(false);
  const [successAddCar, setAddCarSuccess] = useState(false);
  const [errorUpdateCar, setUpdateCarError] = useState(false);
  const [successUpdateCar, setUpdateCarSuccess] = useState(false);
  const [errorDeleteCar, setDeleteCarError] = useState(false);
  const { brands } = useSelector((state) => state.brand);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;

  const [selectedCar, setSelectedCar] = useState({
    _id: "",
    name: "",
    brand: "",
    model: "",
    year: "",
    transmissionType: "",
    fuelType: "",
    mileage: "",
    status: "",
    rental_price: 0,
    price: 0,
    image1: null,
    image2: null,
    image3: null,
    carType: "",
    isTrending: false,
    isUpcoming: false,
    description: "",
    engine: "",
    power: "",
    driveType: "",
    torque: "",
    batteryCapacity: "",
    topSpeed: "",
    chargingTime: "",
    range: "",
    rating: ""
  });
  const [prevImageUrls, setPrevImageUrls] = useState({
    image1: null,
    image2: null,
    image3: null,
  });
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    transmissionType: "",
    fuelType: "",
    mileage: "",
    status: "",
    rental_price: 0,
    price: 0,
    image1: null,
    image2: null,
    image3: null,
    carType: "",
    isTrending: false,
    isUpcoming: false,
    description: "",
    engine: "",
    power: "",
    driveType: "",
    torque: "",
    batteryCapacity: "",
    topSpeed: "",
    chargingTime: "",
    range: "",
    rating: ""
  });

  const getInitialFormData = () => ({
    name: "",
    brand: "",
    model: "",
    year: "",
    transmissionType: "",
    fuelType: "",
    mileage: "",
    status: "",
    rental_price: 0,
    price: 0,
    image1: null,
    image2: null,
    image3: null,
    carType: "",
    isTrending: false,
    isUpcoming: false,
    description: "",
    engine: "",
    power: "",
    driveType: "",
    torque: "",
    batteryCapacity: "",
    topSpeed: "",
    chargingTime: "",
    range: "",
    rating: ""
  });
  // Pagination logic
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const displayedCars = cars.slice(startIndex, endIndex);

  useEffect(() => {
    fetchData(); // Initial data fetch when the component mounts
  }, [currentPage]); // Fetch data whenever currentPage changes

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
      if (data.success === "false") {
        setAddCarError(true);
        return;
      } else {
        setFormData(getInitialFormData());
        setUploadPercent(0);
        setAddCarSuccess(true);
      }
    } catch (error) {
      setAddCarError(true);
    } finally {
      closeAddCarModal();
      await fetchData();
    }
  };

  const handleInputChange = (name, value) => {
    console.log(name, value);
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
      await fetchData();
      //create Success pop up
    } catch (error) {
      setDeleteCarError(true);
    }
  };

  const selectCar = async (car) => {
    setSelectedCar(car);
    setUpdateModalOpen(true);
    console.log(car);
    setPrevImageUrls({
      image1: car.image1,
      image2: car.image2,
      image3: car.image3,
    });
  };

  const handleUpdateChange = (name, value) => {
    setSelectedCar({
      ...selectedCar,
      [name]: value,
    });
  };

  const handleUpdate = async (car) => {
    // Open the update modal
    car.preventDefault();
    try {
      const res = await fetch(`/api/admin/update/${selectedCar._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedCar),
      });
      const data = await res.json();
      if (data.success === false) {
        setUpdateCarError(true);
        return;
      }
      setUpdateCarSuccess(true);
    } catch (error) {
      setUpdateCarError(true);
    } finally {
      await fetchData();
      handleUpdateModalClose();
    }
  };
  const handleUpdateModalClose = () => {
    // Close the update modal
    setUpdateModalOpen(false);
    // Clear the selected car
    setSelectedCar(null);
  };

  const handleUpdateFileUpload = async (e) => {
    console.log("On change called");
    const { name, files } = e.target;
    const imageFile = files[0];
    try {
      //First deleting the prev file.
      await deletePrevImage(name);
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
            setSelectedCar({
              ...selectedCar,
              [name]: downloadURL,
            });
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const deletePrevImage = async (name) => {
    const url = prevImageUrls[name];
    try {
      // Get a reference to the file using the URL
      const storage = getStorage(app);
      const fileRef = ref(storage, url);
      // Delete the file
      await deleteObject(fileRef)
        .then(() => {
          console.log("File deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting file:", error);
        });
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const closeAddCarErrorPopUp = () => {
    setAddCarError(false);
  };
  const closeSuccessAddCarPopUp = () => {
    setAddCarSuccess(false);
  };
  const closeUpdateCarErrorPopUp = () => {
    setUpdateCarError(false);
  };
  const closeSuccessUpdateCarPopUp = () => {
    setUpdateCarSuccess(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto mt-8 h-screen md:h-[75vh]">
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
      <table className="table-auto justify-between mx-auto items-center">
        <thead>
          <tr>
            <th className="border-2 border-gray-700 px-4 py-2">Name</th>
            <th className="border-2 border-gray-700 px-4 py-2">Brand</th>
            <th className="border-2 border-gray-700 px-4 py-2">Model</th>
            <th className="border-2 border-gray-700 px-4 py-2">Year</th>
            <th className="border-2 border-gray-700 px-4 py-2">
              Transmission Type
            </th>
            <th className="border-2 border-gray-700 px-4 py-2">Fuel Type</th>
            <th className="border-2 border-gray-700 px-4 py-2">Mileage</th>
            <th className="border-2 border-gray-700 px-4 py-2">Rental Price</th>
            <th className="border-2 border-gray-700 px-4 py-2">Market Price</th>
            <th className="border-2 border-gray-700 px-4 py-2">Car Type</th>
            <th className="border-2 border-gray-700 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedCars.map((car) => (
            <tr className="text-center text-sm text-black" key={car._id}>
              <td className="border-2 border-gray-700 px-4 py-2 bg-yellow-200">
                {car.name}
              </td>
              <td className="border-2 border-gray-700 px-4 py-2 bg-green-300">
                {car.brand.make}
              </td>
              <td className="border-2 border-gray-700 px-4 py-2 bg-pink-500">
                {car.model}
              </td>
              <td className="border-2 border-gray-700 px-4 py-2 bg-orange-400">
                {car.year}
              </td>
              <td className="border-2 border-gray-700 px-4 py-2 bg-red-200">
                {car.transmissionType}
              </td>
              <td className="border-2 border-gray-700 px-4 py-2 bg-blue-200">
                {car.fuelType}
              </td>
              <td className="border-2 border-gray-700 px-4 py-2 bg-green-200">
                {car.mileage}
              </td>
              <td className="border-2 border-gray-700 px-4 py-2 bg-red-500">
                {car.rental_price}
              </td>
              <td className="border-2 border-gray-700 px-4 py-2 bg-blue-600">
                {car.price}
              </td>
              <td className="border-2 border-gray-700 px-4 py-2 bg-pink-600">
                {car.carType}
              </td>
              <td className="border-2 border-gray-700 px-4 py-2 bg-gray-200">
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
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <ul className="flex gap-2">
          {Array.from(
            { length: Math.ceil(cars.length / PAGE_SIZE) },
            (_, i) => (
              <li
                key={i + 1}
                className={`px-3 py-1 rounded cursor-pointer ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </li>
            )
          )}
        </ul>
      </div>

      {isAddCarModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-2xl rounded-lg shadow-2xl w-full h-5/6 overflow-auto">
            <button
              onClick={closeAddCarModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">Add Car Info</h2>
            <AddCarForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileUpload={handleFileUpload}
              handleAddCar={handleAddCar}
              closeAddCarModal={closeAddCarModal}
              uploadPercent={uploadPercent}
              uploadError={uploadError}
              brands={brands}
            />
          </div>
        </div>
      )}

      {/* Update Car Modal */}
      {isUpdateModalOpen && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-2xl rounded-lg shadow-2xl w-full h-5/6 overflow-auto">
            <button
              onClick={handleUpdateModalClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">Update Car</h2>
            <UpdateCarForm
              selectedCar={selectedCar}
              handleUpdateChange={handleUpdateChange}
              handleUpdateFileUpload={handleUpdateFileUpload}
              handleUpdate={handleUpdate}
              handleUpdateModalClose={handleUpdateModalClose}
              uploadPercent={uploadPercent}
              uploadError={uploadError}
              brands={brands}
            />
          </div>
        </div>
      )}
      {/* Error/Sucsess Pop-ups for Adding and Updating  */}
      {errorAddCar && (
        <ErrorPopUp
          message={"Something went wrong while addding!!"}
          close={closeAddCarErrorPopUp}
        />
      )}
      {successAddCar && (
        <SuccessPopUp
          message={"Succesfully Added!!"}
          close={closeSuccessAddCarPopUp}
        />
      )}

      {errorUpdateCar && (
        <ErrorPopUp
          message={"Something went wrong while updating!!"}
          close={closeUpdateCarErrorPopUp}
        />
      )}
      {successUpdateCar && (
        <SuccessPopUp
          message={"Succesfully Updated!!"}
          close={closeSuccessUpdateCarPopUp}
        />
      )}
    </div>
  );
};

export default AdminDashboard;

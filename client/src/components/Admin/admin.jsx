/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { app } from "../../firebase.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import AddCarForm from "./addCarForm";
import UpdateCarForm from "./updateCarForm";

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const [isAddCarModalOpen, setAddCarModalOpen] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [errorAddCar, setAddCarError] = useState(false);
  const [errorDeleteCar, setDeleteCarError] = useState(false);
  const [selectedCar, setSelectedCar] = useState({
    _id: "",
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
  const [prevImageUrls, setPrevImageUrls] = useState({
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
    fetchData(); // Initial data fetch when the component mounts
  }, []);

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
      await fetchData();
    }
  };

  const handleInputChange = (name, value) => {
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
        return;
      }
      await fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateModalOpen(false);
      setSelectedCar(null);
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

      {isAddCarModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-md rounded-lg shadow-2xl w-full h-3/4 overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Add Car Info</h2>
            <AddCarForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileUpload={handleFileUpload}
              handleAddCar={handleAddCar}
              closeAddCarModal={closeAddCarModal}
              uploadPercent={uploadPercent}
              uploadError={uploadError}
            />
          </div>
        </div>
      )}

      {/* Update Car Modal */}
      {isUpdateModalOpen && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-md rounded-lg shadow-2xl w-full h-3/4 overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Update Car</h2>
            <UpdateCarForm
              selectedCar={selectedCar}
              handleUpdateChange={handleUpdateChange}
              handleUpdateFileUpload={handleUpdateFileUpload}
              handleUpdate={handleUpdate}
              handleUpdateModalClose={handleUpdateModalClose}
              uploadPercent={uploadPercent}
              uploadError={uploadError}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

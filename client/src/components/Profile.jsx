/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import ErrorPopUp from "./utils/errorPopUp";
import { app } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
} from "../redux/user/userSlice.js";
import Bookingtile from "./utils/bookingtile.jsx";
import SuccessPopUp from "./utils/successPopUp";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [errorPopup, seterrorPopup] = useState(false);
  const [successPopup, setsuccessPopup] = useState(false);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
    fetchAppointments();
  }, [image]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        `/api/user/getAppointments/${currentUser._id}`, {
          headers:{
            accept: 'application/json'          }
        }
      );
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const upload = uploadBytesResumable(storageRef, image);

    upload.on(
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
        getDownloadURL(upload.snapshot.ref).then((downloadUrl) =>
          setFormData({ ...formData, profilePicture: downloadUrl })
        );
      }
    );
  };
  function closePopUp() {
    dispatch(updateUserFailure());
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //Updating the USER Details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  //Deleting the USER's account
  const handleDeleteAccount = async (e) => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  //Sign out user
  const handleSignOut = async () => {
    try {
      await fetch("api/auth/signout", {
        headers:{
          accept: 'application/json',
        }
      });
      dispatch(signOut());
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  //cancel appointment
  const closeErrorPopUp = () => {
    seterrorPopup(false);
  };
  const closeSuccessPopUp = () => {
    setsuccessPopup(false);
  };

  const cancelAppointment = async (id) => {
    try {
      const res = await fetch(`/api/user/deleteAppointment/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        seterrorPopup(true);
        return;
      }
      setsuccessPopup(true);
      fetchAppointments();
    } catch (error) {
      seterrorPopup(true);
    }
  };

  return (
    <div>
      {!error ? (
        <>
          <div className="p-3 max-w-lg mx-auto">
            <h1 className="test-3xl font-semibold text-center my-7">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <img
                src={formData.profilePicture || currentUser.profilePicture}
                alt="Profile"
                className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
                onClick={() => fileRef.current.click()}
              />
              <p className="text-sm self-center">
                {uploadError ? (
                  <span className="text-red-700">
                    Error while uploading! (File size must be less than 2mb)
                  </span>
                ) : uploadPercent > 0 && uploadPercent < 100 ? (
                  <span className="text-slate-700">{`Uploading: ${uploadPercent} %`}</span>
                ) : uploadPercent == 100 ? (
                  <span className="text-green-700">Uploading successful!</span>
                ) : (
                  ""
                )}
              </p>
              <input
                type="text"
                defaultValue={currentUser.username}
                id="username"
                placeholder="Username"
                className="bg-slate-200 rounded-lg p-3"
                onChange={handleChange}
              />
              <input
                type="email"
                defaultValue={currentUser.email}
                id="email"
                placeholder="Email"
                className="bg-slate-200 rounded-lg p-3"
                onChange={handleChange}
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="bg-slate-200 rounded-lg p-3"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-90 disabled:opacity-80"
              >
                {loading ? "Loading ..." : "Update"}
              </button>
            </form>
            <div className="flex justify-between mt-5">
              <span
                className="text-red-700 cursor-pointer"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </span>
              <span
                onClick={handleSignOut}
                className="text-red-700 cursor-pointer"
              >
                Sign Out
              </span>
            </div>
            <p className="text-green-700 mt-5">
              {updateSuccess && "User details are updated successfully !!"}
            </p>
          </div>
          {appointments.length !== 0 && (
            <div className="max-w-3xl mx-auto p-8 m-8 shadow-md">
              <h1>My Appointments</h1>
              {appointments.map((booking, index) => (
                <Bookingtile booking={booking} key={index} cancelAppointment= {cancelAppointment} />
              ))}
            </div>
          )}
          {errorPopup && (
            <ErrorPopUp
              message={"Something went wrong! Please try again Later."}
              close={closeErrorPopUp}
            />
          )}
          {successPopup && (
            <SuccessPopUp
              message={
                "Succesfully Cancelled the Appointment!"
              }
              close={closeSuccessPopUp}
            />
          )}
        </>
      ) : (
        <div className="p-3 max-w-lg mx-auto">
          {error && (
            <ErrorPopUp message={"Something went wrong!!"} close={closePopUp}  />
          )}
        </div>
      )}
    </div>
  );
}

/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { app } from "../firebase.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function Profile() {
  const { currentuser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="test-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentuser.profilePicture}
          alt="Profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {uploadError ? (
            <span className="text-red-700">Error while uploading! (File size must be less than 2mb)</span>
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
          defaultValue={currentuser.username}
          id="username"
          placeholder="Username"
          className="bg-slate-200 rounded-lg p-3"
        />
        <input
          type="email"
          defaultValue={currentuser.email}
          id="email"
          placeholder="Email"
          className="bg-slate-200 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-200 rounded-lg p-3"
        />
        <button className="bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-90 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

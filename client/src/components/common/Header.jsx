/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import myImage from "../../assets/carental.png";
import SecondaryHeader from "./SecondaryHeader";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-white p-1">
      <div className="flex justify-between mx-auto max-w-6xl items-center p-1 ">
        <Link to="/">
          <img
            src={myImage}
            className="object-cover h-12 w-48 rounded-lg border border-black"
          />
        </Link>
        <ul className="flex gap-4 text-md font-medium text-[#24272c]">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
          <Link to="/admin">
            {currentUser && currentUser.isAdmin && (
              <li className="text-red-700">Admin</li>
            )}
          </Link>
        </ul>
      </div>
      <div className="border-t-2 border-b-2">
        <SecondaryHeader />
      </div>
    </div>
  );
}

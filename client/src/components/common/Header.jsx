/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-white p-3 header">
      <div className="flex justify-between mx-auto max-w-6xl items-center p-3">
        <Link to="/">
          <h1 className="font-bold text-lg text-[#24272c]">Car Rental</h1>
        </Link>
        <ul className="flex gap-4 text-md font-medium text-[#24272c]">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/admin">
            {currentUser.isAdmin && 
              <li className="text-red-700">Admin</li>
            }
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
          
        </ul>
      </div>
    </div>
  );
}

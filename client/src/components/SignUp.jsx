/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorPopUp from "./utils/errorPopUp";
import OAuth from "./common/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.statusCode != 201) {
        setError(true);
        setLoading(false);
        return;
      } else {
        navigate("/sign-in");
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  function closePopUp() {
    setError(false);
  }

  return (
    <div>
      {!error ? (
        <div className="p-3 max-w-lg mx-auto h-screen md:h-[75vh]">
          <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="bg-slate-100 p-3 rounded-lg"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="bg-slate-100 p-3 rounded-lg"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="bg-slate-100 p-3 rounded-lg"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
            <OAuth />
          </form>
          <div className="flex gap-2 mt-5">
            <p>Have an account?</p>
            <Link to="/sign-in">
              <span className="text-blue-500">Sign In</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-3 max-w-lg mx-auto h-screen md:h-[75vh]">
          {error ? (
            <ErrorPopUp
              message={"Username or Email already exists. Please retry again."}
              close={closePopUp}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}

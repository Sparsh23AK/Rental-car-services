/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LiaCertificateSolid } from "react-icons/lia";
import { MdOutlineLocalOffer, MdOutlinePriceCheck } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-2 border-gray-200 bottom-0 left-0 right-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center border-b-2 border-gray-200 mt-4">
          <div className="flex justify-center md:justify-start md:gap-16 p-4 md:mb-0 gap-28">
            <span className="flex flex-col items-center text-center">
              <LiaCertificateSolid className="text-gray-600 mr-1 text-4xl md:text-6xl" />
              <span className="text-lg md:text-xl">India’s #1</span>
              <p className="text-sm">Largest Auto portal</p>
            </span>

            <span className="flex flex-col items-center text-center">
              <MdOutlineLocalOffer className="text-gray-600 mr-1 text-4xl md:text-6xl" />
              <span className="text-lg md:text-xl">Offers</span>
              <p className="text-sm">Stay updated pay less</p>
            </span>

            <span className="flex flex-col items-center text-center">
              <CiDeliveryTruck className="text-gray-600 mr-1 text-4xl md:text-6xl" />
              <span className="text-lg md:text-xl">Delivery</span>
              <p className="text-sm">We deliver at home.</p>
            </span>

            <span className="flex flex-col items-center text-center">
              <MdOutlinePriceCheck className="text-gray-600 mr-1 text-4xl md:text-6xl" />
              <span className="text-lg md:text-xl">Price</span>
              <p className="text-sm">Buy at right price.</p>
            </span>
          </div>
        </div>
        <div className="container mx-auto justify-between items-center">
          <div className="flex flex-col items-center mb-6 mt-4 space-x-4 text-md gap-6">
            <div className="flex items-center space-x-4">
              <Link to="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Contact Us
              </Link>
            </div>
            <div className="flex items-center space-x-4 ">
              <FaXTwitter className="text-black hover:text-gray-500 hover:cursor-pointer" />
              <FaLinkedin className="text-blue-600 hover:text-gray-500 hover:cursor-pointer" />
              <FaGithub className="text-black hover:text-gray-500 hover:cursor-pointer" />
            </div>
          </div>
          <div className="text-gray-600 text-center">
            <span>
              &copy; {currentYear} Carental. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

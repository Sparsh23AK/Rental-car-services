/* eslint-disable no-unused-vars */
import React from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import profilepic from "../assets/profile-pic.jpeg";


const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-12 flex">
      <div className="w-2/3">
        <img
          src={profilepic}
          alt="Sparsh Giri"
          className="h-full w-100 rounded-md"
        />
      </div>
      <div className="w-2/3 ml-8">
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-bold">Sparsh Giri</h1>
          <p className="text-lg">Full Stack Web Developer</p>
        </div>
        <div className="mt-8 text-center justify-around">
          <p>
            Hello, I&apos;m Sparsh Giri, a full stack web developer with years of experiences. I specialize in MEAN, MERN, serverless AWS, Spring Boot, and web development, passionate about creating amazing web experiences.
          </p>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-lg font-bold">Contact Me</h2>
          <p>Email: sparshgiri23@gmail.com</p>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-lg font-bold">Connect with Me</h2>
          <div className="flex justify-center mt-2">
            <a
              href="https://linkedin.com/in/sparsh-giri-b33881217"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <FaLinkedin className="text-blue-600 text-3xl" />
            </a>
            <a
              href="https://github.com/Sparsh23AK/Rental-car-services"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <FaGithub className="text-gray-800 text-3xl" />
            </a>
            {/* <a
              href="https://twitter.com/your-twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-blue-400 text-3xl" />
            </a> */}
          </div>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-lg font-bold">About This Website</h2>
          <p>
            This website is a showcase of my skills, built using Vite React, MongoDB, Express, Tailwind CSS, Firebase, JWT, and Node.js.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

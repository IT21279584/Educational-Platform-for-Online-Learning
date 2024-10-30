import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Navbar from "./Navbar";
import Logo from "../assets/logo.svg";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "INSTRUCTOR", // Set default role as INSTRUCTOR
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords Do Not Match",
        text: "Please make sure your passwords match.",
      });
      return;
    }

    // Check if any required fields are empty
    for (const field in formData) {
      if (formData[field] === "") {
        Swal.fire({
          icon: "error",
          title: "Required Fields Missing",
          text: "Please fill in all required fields.",
        });
        return;
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:8082/api/users/register",
        formData
      );
      console.log("RESPONSE DATA",response.data);
      const notificationData = {
        userId: response.data.userId, // Adjust as per your response structure
        courseId: 1, // Adjust as per your response structure
        email: response.data.email,
      };
      console.log(notificationData);
      await axios.put(
        "http://localhost:8085/api/notification/send",
        notificationData
      );

      console.log(response.data);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have successfully registered!",
      });
      navigate("/api/login");
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response.data,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="w-auto h-10 mx-auto"
            src={Logo}
            alt="EduNest"
            style={{ fill: "red" }}
          />
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-left text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleChange}
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-left text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  onChange={handleChange}
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-left text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  onChange={handleChange}
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-left text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  onChange={handleChange}
                  className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-sm text-center text-gray-500">
            Already have an account? <Link to="/api/login">Sign In</Link>
          </p>
          <p className="mt-10 text-sm text-center text-gray-500">
            <Link to="/api/instructor/register">
              Sign up with your organization
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

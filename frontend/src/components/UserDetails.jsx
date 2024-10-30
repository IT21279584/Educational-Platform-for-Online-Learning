import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom"; // Import Link component
import Footer from "../Pages/Footer";
import Navbar from "./Navbar";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Get token from local storage or wherever it's stored
        const token = localStorage.getItem("token");

        // Decode the token to get user ID
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        // Fetch user details
        const userResponse = await axios.get(
          `http://localhost:8082/api/users/${userId}`
        );
        setUser(userResponse.data);

        // Fetch enrolled courses for the user
        const enrollResponse = await axios.get(
          `http://localhost:8084/api/enroll/${userId}`
        );
        setEnrolledCourses(enrollResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div>
      <Navbar/>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl p-8 mx-4 bg-white rounded-lg shadow-md md:mx-auto">
          <h1 className="mb-8 text-3xl font-semibold text-gray-800">
            User Details
          </h1>
          {loading ? (
            <p className="text-lg text-gray-600">Loading...</p>
          ) : user ? (
            <div className="mb-8">
              <div className="mb-4">
                <p className="text-lg font-medium text-gray-700">Name</p>
                <p className="mt-1 text-lg text-gray-900">{user.username}</p>
              </div>
              <div className="mb-4">
                <p className="text-lg font-medium text-gray-700">Email</p>
                <p className="mt-1 text-lg text-gray-900">{user.email}</p>
              </div>
            </div>
          ) : (
            <p className="mb-8 text-lg text-red-600">
              Failed to fetch user details.
            </p>
          )}
          <h2 className="mb-4 text-3xl font-semibold text-gray-800">
            Enrolled Courses
          </h2>
          {loading ? (
            <p className="text-lg text-gray-600">Loading...</p>
          ) : enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-6 bg-gray-100 rounded-lg shadow-md"
                >
                  <Link
                    to={`/api/course/single/${course.courseId}`}
                    className="cursor-pointer"
                  >
                    <h3 className="mb-2 text-xl font-semibold text-gray-800">
                      {course.courseTitle}
                    </h3>
                    <p className="text-lg text-gray-700">
                      {course.description}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg text-gray-600">No courses enrolled yet.</p>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default UserDetails;

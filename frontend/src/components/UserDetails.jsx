import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
    <div className="min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto overflow-hidden bg-white rounded-md shadow-md">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-semibold text-gray-800">User Details</h1>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        ) : user ? (
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <p className="mt-1 text-sm text-gray-900">{user.username}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 text-sm text-gray-900">{user.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Enrolled Courses
              </label>
              {enrolledCourses.map((course) => (
                <p key={course.id} className="mt-1 text-sm text-gray-900">
                  {course.courseId}{" "}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8">
            <p className="text-lg text-red-600">
              Failed to fetch user details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;

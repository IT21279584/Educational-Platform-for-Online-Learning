import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "../Pages/Sidebar";
import Footer from "../Pages/Footer";

const NoteCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId; // Extract user ID from decoded token
      const fetchCourses = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8083/api/course/course/${userId}`
          );
          setCourses(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching courses:", error);
          // Handle error
        }
      };

      fetchCourses();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="min-h-screen px-4 py-6 mt-8 bg-gray-200 sm:px-6 lg:px-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-s-lg">
            <thead className="bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
                >
                  Title
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
                >
                  Course Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.course_id}>
                    <td className="px-6 py-4 text-left whitespace-nowrap">
                      {course.title}
                    </td>

                    <td className="px-6 py-4 text-left whitespace-nowrap ">
                      {course.category}
                    </td>

                    <td className="px-6 py-4 text-left whitespace-nowrap ">
                      {course.courseType}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap float-start">
                      <Link
                        to={`/api/note/${course.courseId}`}
                        className="mr-4 font-bold text-indigo-600 hover:text-indigo-900"
                      >
                        ADD NOTE
                      </Link>
                      <Link
                        to={``}
                        className="mr-4 font-bold text-red-600 hover:text-indigo-900"
                      >
                        VIEW NOTES
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NoteCourseList;

import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../Pages/Sidebar";
import Navbar from "./Navbar";
import Footer from "../Pages/Footer";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const EditCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    courseCode: "",
    courseType: "",
    duration: "",
    price: "",
    userId: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8083/api/course/${courseId}`
        );
        const courseData = response.data;
        setFormData({
          title: courseData.title,
          description: courseData.description,
          category: courseData.category,
          courseCode: courseData.courseCode,
          courseType: courseData.courseType,
          duration: courseData.duration,
          price: courseData.price,
          userId: userId,
        });
      } catch (error) {
        console.error("Error fetching course:", error);
        // Handle error
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8083/api/course/${courseId}`,
        formData
      );
      console.log("Course updated successfully:", response.data);
      // Show success message
      Swal.fire({
        icon: "success",
        title: "Course updated successfully!",
        text: "You will be redirected to the course list.",
      }).then((result) => {
        // Redirect to course list
        navigate("/api/course/all");
      });
    } catch (error) {
      console.error("Error updating course:", error);
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update course. Please try again later.",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="max-w-lg mx-auto">
        <h1 className="mb-8 text-3xl font-semibold text-center">Edit Course</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
            />
          </div>
          {/* Repeat similar structure for other form fields */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
          {/* Repeat similar structure for other form fields */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select Category</option>
              <option value="INFORMATION_TECHNOLOGY">
                Information Technology
              </option>
              <option value="DATA_SCIENCE">Data Science</option>
              <option value="HEALTH_AND_SOCIAL">Health and Social</option>
              <option value="LANGUAGE_LEARNING">Language Learning</option>
              <option value="ENGINEERING">Engineering</option>
              <option value="PHYSICAL_SCIENCE">Physical Science</option>
            </select>
          </div>
          {/* Repeat similar structure for other form fields */}
          <div>
            <label
              htmlFor="courseType"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Course Type
            </label>
            <select
              id="courseType"
              name="courseType"
              value={formData.courseType}
              onChange={handleChange}
              className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select Course Type</option>
              <option value="BEGINNER_LEVEL">Beginner Level</option>
              <option value="INTERMEDIATE_LEVEL">Intermediate Level</option>
              <option value="ADVANCED_LEVEL">Advanced Level</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="courseCode"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Course Code
            </label>
            <input
              type="text"
              id="courseCode"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-left text-gray-700"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="pl-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditCourse;

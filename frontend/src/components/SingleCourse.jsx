import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Pages/Footer";
import Navbar from "./Navbar";

const VideoLearner = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseResponse = await axios.get(
          `http://localhost:8083/api/course/${courseId}`
        );

        if (!courseResponse.data) {
          throw new Error("Invalid course data");
        }

        setCourseDetails(courseResponse.data);
      } catch (error) {
        console.error("Error fetching course details:", error.message);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const increaseProgress = () => {
    setProgress((prevProgress) => {
      if (prevProgress >= 100) {
        return 100;
      }
      return prevProgress + 20;
    });
  };

  if (!courseDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container grid grid-cols-1 gap-8 px-4 py-8 mx-auto md:grid-cols-2">
        <div className="relative h-80 md:h-auto">
          <div className="video-container">
            {/* Video Player and Progress Bar */}
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <button
                className="ml-2 px-2 py-1 text-white rounded bg-blue-500 hover:bg-blue-400 focus:bg-blue-600 focus:outline-none"
                onClick={increaseProgress}
                disabled={progress >= 100}
              >
                Increase
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-2 text-2xl font-bold ">{courseDetails.title}</h2>
            <hr />
            <p className="mt-4 mb-2 font-semibold text-left text-gray-600">
              {courseDetails.category}
            </p>
            <p className="mb-2 font-semibold text-left text-gray-600">
              {courseDetails.courseCode}
            </p>
            <p className="mb-2 font-semibold text-left text-gray-600">
              {courseDetails.courseType}
            </p>
            <p className="mb-2 font-semibold text-left text-gray-600">
              {courseDetails.duration} hours (Approximately)
            </p>
            <p className="mb-2 text-xl font-extrabold text-left text-gray-600">
              {courseDetails.price}
            </p>
          </div>
          <div className="p-6 mt-5 bg-white rounded-lg shadow-md">
            <h2 className="mb-2 text-lg font-bold">Course Description</h2>
            <hr />
            <p className="mt-4 text-justify text-gray-600">
              {courseDetails.description}
            </p>
          </div>
          {/* Use Link component to navigate to the videos page */}
          <Link
            to={`/api/videos/${courseId}`}
            className="block px-4 py-2 mt-4 text-white rounded bg-slate-800 hover:bg-slate-600 focus:bg-slate-700 focus:outline-none"
          >
            Start Course
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VideoLearner;

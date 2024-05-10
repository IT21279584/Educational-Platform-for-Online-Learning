import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Pages/Footer";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode

const LearnerReviews = () => {
  const reviews = [
    { stars: 5, percentage: 70.66 },
    { stars: 4, percentage: 22.67 },
    { stars: 3, percentage: 4.42 },
    { stars: 2, percentage: 0.95 },
    { stars: 1, percentage: 1.28 },
  ];

  return (
    <div className="mt-8">
      <h2 className="mb-2 text-lg font-semibold text-left">Learner Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="flex items-center">
            <div className="w-4 h-4 mr-2 bg-gray-400 rounded-full"></div>
            <div className="text-sm text-gray-600">{review.stars} stars</div>
            <div
              className="flex-grow h-2 ml-4 bg-gray-200 rounded-full"
              style={{ maxWidth: "200px" }}
            >
              <div
                className="h-full rounded-full bg-slate-800"
                style={{ width: `${review.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const VideoLearner = () => {
  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null); // State variable to store logged-in user

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const videoResponse = await axios.get(
          `http://localhost:8083/api/videos/video/${videoId}`
        );

        if (!videoResponse.data) {
          throw new Error("Invalid video data");
        }

        const courseId = videoResponse.data.course.courseId;

        if (!courseId) {
          throw new Error("Invalid courseId");
        }

        const courseResponse = await axios.get(
          `http://localhost:8083/api/course/${courseId}`
        );

        if (!courseResponse.data) {
          throw new Error("Invalid course data");
        }

        setVideoDetails(videoResponse.data);
        setCourseDetails(courseResponse.data);
      } catch (error) {
        console.error("Error fetching video details:", error.message);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  useEffect(() => {
    // Decode JWT token and set logged-in user
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setLoggedInUser(decoded);
    }
  }, []);

  const handleEnrollClick = async () => {
    try {
      if (!loggedInUser) {
        throw new Error("User not logged in");
      }

      const enrollResponse = await axios.post(
        "http://localhost:8084/api/enroll/enroll",
        { userId: loggedInUser.userId, courseId: courseDetails.courseId }
      );

      // Handle successful enrollment
      console.log("Enrollment successful!");
    } catch (error) {
      // Handle enrollment error
      console.error("Error enrolling:", error.message);
    }
  };

  if (!videoDetails || !courseDetails) {
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
            <video className="object-cover w-full h-full rounded-md" controls>
              <source src={videoDetails.s3Url} type="video/mp4" />
            </video>
          </div>
          <LearnerReviews />
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
          <button
            className="block px-4 py-2 mt-4 text-white rounded bg-slate-800 hover:bg-slate-600 focus:bg-slate-700 focus:outline-none"
            onClick={handleEnrollClick}
          >
            Enroll Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VideoLearner;

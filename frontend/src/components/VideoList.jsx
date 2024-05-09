import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "./Navbar";
import Footer from "../Pages/Footer";

const VideoList = () => {
  const [videosByCourse, setVideosByCourse] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseTypes, setSelectedCourseTypes] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8083/api/videos/all"
        );

        // Group videos by their course IDs
        const videosByCourseId = response.data.reduce((acc, video) => {
          const courseId = video.course?.courseId || "Uncategorized";
          acc[courseId] = acc[courseId] || [];
          acc[courseId].push(video);
          return acc;
        }, {});

        // Sort videos by videoId within each category
        for (const courseId in videosByCourseId) {
          videosByCourseId[courseId].sort((a, b) => a.videoId - b.videoId);
        }

        setVideosByCourse(videosByCourseId);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Function to generate a random rating between 0 and 5 for each video
  const generateRandomRating = () => {
    return Math.random() * 5;
  };

  // Function to filter videos based on search query, course types, and prices
  const filteredVideos = Object.entries(videosByCourse).reduce(
    (acc, [courseId, videos]) => {
      const filteredVideos = videos.filter((video) => {
        const titleMatch = video.course.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const typeMatch =
          selectedCourseTypes.length === 0 ||
          selectedCourseTypes.includes(video.course.courseType.toLowerCase());
        const priceMatch =
          selectedPrices.length === 0 ||
          (selectedPrices.includes("free") && video.course.price == "Free") ||
          (selectedPrices.includes("paid") && video.course.price > 0);
        return titleMatch && typeMatch && priceMatch;
      });
      if (filteredVideos.length > 0) {
        acc[courseId] = filteredVideos;
      }
      return acc;
    },
    {}
  );

  // Function to handle changes in the course type filter
  const handleCourseTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCourseTypes((prevTypes) => [...prevTypes, value]);
    } else {
      setSelectedCourseTypes((prevTypes) =>
        prevTypes.filter((type) => type !== value)
      );
    }
  };

  // Function to handle changes in the price filter
  const handlePriceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedPrices((prevPrices) => [...prevPrices, value]);
    } else {
      setSelectedPrices((prevPrices) =>
        prevPrices.filter((price) => price !== value)
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container grid grid-cols-1 gap-4 mx-auto mt-8 md:grid-cols-5">
        <div className="md:col-span-1">
          <div className="p-4 bg-gray-100 rounded-lg">
            <input
              type="text"
              placeholder="Search by title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <div className="mb-4">
              <p className="mb-2 font-bold text-left">Course Type:</p>
              <div className="ml-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="beginner_level"
                    checked={selectedCourseTypes.includes("beginner_level")}
                    onChange={handleCourseTypeChange}
                    className="mr-1"
                  />
                  Beginner
                </label>
                <br />
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="intermediate_level"
                    checked={selectedCourseTypes.includes("intermediate_level")}
                    onChange={handleCourseTypeChange}
                    className="mr-1"
                  />
                  Intermediate
                </label>
                <br />
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="advanced_level"
                    checked={selectedCourseTypes.includes("advanced_level")}
                    onChange={handleCourseTypeChange}
                    className="mr-1"
                  />
                  Advanced
                </label>
              </div>
            </div>
            <div>
              <p className="mb-2 font-bold text-left">Price:</p>
              <div className="flex items-start ml-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="free"
                    checked={selectedPrices.includes("free")}
                    onChange={handlePriceChange}
                    className="mr-1"
                  />
                  Free
                </label>
                <br />
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value="paid"
                    checked={selectedPrices.includes("paid")}
                    onChange={handlePriceChange}
                    className="mr-1"
                  />
                  Paid
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Object.entries(filteredVideos).map(([courseId, videos]) => (
              <div key={courseId}>
                {videos.length > 0 && videos[0].course.isApproved === 1 && (
                  <div className="relative p-4 overflow-hidden border border-gray-300 rounded-lg shadow-lg">
                    <Link to={`/api/video-learner/${videos[0].videoId}`}>
                      <video
                        className="w-full mb-3 rounded-md"
                        style={{ maxWidth: "100%" }}
                        loop
                        muted
                      >
                        <source src={videos[0].s3Url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <p className="mb-4 font-bold text-left text-gray-700 truncate">
                        {videos[0].course
                          ? videos[0].course.title
                          : "Uncategorized"}
                      </p>
                      <p className="text-xs text-left text-gray-700 truncate">
                        {videos[0].course.duration} hours
                      </p>
                      <p className="text-xs text-left text-gray-700 truncate">
                        {videos[0].course.courseType.toLowerCase()}
                      </p>

                      <div className="flex items-center mt-2">
                        <div className="flex items-center mr-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`h-3 w-3 fill-current ${
                                i < Math.floor(generateRandomRating())
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 2l1.82 5.65h5.905L12.5 9.965l1.715 5.285H10L8.785 18 5.28 15.325H0L1.82 9.65 0 4h5.28L10 2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                        </div>
                        <p className="text-xs text-gray-700">
                          {generateRandomRating().toFixed(1)}
                        </p>
                      </div>
                      <p className="mt-5 mr-4 font-bold text-left text-gray-700 truncate text-md">
                        {videos[0].course.price}
                      </p>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VideoList;

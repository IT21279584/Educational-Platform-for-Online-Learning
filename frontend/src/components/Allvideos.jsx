import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../Pages/Footer";
import Navbar from "./Navbar";

const AllVideos = () => {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8083/api/videos/${courseId}`
        );
        const sortedVideos = response.data.sort(
          (a, b) => a.videoId - b.videoId
        );
        setVideos(sortedVideos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to fetch videos.");
        setLoading(false);
      }
    };

    fetchVideos();
  }, [courseId]);

  useEffect(() => {
    const videoIndex = currentPage - 1;
    if (videos.length > 0 && videoIndex >= 0 && videoIndex < videos.length) {
      setSelectedVideo(videos[videoIndex]);
      setIsVideoEnded(false);
    }
  }, [currentPage, videos]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < videos.length && isVideoEnded) {
      setCurrentPage((prevPage) => prevPage + 1);
      const progressPercentage = Math.ceil((currentPage / videos.length) * 100);
      localStorage.setItem(`courseProgress_${courseId}`, progressPercentage);
    }
  };

  const handleVideoEnded = () => {
    setIsVideoEnded(true);
  };

  const handleGoToQuizzes = () => {
    window.location.href = `/api/quiz/1/1`;
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-semibold text-center text-gray-800">
          All Videos
        </h2>
        {selectedVideo && (
          <div className="mb-8 overflow-hidden bg-gray-100 rounded-lg shadow-xl">
            <div key={selectedVideo.videoId} className="mb-4">
              <div className="aspect-w-16 aspect-h-9">
                <video
                  controls
                  ref={videoRef}
                  onEnded={handleVideoEnded}
                  className="w-full h-full"
                  controlsList="nodownload"
                >
                  <source src={selectedVideo.s3Url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <h1 className="m-5 text-3xl font-bold text-left">
                  Description
                </h1>
                <p className="px-4 mb-2 overflow-y-auto font-serif text-lg text-justify max-h-40">
                  <span className="text-gray-700"></span>{" "}
                  {selectedVideo.description.slice(0, 1000)}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handlePrevPage}
            className="px-4 py-2 font-semibold text-gray-800 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none"
          >
            Previous
          </button>
          <span className="text-gray-800">{currentPage}</span>
          {currentPage === videos.length && isVideoEnded && (
            <button
              onClick={handleGoToQuizzes}
              className="px-4 py-2 font-semibold text-white rounded-lg bg-slate-800 hover:bg-slate-600 focus:outline-none"
            >
              Go to Quiz
            </button>
          )}
          <button
            onClick={handleNextPage}
            disabled={!isVideoEnded}
            className={`${
              isVideoEnded
                ? "bg-slate-800 hover:bg-slate-600"
                : "bg-gray-300 text-gray-800 cursor-not-allowed"
            } text-white font-semibold py-2 px-4 rounded-lg focus:outline-none`}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllVideos;

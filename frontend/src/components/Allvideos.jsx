import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
          `http://localhost:8080/api/videos/${courseId}`
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
    }
  };

  const handleVideoEnded = () => {
    setIsVideoEnded(true);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
        All Videos
      </h2>
      {selectedVideo && (
        <div className="mb-8 rounded-lg overflow-hidden shadow-xl bg-gray-100">
          <div key={selectedVideo.videoId} className="mb-4">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 bg-gray-200 py-2 px-4">
              Video ID: {selectedVideo.videoId}
            </h3>
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
                          <h1 className="m-5 text-left font-bold text-3xl">Description</h1>
              <p className="mb-2 px-4 text-justify font-serif text-lg max-h-40 overflow-y-auto">
                <span className="text-gray-700"></span>{" "}
                {selectedVideo.description.slice(0, 1000)}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg focus:outline-none"
        >
          Previous
        </button>
        <span className="text-gray-800">{currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={!isVideoEnded}
          className={`${
            isVideoEnded
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 text-gray-800 cursor-not-allowed"
          } text-white font-semibold py-2 px-4 rounded-lg focus:outline-none`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllVideos;

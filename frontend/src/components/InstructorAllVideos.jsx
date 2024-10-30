import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../Pages/Footer";
import Navbar from "./Navbar";
import Sidebar from "../Pages/Sidebar";

const InstructorAllVideos = () => {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

    return (
        <div>
            <Navbar />
            <Sidebar/>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-semibold text-center text-gray-800">
            All Videos
          </h2>
          <div className="flex overflow-x-auto">
            {videos.map((video) => (
              <div key={video.videoId} className="flex-shrink-0 w-64 mr-4">
                <div className="mb-4 overflow-hidden bg-gray-100 rounded-lg shadow-xl">
                  <div className="h-36">
                    <video
                      controls
                      ref={videoRef}
                      className="w-full h-full"
                      controlsList="nodownload"
                    >
                      <source src={video.s3Url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="p-4">
                    {/* <h3 className="mb-2 text-lg font-semibold text-gray-800">
                      Video ID: {video.videoId}
                    </h3> */}
                    <p className="text-sm text-gray-700 truncate">
                      Description: {video.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
            </div>
            <Footer/>
      </div>
    );
};

export default InstructorAllVideos;

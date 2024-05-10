import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Sidebar from "../Pages/Sidebar";

// Progress Bar Component
const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-4 overflow-hidden rounded bg-slate-800">
      <div
        className="h-full transition-all bg-slate-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

const UploadVideo = () => {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([{ file: null, description: "" }]);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e, index) => {
    const selectedFile = e.target.files[0];
    const newVideos = [...videos];
    newVideos[index].file = selectedFile;
    setVideos(newVideos);
  };

  const handleDescriptionChange = (e, index) => {
    const newVideos = [...videos];
    newVideos[index].description = e.target.value;
    setVideos(newVideos);
  };

  const handleAddVideoInput = () => {
    setVideos([...videos, { file: null, description: "" }]);
  };

  const handleRemoveVideoInput = (index) => {
    const newVideos = [...videos];
    newVideos.splice(index, 1);
    setVideos(newVideos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (videos.length === 0 || videos.some((video) => video.file === null)) {
      setErrorMessage("Please select a file for each video.");
      return;
    }
    try {
      setUploading(true);
      const promises = videos.map(({ file, description }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("description", description);
        return axios.post(
          `http://localhost:8083/api/videos/upload/${courseId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setUploadProgress(progress);
            },
          }
        );
      });
      await Promise.all(promises);
      console.log("All videos uploaded successfully.");
      setUploading(false);
      setVideos([]);
      setErrorMessage("");
      setUploadProgress(0);
    } catch (error) {
      console.error("Error uploading videos:", error);
      setUploading(false);
      setErrorMessage("Failed to upload videos.");
      setUploadProgress(0);
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <Sidebar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-xl">
          <form
            onSubmit={handleSubmit}
            className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
          >
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">
              Upload Videos
            </h2>
            {videos.map((video, index) => (
              <div key={index} className="mb-4">
                <input
                  className="hidden"
                  id={`file-${index}`}
                  type="file"
                  onChange={(e) => handleFileChange(e, index)}
                />
                <label
                  className="flex items-center justify-between w-full px-4 py-3 text-white rounded cursor-pointer bg-slate-800 hover:bg-slate-800"
                  htmlFor={`file-${index}`}
                >
                  <span>Choose File</span>
                  <span className="text-sm font-normal">
                    {video.file ? video.file.name : "No file chosen"}
                  </span>
                </label>
                <textarea
                  value={video.description}
                  onChange={(e) => handleDescriptionChange(e, index)}
                  className="w-full h-32 p-2 mt-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-slate-800"
                  placeholder="Description"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveVideoInput(index)}
                    className="px-4 py-2 mt-3 ml-2 font-semibold transition-colors bg-white border rounded cursor-pointer hover:bg-slate-800 hover:text-white text-slate-800 border-slate-800 float-start"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddVideoInput}
                className="px-4 py-2 font-semibold text-white rounded cursor-pointer bg-slate-800 hover:bg-slate-800 float-end"
              >
                Add Video
              </button>
            </div>
            {errorMessage && (
              <p className="mt-4 text-sm text-red-500">{errorMessage}</p>
            )}
            <div className="mt-6">
              {uploading && (
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block w-5 h-5 mr-3 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" stroke-width="4" />
                    <path
                      d="M12 6v6l4 2"
                      stroke-width="3"
                      stroke-linecap="round"
                    />
                  </svg>
                  <span>Uploading... ({uploadProgress}%)</span>
                </div>
              )}
              {!uploading && (
                <button
                  className="w-full px-4 py-2 font-semibold text-white transition-colors duration-300 border border-transparent rounded cursor-pointer bg-slate-800 hover:bg-white hover:text-slate-800 hover:border-slate-800"
                  type="submit"
                  disabled={uploading}
                >
                  Upload Videos
                </button>
              )}
            </div>
            {uploading && <ProgressBar progress={uploadProgress} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;

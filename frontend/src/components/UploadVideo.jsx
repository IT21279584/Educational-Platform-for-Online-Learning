import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UploadVideo = () => {
  const { courseId } = useParams();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e, index) => {
    const selectedFile = e.target.files[0];
    const newFiles = [...files];
    newFiles[index] = selectedFile;
    setFiles(newFiles);
  };

  const handleAddFileInput = () => {
    setFiles([...files, null]);
  };

  const handleRemoveFileInput = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0 || files.some((file) => file === null)) {
      setErrorMessage("Please select a file for each video.");
      return;
    }
    try {
      setUploading(true);
      const promises = files.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        return axios.post(
          `http://localhost:8080/api/videos/upload/${courseId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      });
      await Promise.all(promises);
      console.log("All videos uploaded successfully.");
      setUploading(false);
      setFiles([]);
      setErrorMessage("");
    } catch (error) {
      console.error("Error uploading videos:", error);
      setUploading(false);
      setErrorMessage("Failed to upload videos.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Upload Videos
          </h2>
          {files.map((file, index) => (
            <div key={index} className="mb-4">
              <input
                className="hidden"
                id={`file-${index}`}
                type="file"
                onChange={(e) => handleFileChange(e, index)}
              />
              <label
                className="w-full flex items-center justify-between bg-blue-500 text-white py-3 px-4 rounded cursor-pointer hover:bg-blue-600"
                htmlFor={`file-${index}`}
              >
                <span>Choose File</span>
                <span className="text-sm font-normal">
                  {file ? file.name : "No file chosen"}
                </span>
              </label>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveFileInput(index)}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddFileInput}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
          >
            Add Videos
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
          )}
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-6 cursor-pointer"
            type="submit"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Videos"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;

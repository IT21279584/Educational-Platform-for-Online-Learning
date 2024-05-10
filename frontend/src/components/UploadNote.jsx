import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../Pages/Sidebar";

const UploadNote = () => {
  const { courseId } = useParams();
  const [noteEntries, setNoteEntries] = useState([{ title: "", file: null }]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleTitleChange = (e, index) => {
    const updatedEntries = [...noteEntries];
    updatedEntries[index].title = e.target.value;
    setNoteEntries(updatedEntries);
  };

  const handleFileChange = (e, index) => {
    const updatedEntries = [...noteEntries];
    updatedEntries[index].file = e.target.files[0];
    // Update file name in the entry
    updatedEntries[index].fileName = e.target.files[0].name;
    setNoteEntries(updatedEntries);
  };

  const handleAddEntry = () => {
    setNoteEntries([...noteEntries, { title: "", file: null }]);
  };

  const handleRemoveEntry = (index) => {
    const updatedEntries = noteEntries.filter((_, i) => i !== index);
    setNoteEntries(updatedEntries);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);

      const totalFiles = noteEntries.length;
      let uploadedFiles = 0;

      await Promise.all(
        noteEntries.map(({ title, file }) => {
          if (file) {
            const formData = new FormData();
            formData.append("title", title); // Include the title
            formData.append("file", file); // Append the file

            return axios
              .post(
                `http://localhost:8083/api/notes/upload/${courseId}`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                  onUploadProgress: (progressEvent) => {
                    const progressPercent = Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(progressPercent);
                  },
                }
              )
              .then(() => {
                uploadedFiles++;
                if (uploadedFiles === totalFiles) {
                  setUploading(false);
                  setProgress(0);
                  setNoteEntries([{ title: "", file: null }]);
                  alert("Notes uploaded successfully!");
                }
              });
          }
          return Promise.resolve();
        })
      );
    } catch (error) {
      console.error("Error:", error);
      setUploading(false);
      setProgress(0);
      alert("An error occurred while uploading the notes.");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-xl p-6 mx-auto text-black bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-3xl font-semibold text-center">
            Upload Notes
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {noteEntries.map((entry, index) => (
              <div key={index}>
                <div>
                  <label
                    htmlFor={`noteTitle${index}`}
                    className="block text-sm font-medium text-left"
                  >
                    Note Title
                  </label>
                  <input
                    type="text"
                    id={`noteTitle${index}`}
                    value={entry.title}
                    onChange={(e) => handleTitleChange(e, index)}
                    className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-slate-800"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`noteFile${index}`}
                    className="block mt-3 mb-4 text-sm font-medium text-left"
                  >
                    Upload Note File
                  </label>
                  <input
                    type="file"
                    id={`noteFile${index}`}
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, index)}
                    className="hidden"
                  />
                  <label
                    htmlFor={`noteFile${index}`}
                    className="flex items-center justify-between w-full px-4 py-3 text-white rounded cursor-pointer bg-slate-800 hover:bg-slate-800"
                  >
                    Choose File
                    <span>
                      {entry.fileName && (
                        <p className="m-2 text-sm text-white">
                          {entry.fileName}
                        </p>
                      )}
                    </span>
                  </label>
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveEntry(index)}
                    className="px-4 py-2 mt-3 ml-1 font-semibold transition-colors bg-white border rounded cursor-pointer hover:bg-slate-800 hover:text-white text-slate-800 border-slate-800 float-start"
                  >
                    Remove Note
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddEntry}
              className="px-4 py-2 font-semibold text-white rounded cursor-pointer bg-slate-800 hover:bg-slate-800 float-end"
            >
              Add Note
            </button>

            {uploading && (
              <div className="flex items-center justify-center mt-4">
                <svg
                  className="w-5 h-5 mr-3 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v4c3.627 0 8-4.373 8-8h-4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z"
                  ></path>
                </svg>
                <span>Uploading...</span>
              </div>
            )}

            {progress > 0 && (
              <div className="h-2 mt-8 overflow-hidden rounded-md  bg-slate-800">
                <div
                  className="h-full bg-slate-800"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            <button
              type="submit"
              className="w-full p-2 mt-4 font-bold text-white rounded-md bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Notes"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadNote;

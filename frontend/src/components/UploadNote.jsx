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
                `http://localhost:8080/api/notes/upload/${courseId}`,
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
        <div className="w-full max-w-xl mx-auto p-6 bg-white text-black rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-6 text-center">
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
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-slate-800"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`noteFile${index}`}
                    className="block text-sm mb-4 font-medium text-left mt-3"
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
                    className="w-full flex items-center justify-between bg-slate-800 text-white py-3 px-4 rounded cursor-pointer hover:bg-slate-800"
                  >
                    Choose File
                    <span>
                      {entry.fileName && (
                        <p className="text-sm text-white m-2">
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
                    className="mt-3 bg-white hover:bg-slate-800 hover:text-white text-slate-800 font-semibold py-2 px-4 rounded cursor-pointer ml-1 border border-slate-800 transition-colors float-start"
                  >
                    Remove Note
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddEntry}
              className="bg-slate-800 hover:bg-slate-800 text-white font-semibold py-2 px-4 rounded cursor-pointer float-end"
            >
              Add Note
            </button>

            {uploading && (
              <div className="mt-4 flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3"
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
              <div className=" bg-slate-800 h-2 rounded-md overflow-hidden mt-8">
                <div
                  className="h-full bg-slate-800"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            <button
              type="submit"
              className="mt-4 p-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-full"
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

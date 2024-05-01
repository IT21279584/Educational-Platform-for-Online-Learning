import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBook,
  FiFilePlus,
  FiEdit,
  FiMenu,
  FiFile,
  FiVideo,
  FiX,
} from "react-icons/fi"; // Import icons from react-icons

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const unhideSidebar = () => {
    setIsSidebarOpen(true);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-50 ${isSidebarOpen ? "w-64" : "w-0"}`}
        style={{
          transition: "width 2s ease", // Slow transition effect
          overflowX: "hidden", // Hide content when sidebar is closed
        }}
      >
        {isSidebarOpen ? (
          <div
            className={`fixed top-0 left-0 bg-gray-800 h-full w-64 px-4 py-6 flex flex-col z-50`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-white text-2xl font-semibold">Dashboard</h1>
              <button
                className="text-white focus:outline-none"
                onClick={toggleSidebar}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            {/* Sidebar Menu */}
            <nav className="space-y-2">
              <div>
                <h2 className="text-white text-lg font-semibold mb-8">
                  Instructor
                </h2>
                <ul className="mt-2 space-y-1">
                  <li>
                    <Link
                      to="/courses"
                      className="text-gray-300 mb-5 hover:bg-gray-700 hover:text-white flex items-center px-4 py-2 block rounded transition duration-150"
                    >
                      <FiBook className="mr-2" /> My Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/create-course"
                      className="text-gray-300 mb-5 hover:bg-gray-700 hover:text-white flex items-center px-4 py-2 block rounded transition duration-150"
                    >
                      <FiFilePlus className="mr-2" /> Create Course
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/upload-lecture-notes"
                      className="text-gray-300 mb-5 hover:bg-gray-700 hover:text-white flex items-center px-4 py-2 block rounded transition duration-150"
                    >
                      <FiFile className="mr-2" /> Upload Lecture Notes
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/upload-videos"
                      className="text-gray-300 mb-5 hover:bg-gray-700 hover:text-white flex items-center px-4 py-2 block rounded transition duration-150"
                    >
                      <FiVideo className="mr-2" /> Upload Videos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/create-quiz"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white flex items-center px-4 py-2 block rounded transition duration-150"
                    >
                      <FiEdit className="mr-2" /> Create Quiz
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        ) : (
          <button
            className="fixed top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded-lg z-50"
            onClick={unhideSidebar}
          >
            <FiMenu className="h-6 w-6" />
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;

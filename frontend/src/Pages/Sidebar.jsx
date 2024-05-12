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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-50 ${isSidebarOpen ? "w-64" : "w-0"}`}
        style={{
          transition: "width 0.3s ease", // Adjust transition duration as needed
          overflowX: "hidden", // Hide content when sidebar is closed
        }}
      >
        <div
          className={`fixed top-0 left-0 bg-gray-800 h-full w-64 px-4 py-6 flex flex-col z-50 ${
            isSidebarOpen ? "" : "hidden" // Hide the sidebar when closed
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
            <button
              className="text-white focus:outline-none"
              onClick={toggleSidebar}
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          {/* Sidebar Menu */}
          <nav className="space-y-2">
            <div>
              <h2 className="mb-8 text-lg font-semibold text-white">
                Instructor
              </h2>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link
                    to="/api/course/all"
                    className="flex items-center block px-4 py-2 mb-5 text-gray-300 transition duration-150 rounded hover:bg-gray-700 hover:text-white"
                    onClick={closeSidebar} // Close the sidebar when a link is clicked
                  >
                    <FiBook className="mr-2" /> My Courses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/api/course/add"
                    className="flex items-center block px-4 py-2 mb-5 text-gray-300 transition duration-150 rounded hover:bg-gray-700 hover:text-white"
                    onClick={closeSidebar}
                  >
                    <FiFilePlus className="mr-2" /> Create Course
                  </Link>
                </li>
                <li>
                  <Link
                    to="/api/course/note/all"
                    className="flex items-center block px-4 py-2 mb-5 text-gray-300 transition duration-150 rounded hover:bg-gray-700 hover:text-white"
                    onClick={closeSidebar}
                  >
                    <FiFile className="mr-2" /> Upload Lecture Notes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/api/course/video/all"
                    className="flex items-center block px-4 py-2 mb-5 text-gray-300 transition duration-150 rounded hover:bg-gray-700 hover:text-white"
                    onClick={closeSidebar}
                  >
                    <FiVideo className="mr-2" /> Upload Videos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/api/course/quiz/all"
                    className="flex items-center block px-4 py-2 text-gray-300 transition duration-150 rounded hover:bg-gray-700 hover:text-white"
                    onClick={closeSidebar}
                  >
                    <FiEdit className="mr-2" /> Create Quiz
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      {/* Always show the toggle button */}
      <button
        className={`fixed z-50 px-4 py-2 text-white bg-gray-800 rounded-lg top-4 left-4 ${
          isSidebarOpen ? "hidden" : "" // Hide the button when sidebar is open
        }`}
        onClick={toggleSidebar}
      >
        <FiMenu className="w-6 h-6" />
      </button>
    </>
  );
};

export default Sidebar;

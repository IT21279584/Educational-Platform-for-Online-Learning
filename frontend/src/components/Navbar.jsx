import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Decode JWT token to get user's role and username
  const token = localStorage.getItem("token");
  let isInstructor = false;
  let username = "";
  if (token) {
    const decodedToken = jwtDecode(token);
    const roles = Array.isArray(decodedToken.role)
      ? decodedToken.role
      : [decodedToken.role];
    isInstructor = roles.includes("ROLE_INSTRUCTOR");
    username = decodedToken.username;
  }

  const handleLogout = () => {
    // Clear local storage and redirect to login page
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    // Redirect to login page
    window.location.href = "/";
  };

  return (
    <nav className="bg-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/">
              <img className="block w-auto h-8" src={Logo} alt="Workflow" />
            </Link>
            <span className="ml-2 text-xl font-bold text-gray-900">
              EduNest
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <Link
              to="/api/video/all"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Courses
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Contact
            </Link>
            <Link
              to="/library"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Library
            </Link>
            <Link
              to="/books"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Books
            </Link>
            {isLoggedIn ? (
              // Show logout button if user is logged in
              <>
                {isInstructor && (
                  <Link
                    to="/api/course/all"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  to="/api/user"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              // Show login and register buttons if user is not logged in
              <>
                <Link
                  to="/api/login"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/api/register"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

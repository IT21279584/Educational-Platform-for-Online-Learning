import Footer from "../Pages/Footer";
import Sidebar from "../Pages/Sidebar";
import Navbar from "./Navbar";

const InstructorDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <div className="container px-4 py-8 mx-auto">
            <h1 className="mb-8 text-4xl font-bold text-gray-800">
              Instructor Dashboard
            </h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  Course Management
                </h2>
                <ul className="divide-y divide-gray-200">
                  <li className="py-2">Course 1</li>
                  <li className="py-2">Course 2</li>
                  <li className="py-2">Course 3</li>
                  {/* Add more courses dynamically */}
                </ul>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">
                  Create New Course
                </h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="courseName" className="block font-medium">
                      Course Name
                    </label>
                    <input
                      type="text"
                      id="courseName"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block font-medium">
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows="4"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                      Create Course
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InstructorDashboard;

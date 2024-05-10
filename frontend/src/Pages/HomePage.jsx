
import Navbar from "../components/Navbar";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <header className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              Learn new skills online
            </h1>
            <p className="mt-4 text-lg leading-6 text-gray-500">
              Choose from thousands of courses taught by industry experts.
            </p>
          </div>
        </div>
      </header>

      {/* Course Categories */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Web Development */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  {/* Heroicon name: globe-alt */}
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h18M12 8v.01M7 3v.01M17 3v.01M7 12h.01M7 17h.01M12 17h.01M17 17h.01M12 12h.01M12 7h.01"></path>
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Web Development
                  </dt>
                  <dd className="mt-2 text-base leading-6 text-gray-500">
                    Learn front-end and back-end development skills.
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Data Science */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  {/* Heroicon name: chart-bar */}
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h18M12 8v.01M7 3v.01M17 3v.01M7 12h.01M7 17h.01M12 17h.01M17 17h.01M12 12h.01M12 7h.01"></path>
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Data Science
                  </dt>
                  <dd className="mt-2 text-base leading-6 text-gray-500">
                    Explore data analysis and machine learning.
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Health & Social Science */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  {/* Heroicon name: user-group */}
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h18M12 8v.01M7 3v.01M17 3v.01M7 12h.01M7 17h.01M12 17h.01M17 17h.01M12 12h.01M12 7h.01"></path>
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Health & Social Science
                  </dt>
                  <dd className="mt-2 text-base leading-6 text-gray-500">
                    Learn about health studies and social sciences.
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Language Learning */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  {/* Heroicon name: globe-alt */}
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h18M12 8v.01M7 3v.01M17 3v.01M7 12h.01M7 17h.01M12 17h.01M17 17h.01M12 12h.01M12 7h.01"></path>
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Language Learning
                  </dt>
                  <dd className="mt-2 text-base leading-6 text-gray-500">
                    Master a new language with our language courses.
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Engineering */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  {/* Heroicon name: cogs */}
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h18M12 8v.01M7 3v.01M17 3v.01M7 12h.01M7 17h.01M12 17h.01M17 17h.01M12 12h.01M12 7h.01"></path>
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Engineering
                  </dt>
                  <dd className="mt-2 text-base leading-6 text-gray-500">
                    Study various engineering disciplines.
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* Physical Science */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  {/* Heroicon name: collection */}
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h18M12 8v.01M7 3v.01M17 3v.01M7 12h.01M7 17h.01M12 17h.01M17 17h.01M12 12h.01M12 7h.01"></path>
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-lg leading-6 font-medium text-gray-900">
                    Physical Science
                  </dt>
                  <dd className="mt-2 text-base leading-6 text-gray-500">
                    Explore physics, chemistry, and more.
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses Section */}
      <section className="bg-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              Featured Courses
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-500">
              Check out our handpicked selection of courses.
            </p>
          </div>
          {/* Add featured courses here */}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-500">
              Read testimonials from our satisfied students.
            </p>
          </div>
          {/* Add testimonials here */}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-300">
              Join thousands of learners today!
            </p>
            <div className="mt-10">
              <a
                href="#"
                className="inline-block bg-indigo-500 py-3 px-6 rounded-lg text-white font-semibold hover:bg-indigo-600"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;

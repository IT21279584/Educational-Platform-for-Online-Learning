// Import React and Tailwind CSS
import React from "react";
import aboutImg from "../../assests/images/about-us.png";
import CountUp from "react-countup";

const AboutUs = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* About Image */}
          <div>
            <img src={aboutImg} alt="About Us" className="w-full rounded-lg shadow-lg" />
          </div>

          {/* About Content */}
          <div>
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700 mb-8">
              Welcome to Learners, where education meets innovation. Our platform is designed to provide accessible, high-quality online learning experiences that empower individuals to achieve their academic and professional goals.
            </p>

            {/* Counters */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <CountUp start={0} end={25} duration={2} suffix="K" className="text-4xl font-bold text-blue-600" />
                <p className="text-gray-600">Completed Projects</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <CountUp start={0} end={12} duration={2} suffix="M" className="text-4xl font-bold text-blue-600" />
                <p className="text-gray-600">Patients Around the World</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <CountUp start={0} end={95} duration={2} suffix="M" className="text-4xl font-bold text-blue-600" />
                <p className="text-gray-600">Ideas Raised Funds</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <CountUp start={0} end={5} duration={2} suffix="K" className="text-4xl font-bold text-blue-600" />
                <p className="text-gray-600">Categories Served</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img from "../../assets/images/testimonial01.jpg";

const Testimonials = () => {
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    vertical: false, // Set vertical to false for horizontal sliding
  };

  return (
    <section className="py-16">
      <div className="bg-slate-200">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full lg:w-2/5">
              {" "}
              {/* Adjusted width to lg:w-2/5 */}
              <img src={img} alt="Testimonial" className="w-full rounded-lg" />
            </div>
            <div className="w-full mt-6 lg:w-3/5 lg:pl-10 lg:mt-0">
              {" "}
              {/* Adjusted width to lg:w-3/5 */}
              <h2 className="mb-6 text-3xl font-bold lg:text-4xl">
                Our Students Voice
              </h2>
              <Slider {...settings}>
                <div>
                  <div className="p-6 mb-6 bg-white rounded-lg ">
                    <h6 className="mb-3 text-xl font-semibold">
                      Boosted My Career!
                    </h6>
                    <p className="text-gray-700">
                      The certifications I earned through Learners have opened
                      up so many doors in my career. Employers recognize the
                      quality and value of these courses, and I couldn't be
                      happier with my decision to learn here!
                    </p>
                    <div className="mt-4">
                      <h6 className="font-semibold">Thushara Sampath</h6>
                      <p>Colombo 07, Sri Lanka</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="p-6 mb-6 bg-white rounded-lg">
                    <h6 className="mb-3 text-xl font-semibold">
                      Excellent course of materials
                    </h6>
                    <p className="text-gray-700">
                      Excellent course of materials! The content was
                      comprehensive, up-to-date, and presented in an engaging
                      way. I appreciated the clear explanations and practical
                      examples that helped me grasp complex concepts easily.
                    </p>
                    <div className="mt-4">
                      <h6 className="font-semibold">Savindu Nawarathne</h6>
                      <p>Nuwara Eliya, Sri Lanka</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="p-6 mb-6 bg-white rounded-lg">
                    <h6 className="mb-3 text-xl font-semibold">
                      Transformative Experience
                    </h6>
                    <p className="text-gray-700">
                      Thanks to Learners, I was able to quickly master new
                      skills and transition to a new career path. The
                      interactive lessons and expert instructors made learning
                      both engaging and rewarding.
                    </p>
                    <div className="mt-4">
                      <h6 className="font-semibold">Pasindu Sandeep</h6>
                      <p>Kandy, Sri Lanka</p>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

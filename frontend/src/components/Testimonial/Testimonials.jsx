import React from "react";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";

import img from "../../assests/images/testimonial01.jpg";

const Testimonials = () => {
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
  };

  return (
    <section className="py-16 ">
      <div className="bg-blue-200">

      <br />
      <Container>
        <Row>
          <Col lg="10" md="12" className="mx-auto">
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full lg:w-1/2">
                <img src={img} alt="Testimonial" className="w-full rounded-lg " />
              </div>
              <div className="w-full lg:w-1/2 lg:pl-10 mt-6 lg:mt-0">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Students Voice</h2>
                <Slider {...settings}>
                  <div>
                    <div className="bg-white rounded-lg  p-6 mb-6">
                      <h6 className="text-xl font-semibold mb-3">
                        Boosted My Career!
                      </h6>
                      <p className="text-gray-700">
                        The certifications I earned through Learners have opened up so many doors in my career. Employers recognize the quality and value of these courses, and I couldn't be happier with my decision to learn here!
                      </p>
                      <div className="mt-4">
                        <h6 className="font-semibold">Thushara Sampath</h6>
                        <p>Colombo 07, Sri Lanka</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-white rounded-lg  p-6 mb-6">
                      <h6 className="text-xl font-semibold mb-3">
                        Excellent course of materials
                      </h6>
                      <p className="text-gray-700">
                        Excellent course of materials! The content was comprehensive, up-to-date, and presented in an engaging way. I appreciated the clear explanations and practical examples that helped me grasp complex concepts easily.
                      </p>
                      <div className="mt-4">
                        <h6 className="font-semibold">Savindu Nawarathne</h6>
                        <p>Nuwara Eliya, Sri Lanka</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="bg-white rounded-lg  p-6 mb-6">
                      <h6 className="text-xl font-semibold mb-3">
                        Transformative Experience
                      </h6>
                      <p className="text-gray-700">
                        Thanks to Learners, I was able to quickly master new skills and transition to a new career path. The interactive lessons and expert instructors made learning both engaging and rewarding.
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
          </Col>
        </Row>
      </Container>
      <br />
      </div>
    </section>
  );
};

export default Testimonials;

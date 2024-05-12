import React from "react";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assests/images/hero-img1.jpg";

const HeroSection = () => {
  return (
    <section className="py-12 bg-gray-100">
      <Container>
        <Row className="items-center">
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="mb-4 text-3xl md:text-4xl font-bold text-gray-800">
                Anytime, Anywhere Learning
              </h2>
              <p className="mb-5 text-lg text-gray-700">
                Start your journey towards a new career with an exclusive Professional Certificate from Learners.
              </p>
              <div>
                <button className=" bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                  Explore Careers
                </button>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <img src={heroImg} alt="" className="w-full rounded-lg shadow-lg" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;

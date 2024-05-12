import React from "react";
import { Container, Row, Col } from "reactstrap";

const Newsletter = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white ">
      <Container className="px-4 md:px-0">
        <Row className="items-center">
          <Col lg="12" className="text-center">
            <h2 className="mb-6 text-3xl md:text-4xl font-bold">Subscribe to Our Newsletter</h2>
            <div className="flex flex-col  items-center justify-center gap-2">
              <input type="email" placeholder="Enter your email" className="py-3 px-24 mb-4 md:mb-0 w-full md:w-auto rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button className=" bg-white text-indigo-600 py-2 px-3 rounded-md border-2 hover:bg-gray-800 hover:text-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
                Subscribe Now
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;


import { Container, Row, Col } from "reactstrap";

const Newsletter = () => {
  return (
    <section className="py-12 text-white bg-gradient-to-r from-slate-500 to-slate-600 ">
      <Container className="px-4 md:px-0">
        <Row className="items-center">
          <Col lg="12" className="text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Subscribe to Our Newsletter</h2>
            <div className="flex flex-col items-center justify-center gap-2">
              <input type="email" placeholder="Enter your email" className="w-full px-24 py-3 mb-4 text-gray-800 bg-white rounded-md md:mb-0 md:w-auto focus:outline-none focus:ring-2 focus:ring-slate-500" />
              <button className="px-3 py-2 transition duration-300 ease-in-out transform bg-white border-2 rounded-md text-slate-600 hover:bg-gray-800 hover:text-gray-700 hover:scale-105">
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

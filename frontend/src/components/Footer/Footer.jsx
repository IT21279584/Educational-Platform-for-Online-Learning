import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./footer.css";

const footerQuickLinks = [
  {
    display: "Home",
    onClick: () => window.location.href = "#",
  },
  {
    display: "About Us",
    onClick: () => window.location.href = "#",
  },
  {
    display: "Courses",
    onClick: () => window.location.href = "#",
  },
  {
    display: "Blog",
    onClick: () => window.location.href = "#",
  },
];

const footerInfoLinks = [
  {
    display: "Privacy Policy",
    onClick: () => window.location.href = "#",
  },
  {
    display: "Membership",
    onClick: () => window.location.href = "#",
  },
  {
    display: "Purchases Guide",
    onClick: () => window.location.href = "#",
  },
  {
    display: "Terms of Service",
    onClick: () => window.location.href = "#",
  },
];

const Footer = () => {
  return (
    <footer className="py-24">
      <Container>
        <Row>
          <Col lg="3" md="6" className="mb-4">
            <h2 className="d-flex align-items-center gap-1">
              <i className="ri-pantone-line  text-blue-600"></i> Learners.
            </h2>
            <div className="follows">
              <p className="mb-0">Follow us on social media</p>
              <span>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="ri-facebook-line"></i>
                </a>
              </span>
              <span>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="ri-instagram-line"></i>
                </a>
              </span>
              <span>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="ri-linkedin-line"></i>
                </a>
              </span>
              <span>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="ri-twitter-line"></i>
                </a>
              </span>
            </div>
          </Col>

          <Col lg="3" md="6" className="mb-4">
            <h6 className="fw-bold">Explore</h6>
            <ul className="link__list ">
              {footerQuickLinks.map((item, index) => (
                <li key={index} className="border-0 ps-0 link__item hover:text-blue-500 hover:scale-105 duration-300">
                  <button onClick={item.onClick} className="footer__button">{item.display}</button>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg="3" md="6" className="mb-4">
            <h6 className="fw-bold">Information</h6>
            <ul className="">
              {footerInfoLinks.map((item, index) => (
                <li key={index} className="border-0 ps-0 link__item  hover:text-blue-500 hover:scale-105 duration-300">
                  <button onClick={item.onClick} className="footer__button">{item.display}</button>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg="3" md="6">
            <h6 className="fw-bold">Get in Touch</h6>
            <p>Address: Colombo 07, Sri Lanka</p>
            <p>Phone: 0717159789</p>
            <p>Email: learnersabc@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Container, Row, Col } from "reactstrap";
import { RiDraftLine, RiDiscussLine, RiContactsBookLine } from "react-icons/ri";

const FeatureData = [
  {
    title: "Quick Learning",
    desc: "Accelerate your education with concise and efficient lessons designed for optimal comprehension and skill acquisition.",
    icon: <RiDraftLine />,
  },
  {
    title: "All Time Support",
    desc: "Access dedicated, around-the-clock support to guide you through your learning journey and answer any questions.",
    icon: <RiDiscussLine />,
  },
  {
    title: "Certification",
    desc: "Earn industry-recognized certifications that validate your expertise and enhance your professional profile.",
    icon: <RiContactsBookLine />,
  },
];

const Features = () => {
  return (
    <section className="py-5">
      <Container>
        <Row>
          {FeatureData.map((item, index) => (
            <Col lg="4" md="6" key={index}>
              <div className="single-feature text-center px-4 py-4">
                <div className="mb-3">{item.icon}</div>
                <h6 className="mb-2">{item.title}</h6>
                <p>{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;

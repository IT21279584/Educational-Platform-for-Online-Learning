
import { Container, Row, Col } from "reactstrap";
import "../Feature-section/features.css";

const FeatureData = [
  {
    title: "Quick Learning",
    desc: "Accelerate your education with concise and efficient lessons designed for optimal comprehension and skill acquisition.",
    icon: "ri-draft-line",
  },

  {
    title: "All Time Support",
    desc: "Access dedicated, around-the-clock support to guide you through your learning journey and answer any questions.",
    icon: "ri-discuss-line",
  },

  {
    title: "Certification",
    desc: "Earn industry-recognized certifications that validate your expertise and enhance your professional profile.",
    icon: "ri-contacts-book-line",
  },
];

const Features = () => {
  return (
    <section>
      <Container>
        <Row>
          {FeatureData.map((item, index) => (
            <Col lg="4" md="6" key={index}>
              <div className="px-4 text-center single__feature">
                <h2 className="mb-3">
                  <i className={item.icon}></i>
                </h2>
                <h6>{item.title}</h6>
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

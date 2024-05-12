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
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          {FeatureData.map((item, index) => (
            <div
              className="w-full px-4 py-4 text-center sm:w-1/2 md:w-1/3 single-feature"
              key={index}
            >
              <div className="mb-3">{item.icon}</div>
              <h6 className="mb-2">{item.title}</h6>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

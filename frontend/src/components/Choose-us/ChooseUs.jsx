import React, { useState } from "react";
import ReactPlayer from "react-player";
import chooseImg from "../../assests/images/why-choose-us.png";

const ChooseUs = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-700">
              At Learners, we prioritize your success and growth by offering a learning experience that is unmatched. Our platform combines expertly crafted courses with cutting-edge technology to deliver engaging and interactive lessons that cater to your unique learning style. We partner with industry experts and top educators to bring you high-quality content that is up-to-date and relevant. Plus, our flexible scheduling allows you to learn at your own pace, fitting seamlessly into your busy life. Join our vibrant community of learners and benefit from our dedicated support team, ready to assist you every step of the way. Choose Learners for a transformative educational journey that empowers you to reach your full potential.
            </p>
          </div>

          {/* Image or Video */}
          <div>
            {showVideo ? (
              <ReactPlayer
                url="https://youtu.be/l5V2BaoYnWo?si=56mrmZ9r72nqm5VH"
                controls
                width="100%"
                height="350px"
              />
            ) : (
              <img src={chooseImg} alt="Why Choose Us" className="w-full rounded-lg shadow-lg" />
            )}

           
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;

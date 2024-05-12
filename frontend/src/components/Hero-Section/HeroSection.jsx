import heroImg from "../../assets/images/hero-img1.jpg";

const HeroSection = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="w-full md:w-1/2">
            <div className="hero__content">
              <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
                Anytime, Anywhere Learning
              </h2>
              <p className="mb-5 text-lg text-gray-700">
                Start your journey towards a new career with an exclusive
                Professional Certificate from Learners.
              </p>
              <div>
                <button className="px-6 py-3 text-white transition duration-300 ease-in-out transform rounded-md shadow-md bg-slate-800 hover:bg-slate-600 hover:scale-105">
                  Explore Careers
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={heroImg}
              alt=""
              className="w-full rounded-lg shadow-lg md:float-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

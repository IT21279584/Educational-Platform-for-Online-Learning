import  { Fragment } from "react";
import Header from "../components/Navbar.jsx";
import HeroSection from "../components/Hero-Section/HeroSection";

import AboutUs from "../components/About-us/AboutUs";
import Courses from "../components/Courses-section/Courses";
import ChooseUs from "../components/Choose-us/ChooseUs";
import Features from "../components/Feature-section/Features";

import Testimonials from "../components/Testimonial/Testimonials";

import Newsletter from "../components/Newsletter/Newsletter";
import Footer from "../Pages/Footer.jsx";

const Home = () => {
  return (
    <Fragment>
      <Header />
      <HeroSection />
      <AboutUs />
      <Courses />
      <ChooseUs />
      <Features />     
      <Testimonials />
      <Newsletter />
      <Footer />
    </Fragment>
  );
};

export default Home;

import React from "react";
import banner from '../../../public/hero.png'
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-screen md:h-[76vh] flex flex-col md:flex-row items-center  justify-center">
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center  justify-center lg:items-start">
        <h1 className="text-2xl lg:text-5xl font-semibold text-yellow-100 text-center lg:text-left">
          {" "}
          Hello, welcome here to learn something new everyday!!!{" "}
        </h1>{" "}
        <p className="text-xl mt-4 text-zinc-300 text-center lg:text-left">
          Books are gateways to endless knowledge, offering insights into
          diverse subjects, cultures, and perspectives. Whether it’s a
          thought-provoking novel, an insightful self-help guide, or an
          educational text, reading daily broadens horizons and deepens
          understanding.
        </p>
        <div className="mt-8">
          <Link to='/all-books' className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full">
            Discover Books
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center"> 
      <img className="" src={banner} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;

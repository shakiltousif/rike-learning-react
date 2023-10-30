import about_skills from "../../../../assets/about/about_skills.jpg";
import React from 'react';
import { Link } from 'react-router-dom';

const SkillSection = (props) => {
  const mainUrl = "https://api.usrike-learning.com/public/";

  return (
    <div className="bg-white px-8 py-12 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
        <div className="p-5 sm:p-3">
          {/* <img src={mainUrl + props.logo} alt={props.title} className="w-full h-auto max-w-xs mx-auto" /> */}
          <img
            src={about_skills}
            alt={props.title}
            className="w-full h-auto max-w-[500px] mx-auto"
          />
        </div>
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            {props.title}
          </h2>
          <p className="text-lg sm:text-2xl text-gray-700 mb-12 max-w-[700px]">
            {props.subtitle}
          </p>
          <Link to="/coming_soon"
            type="button"
            className="text-white bg-[#442E9E] text-bold text-xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
          >
            {props.button}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SkillSection;

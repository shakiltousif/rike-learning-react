import React from "react";
import { Carousel } from "@material-tailwind/react";

const GellarySection = (props) => {
  const mainUrl = "https://api.usrike-learning.com/public/";

  return (
    <div className="bg-white px-8 py-12 lg:py-32 about_top_area grid grid-cols-1 lg:grid-cols-2">
      <div className="about_title_area flex flex-col mt-12 lg:mt-0 xl:mt-12 pr-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-700 mb-8">
          {props.title}
        </h2>
        <p className=" text-md lg:text-xl font-semibold text-gray-700 mb-12">
          {props.subtitle}
        </p>
      </div>
      <div className="h-[400px]">
        <Carousel className="rounded-xl">
          <img
            src="https://primefasteners.co.in/wp-content/uploads/2022/06/adobestock_433077483-lg.jpeg"
            alt="image 1"
            className="h-full w-full"
          />
          <img
            src="https://media.smallbiztrends.com/2019/04/About-Us.png"
            alt="image 2"
            className="h-full w-full"
          />
          <img
            src="https://www.proofhub.com/articles/wp-content/uploads/2019/01/Teamwork-Skills-in-the-Workplace.jpeg"
            alt="image 3"
            className="h-full w-full"
          />
        </Carousel>
      </div>
    </div>
  );
};

export default GellarySection;

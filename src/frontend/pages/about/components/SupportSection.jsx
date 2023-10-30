import React from 'react';
import { Link } from 'react-router-dom';

const SupportSection = (props) => {

    const mainUrl = "https://api.usrike-learning.com/public/";



    return (
        <div className="bg-white px-8 py-12 lg:py-40 border-t-gray-200 border-t-4 about_course_ins">
            <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 text-center mb-5">
                    {props.title}
                </h2>
                <p className="text-md lg:text-lg font-bold text-gray-600 text-center mb-12">
                    {props.subtitle}
                </p>
            </div>
            <div className="px-4 mt-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 justify-center items-center gap-4">
                {props.supports.map((support) => (
                    <div className=" single_about_card p-6 border border-gray-200 rounded-lg bg-[#fff] shadow-[#DCDFEA]" key={support.id}>
                        <img
                            src={mainUrl + support.logo}
                            alt={support.title}
                            className="w-[80px] h-[80px] mb-2 p-5 bg-[#f5f5f5] rounded-full shadow"
                        />
                        <Link to="/coming_soon">
                            <h5 className="mb-2 text-3xl font-semibold tracking-tight text-gray-900">{support.title}</h5>
                        </Link>
                        <p className="mb-3 font-normal text-lg text-gray-600">{support.subtitle}</p>
                        <Link to="/coming_soon" className="text-white rounded-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 p-2 inline-flex text-lg font-bold items-center  hover:underline">
                            {support.button_name}
                            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                        </Link>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default SupportSection;
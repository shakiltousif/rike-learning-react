import React from 'react';

const TimelineSection = (props) => {

    const mainUrl = "https://api.usrike-learning.com/public/";


    return (
        <div className="bg-[#112263] px-8 py-12 lg:py-32">
            <div>
                <h2 className="text-5xl font-bold text-gray-200 text-center mb-8">
                    {props.title}
                </h2>
                <p className="text-md lg:text-xl text-gray-300 text-center mb-12 max-w-[800px] mx-auto">
                    {props.subtitle}
                </p>
            </div>
            <div className="px-2 mt-4 lg:px-8">
                <ol className="sm:flex">
                    {props.histories.map((history) => (
                        <li className="relative mb-6 sm:mb-0 " key={history.id}>
                            <div className="flex items-center">
                                <div className="z-10 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full ring-0 ring-white sm:ring-8 shrink-0">
                                    {/* <svg aria-hidden="true" className="w-6 h-6 text-blue-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                                    </svg> */}
                                    <time className="text-sm font-semibold text-black-600">{history.year}</time>
                                </div>
                                <div className="hidden sm:flex w-full bg-gray-200 h-0.5"></div>
                            </div>
                            <div className="mt-5 min-h-[220px] sm:pr-8 shadow p-5 lg:p-6 mx-1 bg-white rounded-md">
                                {/* <time className="text-lg font-semibold text-gray-600">{history.year}</time> */}
                                <p className='w-14 h-14 flex justify-center items-center rounded-full bg-[#112263]'><svg className="w-8 h-8 " xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="#fff" d="M94.12 315.1c0 25.9-21.16 47.06-47.06 47.06S0 341 0 315.1c0-25.9 21.16-47.06 47.06-47.06h47.06v47.06zm23.72 0c0-25.9 21.16-47.06 47.06-47.06s47.06 21.16 47.06 47.06v117.84c0 25.9-21.16 47.06-47.06 47.06s-47.06-21.16-47.06-47.06V315.1zm47.06-188.98c-25.9 0-47.06-21.16-47.06-47.06S139 32 164.9 32s47.06 21.16 47.06 47.06v47.06H164.9zm0 23.72c25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06H47.06C21.16 243.96 0 222.8 0 196.9s21.16-47.06 47.06-47.06H164.9zm188.98 47.06c0-25.9 21.16-47.06 47.06-47.06 25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06h-47.06V196.9zm-23.72 0c0 25.9-21.16 47.06-47.06 47.06-25.9 0-47.06-21.16-47.06-47.06V79.06c0-25.9 21.16-47.06 47.06-47.06 25.9 0 47.06 21.16 47.06 47.06V196.9zM283.1 385.88c25.9 0 47.06 21.16 47.06 47.06 0 25.9-21.16 47.06-47.06 47.06-25.9 0-47.06-21.16-47.06-47.06v-47.06h47.06zm0-23.72c-25.9 0-47.06-21.16-47.06-47.06 0-25.9 21.16-47.06 47.06-47.06h117.84c25.9 0 47.06 21.16 47.06 47.06 0 25.9-21.16 47.06-47.06 47.06H283.1z" /></svg></p>
                                <h3 className="block my-2 text-2xl font-bold leading-none text-black">{history.title}</h3>
                                <p className="text-lg font-normal font-bold text-black">{history.subtitle}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default TimelineSection;
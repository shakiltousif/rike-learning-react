import React from 'react';

const HeroSection = () => {
    return (
        <div className="bg-blue-500 py-16 sm:py-24 lg:py-32">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 text-center lg:text-left lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">Welcome to our Website</h2>
                        <p className="text-white text-lg sm:text-xl lg:text-2xl mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis est eget risus luctus, sed
                            fringilla purus tristique. Nulla facilisi. Cras tempus, mauris in viverra feugiat, sem odio
                            convallis felis, at scelerisque orci ante vel risus.
                        </p>
                        <button className="px-6 py-3 bg-white text-blue-500 font-medium rounded-lg hover:bg-blue-600">
                            Learn More
                        </button>
                    </div>
                    <div className="w-full lg:h-full h-96">
                        <iframe
                            title="Video"
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;



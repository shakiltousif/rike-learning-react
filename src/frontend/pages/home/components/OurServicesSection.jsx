import HeaderImage from "../../../../assets/home/service_section.png";

const OurServices = () => {
  return (
    <section className="ourservices-section text-center px-8 py-20 lg:py-30">
      <div className="container ourservice-main mx-auto px-4 pb-10">
        <div className="flex justify-center items-center">
          <img src={HeaderImage} className="w-8/12 lg:w-2/12 h-70" alt="" />
        </div>
        <div className="section-headpart text-center mb-8">
          <h1 className="pt-2 section-header text-5xl text-black font-bold uppercase">
            Our Services
          </h1>
          <p className="pb-10 max-w-[900px] mx-auto section-des text-md lg:text-xl text-black mt-3 px-2 lg:px-10 font-semibold uppercase">
            Rike-Learning E-LEARNING PLATFORM GIVES YOU A CORPORATE
            ENVIRONMENT AND HELPFULL DIGITAL MARKETING COMMUNITY
          </p>
        </div>
        <div className="service-main  grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="service-card h-[280px] flex items-center flex-col gap-4 rounded-tl-2xl rounded-br-2xl shadow-lg p-6 bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900">
            <div className=" border-[5px] flex items-center justify-center h-20 w-20  rounded-full">
              <svg
                className="h-10 w-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 496 512"
              >
                <path
                  fill="#fff"
                  d="M88 216c81.7 10.2 273.7 102.3 304 232H0c99.5-8.1 184.5-137 88-232zm32-152c32.3 35.6 47.7 83.9 46.4 133.6C249.3 231.3 373.7 321.3 400 448h96C455.3 231.9 222.8 79.5 120 64z"
                />
              </svg>
            </div>
            <div className="service-content">
              <h3 className="text-3xl font-bold mb-2 text-white">
                6+ courses
              </h3>
              <p className="font-semibold font-Roboto text-gray-200">
                Explore diverse subjects with our 12+ courses. From art to
                science, enrich your knowledge and fuel your passion.
              </p>
            </div>
          </div>
          <div className="service-card h-[280px] flex items-center flex-col gap-4 rounded-tl-2xl rounded-br-2xl shadow-lg p-6 bg-gradient-to-r to-[#070c44] from-[#422e9d]">
            <div className="border-[5px] flex items-center justify-center h-20 w-20  rounded-full">
              <svg
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-5l-2-3m0 0H9"
                />
              </svg>
            </div>
            <div className="service-content">
              <h3 className="text-3xl font-bold mb-2 text-white">
                Expert Trainer
              </h3>
              <p className="font-semibold font-Roboto text-gray-200">
                An expert trainer excels in imparting specialized knowledge and
                skills, guiding learners to mastery through tailored instruction
                and support.
              </p>
            </div>
          </div>
          <div className="service-card h-[280px] flex items-center flex-col gap-4 rounded-tl-2xl rounded-br-2xl shadow-lg p-6 bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900">
            <div className="border-[5px] flex items-center justify-center h-20 w-20  rounded-full">
              <svg
                className="h-10 w-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 640 512"
              >
                <path
                  fill="#fff"
                  d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8V128h-.7l-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48V352h28.2l91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16V352c0 17.7 14.3 32 32 32H64c17.7 0 32-14.3 32-32V128H16zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128V352c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V144c0-8.8-7.2-16-16-16H544zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"
                />
              </svg>
            </div>
            <div className="service-content">
              <h3 className="text-3xl font-bold mb-2 text-white">
                Lifetime Access
              </h3>
              <p className="font-semibold font-Roboto text-gray-200">
                Enjoy lifetime access to our premium content and services,
                unlocking endless possibilities for learning and growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;

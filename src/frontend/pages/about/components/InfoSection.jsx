import React from 'react';
import Icon1 from "../../../../assets/about/coding-icon_1.jpg";
import Icon2 from "../../../../assets/about/coding-icon_2.jpg";
import Icon3 from "../../../../assets/about/coding-icon_3.jpg";
import Image1 from "../../../../assets/about/coding-isometric-1.png";
import Image2 from "../../../../assets/about/coding-isometric-2.png";
import Image3 from "../../../../assets/about/coding-isometric-3.png";

const InfoSection = () => {
  return (
    <>
      <div className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-8">
            <div>
              <img
                src={Icon1}
                alt="Icon 1"
                className="rounded-lg w-16 h-auto mb-4"
              />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Section 1 Title
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis
                est eget risus luctus, sed fringilla purus tristique. Nulla facilisi.
                Cras tempus, mauris in viverra feugiat, sem odio convallis felis, at
                scelerisque orci ante vel risus.
              </p>
            </div>
            <div className="p-8 md:p-6 md:p-4 xs:md:p-4 flex justify-center items-center">
              <img
                src={Image1}
                alt="Image 1"
                className="rounded-lg w-6/12 md:w-9/12 lg:w-full h-auto"
              />
            </div>
          </div>
          <div className="md:grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-8 flex flex-col justify-center items-center">
            <div className="p-8 md:p-6 md:p-4 xs:md:p-4 flex justify-center items-center order-1 md:order-none sm:order-1">
              <img
                src={Image2}
                alt="Image 2"
                className="rounded-lg  w-6/12 md:w-9/12 lg:w-full h-auto mb-4"
              />
            </div>
            <div>
              <img
                src={Icon2}
                alt="Icon 2"
                className="rounded-lg w-16 h-auto"
              />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Section 1 Title
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis
                est eget risus luctus, sed fringilla purus tristique. Nulla facilisi.
                Cras tempus, mauris in viverra feugiat, sem odio convallis felis, at
                scelerisque orci ante vel risus.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-8">
            <div>
              <img
                src={Icon3}
                alt="Icon 3"
                className="rounded-lg w-16 h-auto mb-4"
              />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Section 1 Title
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis
                est eget risus luctus, sed fringilla purus tristique. Nulla facilisi.
                Cras tempus, mauris in viverra feugiat, sem odio convallis felis, at
                scelerisque orci ante vel risus.
              </p>
            </div>
            <div className="p-8 md:p-6 md:p-4 xs:p-4 flex justify-center items-center">
              <img
                src={Image3}
                alt="Image 3"
                className="rounded-lg w-6/12 md:w-9/12 lg:w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoSection;

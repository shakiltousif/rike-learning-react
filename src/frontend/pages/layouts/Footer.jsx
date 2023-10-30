import { Link, NavLink } from "react-router-dom";
import Logo from "../../../assets/footer/logo.png";
import GoogleImage from "../../../assets/footer/google-play.png";
import AppleImage from "../../../assets/footer/app-store.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#112263] text-white">
      <div className="container mx-auto px-8 pt-20 pb-16 lg:pb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-between items-center">
        <div className="flex flex-col items-start mb-4 md:mb-0 col-span-1 md:col-span-2 lg:col-span-1">
          <NavLink onClick={scrollToTop} to="/">
            <img
              className="w-24 h-24 lg:w-16 lg:h-16 mb-2"
              src={Logo}
              alt="Logo"
            />
            <span className="text-2xl text-white font-bold">
              Rike-Learning
            </span>
          </NavLink>
          <p className="text-1xl my-2">
            Rike-Learning is a comprehensive online platform offering diverse
            educational resources and courses for learners of all ages and
            interests.
          </p>
          <div className="flex mt-4 space-x-4">
            <Link href="#" className="text-white">
              <i className="fab fa-facebook"></i>
            </Link>
            <Link href="#" className="text-white">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link href="#" className="text-white">
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
          <div className="mt-4 space-x-4 flex jsutify-center items-start lg:items-center">
            <Link to="https://play.google.com/store/apps/details?id=com.Rike-Learning.Rike-Learning">
              <img className=" w-52" src={GoogleImage} />
            </Link>
            <Link onClick={scrollToTop} to="#">
              <img className="w-52" src={AppleImage} />
            </Link>
          </div>
        </div>
        {/* <div className="mt-10 lg:mt-0 lg:mx-auto">
          <h2 className="text-2xl font-bold mb-4">Company</h2>
          <ul className="space-y-2">
            <li>
              <Link
                onClick={scrollToTop}
                to="#"
                className="hover:text-blue-800"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                to="/about"
                className="hover:text-blue-800"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                href="/contact"
                className="hover:text-blue-800"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                href="#"
                className="hover:text-blue-800"
              >
                Blogs
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-10 lg:mt-0 lg:mx-auto">
          <h2 className="text-2xl font-bold mb-4">Legal Info</h2>
          <ul className="space-y-2">
            <li>
              <Link
                onClick={scrollToTop}
                to="/privacy"
                className="hover:text-blue-800"
              >
                Privacy And Policy
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                to="/cookie"
                className="hover:text-blue-800"
              >
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                href="/terms"
                className="hover:text-blue-800"
              >
                Terms And Condition
              </Link>
            </li>
            <li>
              <Link
                onClick={scrollToTop}
                href="/faq"
                className="hover:text-blue-800"
              >
                FAQs
              </Link>
            </li>
          </ul>
        </div> */}
        <div className="mt-10 lg:mt-0 lg:mx-auto">
          <h2 className="text-2xl font-bold mb-4">Contact Info</h2>
          <ul className="space-y-2">
            <li>
              <p className="font-bold flex items-center gap-3">
                <svg
                  className="h-4 w-4 text-white inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="#fff"
                    d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                  />
                </svg>
                Afarkhola,Titarkul Road,Gazipur,Dhaka
              </p>
            </li>
            <li>
              <p className="font-bold flex items-center gap-3">
                <svg
                  className="h-4 w-4 text-white inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fff"
                    d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z"
                  />
                </svg>
                +8801613148537
              </p>
            </li>
            <li>
              <p className="font-bold flex items-center gap-3">
                <svg
                  className="h-4 w-4 text-white inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fff"
                    d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                  />
                </svg>
                example@gmail.com
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="px-8 py-6 border-t border-t-white flex justify-center">
        <p className="mx-auto">
          © 2023{" "}
          <a href="https://codecarebd.com" target="_blank" rel="noreferrer">
            CodeCareBD
          </a>{" "}
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

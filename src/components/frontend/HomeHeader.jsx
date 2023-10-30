import { Link, useNavigate } from "react-router-dom";
import logo_img from "../../assets/common/logo.png";
import { useState } from "react";
import AdminLoginPopUp from "../auth/AdminLoginPopup";
import { getToken, getUser } from "../../hooks/common/useAuth";
import PrimaryButton from "../common/PrimaryButton";
import SecondaryButton from "../common/SecondaryButton";

export default function HomeHeader() {
  const [menuToggle, setMenuToggle] = useState(false);

  const token = getToken();
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to={"/"}>
            <img
              src={logo_img}
              className="mr-3 h-6 sm:h-6"
              alt="Rik Learning"
            />
          </Link>
          <div className="flex items-center lg:order-2">
            <div className="hidden md:flex items-center gap-2">
              {!token ? (
                <>
                  <AdminLoginPopUp
                    mobileResponsive={true}
                    buttonName={"Admin Login"}
                  />
                  <AdminLoginPopUp
                    mobileResponsive={true}
                    buttonName={"Sub-Admin Login"}
                  />
                </>
              ) : (
                <>
                  <PrimaryButton
                    buttonHref={
                      user?.role == 1
                        ? "/admin/dashboard"
                        : user?.role == 3
                        ? "/student/dashboard"
                        : "/trainer/dashboard"
                    }
                  >
                    Dashboard
                  </PrimaryButton>
                  <SecondaryButton onClick={handleLogout}>
                    Logout
                  </SecondaryButton>
                </>
              )}
            </div>
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
              onClick={() => setMenuToggle((prev) => !prev)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`${
              !menuToggle && "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 pr-4 pl-3 text-[#4D4D4D] rounded lg:p-0"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-[#4D4D4D] lg:border-0 lg:hover:text-primary-700 lg:p-0 border-gray-700"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-[#4D4D4D] lg:border-0 lg:hover:text-primary-700 lg:p-0 border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-[#4D4D4D] lg:border-0 lg:hover:text-primary-700 lg:p-0 border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>

            <div className="flex md:hidden flex-col items-center gap-2 mt-6">
              {!token ? (
                <>
                  <AdminLoginPopUp
                    mobileResponsive={false}
                    buttonName={"Admin Login"}
                  />
                  <AdminLoginPopUp
                    mobileResponsive={false}
                    buttonName={"Sub-Admin Login"}
                  />
                </>
              ) : (
                <>
                  <PrimaryButton
                    buttonHref={
                      user?.role == 1
                        ? "/admin/dashboard"
                        : user?.role == 3
                        ? "/student/dashboard"
                        : "/trainer/dashboard"
                    }
                  >
                    Dashboard
                  </PrimaryButton>
                  <SecondaryButton onClick={handleLogout}>
                    Logout
                  </SecondaryButton>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

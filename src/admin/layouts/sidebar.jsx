import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/header/logo.png";
import { BASE_ASSETS_URL } from "../../config/basic";
import MenuList from "../../components/admin/MenuList";
import { menus } from "../../config/menu";
import { useQuery } from "react-query";
import { getAdminAuth } from "../../hooks/admin/accountSettingApi";
import NotificationsList from "../../components/common/NotificationsModal";

const Sidebar = ({ context }) => {
  const navigate = useNavigate();
  const [user] = context;

  const { isError, error, data: auth } = useQuery("getAdminAuth", getAdminAuth);

  useEffect(() => {
    if (error?.response?.status == 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [isError, error, navigate]);

  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
  const [IsPopNavShow, setIsPopNavShow] = useState(false);
  const [IsMainNavShow, setIsMainNavShow] = useState(false);

  useEffect(() => {
    toggleTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTheme = () => {
    const themeToggleDarkIcon = document.getElementById(
      "theme-toggle-dark-icon"
    );
    const themeToggleLightIcon = document.getElementById(
      "theme-toggle-light-icon"
    );

    if (isDarkTheme) {
      themeToggleLightIcon.classList.remove("hidden");
      themeToggleDarkIcon.classList.add("hidden");
      document.documentElement.classList.add("dark");
    } else {
      themeToggleLightIcon.classList.add("hidden");
      themeToggleDarkIcon.classList.remove("hidden");
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);

    if (isDarkTheme) {
      localStorage.setItem("color-theme", "dark");
    } else {
      localStorage.setItem("color-theme", "light");
    }

    updateTheme();
  };

  const togglePopNav = () => {
    if (IsPopNavShow) {
      setIsPopNavShow(false);
    } else {
      setIsPopNavShow(true);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleMainNav = () => {
    if (IsMainNavShow) {
      setIsMainNavShow(false);
    } else {
      setIsMainNavShow(true);
    }
  };

  const menuList = menus("admin");

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 bg-opacity-10 rounded bg-white dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={toggleMainNav}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a className="flex ml-2 md:mr-24">
                <img src={Logo} className="h-8 mr-3" alt="Rike-learning Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"></span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center space-x-3 ml-3">
                <div>
                  <button
                    id="theme-toggle"
                    onClick={toggleTheme}
                    type="button"
                    className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                  >
                    <svg
                      id="theme-toggle-dark-icon"
                      className="hidden w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                    <svg
                      id="theme-toggle-light-icon"
                      className="hidden w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div>
                  <NotificationsList />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={togglePopNav}
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={`${BASE_ASSETS_URL}${
                        auth?.data?.image ? auth?.data?.image : user?.image
                      }`}
                      alt="user photo"
                    />
                  </button>
                </div>
                {IsPopNavShow && (
                  <div
                    className="absolute top-10 right-4 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <div className="px-4 py-3" role="none">
                      <p className="text-sm" role="none">
                        {auth?.data?.name ? auth?.data?.name : user?.name}
                      </p>
                      <p
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        {auth?.data?.email ? auth?.data?.email : user?.email}
                      </p>

                      <p
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        {auth?.data?.roles?.[0]?.name
                          ? auth?.data?.roles?.[0]?.name
                          : user?.roles?.[0]?.name}
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-16 bg-opacity-10 rounded bg-white transition-transform ${
          IsMainNavShow ? "" : "-translate-x-full"
        } bg-white  sm:translate-x-0 dark:bg-[#070c44]`}
        aria-label="Sidebar"
      >
        <div className="h-full rounded-r-[15%] overflow-y-auto px-3 py-4 text-white bg-opacity-10 rounded bg-white">
          <ul className="space-y-2 font-medium">
            {menuList?.map(
              (list, key) =>
                !list?.hidden &&
                list?.children && (
                  <MenuList
                    key={key}
                    list={list}
                    toggleMainNav={toggleMainNav}
                  />
                )
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

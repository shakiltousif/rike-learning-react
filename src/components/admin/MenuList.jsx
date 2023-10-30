import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const MenuList = ({ list, toggleMainNav }) => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  function handleDropdownToggle() {
    setDropdownVisible(!dropdownVisible);
  }

  return (
    <>
      <li>
        <button
          onClick={() => {
            if (list?.children?.length == 0 && list?.path) {
              navigate(list?.path);
              toggleMainNav();
            } else {
              handleDropdownToggle();
            }
          }}
          type="button"
          className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-blue-500 text-white dark:text-white dark:hover:bg-blue-500"
        >
          {list?.icon}
          <span className="flex-1 ml-3 text-left whitespace-nowrap">
            {list?.name}
          </span>
          {list?.children?.length != 0 && (
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </button>
        {dropdownVisible && list?.children?.length != 0 && (
          <ul className="py-2 space-y-2">
            {list?.children?.map(
              (child, key) =>
                !child?.hidden && (
                  <li key={key} onClick={toggleMainNav}>
                    <NavLink
                      to={`${child?.path}`}
                      className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-blue-500 text-white dark:text-white dark:hover:bg-blue-500"
                    >
                      {child?.name}
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        )}
      </li>
    </>
  );
};

export default MenuList;

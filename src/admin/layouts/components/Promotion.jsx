import React, {useState }from 'react';
import { NavLink } from 'react-router-dom';

const Promotion = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    function handleDropdownToggle() {
      setDropdownVisible(!dropdownVisible);
    }

    const toggleMainNav = () => {
        if (IsMainNavShow) {
          setIsMainNavShow(false)
        } else {
          setIsMainNavShow(true)
        }
    };

    return (
        <>
            <li>
                <button onClick={handleDropdownToggle} type="button" className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                    <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" ></path>
                    </svg>
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">Manage Promotion</span>
                    <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                </button>
                {dropdownVisible && (
                <ul className="py-2 space-y-2">
                    <li>
                    <NavLink onClick={toggleMainNav} to="#" className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Promotion List</NavLink>
                    </li>
                    <li>
                    <NavLink onClick={toggleMainNav} to="#" className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Add Promotion</NavLink>
                    </li>
                </ul>
                )}
            </li>
        </>
    );
};

export default Promotion;

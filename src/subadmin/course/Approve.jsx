import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';
import Pageloader from '../../frontend/pages/layouts/PageLoader';
import Breadcrumb from '../../frontend/pages/layouts/Breadcrumb';
import { dateformat } from "../../helpers/helper.js";
import axios from 'axios';

const Approve = () => {
    const [ctoken, setCtoken] = useState('');
    const [cuser, setCUser] = useState({});
    let i = 1;
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const luser = localStorage.getItem('user');

        let decryptedToken = '';
        // Decrypt the user object
        if (token && luser) {
            decryptedToken = AES.decrypt(token, 'token-secret-key').toString(
                CryptoJS.enc.Utf8
            );
            const decryptedUser = AES.decrypt(luser, 'user-secret-key').toString(
                CryptoJS.enc.Utf8
            );
            setCtoken(decryptedToken);
            setCUser(JSON.parse(decryptedUser));
        } else {
            navigate('/login');
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://api.usrike-learning.com/public/api/admin/courses-approved',
                    {
                        headers: {
                            Authorization: 'Bearer ' + decryptedToken
                        }
                    }
                );
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [ctoken, navigate]);


    if (!data) {
        return <Pageloader title="Approve" />;
    }

    const { admin, courses } = data;


    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(courses.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Breadcrumb title="Approve" />
            <div className="container mx-auto my-5 p-5">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg section-bg p-2">
                    <div className="pb-4">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-white">
                        <thead className="text-xs text-gray-700 uppercase bg-transparent text-white">
                            <tr>
                                <th scope="col" className="p-6">
                                    {/* <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div> */}
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Subtitle
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item) => (
                                <tr key={item.id} className="bg-transparent border-b">
                                    <td className="px-6 py-4">
                                        {item.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.subtitle}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.status}
                                    </td>
                                    <td className="px-6 py-4">
                                        {dateformat(item.created_at)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={`/admin/updatecourse/${item.uuid}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        <a href={`/admin/coursedetails/${item.uuid}`} className="p-2 pl-11 text-base font-medium">View</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex items-center justify-center md:justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700 sm:px-6">
                        <div className=" sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div className="mb-2 md:mb-0">
                                <p className="text-sm text-gray-700 dark:text-gray-400">
                                    Showing
                                    <span className="font-medium"> {indexOfFirstItem + 1} </span>
                                    to
                                    <span className="font-medium"> {indexOfLastItem} </span>
                                    of
                                    <span className="font-medium"> {courses.length} </span>
                                    results
                                </p>
                            </div>
                            <div>
                                <nav
                                    className="relative z-0 inline-flex -space-x-px shadow-sm"
                                    aria-label="Pagination"
                                >
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white'
                                            }`}
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg
                                            className="w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M9.707 4.293a1 1 0 010 1.414L6.414 10l3.293 3.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <NavLink
                                            key={i}
                                            to="#"
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${currentPage === i + 1 ? 'z-10 bg-blue-500 border-blue-500 text-white dark:bg-blue-600 dark:border-blue-600 dark:text-white' : 'hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white'
                                                }`}
                                            onClick={() => handlePageChange(i + 1)}
                                        >
                                            {i + 1}
                                        </NavLink>
                                    ))}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white'
                                            }`}
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg
                                            className="w-5 h-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.293 15.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L7.414 10l2.293 2.293a1 1 0 010 1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};
export default Approve;

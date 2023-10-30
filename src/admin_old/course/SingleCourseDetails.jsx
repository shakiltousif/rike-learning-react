import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { AES } from 'crypto-js';
import CryptoJS from 'crypto-js';
import Pageloader from '../../frontend/pages/layouts/PageLoader';
import Breadcrumb from '../../frontend/pages/layouts/Breadcrumb';
import { dateformat } from "../../helpers/helper.js";
import axios from 'axios';



const SingleCourseDetails = () => {
    const [ctoken, setCtoken] = useState('');
    const [cuser, setCUser] = useState({});
    let i = 1;
    const navigate = useNavigate();

    const params = useParams();

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
                    `https://bdlearningpoint.com/backend/public/api/admin/courses/${params.courseid}`,
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
        return <Pageloader title="Course Details" />;
    }
    const { admin, course } = data;






    return (
        <>
            <Breadcrumb title="Course Details" />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg section-bg p-2">
                <br />
                <br />
                <div className="grid md:grid-cols-2 md:gap-6 px-20">
                    <div className="relative z-0 w-full mb-6 group block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        <label htmlFor="" className="mt-1 text-sm text-gray-500 dark:text-gray-300"> Name</label>
                        <p>{course.title}</p>
                        <p className="mt-1 text-sm text-gray-300 dark:text-gray-300">{course.subtitle}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        <label htmlFor="" className="mt-1 text-sm text-gray-500 dark:text-gray-300">Description</label>
                        <p>{course.description}</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6 px-20">
                    <div className="relative z-0 w-full mb-6 group block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        <label htmlFor="" className="mt-1 text-sm text-gray-500 dark:text-gray-300">Course Price</label>
                        <p>{course.price}</p>
                        <del><p>{course.old_price}</p></del>
                    </div>
                    <div className="relative z-0 w-full mb-6 group block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        <label htmlFor="" className="mt-1 text-sm text-gray-500 dark:text-gray-300">Instructor</label>
                        <p>{course.instructor_id}</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6 px-20">
                    <div className="relative z-0 w-full mb-6 group block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        <label htmlFor="" className="mt-1 text-sm text-gray-500 dark:text-gray-300">Course Type</label>
                        <p>{course.course_type}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        <label htmlFor="" className="mt-1 text-sm text-gray-500 dark:text-gray-300">Instructor</label>
                        <p>{course.instructor_id}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6 px-20">
                    <div className="relative z-0 w-full mb-6 group block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        <label htmlFor="" className="mt-1 text-sm text-gray-500 dark:text-gray-300">Category</label>
                        <p>{course.category_id}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        <label htmlFor="" className="mt-1 text-sm text-gray-500 dark:text-gray-300">Subcategory</label>
                        <p>{course.subcategory_id}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6 px-20">
                    <div className="relative z-0 w-full mb-6 group block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        <label htmlFor="" className="mt-1 text-sm text-gray-500 dark:text-gray-300">Course Language</label>
                        <p>{course.course_language_id}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        <label htmlFor="" className="mt-1 text-sm text-gray-500 dark:text-gray-300">Accessibility</label>
                        <p>{course.learner_accessibility}</p>
                    </div>
                </div>


                <div className="grid md:grid-cols-2 md:gap-6 px-20">
                    <div className="relative z-0 w-full mb-6 group block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        <label htmlFor="" className="mt-1 text-sm text-gray-500 dark:text-gray-300">Video</label>
                        <br />
                        <a href={`https://www.youtube.com/watch?v=${course.youtube_video_id}`}>
                            https://www.youtube.com/watch?v={course.youtube_video_id}
                        </a>
                    </div>
                    <div className="relative z-0 w-full mb-6 group block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        <label htmlFor="" className="mt-1 text-sm text-gray-500 dark:text-gray-300">Private Mode</label>
                        <p>{course.private_mode}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6 px-20">
                    <div className="relative z-0 w-full mb-6 group block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        <label htmlFor="" className="mt-1 text-sm text-gray-500 dark:text-gray-300">Status</label>
                        <p>{course.status}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        <label htmlFor="" className="mt-1 text-sm text-gray-500 dark:text-gray-300">Rating Avarage</label>
                        <p>{course.average_rating}</p>
                    </div>
                </div>


                <div className="grid md:grid-cols-2 md:gap-6 px-20">
                    <div className="relative z-0 w-full mb-6 group block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        <label htmlFor="" className="mt-1 text-sm text-gray-500 dark:text-gray-300">Access Period</label>
                        <p>{course.access_period}</p>
                    </div>
                    <div className="relative z-0 w-full mb-6 group block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                        <label htmlFor="" className="mt-1 text-sm text-gray-500 dark:text-gray-300">Course Date</label>
                        <p>{dateformat(course.created_at)}</p>
                    </div>
                </div>
                <br />
                <br />



            </div>
        </>
    );
};
export default SingleCourseDetails;

import React, { useState, useEffect } from 'react'
import Breadcrumb from '../layouts/Breadcrumb';
import { NavLink, useOutletContext } from 'react-router-dom';
import Pageloader from '../../frontend/pages/layouts/PageLoader';
import axios from 'axios';



const AddSubCategory = () => {

    const [user, token, isLoggedIn] = useOutletContext();
    const [IsSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(false);




    const [formData, setFormData] = useState({
        name: '',
        category_id: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!formData.name) {
            errors.name = 'Name is required';
        }
        if (!formData.category_id) {
            errors.category_id = 'Category Id is required';
        }


        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Validate the form fields
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            try {
                // Make the API request
                const response = await axios.post(`https://bdlearningpoint.com/backend/public/api/admin/subcategory`, formData,
                    {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    });
                setErrors({});
                setIsSuccess(true);
                e.target.reset();
            } catch (error) {
                setError(error.response.data.error); // Handle any error during API request
            }
        } else {
            setErrors(validationErrors); // Set validation errors in state
        }

    };



    return (
        <>
            <Breadcrumb title="Create SubCategory" />
            <div className='my-12 h-screen'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg section-bg p-2">
                    <form className='p-5' onSubmit={handleSubmit}>

                        <div className="grid md:grid-cols-2 md:gap-6">
                            {
                                IsSuccess ? (<h4 className='text-green-500 font-bold pb-8'>SubCategory Create Successfully.</h4>) : ''
                            }
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-12 group">
                                <input type="text" onChange={(e) => setFormData({ ...formData, name: e.target.value })} name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600" placeholder=" " required />
                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">SubCategory Name</label>
                                {errors.name && <span className="text-red-500">{errors.name}</span>}
                            </div>
                            <div className="relative z-0 w-full mb-12 group">
                                <input type="text" onChange={(e) => setFormData({ ...formData, category_id: e.target.value })} name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600" placeholder=" " required />
                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category Id</label>
                                {errors.category_id && <span className="text-red-500">{errors.category_id}</span>}
                            </div>
                        </div>


                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create SubCategory</button>
                        <br />
                        <br />

                    </form>
                </div>
            </div>
        </>
    );
};

//export default Passbook;
export default AddSubCategory;

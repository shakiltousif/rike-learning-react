import React, { useState } from 'react';
import Breadcrumb from '../layouts/Breadcrumb';
import { NavLink, useOutletContext } from 'react-router-dom';
import axios from 'axios';

const CreateCategory = () => {

    const [user, token, isLoggedIn] = useOutletContext();
    const [IsSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        image: null, // The image file will be stored here
        is_feature: '' // The feature option will be stored here
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!formData.name) {
            errors.name = 'Name is required';
        }
        if (!formData.image) {
            errors.image = 'Image is required';
        }

        if (!formData.is_feature) {
            errors.is_feature = 'Feature is required';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Validate the form fields
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            try {
                // Create a FormData object to hold the form data
                const formDataObject = new FormData();
                formDataObject.append('name', formData.name);
                formDataObject.append('image', formData.image);
                formDataObject.append('is_feature', ((formData.is_feature == 1) ? "yes" : "no"));

                // Make the API request with the FormData object
                const response = await axios.post(
                    'https://bdlearningpoint.com/backend/public/api/admin/category',
                    formDataObject,
                    {
                        headers: {
                            // Assuming 'token' is defined elsewhere in the component
                            Authorization: 'Bearer ' + token
                        }
                    }
                );

                setErrors({});
                setIsSuccess(true);
                setFormData({ name: '', image: null }); // Reset the form data after successful submission
            } catch (error) {
                console.error(error)
                // setError(error.response.data.error); // Handle any error during API request
            }
        } else {
            setErrors(validationErrors); // Set validation errors in state
        }

        console.log(formData);

    };

    return (
        <>
            <Breadcrumb title="Create Category" />
            <div className="my-12 h-screen">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg section-bg p-2">
                    <form className="p-5" onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            {IsSuccess ? (
                                <h4 className="text-green-500 font-bold pb-8">Category Created Successfully.</h4>
                            ) : (
                                ''
                            )}
                        </div>
                        <div className="grid md:grid-cols-1 md:gap-6">
                            <div className="relative z-0 w-full mb-12 group">
                                <input
                                    type="text"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    name="name"
                                    id="name"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Category Name
                                </label>
                                {errors.name && <span className="text-red-500">{errors.name}</span>}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-1 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="image"
                                >
                                    Category Image
                                </label>
                                <input
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    aria-describedby="image_help"
                                    id="image"
                                    type="file"
                                    name='image'
                                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                />
                                {errors.image && <span className="text-red-500">{errors.image}</span>}
                            </div>
                        </div>

                        {/* Add select element for is_feature */}
                        <div className="grid md:grid-cols-1 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="is_feature"
                                >
                                    Is Feature
                                </label>
                                <select
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="is_feature"
                                    name="is_feature"
                                    onChange={(e) => setFormData({ ...formData, is_feature: e.target.value })}
                                    value={formData.is_feature}
                                >
                                    <option value="">Select Option</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                                {errors.is_feature && <span className="text-red-500">{errors.is_feature}</span>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Create Category
                        </button>
                        <br />
                        <br />
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateCategory;
import React, { useState, useEffect  } from 'react'
import Breadcrumb from '../layouts/Breadcrumb';
import { NavLink, useOutletContext } from 'react-router-dom';
import Pageloader from '../../frontend/pages/layouts/PageLoader';
import axios from 'axios';

function ChangePassword() {


    const [user, token, isLoggedIn] =  useOutletContext();
    const [isLoading, setIsLoading] = useState(true);
    const [IsSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [formData, setFormData] = useState({
        password: '',
        password_confirmation: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!formData.password) {
            errors.password = 'Id Number is required';
        }

        if (!formData.password_confirmation) {
            errors.password_confirmation = 'Id Number is required';
        }

        if(formData.password != formData.password_confirmation)
        {
            errors.password_confirmation = 'Password is not match';
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
                const response = await axios.post('https://api.usrike-learning.com/public/api/admin/change-password', formData,
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                console.log(response); // Handle the API response
                // Reset the form fields if needed
                setFormData({
                    password: '',
                    password_confirmation: ''
                });
                setErrors({});
                setIsSuccess(true);
            } catch (error) {
                setError(error.response.data.error); // Handle any error during API request
            }
        } else {
            setErrors(validationErrors); // Set validation errors in state
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setError("");
            setIsSuccess(false);
        }, 5000);

        const pTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 500);

    }, []);

    return (
        <>
        {isLoading ? (
            <Pageloader title={(isLoggedIn) ? "Change Password" : "Checking Admin Login"}/>
        ) : (
        <>
        <Breadcrumb title="Change Password"/>
        <div className='my-12 h-screen'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-opacity-10 backdrop-blur-lg rounded drop-shadow-lg bg-white p-2">
                {IsSuccess && <p className='text-green-800 p-5 font-bold'>Password Changed Succesulful</p>}
                {error && <p className='text-red-800 p-5 font-bold'>{error}</p>}
                <form className='p-5'  onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        type="password" id="password" className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light ${
                                    errors.password || error ? ' border-red-500 dark:border-red-500' : ' border-gray-300'
                                }`} required />
                        {errors.password && <span className="text-red-500">{errors.password}</span>}

                    </div>
                    <div className="mb-6">
                        <label htmlFor="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                        <input
                        value={formData.password_confirmation}
                        onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                        type="password" id="password_confirmation" className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light ${
                                    errors.password_confirmation || error ? ' border-red-500 dark:border-red-500' : ' border-gray-300'
                                }`} required />
                        {errors.password_confirmation && <span className="text-red-500">{errors.password_confirmation}</span>}

                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change Password</button>
                </form>
            </div>
        </div>
        </>
        )}
        </>
    )
}

export default ChangePassword
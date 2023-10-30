import React, { useState, useEffect  } from 'react'
import Breadcrumb from '../layouts/Breadcrumb';
import { NavLink, useOutletContext } from 'react-router-dom';
import Pageloader from '../../frontend/pages/layouts/PageLoader';
import axios from 'axios';

function Terms() {

    const [user, token, isLoggedIn] =  useOutletContext();
    const [isLoading, setIsLoading] = useState(true);
    const [IsSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);

    const [formData, setFormData] = useState({
        description: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Validate the form fields
        let formValid = true;
        const newErrors = {};

        if (!formData.description) {
            formValid = false;
            newErrors.description = 'Description is required';
        }

        if (formValid) {
            try {
                // Make the API request
                const response = await axios.post('https://bdlearningpoint.com/backend/public/api/admin/term-conditions', formData,
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                console.log(response); // Handle the API response
                // Reset the form fields if needed
                setFormData({
                    description: '',
                });
                setErrors({});
                setIsSuccess(true);
            } catch (error) {
                newErrors.description = error.response.data.error; // Handle any error during API request
            }
        }

        setErrors(newErrors);
    };

    useEffect(() => {

        if(token){
            const fetchData = async () => {
                try {
                    const response = await axios.get('https://bdlearningpoint.com/backend/public/api/admin/term-conditions',
                    {
                      headers: {
                        Authorization: 'Bearer ' + token
                      }
                    }
                  );
                  setData(response.data.data);
                } catch (error) {
                  console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }

        const timeout = setTimeout(() => {
            setError("");
            setIsSuccess(false);
        }, 5000);

        const pTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 500);

    }, [token]);

    if (!data) {
        return <Pageloader title="Terms & Conditions" />;
    }

    const {title, policy } = data;

    return (
        <>
        <Breadcrumb title={title} />
        <div className='my-12 h-screen'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg section-bg p-2">
                {IsSuccess && <p className='text-green-800 p-5 font-bold'>Terms & Condition Updated Succesulful</p>}
                {error && <p className='text-red-800 p-5 font-bold'>{error}</p>}
                <form className='p-5'  onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea id="description" name='description' rows="18" onChange={handleInputChange} className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light ${
                                    errors.password || error ? ' border-red-500 dark:border-red-500' : ' border-gray-300'
                                }`} required defaultValue={formData.description ? formData.description : policy.description}>
                        </textarea>
                        {errors.description && <span className="text-red-500">{errors.description}</span>}

                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Data</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Terms
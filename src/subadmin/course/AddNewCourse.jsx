import { useState } from 'react'
import Breadcrumb from '../layouts/Breadcrumb';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';



const AddNewCourse = () => {

    const [user, token] = useOutletContext();
    const [IsSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(false);



    const [formData, setFormData] = useState({
        title: '',
        course_type: '1',
        subtitle: '',
        description: '',
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!formData.description) {
            errors.description = 'Description is required';
        }
        if (!formData.title) {
            errors.title = 'Title is required';
        }
        if (!formData.subtitle) {
            errors.subtitle = 'Subtitle is required';
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
                const response = await axios.post('https://api.usrike-learning.com/public/api/admin/course-store', formData,
                    {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    });
                //console.log(response); // Handle the API response
                // Reset the form fields if needed
                setFormData({
                    title: '',
                    course_type: '1',
                    subtitle: '',
                    description: '',
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

    //const { title, policy } = data;



    return (
        <>
            <Breadcrumb title="Add New Course" />
            <div className='my-12 h-screen'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg section-bg p-2">
                    <form className='p-5' onSubmit={handleSubmit}>

                        <div className="grid md:grid-cols-2 md:gap-6">
                            {
                                IsSuccess ? (<h4 className='text-green-500 font-bold pb-8'>Course Added Successfully.</h4>) : ''
                            }
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" onChange={(e) => setFormData({ ...formData, title: e.target.value })} name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600" placeholder=" " required />
                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Course Name</label>
                                {errors.title && <span className="text-red-500">{errors.title}</span>}
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600" placeholder=" " required />
                                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Course Sub Title</label>
                                {errors.subtitle && <span className="text-red-500">{errors.subtitle}</span>}
                            </div>
                        </div>
                        <br />
                        <div className='relative z-0 w-full mb-6 group'>
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Description</label>

                            <textarea rows="18" onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`} required >
                            </textarea>
                            {errors.description && <span className="text-red-500">{errors.description}</span>}

                        </div>
                        <br />
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Course</button>
                    </form>
                </div>
            </div>
        </>
    );
};

//export default Passbook;
export default AddNewCourse;

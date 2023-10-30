import React, { useState } from 'react';

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({
    email: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    let formValid = true;
    const newErrors = {};

    if (!formData.email) {
      formValid = false;
      newErrors.email = 'Email is required';
    }

    setErrors(newErrors);

    if (formValid) {
      // Handle form submission logic here
      console.log(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 flex justify-center items-center">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-4">Forgot Password</h2>
          <p className="text-gray-600 mb-6">Please enter your email to reset your password.</p>
          <form onSubmit={handleSubmit} method="post">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <button
              type="submit"
              className="w-full px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

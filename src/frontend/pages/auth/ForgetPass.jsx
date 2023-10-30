import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({
    email: '',
  });

  const [VformData, setVFormData] = useState({
    verify: '',
  });

  const [verrors, setVErrors] = useState({
    verify: '',
  });

  const [PformData, setPFormData] = useState({
    password: '',
    password_confirmation: '',
  });

  const [Perrors, setPErrors] = useState({
    password: '',
    password_confirmation: '',
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [verify, setVerify] = useState("")
  const [cpass, setCpass] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerifyChange = (e) => {
    setVFormData({
      ...VformData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPFormData({
      ...PformData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    let formValid = true;
    const newErrors = {};

    if (!formData.email) {
      formValid = false;
      newErrors.email = 'Email is required';
    }

    if (formValid) {
      try{
        const response = await axios.post('https://api.usrike-learning.com/public/api/auth/forget', formData);
        if (response.data.success) {
          const email = response.data.data.email;
          const verify = response.data.data.verification_code;
          setVerify(verify);
          setEmail(email);
        }
      }catch(error)
      {
        newErrors.email = error.response.data.error;
      }
    }

    setErrors(newErrors);
  };

  const handleVSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    let formValid = true;
    const newErrors = {};

    if (!VformData.verify) {
      formValid = false;
      newErrors.verify = 'Verify Code is required';
    }

    if (formValid) {
      if(VformData.verify == verify)
      {
        setCpass(true);
      }else{
        newErrors.verify = 'Verify Code is Wrong';
      }
    }

    setErrors(newErrors);

  };

  const handlePSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    let formValid = true;
    const newErrors = {};

    if (!PformData.password) {
      formValid = false;
      newErrors.password = 'Password is required';
    }

    if (!PformData.password_confirmation) {
      formValid = false;
      newErrors.password_confirmation = 'Confirm Password is required';
    }

    if (PformData.password != PformData.password_confirmation) {
      formValid = false;
      newErrors.password = 'Check Password';
      newErrors.password_confirmation = 'Password is not Match';
    }

    if (formValid) {

      try{
        const response = await axios.post('https://api.usrike-learning.com/public/api/auth/verify-code', {
          verification_code: verify,
          email: email,
          password: PformData.password,
          password_confirmation: PformData.password_confirmation,
        });
        if (response.data.success) {
          localStorage.setItem('success-msg', "Password is Successfully Changed. Please Login.");
          navigate('/login');
        }
      }catch(error)
      {
        console.error(error)
       // newErrors.password_confirmation = error.response.data.error;
      }
    }

    setErrors(newErrors);
  };

  console.log(verify);


  const renderContent = () => {
    if(formData.email == email && VformData.verify == verify && cpass){
      console.log(email)
      return (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-4">New Password</h2>
          <p className="text-gray-600 mb-6">Please enter a password to change your password.</p>
          <form onSubmit={handlePSubmit} method="post">
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={PformData.password}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                required
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password_confirmation" className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={PformData.password_confirmation}
                onChange={handlePasswordChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.password_confirmation ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                required
              />
              {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}
            </div>
            <button
              type="submit"
              className="w-full px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
            >
              Change Password
            </button>
          </form>
        </div>
      )
    }else if(formData.email === email && verify)
    {
      return (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-4">Verification Code</h2>
          <p className="text-gray-600 mb-6">Please enter your Verify Code to reset your password.</p>
          <form onSubmit={handleVSubmit} method="post">
            <div className="mb-4">
              <label htmlFor="verify" className="block text-gray-700 font-medium mb-2">
                Verify Code
              </label>
              <input
                type="text"
                id="verify"
                name="verify"
                value={VformData.verify}
                onChange={handleVerifyChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.verify ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                required
              />
              {errors.verify && <p className="text-red-500 text-sm mt-1">{errors.verify}</p>}
            </div>
            <button
              type="submit"
              className="w-full px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
            >
              Verify
            </button>
          </form>
        </div>
      )
    }else{
      return (
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
      )
    }
  }

  return (
    <div className="forget-section min-h-screen bg-gray-100 py-8 flex justify-center items-center">
      <div className="max-w-md mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default ForgetPassword;
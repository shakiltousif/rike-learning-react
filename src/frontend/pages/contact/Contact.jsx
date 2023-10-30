import { useState, useEffect } from "react";
import apiService from "../../../helpers/apiServices.js";
import Breadcrumb from "../layouts/Breadcrumb.jsx";
import axios from "axios";
import HeaderImage from "../../../assets/contact/headerImage.gif";
import CallToAction from "./components/CallToAction.jsx";

const Contact = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("contactData");

        if (cachedData) {
          setData(JSON.parse(cachedData));
        } else {
          const response = await apiService.getContactData();
          const fetchedData = response.data.data;
          setData(fetchedData);
          localStorage.setItem("contactData", JSON.stringify(fetchedData));
        }
      } catch (error) {
        setError(true);
        setErrorMessage("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <>
        <Breadcrumb title="Contact Us" />
        <div>Loading...</div>
      </>
    );
  }

  const { pageTitle, contactUsIssues } = data;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://api.usrike-learning.com/public/api/frontend/contact-us",
          formData
        );

        setSubmitSuccess(true);
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle error response
      }
    } else {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setIsSubmitting(false);
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000); // Reset submitSuccess to false after 2 seconds
  };

  return (
    <>
      <Breadcrumb title={pageTitle} />
      <div className="bg-gray-100">
        <div className="max-w-6xl mx-auto pb-20 px-4">
          <div className="flex justify-center pt-20">
            <img src={HeaderImage} className="w-auto h-auto" />
          </div>
          <h1 className="text-6xl font-bold text-center mt-2 mb-8">
            Talk With Us
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 shadow-xl">
            <div className="p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Get in Touch
              </h2>

              <p className="text-gray-600 mb-6">
                Visit us at our office location:
              </p>
              <div className="bg-[#050940] text-white py-2 px-4 mb-4">
                <h3 className="text-lg font-bold">{contactUsIssues[0].name}</h3>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#050940] rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="#fff"
                      d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">
                  {" "}
                  Afarkhola,Titarkul Road,Gazipur,Dhaka
                </p>
              </div>
              <div className="flex items-center mt-5">
                <div className="w-8 h-8 bg-[#050940] rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#fff"
                      d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z"
                    />
                  </svg>
                </div>
                <p className="text-gray-700"> +8801613148537</p>
              </div>
              <div className="flex items-center mt-5">
                <div className="w-8 h-8 bg-[#050940] rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#fff"
                      d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">example@gmail.com</p>
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Help Line</h2>

              <p className="text-gray-600 mb-6">
                We would love to hear from you! Fill out the form below and we
                {"'"}ll get back to you as soon as possible.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } rounded-md py-2 px-4 focus:outline-none focus:border-blue-500`}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md py-2 px-4 focus:outline-none focus:border-blue-500`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full border ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    } rounded-md py-2 px-4 focus:outline-none focus:border-blue-500`}
                    placeholder="Enter your message"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className=" bg-[#442E9E] text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
                {submitSuccess && (
                  <p className="text-green-500 text-sm mt-4">
                    Your message has been sent successfully.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="contact_map_area">
          <div className="h-[450px] mt-4 sm:mt-8">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23456.78901234567!2d-77.0368707!3d38.9071923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDIzJzE4LjYiTiA3N8KwMzQnMjMuNiJX!5e0!3m2!1sen!2sus!4v1626059942520!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <CallToAction />
      </div>
    </>
  );
};

export default Contact;

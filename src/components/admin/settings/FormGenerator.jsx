import { useState } from "react";
import ImageUpload from "../../FormFields/ImageUpload";

const FormGenerator = ({ formData, onSubmit }) => {
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleChangeImage = (e) => {
    const { name, files } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(formData).map(([key, value]) => (
        <div
          key={key}
          className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5"
        >
          {value?.type == "text" ? (
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor={key}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {key}
                </label>
                <input
                  type="text"
                  name={key}
                  id={key}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={key}
                  defaultValue={value?.value || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          ) : value?.type == "image" ? (
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor={key}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {key}
                </label>
                <ImageUpload
                  circle
                  id={key}
                  placeHolder={key}
                  url={value?.value || ""}
                  InputChange={handleChangeImage}
                  className={"md:w-[10%] w-[40%] "}
                />
              </div>
            </div>
          ) : value?.type == "select" ? (
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor={key}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {key}
                </label>
                <select
                  name={key}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={value?.value || ""}
                  onChange={handleChange}
                >
                  <option value="">Select {key}</option>
                  <option value="1">Active</option>
                  <option value="2">DeActive</option>
                </select>
              </div>
            </div>
          ) : null}
        </div>
      ))}
      <div className="flex items-center justify-end space-x-6">
        <button
          type="submit"
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Update Settings
        </button>
      </div>
    </form>
  );
};

export default FormGenerator;

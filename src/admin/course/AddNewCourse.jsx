import { useState } from "react";
import Breadcrumb from "../layouts/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { postCreateCourse } from "../../hooks/admin/courseApi";
import { toast } from "react-hot-toast";

const AddNewCourse = () => {
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation(postCreateCourse, {
    onSuccess: (response) => {
      setFormData({
        title: "",
        course_type: "1",
        subtitle: "",
        description: "",
      });
      toast.success("Successfully Created!");
      if (response?.data?.data?.uuid) {
        navigate(`/admin/updatecourse/${response?.data?.data?.uuid}`);
      } else {
        navigate("/admin/allcourse");
      }
    },
    onError: (error) => {
      if (error.response.data.error) {
        toast.error(`${error.response.data.error}`);
      } else {
        toast.error("something went wrong!");
      }
    },
  });

  const [formData, setFormData] = useState({
    title: "",
    course_type: "1",
    subtitle: "",
    description: "",
  });

  const validateForm = () => {
    if (!formData.description) {
      toast.error("Description is required");
      return false;
    }
    if (!formData.title) {
      toast.error("Title is required");
      return false;
    }
    if (!formData.subtitle) {
      toast.error("Subtitle is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate the form fields
    const validationErrors = validateForm();

    if (validationErrors && !isLoading) {
      mutate({
        formdata: formData,
      });
    }
  };

  return (
    <>
      <Breadcrumb title="Add New Course" />
      <div className="my-12 h-screen">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-opacity-10 backdrop-blur-lg rounded drop-shadow-lg bg-white p-2">
          <form className="p-5" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 md:gap-6"></div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  name="floating_first_name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Course Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  name="floating_last_name"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Course Sub Title
                </label>
              </div>
            </div>
            <br />
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Course Description
              </label>

              <textarea
                rows="18"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#422e9d] dark:border-gray-600 dark:placeholder-[#422e9d] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light`}
                required
              ></textarea>
            </div>
            <br />
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoading ? "Creating..." : "Create Course"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

//export default Passbook;
export default AddNewCourse;

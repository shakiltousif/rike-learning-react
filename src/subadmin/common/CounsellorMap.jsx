import { useEffect, useState } from "react";
import Breadcrumb from "../layouts/Breadcrumb.jsx";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader } from "@mantine/core";
import { postCounsellorMapping } from "../../hooks/admin/adminCommonApi.js";

const CounsellorMap = () => {
  const navigate = useNavigate();

  const { isLoading: isSubmitLoading, mutate } = useMutation(
    postCounsellorMapping,
    {
      onSuccess: () => {
        toast.success("Successfully saved!");
        set_user_id("");
        set_counsellor_id("");
      },
      onError: (error) => {
        if (error?.response?.data?.error) {
          toast.error(error?.response?.data?.error);
        } else if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("something went wrong!");
        }
      },
    }
  );

  const [counsellor_id, set_counsellor_id] = useState("");
  const [user_id, set_user_id] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const luser = localStorage.getItem("user");

    // let decryptedToken = "";
    // Decrypt the user object
    if (token && luser) {
      // decryptedToken = AES.decrypt(token, "token-secret-key").toString(
      //   CryptoJS.enc.Utf8
      // );
      // const decryptedUser = AES.decrypt(luser, "user-secret-key").toString(
      //   CryptoJS.enc.Utf8
      // );
      // setCtoken(decryptedToken);
      // setCUser(JSON.parse(decryptedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isSubmitLoading) {
      mutate({
        formdata: {
          counsellor_id,
          user_id,
        },
      });
    }
  };

  let content = null;

  content = (
    <form className="p-5" onSubmit={handleSubmit}>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="number"
          name="floating_trainer_id"
          id="floating_trainer_id"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
          placeholder=""
          defaultValue={counsellor_id}
          onChange={(e) => set_counsellor_id(e.target.value)}
          required
        />
        <label
          htmlFor="floating_trainer_id"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Counsellor ID
        </label>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="floating_role_student_id"
          id="floating_role_student_id"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
          placeholder=""
          defaultValue={user_id}
          onChange={(e) => set_user_id(e.target.value)}
          required
        />
        <label
          htmlFor="floating_role_student_id"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Student ID
        </label>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {isSubmitLoading ? (
          <Loader color="white" size="lg" variant="dots" />
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );

  return (
    <>
      <Breadcrumb title="Counsellor Map" />
      <div className="my-12">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg section-bg p-2">
          {content}
        </div>
      </div>
    </>
  );
};
export default CounsellorMap;

import { useMutation } from "react-query";
import Breadcrumb from "../layouts/Breadcrumb";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { postAdminChangePassword } from "../../hooks/admin/accountSettingApi";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirm] = useState("");

  const { mutate, isLoading: submitLoading } = useMutation(
    postAdminChangePassword,
    {
      onSuccess: () => {
        toast.success("Successfully Saved");
        setPassword("");
        setPasswordConfirm("");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password == "") {
      toast.error("Password field is required");
      return;
    }

    if (password_confirmation == "") {
      toast.error("Confirm Password field is required");
      return;
    }
    if (password != password_confirmation) {
      toast.error("Password not matched!");
      return;
    }

    if (!submitLoading) {
      mutate({
        formdata: {
          password,
          password_confirmation,
        },
      });
    }
  };

  return (
    <>
      <Breadcrumb title="Change Password" />

      <div className="my-12 h-screen">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg section-bg p-2">
          <form className="p-5" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="repeat-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Repeat password
              </label>
              <input
                type="password"
                id="repeat-password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {!submitLoading ? "Change Password" : "Changing Password..."}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;

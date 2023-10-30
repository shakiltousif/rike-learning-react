import { useEffect, useState } from "react";
import Breadcrumb from "../layouts/Breadcrumb";
import { useMutation } from "react-query";
import { postChangeTeamLeader } from "../../hooks/trainer/trainerApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ChangeTeamLeader() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(postChangeTeamLeader, {
    onSuccess: (response) => {
      if (response?.data?.success) {
        toast.success(response?.data?.success);
      }
    },
    onError: (error) => {
      if (error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      } else {
        toast.error("something went wrong");
      }
    },
  });

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

  const [formData, setFormData] = useState({
    id_number: "",
  });

  const validateForm = () => {
    // Validate the 'amount' field
    if (!formData.id_number) {
      toast.error("Id Number is required");
      return true;
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate the form fields
    const validationErrors = validateForm();

    if (!validationErrors && !isLoading) {
      mutate({
        formdata: formData,
      });
    }
  };
  return (
    <>
      <>
        <Breadcrumb title="Change Team Leader" />
        <div className="my-12 h-screen">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white dark:bg-gray-900 p-2">
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="id_number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Team Leader ID
                </label>
                <input
                  value={formData.id_number}
                  onChange={(e) =>
                    setFormData({ ...formData, id_number: e.target.value })
                  }
                  type="number"
                  step={"any"}
                  id="id_number"
                  className={`shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light ${" border-gray-300"}`}
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </>
    </>
  );
}

export default ChangeTeamLeader;

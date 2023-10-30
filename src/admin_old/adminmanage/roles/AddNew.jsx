import { useEffect, useState } from "react";
import Breadcrumb from "../../layouts/Breadcrumb.jsx";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader } from "@mantine/core";
import {
  getAdminRolesCreateInfo,
  postAdminRolesCreate,
} from "../../../hooks/admin/adminManageApi.js";
import RoleSkeleton from "../../../components/Skeleton/admin/roles/RoleSkeleton.jsx";

const AddRole = () => {
  //   const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const navigate = useNavigate();

  const { isLoading } = useQuery(
    "getAdminUserCreateInfo",
    getAdminRolesCreateInfo,
    {
      onSuccess: (response) => {
        if (response?.data?.data?.roles) {
          //   setRoles(response?.data?.data?.roles);
          setPermissions(response?.data?.data?.permissions);
        }
      },
    }
  );

  const { isLoading: isSubmitLoading, mutate } = useMutation(
    postAdminRolesCreate,
    {
      onSuccess: (response) => {
        toast.success("Successfully Created");
        navigate(`/admin/role/${response?.data?.data?.id}`);
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

  const [name, set_name] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handleCheckboxChange = (event) => {
    const permissionName = event.target.value;
    if (event.target.checked) {
      setSelectedPermissions((prevPermissions) => [
        ...prevPermissions,
        permissionName,
      ]);
    } else {
      setSelectedPermissions((prevPermissions) =>
        prevPermissions.filter((perm) => perm !== permissionName)
      );
    }
  };

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
          name,
          permissions: selectedPermissions,
        },
      });
    }
  };

  const convertToReadableFormat = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  let content = null;

  if (isLoading) content = <RoleSkeleton />;

  if (!isLoading)
    content = (
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_role_name"
            id="floating_role_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder=""
            defaultValue={name}
            onChange={(e) => set_name(e.target.value)}
            required
          />
          <label
            htmlFor="floating_role_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Role Name
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <h2 className="text-xl font-bold mb-4 dark:text-white text-black">
            Select Permissions:
          </h2>
          <div className="grid md:grid-cols-2 grid-cols-1">
            {permissions?.length != 0 &&
              permissions.map((permission, key) => (
                <div key={key} className="flex items-center mb-4">
                  <input
                    id={permission.name}
                    type="checkbox"
                    className="w-5 h-5 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    value={permission.name}
                    onChange={handleCheckboxChange}
                    checked={selectedPermissions.includes(permission.name)}
                  />
                  <label
                    htmlFor={permission.name}
                    className="ml-2 text-lg font-medium dark:text-white text-black"
                  >
                    <span className="ml-2">
                      {convertToReadableFormat(permission.name)}
                    </span>
                  </label>
                </div>
              ))}
          </div>
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
      <Breadcrumb title="Add Role" />
      <div className="my-12">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg section-bg p-2">
          {content}
        </div>
      </div>
    </>
  );
};
export default AddRole;

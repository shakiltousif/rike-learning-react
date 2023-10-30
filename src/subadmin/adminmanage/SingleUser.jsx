import { useEffect, useState } from "react";
import Breadcrumb from "../layouts/Breadcrumb.jsx";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import FormSkeleton from "../../components/Skeleton/admin/student/FormSkeleton.jsx";
import objectToFormData from "../../components/ObjectToFormData.jsx";
import { toast } from "react-hot-toast";
import { Loader } from "@mantine/core";
import {
  getAdminSingleUser,
  postAdminSingleUserBalanceEdit,
  postAdminSingleUserEdit,
} from "../../hooks/admin/adminManageApi.js";
import UpdateBalanceModal from "../../components/admin/UpdateBalanceModal.jsx";
import TrnasactionList from "../../components/admin/TransactionList.jsx";
import { userCan } from "../../hooks/common/useAuth.js";

const SingleUser = () => {
  const [countries, setCountries] = useState([]);
  const [roles, setRoles] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const params = useParams();
  const userId = params?.userId;

  const { isLoading, refetch } = useQuery(
    "getAdminUserCreateInfo",
    () => getAdminSingleUser(userId),
    {
      onSuccess: (response) => {
        if (response?.data?.data?.roles) {
          setCountries(response?.data?.data?.countries);
          setRoles(response?.data?.data?.roles);
          setUser(response?.data?.data?.user);
          setTransactions(response?.data?.data?.transactions);
        }
      },
    }
  );

  const { isLoading: isSubmitLoading, mutate } = useMutation(
    postAdminSingleUserEdit,
    {
      onSuccess: () => {
        toast.success("Successfully Saved!");
        refetch();
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
    toast.dismiss();
    mutate({
      Id: userId,
      formdata: objectToFormData({
        name,
        email,
        password,
        phone_number,
        area_code,
        address,
        role_name,
      }),
    });
  };

  const [name, set_name] = useState("");
  const [email, set_email] = useState("");
  const [password, setPassword] = useState("");
  const [role_name, set_role_name] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const [area_code, set_area_code] = useState("");
  const [address, set_address] = useState("");

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

  useEffect(() => {
    if (user?.id) {
      set_name(user?.name);
      set_email(user?.email);
      set_role_name(user?.roles?.[0]?.name);
      set_phone_number(user?.mobile_number);
      set_area_code(user?.area_code);
      set_address(user?.address);
    }
  }, [user]);

  let content = null;

  if (isLoading) content = <FormSkeleton />;

  if (!isLoading)
    content = (
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder=""
            defaultValue={email}
            onChange={(e) => set_email(e.target.value)}
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_name"
              id="floating_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder=" "
              defaultValue={name}
              onChange={(e) => set_name(e.target.value)}
              required
            />
            <label
              htmlFor="floating_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <select
              id="code"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={`+${area_code}`}
              onChange={(e) => set_area_code(e.target.value)}
            >
              <option value={""}>Select Code</option>
              {countries?.length != 0 &&
                countries?.map((country, key) => (
                  <option key={key} value={country?.phonecode}>
                    {country?.phonecode}
                  </option>
                ))}
            </select>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="tel"
              name="floating_phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder=" "
              defaultValue={phone_number}
              onChange={(e) => set_phone_number(e.target.value)}
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (123-456-7890)
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Address
          </label>
          <textarea
            id="address"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write Your Address..."
            defaultValue={address}
            onChange={(e) => set_address(e.target.value)}
          ></textarea>
        </div>

        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <select
              id="role_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={`${role_name}`}
              onChange={(e) => set_role_name(e.target.value)}
            >
              <option value={""}>Select Role</option>
              {roles?.length != 0 &&
                roles?.map((role, key) => (
                  <option key={key} value={role?.name}>
                    {role?.name}
                  </option>
                ))}
            </select>
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
      <Breadcrumb title="Single User" />

      <div className="my-12">
        <div className="flex justify-between items-center">
          {!isLoading && userCan("manage_passbook") && (
            <TrnasactionList transactions={transactions ? transactions : []} />
          )}

          {!isLoading && (
            <div className="my-4 flex justify-end">
              {userCan("manage_user_balance") && (
                <UpdateBalanceModal
                  mutationFn={postAdminSingleUserBalanceEdit}
                  Id={userId}
                  refetchFn={refetch}
                  currentBalance={user?.balance}
                />
              )}
            </div>
          )}
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg section-bg p-2">
          {content}
        </div>
      </div>
    </>
  );
};
export default SingleUser;

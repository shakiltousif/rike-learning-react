import { useEffect, useState } from "react";
import Breadcrumb from "../layouts/Breadcrumb.jsx";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import FormSkeleton from "../../components/Skeleton/admin/student/FormSkeleton.jsx";
import objectToFormData from "../../components/ObjectToFormData.jsx";
import { toast } from "react-hot-toast";
import { Loader } from "@mantine/core";
import {
  getAdminAuth,
  getAdminCountry,
  postAdminProfileEdit,
} from "../../hooks/admin/accountSettingApi.js";
import ImageUpload from "../../components/FormFields/ImageUpload.jsx";
import SeniorCounsellorMapModal from "../../components/admin/common/SeniorCounsellorMapModal.jsx";

const SingleUser = () => {
  const [countries, setCountries] = useState([]);
  //   const [roles, setRoles] = useState([]);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const { isLoading, refetch } = useQuery("getAdminAuth", getAdminAuth, {
    onSuccess: (response) => {
      if (response?.data) {
        // setCountries(response?.data?.data?.countries);
        // setRoles(response?.data?.data?.roles);
        setUser(response?.data);
      }
    },
  });

  const { isLoading: countryLoading } = useQuery(
    "getAdminCountry",
    getAdminCountry,
    {
      onSuccess: (response) => {
        if (response?.data?.data?.countries?.data) {
          setCountries(response?.data?.data?.countries?.data);
        }
      },
    }
  );

  const { isLoading: isSubmitLoading, mutate } = useMutation(
    postAdminProfileEdit,
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
      formdata: objectToFormData({
        name,
        email,
        image: image ? image : "",
        phone_number,
        area_code,
        address,
        country,
        state,
        city,
        fb_link,
        yt_link,
        postal_code,
      }),
    });
  };

  const [name, set_name] = useState("");
  const [email, set_email] = useState("");
  const [image, setImage] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const [area_code, set_area_code] = useState("");
  const [address, set_address] = useState("");
  const [country, set_country] = useState("");
  const [state, set_state] = useState("");
  const [city, set_city] = useState("");
  const [postal_code, set_postal_code] = useState("");
  const [fb_link, set_fb_link] = useState("");
  const [yt_link, set_yt_link] = useState("");

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
      set_phone_number(user?.mobile_number);
      set_area_code(user?.area_code);
      set_address(user?.address);
      setImage(user?.image);
      set_country(user?.country);
      set_city(user?.city);
      set_state(user?.state);
      set_postal_code(user?.postal_code);
      set_yt_link(user?.yt_link);
      set_fb_link(user?.fb_link);
    }
  }, [user]);

  let content = null;

  if (isLoading || countryLoading) content = <FormSkeleton />;

  if (!isLoading && !countryLoading)
    content = (
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_role"
              id="floating_role"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
              readOnly
              value={user?.roles?.[0]?.name}
            />
            <label
              htmlFor="floating_role"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Account Type
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_referral_code"
              id="floating_referral_code"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
              readOnly
              value={user?.referral_code}
            />
            <label
              htmlFor="floating_referral_code"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              ID
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_balance"
              id="floating_balance"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
              readOnly
              value={` ৳${user.balance}`}
            />
            <label
              htmlFor="floating_balance"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Balance
            </label>
          </div>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="user_avatar"
          >
            Upload file
          </label>
          {/* <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
          /> */}
          <ImageUpload
            circle
            id={"image"}
            placeHolder={"Profile Picture"}
            url={image}
            InputChange={(e) => setImage(e.target.files[0])}
            className={"md:w-[10%] w-[40%] "}
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            A profile picture is useful to confirm your are logged into your
            account
          </div>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder=""
            value={email}
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
        <div className="grid md:grid-cols-1 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_name"
              id="floating_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder=" "
              value={name}
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
            {countries?.length != 0 && !isLoading ? (
              <select
                id="code"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#422e9d] dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={`+${area_code}`}
                onChange={(e) => set_area_code(e.target.value)}
              >
                <option value={"0"}>Select Code</option>
                {countries?.length != 0 &&
                  countries?.map((country, key) => (
                    <option key={key} value={country?.phonecode}>
                      {country?.phonecode}
                    </option>
                  ))}
              </select>
            ) : (
              <select
                id="code"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#422e9d] dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={`+${area_code}`}
                onChange={(e) => set_area_code(e.target.value)}
              >
                <option value={""}>Select Code</option>
              </select>
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="tel"
              name="floating_phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
              placeholder=" "
              value={phone_number}
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
            value={address}
            onChange={(e) => set_address(e.target.value)}
          ></textarea>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_fb_link"
            id="floating_fb_link"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
            placeholder=""
            value={fb_link}
            onChange={(e) => set_fb_link(e.target.value)}
            required
          />
          <label
            htmlFor="floating_fb_link"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Facebook Profile Link
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_yt_link"
            id="floating_yt_link"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
            placeholder=""
            value={yt_link}
            onChange={(e) => set_yt_link(e.target.value)}
            required
          />
          <label
            htmlFor="floating_yt_link"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Youtube Link
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_country"
            id="floating_country"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
            placeholder=""
            value={country}
            onChange={(e) => set_country(e.target.value)}
            required
          />
          <label
            htmlFor="floating_country"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Country
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_state"
            id="floating_state"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
            placeholder=""
            value={state}
            onChange={(e) => set_state(e.target.value)}
            required
          />
          <label
            htmlFor="floating_state"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            State
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_city"
            id="floating_city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
            placeholder=""
            value={city}
            onChange={(e) => set_city(e.target.value)}
            required
          />
          <label
            htmlFor="floating_city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            City
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_postal_code"
            id="floating_postal_code"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
            placeholder=""
            value={postal_code}
            onChange={(e) => set_postal_code(e.target.value)}
            required
          />
          <label
            htmlFor="floating_postal_code"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Postal Code
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
      <Breadcrumb title="Update Profile" />

      <div className="my-12">
        {!isLoading &&
          user?.roles?.[0]?.name == "Counsellor" &&
          !user?.senior_counsellor_id && <SeniorCounsellorMapModal />}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-opacity-10 backdrop-blur-lg rounded drop-shadow-lg bg-white p-2">
          {content}
        </div>
      </div>
    </>
  );
};
export default SingleUser;

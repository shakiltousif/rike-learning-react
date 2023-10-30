import { useState, useEffect } from "react";
import Breadcrumb from "../student/layouts/Breadcrumb";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-hot-toast";
import { Loader } from "@mantine/core";
import {
  getStudentProfile,
  postStudentProfileSave,
} from "../hooks/student/studentApi";
import ImageUpload from "../components/FormFields/ImageUpload";
import objectToFormData from "../components/ObjectToFormData";
import FormSkeleton from "../components/Skeleton/student/FormSkeleton";

const EditProfile = () => {
  const [student, setStudent] = useState({});
  const [user, setUser] = useState({});
  const [countries, setCountries] = useState([]);
  const [leader_user, setLeaderUser] = useState([]);
  const [trainer_user, setTrainerUser] = useState([]);

  const { isLoading, refetch } = useQuery(
    "getSingleStudent",
    () => getStudentProfile(),
    {
      onSuccess: (response) => {
        if (response?.data?.data?.student) {
          setStudent(response?.data?.data?.student);
          setUser(response?.data?.data?.user);
          setCountries(response?.data?.data?.countries);
          setLeaderUser(response?.data?.data?.leader_u);
          setTrainerUser(response?.data?.data?.instructorsData);
        }
      },
    }
  );

  const { isLoading: isSubmitLoading, mutate } = useMutation(
    postStudentProfileSave,
    {
      onSuccess: () => {
        toast.success("Successfully Saved");
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

    mutate({
      Id: student?.uuid,
      formdata: objectToFormData({
        first_name,
        last_name,
        email,
        password,
        image: typeof image == "object" ? image : "",
        phone_number,
        area_code,
        address,
        gender,
        about_me,
        country,
        state,
        city,
        fb_link,
        yt_link,
        postal_code,
      }),
    });
  };

  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, set_email] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const [area_code, set_area_code] = useState("0");
  const [address, set_address] = useState("");
  const [gender, set_gender] = useState("");
  const [about_me, set_about_me] = useState("");
  const [country, set_country] = useState("");
  const [state, set_state] = useState("");
  const [city, set_city] = useState("");
  const [postal_code, set_postal_code] = useState("");
  const [fb_link, set_fb_link] = useState("");
  const [yt_link, set_yt_link] = useState("");

  useEffect(() => {
    if (student?.uuid) {
      set_first_name(student?.first_name);
      set_last_name(student?.last_name);
      set_email(user?.email);
      set_phone_number(user?.mobile_number);
      set_area_code(user?.area_code);
      set_address(student?.address);
      set_gender(student?.gender);
      set_about_me(student?.about_me);
      set_country(user?.country);
      set_city(user?.city);
      set_state(user?.state);
      set_postal_code(user?.postal_code);
      set_yt_link(user?.yt_link);
      set_fb_link(user?.fb_link);
      setImage(user?.image != null ? user?.image : false);
    }
  }, [student, user]);

  let content = null;

  if (isLoading) content = <FormSkeleton />;

  if (!isLoading)
    content = (
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="relative z-0 w-full mb-12 group px-8 py-12 w-40">
          <label
            className="block mb-2 text-xl font-medium text-white"
            htmlFor="user_avatar"
          >
            Upload file
          </label>
          <ImageUpload
            
            id={"image"}
            placeHolder={"Profile Picture"}
            url={image}
            InputChange={(e) => setImage(e.target.files[0])}
            className="border border-2 border-white"
          />
          <div
            className="mt-1 text-md text-white"
            id="user_avatar_help"
          >
            A profile picture is useful to confirm your are logged into your
            account
          </div>
        </div>

        {/* <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-blue-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
            placeholder=""
            defaultValue={email}
            onChange={(e) => set_email(e.target.value)}
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div> */}
       

        {/* <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-white"
          >
            Select gender
          </label>
          {!isLoading && (
            <select
              id="gender"
              className="bg-gray-50 border border-blue-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={gender ? gender : ""}
              onChange={(e) => set_gender(e.target.value)}
            >
              <option value={""}>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          )}
        </div> */}

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-blue-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
              placeholder=" "
              defaultValue={first_name}
              onChange={(e) => set_first_name(e.target.value)}
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-blue-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
              placeholder=" "
              defaultValue={last_name}
              onChange={(e) => set_last_name(e.target.value)}
              required
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>

         <div className="relative z-0 w-full mb-6 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-blue-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>

        {/* <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            {countries?.length != 0 && !isLoading ? (
              <select
                id="code"
                className="bg-gray-50 border border-blue-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="bg-gray-50 border border-blue-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={`+${area_code}`}
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
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-blue-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
              placeholder=" "
              defaultValue={phone_number}
              onChange={(e) => set_phone_number(e.target.value)}
              required
            />
            <label
              htmlFor="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (123-456-7890)
            </label>
          </div>
        </div> */}

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_fb_link"
            id="floating_fb_link"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-blue-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
            placeholder=""
            defaultValue={fb_link}
            onChange={(e) => set_fb_link(e.target.value)}
            required
          />
          <label
            htmlFor="floating_fb_link"
            className="peer-focus:font-medium absolute text-sm text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Facebook Profile Link
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_yt_link"
            id="floating_yt_link"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-blue-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
            placeholder=""
            defaultValue={yt_link}
            onChange={(e) => set_yt_link(e.target.value)}
            required
          />
          <label
            htmlFor="floating_yt_link"
            className="peer-focus:font-medium absolute text-sm text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Youtube Link
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your Address
          </label>
          <textarea
            id="address"
            rows="4"
            className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-blue-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write Your Address..."
            defaultValue={address}
            onChange={(e) => set_address(e.target.value)}
          ></textarea>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_country"
            id="floating_country"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-blue-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
            placeholder=""
            defaultValue={country}
            onChange={(e) => set_country(e.target.value)}
            required
          />
          <label
            htmlFor="floating_country"
            className="peer-focus:font-medium absolute text-sm text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Country
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_state"
            id="floating_state"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-blue-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
            placeholder=""
            defaultValue={state}
            onChange={(e) => set_state(e.target.value)}
            required
          />
          <label
            htmlFor="floating_state"
            className="peer-focus:font-medium absolute text-sm text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            State
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_city"
            id="floating_city"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-blue-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
            placeholder=""
            defaultValue={city}
            onChange={(e) => set_city(e.target.value)}
            required
          />
          <label
            htmlFor="floating_city"
            className="peer-focus:font-medium absolute text-sm text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            City
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_postal_code"
            id="floating_postal_code"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-blue-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
            placeholder=""
            defaultValue={postal_code}
            onChange={(e) => set_postal_code(e.target.value)}
            required
          />
          <label
            htmlFor="floating_postal_code"
            className="peer-focus:font-medium absolute text-sm text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Postal Code
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-white"
          >
            About
          </label>
          <textarea
            id="about_me"
            rows="4"
            className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-blue-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write About..."
            defaultValue={about_me}
            onChange={(e) => set_about_me(e.target.value)}
          ></textarea>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_team_leader"
            id="floating_team_leader"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-blue-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
            placeholder=""
            readOnly
            value={
              leader_user?.id
                ? `${leader_user?.name} ID: ${leader_user?.referral_code}`
                : "No Team Leader Assigned Yet"
            }
          />
          <label
            htmlFor="floating_team_leader"
            className="peer-focus:font-medium absolute text-sm text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Team Leader
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_trainer"
            id="floating_trainer"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-blue-300 appearance-none text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 "
            placeholder=""
            readOnly
            value={
              trainer_user
                ? `${trainer_user?.name} ID: ${trainer_user?.referral_code}`
                : "No Trainer Assigned Yet"
            }
          />
          <label
            htmlFor="floating_trainer"
            className="peer-focus:font-medium absolute text-sm text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Trainer
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
      <Breadcrumb title="Edit Profile" />
      <div className="container mx-auto my-5 p-5">
        <div className="my-12">

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 p-6">
            <div className="text-center font-bold text-2xl bg-blue-400 py-2 text-white mb-5">
              <h1>Update Your Profile</h1>
            </div>
            {content}
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProfile;

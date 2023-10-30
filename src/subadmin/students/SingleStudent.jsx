import { useState, useEffect } from "react";
import Breadcrumb from "../layouts/Breadcrumb.jsx";
import { useMutation, useQuery } from "react-query";
import {
  getSingleStudent,
  postAdminSingleStudentBalanceEdit,
  postEditStudent,
} from "../../hooks/admin/studentApi.js";
import { useParams } from "react-router-dom";
import FormSkeleton from "../../components/Skeleton/admin/student/FormSkeleton.jsx";
import ImageUpload from "../../components/FormFields/ImageUpload.jsx";
import objectToFormData from "../../components/ObjectToFormData.jsx";
import { toast } from "react-hot-toast";
import { Loader } from "@mantine/core";
import UpdateBalanceModal from "../../components/admin/UpdateBalanceModal.jsx";
import { userCan } from "../../hooks/common/useAuth.js";
import TrnasactionList from "../../components/admin/TransactionList.jsx";

const SingleStudent = () => {
  const [student, setStudent] = useState({});
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [countries, setCountries] = useState([]);
  const params = useParams();
  const studentId = params?.studentId;
  const { isLoading, refetch } = useQuery(
    "getSingleStudent",
    () => getSingleStudent(studentId),
    {
      onSuccess: (response) => {
        if (response?.data?.data?.student) {
          setStudent(response?.data?.data?.student);
          setUser(response?.data?.data?.user);
          setCountries(response?.data?.data?.countries);
          setTransactions(response?.data?.data?.transactions);
        }
      },
    }
  );

  const { isLoading: isSubmitLoading, mutate } = useMutation(postEditStudent, {
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
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({
      Id: studentId,
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
      setImage(user?.image != null ? user?.image : false);
    }
  }, [student, user]);

  let content = null;

  if (isLoading) content = <FormSkeleton />;

  if (!isLoading)
    content = (
      <form className="p-5" onSubmit={handleSubmit}>
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
        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select gender
          </label>
          {!isLoading && (
            <select
              id="gender"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={gender ? gender : ""}
              onChange={(e) => set_gender(e.target.value)}
            >
              <option value={""}>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          )}
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder=" "
              defaultValue={first_name}
              onChange={(e) => set_first_name(e.target.value)}
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder=" "
              defaultValue={last_name}
              onChange={(e) => set_last_name(e.target.value)}
              required
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            {countries?.length != 0 && !isLoading ? (
              <select
                id="code"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            About
          </label>
          <textarea
            id="about_me"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder=""
            readOnly
            value={
              user?.team_leader?.id
                ? `${user?.team_leader?.name} ID: ${user?.team_leader?.referral_code}`
                : "No Team Leader Assigned Yet"
            }
          />
          <label
            htmlFor="floating_team_leader"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Team Leader
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_trainer"
            id="floating_trainer"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
            placeholder=""
            readOnly
            value={
              user?.trainer_network?.trainer_user?.id
                ? `${user?.trainer_network?.trainer_user?.name} ID: ${user?.trainer_network?.trainer_user?.referral_code}`
                : "No Trainer Assigned Yet"
            }
          />
          <label
            htmlFor="floating_trainer"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Trainer
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
      <Breadcrumb title="Single Student" />
      <div className="my-12">
        <div className="flex justify-between items-center">
          {!isLoading && userCan("manage_passbook") && (
            <TrnasactionList transactions={transactions ? transactions : []} />
          )}

          {!isLoading && (
            <div className="my-4 flex justify-end">
              {userCan("manage_user_balance") && (
                <UpdateBalanceModal
                  mutationFn={postAdminSingleStudentBalanceEdit}
                  Id={studentId}
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
export default SingleStudent;

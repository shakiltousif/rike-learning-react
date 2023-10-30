import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../layouts/Breadcrumb";
import { dateformat } from "../../helpers/helper.js";
import { useQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@mantine/core";
import { getTrainerStudentList } from "../../hooks/trainer/trainerApi";
import { BASE_ASSETS_URL } from "../../config/basic";
import user_image from "../../assets/user_image.png";

const AllStudents = () => {
  const [count, setCount] = useState(25);
  const [search_string, setSearchString] = useState(false);
  const increase = 25;
  const colSpan = 9;
  const {
    data: students,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuery("getTrainerStudentList", () =>
    getTrainerStudentList({ count, search_string })
  );

  const navigate = useNavigate();

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
    refetch();
  }, [count, refetch, search_string]);
  let content = null;
  if (isLoading)
    content = (
      <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white">
        <td colSpan={colSpan} className="text-center text-white">
          <div className="text-center flex justify-center items-center my-6">
            <Loader color="white" size="lg" variant="dots" />
          </div>
        </td>
      </tr>
    );

  if (!isLoading && isError)
    content = (
      <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white">
        <td
          colSpan={colSpan}
          className="text-center text-white py-6"
        >{`${error?.error}`}</td>
      </tr>
    );

  if (!isLoading && students?.data?.data?.length === 0)
    content = (
      <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Student Found!
        </td>
      </tr>
    );

  if (!isLoading && students?.data?.data?.length > 0)
    content = students?.data?.data?.map((student, key) => (
      <tr
        key={key}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td
          data-label={"Serial"}
          className="px-6 py-4"
        >
          {key + 1}
        </td>

        <td
          data-label={"Image"}
          className="px-6 py-4"
        >
          <p className="flex justify-end">
            <img
              className="w-10"
              src={
                student?.user?.image
                  ? `${BASE_ASSETS_URL}${student?.user?.image}`
                  : user_image
              }
            />
          </p>
        </td>
        <td
          data-label={""}
          className="px-6 py-4"
        >
          <p className="font-bold block md:hidden">Details</p> <br />
          Student ID: {student?.user?.referral_code}
          <br />
          Name: {student?.user?.name}
          <br />
          Email: {student?.user?.email}
          <br />
          Phone: {student?.user?.phone_number}
          <br />
          Join Date:{" "}
          {student?.student?.approved_at
            ? new Date(student?.student?.approved_at).toLocaleString()
            : ""}
          <br />
          <p className="mt-4">
            <a
              href={`https://api.whatsapp.com/send?phone=${student?.user?.area_code}${student?.user?.mobile_number}`}
              className="bg-purple-500 text-white p-2 rounded-lg"
              target="_blank"
              rel="noreferrer"
            >
              Whatsapp
            </a>
          </p>
          <br />
        </td>

        <td
          data-label={""}
          className="px-6 py-4"
        >
          <p className="font-bold block md:hidden">Reference</p> <br />
          ID : {student?.user?.references?.reffered_user?.referral_code}
          <br />
          Name : {student?.user?.references?.reffered_user?.name}
          <br />
        </td>
        <td
          data-label={""}
          className="px-6 py-4"
        >
          <p className="font-bold block md:hidden">Team Leader</p> <br />
          ID:{" "}
          {student?.user?.team_leader?.referral_code
            ? student?.user?.team_leader?.referral_code
            : ""}
          <br />
          Name:{" "}
          {student?.user?.team_leader?.name
            ? student?.user?.team_leader?.name
            : ""}
          <br />
          <p className="mt-4">
            <a
              href={`https://api.whatsapp.com/send?phone=${student?.user?.team_leader?.mobile_number}`}
              className="bg-purple-500 text-white p-2 rounded-lg"
              rel="noreferrer"
              target="_blank"
            >
              Whatsapp
            </a>
          </p>
        </td>

        <td
          data-label={"Status"}
          className="px-6 py-4"
        >
          <div className="flex items-center justify-end gap-2">
            {student?.status == 1
              ? "Active"
              : student?.status == 2
              ? "Blocked"
              : "Inactive"}
          </div>
        </td>

        <td
          data-label={"Date"}
          className="px-6 py-4"
        >
          {dateformat(student?.created_at)}
        </td>
      </tr>
    ));

  return (
    <>
      <Breadcrumb title="All Student" />
      <div className="container mx-auto my-5 p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white dark:bg-gray-900 p-2 table-wrapper">
          <div className="pb-4 bg-white dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                onChange={(e) => {
                  setSearchString(e.target.value);
                }}
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search By Refferal Code Or Phone Number"
              />
            </div>
          </div>
          <InfiniteScroll
            dataLength={
              students?.data?.data?.length ? students?.data?.data?.length : 0
            }
            next={() => {
              setCount((prev) => prev + increase);
            }}
            hasMore={students?.data?.data?.length == count && !search_string}
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    SL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Details
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Reference
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Team Leader
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>{content}</tbody>
            </table>
          </InfiniteScroll>
          {isFetching && (
            <div className="text-center flex justify-center items-center my-6">
              <Loader color="white" size="lg" variant="dots" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default AllStudents;

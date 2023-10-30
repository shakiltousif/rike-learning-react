import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../layouts/Breadcrumb";
import { dateformat } from "../../helpers/helper.js";
import { useQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@mantine/core";
import {
  deleteCounsellorUser,
  getCounsellorList,
} from "../../hooks/admin/adminCommonApi";
import DeleteModal from "../../components/DeleteModal";
import TrashIcon from "../../components/Icons/TrashIcon";

const TeamLeaderList = () => {
  const [search_string, setSearchString] = useState(false);
  const [count, setCount] = useState(25);
  const increase = 25;
  const colSpan = 8;
  const {
    data: counsellors,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuery("getCounsellorList", () =>
    getCounsellorList({ count, search_string })
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
      <tr className="bg-transparent border-b">
        <td colSpan={colSpan} className="text-center text-white">
          <div className="text-center flex justify-center items-center my-6">
            <Loader color="white" size="lg" variant="dots" />
          </div>
        </td>
      </tr>
    );

  if (!isLoading && isError)
    content = (
      <tr className="bg-transparent border-b">
        <td
          colSpan={colSpan}
          className="text-center text-white py-6"
        >{`${error?.error}`}</td>
      </tr>
    );

  if (!isLoading && counsellors?.data?.data?.length === 0)
    content = (
      <tr className="bg-transparent border-b">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Counsellor Found!
        </td>
      </tr>
    );

  if (!isLoading && counsellors?.data?.data?.length > 0)
    content = counsellors?.data?.data?.map((counsellor, key) => (
      <tr
        key={key}
        className="bg-transparent border-b"
      >
        <td
          data-label="SL"
          className="text-black dark:text-white block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-900 whitespace-nowrap px-6 p-4"
        >
          {key + 1}
        </td>
        <th
          scope="row"
          data-label="ID"
          className="text-black dark:text-white block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-900 whitespace-nowrap px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {counsellor?.referral_code}
        </th>
        <th
          scope="row"
          data-label="Name"
          className="text-black dark:text-white block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-900 whitespace-nowrap px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {counsellor?.name}
        </th>
        <td
          data-label="Email"
          className="text-black dark:text-white block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-900 whitespace-nowrap px-6 py-4"
        >
          {counsellor?.email}
        </td>
        <td
          data-label="Total Student"
          className="text-black dark:text-white block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-900 whitespace-nowrap px-6 py-4"
        >
          {counsellor?.counsellor_assigned_user?.length}
        </td>
        <td
          data-label="Date"
          className="text-black dark:text-white block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-900 whitespace-nowrap px-6 py-4"
        >
          {dateformat(counsellor?.created_at)}
        </td>
        <td data-label={"Action"} className="px-6 py-4">
          <div className="flex items-center justify-end gap-2">
            <Link
              to={`/admin/counsellor/${counsellor?.id}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </Link>
            <DeleteModal
              buttonText={<TrashIcon />}
              mutationFn={deleteCounsellorUser}
              deleteId={counsellor?.id}
              refetchFn={refetch}
            />
          </div>
        </td>
      </tr>
    ));

  return (
    <>
      <Breadcrumb title="Counsellors" />
      <div className="container mx-auto my-5 p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-opacity-10 backdrop-blur-lg rounded drop-shadow-lg bg-white p-2 table-wrapper">
          <div className="pb-4">
            <div className="my-4">
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
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#422e9d] dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search By Refferal Code Or Phone Number"
                />
              </div>
            </div>
          </div>

          <InfiniteScroll
            dataLength={
              counsellors?.data?.data?.length
                ? counsellors?.data?.data?.length
                : 0
            }
            next={() => {
              setCount((prev) => prev + increase);
            }}
            hasMore={counsellors?.data?.data?.length == count}
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-transparent text-white">
                <tr>
                  <th scope="col" className="p-4">
                    SL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Student
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
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
export default TeamLeaderList;

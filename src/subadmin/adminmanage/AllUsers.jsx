import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../layouts/Breadcrumb";
import { dateformat } from "../../helpers/helper.js";
import { Loader } from "@mantine/core";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  deleteAdminUser,
  getAdminUsers,
} from "../../hooks/admin/adminManageApi";
import { useQuery } from "react-query";
import DeleteModal from "../../components/DeleteModal";
import TrashIcon from "../../components/Icons/TrashIcon";

const AllUsers = () => {
  const [search_string, setSearchString] = useState(false);

  const [count, setCount] = useState(25);
  const increase = 25;
  const colSpan = 10;
  const {
    data: users,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuery("getAdminUsers", () => getAdminUsers({ count, search_string }));

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

  if (!isLoading && users?.data?.data?.users.length === 0)
    content = (
      <tr className="bg-transparent border-b">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No User Found!
        </td>
      </tr>
    );

  if (!isLoading && users?.data?.data?.users.length > 0)
    content = users?.data?.data?.users.map((user, key) => (
      <tr
        key={key}
        className="bg-transparent border-b"
      >
        <td data-label={"Serial"} className="px-6 py-4">
          {key + 1}
        </td>
        <td data-label={"Name"} className="px-6 py-4">
          {user?.name}
        </td>
        <td data-label={"Email"} className="px-6 py-4">
          {user?.email}
        </td>
        <td data-label={"Mobile"} className="px-6 py-4">
          <p className="mt-4">
            <a
              href={`https://api.whatsapp.com/send?phone=${user?.area_code}${user?.mobile_number}`}
              rel="noreferrer"
              className="bg-purple-500 text-white p-2 rounded-lg"
              target="_blank"
            >
              Whatsapp
            </a>
          </p>
        </td>
        <td data-label={"Role"} className="px-6 py-4">
          {user?.roles?.[0]?.name}
        </td>
        <td data-label={"Address"} className="px-6 py-4">
          {user?.address}
        </td>
        <td data-label={"Balance"} className="px-6 py-4">
          {user?.balance}
        </td>
        <td data-label={"Date"} className="px-6 py-4">
          {dateformat(user?.created_at)}
        </td>
        <td data-label={"Action"} className="px-6 py-4">
          <div className="flex items-center justify-end gap-2">
            <Link
              to={`/admin/user/${user?.id}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </Link>
            <DeleteModal
              buttonText={<TrashIcon />}
              mutationFn={deleteAdminUser}
              deleteId={user?.id}
              refetchFn={refetch}
            />
          </div>
        </td>
      </tr>
    ));

  return (
    <>
      <Breadcrumb title="All Users" />
      <div className="container mx-auto my-5 p-5">
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
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search By Refferal Code Or Phone Number"
            />
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg section-bg p-2">
          <InfiniteScroll
            dataLength={
              users?.data?.data?.users.length
                ? users?.data?.data?.users.length
                : 0
            }
            next={() => {
              setCount((prev) => prev + increase);
            }}
            hasMore={users?.data?.data?.users.length == count}
          >
            <table className="w-full text-sm text-left text-white">
              <thead className="text-xs text-gray-700 uppercase bg-transparent text-white">
                <tr>
                  <th scope="col" className="p-6">
                    Serial
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Whatsapp
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Balance
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
export default AllUsers;

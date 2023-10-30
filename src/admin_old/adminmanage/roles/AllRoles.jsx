import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../layouts/Breadcrumb";
import { dateformat } from "../../../helpers/helper.js";
import { Loader } from "@mantine/core";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  deleteAdminRole,
  getAdminRoles,
} from "../../../hooks/admin/adminManageApi";
import { useQuery } from "react-query";
import DeleteModal from "../../../components/DeleteModal";
import TrashIcon from "../../../components/Icons/TrashIcon";

const AllUsers = () => {
  const [count, setCount] = useState(25);
  const increase = 25;
  const colSpan = 10;
  const {
    data: roles,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuery("getAdminRoles", () => getAdminRoles({ count }));

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
  }, [count, refetch]);

  let content = null;
  if (isLoading)
    content = (
      <tr className="section-bg border-b dark:text-white">
        <td colSpan={colSpan} className="text-center text-white">
          <div className="text-center flex justify-center items-center my-6">
            <Loader color="white" size="lg" variant="dots" />
          </div>
        </td>
      </tr>
    );

  if (!isLoading && isError)
    content = (
      <tr className="section-bg border-b dark:text-white">
        <td
          colSpan={colSpan}
          className="text-center text-white py-6"
        >{`${error?.error}`}</td>
      </tr>
    );

  if (!isLoading && roles?.data?.data?.roles.length === 0)
    content = (
      <tr className="section-bg border-b dark:text-white">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Roles Found!
        </td>
      </tr>
    );

  if (!isLoading && roles?.data?.data?.roles.length > 0)
    content = roles?.data?.data?.roles.map((role, key) => (
      <tr
        key={key}
        className="section-bg border-b dark:text-white"
      >
        <td
          data-label={"Serial"}
          className="px-6 py-4"
        >
          {role.id}
        </td>
        <td
          data-label={"Name"}
          className="px-6 py-4"
        >
          {role.name}
        </td>
        <td
          data-label={"Guard"}
          className="px-6 py-4"
        >
          {role.guard_name}
        </td>
        <td
          data-label={"Date"}
          className="px-6 py-4"
        >
          {dateformat(role.created_at)}
        </td>
        <td
          data-label={"Action"}
          className="px-6 py-4"
        >
          <div className="flex items-center justify-end gap-2">
            <Link
              to={`/admin/role/${role?.id}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </Link>
            <DeleteModal
              buttonText={<TrashIcon />}
              mutationFn={deleteAdminRole}
              deleteId={role?.id}
              refetchFn={refetch}
            />
          </div>
        </td>
      </tr>
    ));

  return (
    <>
      <Breadcrumb title="Roles" />
      <div className="container mx-auto my-5 p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg section-bg p-2">
          <div className="my-6">
            <Link
              to={"/admin/add_role"}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add New
            </Link>
          </div>
          <InfiniteScroll
            dataLength={
              roles?.data?.data?.roles.length
                ? roles?.data?.data?.roles.length
                : 0
            }
            next={() => {
              setCount((prev) => prev + increase);
            }}
            hasMore={roles?.data?.data?.roles.length == count}
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-white text-black">
                <tr>
                  <th scope="col" className="p-6">
                    Serial
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Guard
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

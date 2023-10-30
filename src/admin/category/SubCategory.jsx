import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AES } from "crypto-js";
// import CryptoJS from "crypto-js";
import Breadcrumb from "../layouts/Breadcrumb";
import { dateformat } from "../../helpers/helper.js";
import { useQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@mantine/core";
import DeleteModal from "../../components/DeleteModal";
import TrashIcon from "../../components/Icons/TrashIcon";
import {
  deleteSubCategory,
  getSubCategories,
} from "../../hooks/admin/categoryApi";

const SubCategory = () => {
  const [count, setCount] = useState(25);
  const increase = 25;
  const colSpan = 8;
  const {
    data: subcategories,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuery("getSubCategories", () => getSubCategories({ count }));

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

  if (!isLoading && subcategories?.data?.data?.subcategories?.length === 0)
    content = (
      <tr className="bg-transparent border-b">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No SubCategory Found!
        </td>
      </tr>
    );

  if (!isLoading && subcategories?.data?.data?.subcategories?.length > 0)
    content = subcategories?.data?.data?.subcategories?.map(
      (subcategory, key) => (
        <tr
          key={key}
          className="bg-transparent border-b"
        >
          <td className="px-6 py-4">{subcategory.id}</td>
          <td className="px-6 py-4">{subcategory.name}</td>
          <td className="px-6 py-4">{subcategory.category_id}</td>
          <td className="px-6 py-4">{dateformat(subcategory.created_at)}</td>
          <td className="px-6 py-4 flex items-center gap-4">
            <Link
              to={`/admin/updatecategory/${subcategory?.uuid}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </Link>
            <DeleteModal
              buttonText={<TrashIcon />}
              mutationFn={deleteSubCategory}
              deleteId={subcategory?.uuid}
              refetchFn={refetch}
            />
          </td>
        </tr>
      )
    );

  return (
    <>
      <Breadcrumb title="All SubCategory" />
      <div className="container mx-auto my-5 p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-opacity-10 backdrop-blur-lg rounded drop-shadow-lg bg-white p-2">
          <div className="pb-4"></div>
          <InfiniteScroll
            dataLength={
              subcategories?.data?.data?.subcategories?.length
                ? subcategories?.data?.data?.subcategories?.length
                : 0
            }
            next={() => {
              setCount((prev) => prev + increase);
            }}
            hasMore={subcategories?.data?.data?.subcategories?.length == count}
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-transparent text-white">
                <tr>
                  <th scope="col" className="p-4">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category Id
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
export default SubCategory;

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
import { deleteCategory, getCategories } from "../../hooks/admin/categoryApi";

const AllCategory = () => {
  const [count, setCount] = useState(25);
  const increase = 25;
  const colSpan = 8;
  const {
    data: categories,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuery("getCategories", () => getCategories({ count }));

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

  if (!isLoading && categories?.data?.data?.categories?.length === 0)
    content = (
      <tr className="bg-transparent border-b">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Category Found!
        </td>
      </tr>
    );

  if (!isLoading && categories?.data?.data?.categories?.length > 0)
    content = categories?.data?.data?.categories?.map((category, key) => (
      <tr
        key={key}
        className="bg-transparent border-b"
      >
        <td className="px-6 py-4">{category?.id}</td>
        <td className="px-6 py-4">{category?.name}</td>
        <td className="px-6 py-4">{category?.is_feature}</td>
        <td className="px-6 py-4">{category?.status}</td>
        <td className="px-6 py-4">{dateformat(category?.created_at)}</td>
        <td className="px-6 py-4 flex items-center gap-4">
          <Link
            to={`/admin/updatecategory/${category?.uuid}`}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </Link>
          <DeleteModal
            buttonText={<TrashIcon />}
            mutationFn={deleteCategory}
            deleteId={category?.uuid}
            refetchFn={refetch}
          />
        </td>
      </tr>
    ));

  return (
    <>
      <Breadcrumb title="All Category" />
      <div className="container mx-auto my-5 p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg section-bg p-2">
          <div className="pb-4"></div>
          <InfiniteScroll
            dataLength={
              categories?.data?.data?.categories?.length
                ? categories?.data?.data?.categories?.length
                : 0
            }
            next={() => {
              setCount((prev) => prev + increase);
            }}
            hasMore={categories?.data?.data?.categories?.length == count}
          >
            <table className="w-full text-sm text-left text-white">
              <thead className="text-xs text-gray-700 uppercase bg-transparent text-white">
                <tr>
                  <th scope="col" className="p-4">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Feature
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
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
export default AllCategory;

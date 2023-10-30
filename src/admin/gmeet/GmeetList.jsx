import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../layouts/Breadcrumb";
import { dateformat } from "../../helpers/helper.js";
import { useQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@mantine/core";
import DeleteModal from "../../components/DeleteModal";
import TrashIcon from "../../components/Icons/TrashIcon";
import {
  deleteAdminMeet,
  getAdminGmeet,
  postAdminGmeet,
} from "../../hooks/admin/gmeetApi";
import { toast } from "react-hot-toast";
import AddGmeetModal from "../../components/admin/gmeet/AddGmeetModal";

const GmeetList = () => {
  const [count, setCount] = useState(25);
  const increase = 25;
  const colSpan = 5;
  const {
    data: gmeet,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuery("getAdminGmeet", () => getAdminGmeet({ count: count }), {
    onError: (error) => {
      if (error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      }
    },
  });

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
        >{`${error?.response?.data?.error}`}</td>
      </tr>
    );

  if (!isLoading && gmeet?.data?.data?.meets?.length === 0)
    content = (
      <tr className="bg-transparent border-b">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Gmeet Found!
        </td>
      </tr>
    );

  if (!isLoading && gmeet?.data?.data?.meets?.length > 0)
    content = gmeet?.data?.data?.meets?.map((meet, key) => (
      <tr
        key={key}
        className="bg-transparent border-b"
      >
        <td data-label={"Serial"} className="px-6 py-4">
          {key + 1}
        </td>

        <td data-label={"Time"} className="px-6 py-4">
          {meet?.time}
        </td>
        <td data-label={"Meet Link"} className="px-6 py-4">
          {meet?.meetlink}
        </td>
        <td data-label={"Created Time"} className="px-6 py-4">
          {dateformat(meet?.created_at)}
        </td>
        <td data-label={"Action"} className="px-6 py-4">
          <div className="flex items-center justify-end gap-2">
            <DeleteModal
              buttonText={<TrashIcon />}
              mutationFn={deleteAdminMeet}
              deleteId={meet?.id}
              refetchFn={refetch}
            />
          </div>
        </td>
      </tr>
    ));

  return (
    <>
      <Breadcrumb title="Gmeet" />
      <div className="container mx-auto my-5 p-5">
        {!isLoading && (
          <div className="my-4">
            <AddGmeetModal refetchFn={refetch} mutationFn={postAdminGmeet} />
          </div>
        )}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-opacity-10 backdrop-blur-lg rounded drop-shadow-lg bg-white p-2 table-wrapper">
          <InfiniteScroll
            dataLength={
              gmeet?.data?.data?.meets?.length
                ? gmeet?.data?.data?.meets?.length
                : 0
            }
            next={() => {
              setCount((prev) => prev + increase);
            }}
            hasMore={gmeet?.data?.data?.meets?.length == count}
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-transparent text-white">
                <tr>
                  <th scope="col" className="p-4">
                    Serial
                  </th>
                  <th scope="col" className="p-4">
                    Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Meet Link
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created Time
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
export default GmeetList;

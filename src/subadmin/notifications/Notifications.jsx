import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../frontend/pages/layouts/Breadcrumb";
import { dateformat } from "../../helpers/helper.js";
import { useQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@mantine/core";
import { getNotifications } from "../../hooks/common/common";

const Notifications = () => {
  const [count, setCount] = useState(25);
  const increase = 25;
  const colSpan = 9;
  const {
    data: notifications,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuery("getNotifications", () => getNotifications({ count }));

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

  if (!isLoading && notifications?.data?.data?.notifications?.length === 0)
    content = (
      <tr className="bg-transparent border-b">
        <td colSpan={colSpan} className="text-center text-white py-6">
          Notifications Not Found!
        </td>
      </tr>
    );

  if (!isLoading && notifications?.data?.data?.notifications?.length > 0)
    content = notifications?.data?.data?.notifications?.map(
      (notification, key) => (
        <tr
          key={key}
          className="bg-transparent border-b"
        >
          <td
            data-label={"Serial"}
            className="px-6 py-4"
          >
            {key + 1}
          </td>

          <td
            data-label={"Description"}
            className="px-6 py-4"
          >
            {notification?.text}
          </td>
          <td
            data-label={"Useful Link"}
            className="px-6 py-4"
          >
            <a href={notification?.target_url}>Click here</a>
          </td>
          <td
            data-label={"Sender Name"}
            className="px-6 py-4"
          >
            {notification?.sender?.name}
          </td>
          <td
            data-label={"Date"}
            className="px-6 py-4"
          >
            {dateformat(notification?.created_at)}
          </td>
        </tr>
      )
    );

  return (
    <>
      <Breadcrumb title="Notifications" />
      <div className="container mx-auto my-5 p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-opacity-10 backdrop-blur-lg rounded drop-shadow-lg bg-white p-2 table-wrapper">
          <InfiniteScroll
            dataLength={
              notifications?.data?.data?.notifications?.length
                ? notifications?.data?.data?.notifications?.length
                : 0
            }
            next={() => {
              setCount((prev) => prev + increase);
            }}
            hasMore={notifications?.data?.data?.notifications?.length == count}
          >
            <table className="w-full text-sm text-left text-white">
              <thead className="text-xs text-gray-700 uppercase bg-transparent text-white">
                <tr>
                  <th scope="col" className="p-4">
                    Serial
                  </th>
                  <th scope="col" className="p-4">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Useful Link
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sender Name
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
export default Notifications;

import { useDisclosure } from "@mantine/hooks";
import { Loader, Modal } from "@mantine/core";
import { dateformat } from "../../helpers/helper";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getNotifications } from "../../hooks/common/common";
import { useNavigate } from "react-router-dom";

export default function NotificationsList({
  classes,
  bodyClass,
  white,
  countTableTotal,
}) {
  const [opened, { open, close }] = useDisclosure(false);
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

  // useEffect(() => {
  //   setCount(fetchCount);
  //   setIncrease(fetchCount);
  // }, [fetchCount]);
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

  if (!isLoading && notifications?.data?.data?.notifications?.length === 0)
    content = (
      <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white">
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
          className={`bg-white border-b ${
            white ? "text-black" : "dark:bg-gray-800"
          } dark:border-gray-700 hover:bg-gray-50 ${
            white ? "" : "dark:hover:bg-gray-600"
          } block mb-6 md:table-row`}
        >
          <td data-label={"Serial"} className="px-6 py-4">
            {key + 1}
          </td>

          <td data-label={"Description"} className="px-6 py-4">
            {notification?.text}
          </td>
          {/* <td
            data-label={"Useful Link"}
            className="px-6 py-4"
          >
            <a href={notification?.target_url}>Click here</a>
          </td> */}
          <td data-label={"Sender Name"} className="px-6 py-4">
            {notification?.sender?.name}
          </td>
          <td data-label={"Date"} className="px-6 py-4">
            {dateformat(notification?.created_at)}
          </td>
        </tr>
      )
    );
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Notifications"
        centered
        size={"100%"}
        classNames={{
          content: `${bodyClass ? bodyClass : "bg-gray-900 text-white"}`,
          header: `${bodyClass ? bodyClass : "bg-gray-900 text-white"}`,
        }}
      >
        <div className="my-6">
          <div>
            <InfiniteScroll
              dataLength={
                notifications?.data?.data?.notifications?.length
                  ? notifications?.data?.data?.notifications?.length
                  : 0
              }
              next={() => {
                setCount((prev) => prev + increase);
              }}
              hasMore={
                notifications?.data?.data?.notifications?.length == count
              }
            >
              <table
                className={`w-full text-sm text-left text-gray-500 ${
                  !white && "dark:text-gray-400"
                }`}
              >
                <thead
                  className={`text-xs text-gray-800 uppercase bg-gray-50 ${
                    !white && "dark:bg-gray-700 dark:text-gray-400"
                  } hidden md:table-header-group`}
                >
                  <tr>
                    <th scope="col" className="p-4">
                      Serial
                    </th>
                    <th scope="col" className="p-4">
                      Description
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                      Useful Link
                    </th> */}
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

            {!isFetching &&
              notifications?.data?.data?.notifications?.length == count && (
                <div className="flex justify-center my-6">
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => setCount((prev) => prev + increase)}
                  >
                    Load More
                  </button>
                </div>
              )}
          </div>
        </div>
      </Modal>

      <button onClick={open} className="relative">
        <span className="absolute -top-3 left-2 bg-purple-500 text-[0.8rem] font-bold rounded-full p-1">
          {countTableTotal
            ? notifications?.data?.data?.notifications?.length
            : notifications?.data?.data?.totalNotifications}
        </span>

        <svg
          className={`${
            classes
              ? classes
              : "w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M15.133 10.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C4.867 13.018 3 13.614 3 14.807 3 15.4 3 16 3.538 16h12.924C17 16 17 15.4 17 14.807c0-1.193-1.867-1.789-1.867-4.175ZM4 4a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 4 4ZM2 8H1a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 16 4Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM6.823 17a3.453 3.453 0 0 0 6.354 0H6.823Z" />
        </svg>
      </button>
    </>
  );
}

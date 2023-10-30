import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../layouts/Breadcrumb";
import { dateformat } from "../../helpers/helper.js";
import { useQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@mantine/core";
import { getWithdrawals } from "../../hooks/common/common";
import WithdrawModal from "../../components/trainer/WithdrawModal";

const Withdrawals = () => {
  const [count, setCount] = useState(25);
  const increase = 25;
  const colSpan = 8;
  const {
    data: withdrawals,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuery("getWithdrawals", () => getWithdrawals({ count }));

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

  if (!isLoading && withdrawals?.data?.data?.withdrawals?.length === 0)
    content = (
      <tr className="bg-transparent border-b">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Withdrawals Found!
        </td>
      </tr>
    );

  if (!isLoading && withdrawals?.data?.data?.withdrawals?.length > 0)
    content = withdrawals?.data?.data?.withdrawals?.map((withdraw, key) => (
      <tr
        key={key}
        className="bg-transparent border-b"
      >
        <td
          data-label="SL"
          className="text-black dark:text-white block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-900 whitespace-nowrap px-6 p-4"
        >
          {key++}
        </td>
        <th
          scope="row"
          data-label="Transection Id"
          className="text-black dark:text-white block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-900 whitespace-nowrap px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {withdraw?.transection_id}
        </th>
        <td
          data-label="Amount"
          className="text-black dark:text-white block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-900 whitespace-nowrap px-6 py-4"
        >
          {withdraw?.amount}
        </td>
        <td
          data-label="Payment Method"
          className="text-black dark:text-white block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-900 whitespace-nowrap px-6 py-4"
        >
          {withdraw?.payment_method}
        </td>
        <td
          data-label="Note"
          className="text-black dark:text-white block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-900 whitespace-nowrap px-6 py-4"
        >
          {withdraw?.note}
        </td>
        <td
          data-label="Admin Note"
          className="text-black dark:text-white block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-900 whitespace-nowrap px-6 py-4"
        >
          {withdraw?.admin_note}
        </td>
        <td
          data-label="Status"
          className="text-black dark:text-white block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-900 whitespace-nowrap px-6 py-4"
        >
          {withdraw?.status}
        </td>
        <td
          data-label="Date"
          className="text-black dark:text-white block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-900 whitespace-nowrap px-6 py-4"
        >
          {dateformat(withdraw?.created_at)}
        </td>
      </tr>
    ));

  return (
    <>
      <Breadcrumb title="Withdrawals" />
      <div className="container mx-auto my-5 p-5">
        <div className="p-5 mb-2 shadow-md rounded-lg">
          {withdrawals?.data?.data?.available_withdraw == false ? (
            <div className="flex justify-between items-center">
              <p className="text-lg text-blue-600 font-bold">
                Balance: ৳{withdrawals?.data?.data?.user?.balance}
              </p>

              {!isFetching && <WithdrawModal refetchFn={refetch} />}
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-bold">
                {withdrawals?.data?.data?.not_available_for_withdraw_msg}
              </p>
              <p className="text-red-600 font-bold">
                {withdrawals?.data?.data?.next_withdrawal_date_string}
              </p>
            </div>
          )}
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-opacity-10 backdrop-blur-lg rounded drop-shadow-lg bg-white p-2 table-wrapper">
          <div className="pb-4"></div>
          <InfiniteScroll
            dataLength={
              withdrawals?.data?.data?.withdrawals?.length
                ? withdrawals?.data?.data?.withdrawals?.length
                : 0
            }
            next={() => {
              setCount((prev) => prev + increase);
            }}
            hasMore={withdrawals?.data?.data?.withdrawals?.length == count}
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-transparent text-white">
                <tr>
                  <th scope="col" className="p-4">
                    SL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Transection Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Method
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Note
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Admin Note
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
export default Withdrawals;

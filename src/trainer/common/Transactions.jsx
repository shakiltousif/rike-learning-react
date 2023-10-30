import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../layouts/Breadcrumb";
import { dateformat } from "../../helpers/helper.js";
import { useQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@mantine/core";
import { getTransactions } from "../../hooks/common/common";

const Transactions = () => {
  const [count, setCount] = useState(25);
  const increase = 25;
  const colSpan = 8;
  const {
    data: transactions,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuery("getTransactions", () => getTransactions({ count }));

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

  if (!isLoading && transactions?.data?.data?.transactions?.length === 0)
    content = (
      <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Transactions Found!
        </td>
      </tr>
    );

  if (!isLoading && transactions?.data?.data?.transactions?.length > 0)
    content = transactions?.data?.data?.transactions?.map((passBook, key) => (
      <tr
        key={key}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td
          data-label={"SL"}
          className="text-black dark:text-white w-4 p-4"
        >
          {key + 1}
        </td>
        <td
          data-label={"Type"}
          className="text-black dark:text-white px-6 py-4"
        >
          {passBook?.type == 1 ? "Credit" : "Debit"}
        </td>
        <td
          data-label={"Credit"}
          className="text-black dark:text-white px-6 py-4"
        >
          {passBook?.type == 1 ? passBook?.amount : ""}
        </td>
        <td
          data-label={"Debit"}
          className="text-black dark:text-white px-6 py-4"
        >
          {passBook?.type == 2 ? passBook?.amount : ""}
        </td>
        <td
          data-label={"Amount"}
          className="text-black dark:text-white px-6 py-4"
        >
          {passBook?.type == 1 ? "+" : "-"}
          {passBook?.amount}
        </td>
        <td
          data-label={"Note"}
          className="text-black dark:text-white px-6 py-4"
        >
          {passBook?.narration}
        </td>
        <td
          data-label={"Date"}
          className="text-black dark:text-white px-6 py-4"
        >
          {dateformat(passBook?.created_at)}
        </td>
      </tr>
    ));

  return (
    <>
      <Breadcrumb title="Pass book" />
      <div className="container mx-auto my-5 p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white dark:bg-gray-900 p-2 table-wrapper">
          <div className="pb-4 bg-white dark:bg-gray-900"></div>
          <InfiniteScroll
            dataLength={
              transactions?.data?.data?.transactions?.length
                ? transactions?.data?.data?.transactions?.length
                : 0
            }
            next={() => {
              setCount((prev) => prev + increase);
            }}
            hasMore={transactions?.data?.data?.transactions?.length == count}
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    Serial
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Credit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Debit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Note
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
export default Transactions;

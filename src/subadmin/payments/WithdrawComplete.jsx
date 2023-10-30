import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../layouts/Breadcrumb";
import { dateformat } from "../../helpers/helper.js";
import { useQuery } from "react-query";
import { getAdminCompletedWithdrawals } from "../../hooks/admin/withdrawApi";
import { Loader } from "@mantine/core";
import InfiniteScroll from "react-infinite-scroll-component";

const WithdrawComplete = () => {
  const [count, setCount] = useState(25);
  const increase = 25;
  const colSpan = 10;

  const {
    isLoading,
    data: withdrawals,
    refetch,
    isFetching,
    isError,
    error,
  } = useQuery("getAdminCompletedWithdrawals", () =>
    getAdminCompletedWithdrawals({ count })
  );

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const luser = localStorage.getItem("user");

    // Decrypt the user object
    if (token && luser) {
      //   decryptedToken = AES.decrypt(token, "token-secret-key").toString(
      //     CryptoJS.enc.Utf8
      //   );
      //   const decryptedUser = AES.decrypt(luser, "user-secret-key").toString(
      //     CryptoJS.enc.Utf8
      //   );
      //   setCtoken(decryptedToken);
      //   setCUser(JSON.parse(decryptedUser));
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

  if (!isLoading && withdrawals?.data?.data?.withdraws.length === 0)
    content = (
      <tr className="bg-transparent border-b">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Withdrawal Found!
        </td>
      </tr>
    );

  if (!isLoading && withdrawals?.data?.data?.withdraws.length > 0)
    content = withdrawals?.data?.data?.withdraws.map((withdraw, key) => (
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
          data-label={"Method"}
          className="px-6 py-4"
        >
          {withdraw?.payment_method}
        </td>
        <td
          data-label={"Amount"}
          className="px-6 py-4"
        >
          {withdraw?.amount}
        </td>
        <td
          data-label={"TNX Id"}
          className="px-6 py-4"
        >
          {withdraw?.transection_id}
        </td>
        <td
          data-label={"Note"}
          className="px-6 py-4"
        >
          {withdraw?.note}
        </td>
        <td
          data-label={"Admin Note"}
          className="px-6 py-4"
        >
          {withdraw?.admin_note}
        </td>
        <td
          data-label={"User Id"}
          className="px-6 py-4"
        >
          {withdraw?.user_id}
        </td>
        <td
          data-label={"Date"}
          className="px-6 py-4"
        >
          {dateformat(withdraw?.created_at)}
        </td>
        <td
          data-label={"Status"}
          className="px-6 py-4"
        >
          {withdraw?.status == 1 ? (
            <span className="bg-yellow-400 text-white p-2 rounded">
              Approved
            </span>
          ) : withdraw?.status == 2 ? (
            <span className="bg-orange-600 text-white p-2 rounded">
              Rejected
            </span>
          ) : (
            <span className="bg-blue-500 text-white p-2 rounded">Pending</span>
          )}
        </td>
      </tr>
    ));

  return (
    <>
      <Breadcrumb title="Withdrawal Completed" />
      <div className="container mx-auto my-5 p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg section-bg p-2">
          <InfiniteScroll
            dataLength={
              withdrawals?.data?.data?.withdraws.length
                ? withdrawals?.data?.data?.withdraws.length
                : 0
            }
            next={() => {
              setCount((prev) => prev + increase);
            }}
            hasMore={withdrawals?.data?.data?.withdraws.length == count}
          >
            <table className="w-full text-sm text-left text-white">
              <thead className="text-xs text-gray-700 uppercase bg-transparent text-white">
                <tr>
                  <th scope="col" className="p-6">
                    Serial
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Method
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TNX Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Note
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Admin Note
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
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
export default WithdrawComplete;

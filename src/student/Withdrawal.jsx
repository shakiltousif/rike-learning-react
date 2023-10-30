import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../student/layouts/Breadcrumb";
import { dateformat, modelOpen } from "../helpers/helper.js";
import WithdrawalForm from "./components/WithdrawalForm";
import { getStudentWithdrawal } from "../hooks/student/studentApi";
import { useQuery } from "react-query";
import { Loader } from "@mantine/core";
import InfiniteScroll from "react-infinite-scroll-component";
import AdminBalanceCut from "../components/student/AdminBalanceCut";

const Withdrawal = () => {
  const [count, setCount] = useState(25);
  const increase = 25;
  const colSpan = 8;

  const {
    data: withdrawals,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery("getStudentWithdrawal", () => getStudentWithdrawal({ count }));

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const luser = localStorage.getItem("user");

    // let decryptedToken = "";
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
      <tr className="bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 border-b text-white">
        <td
          colSpan={colSpan}
          className="text-center text-white flex md:table-cell justify-center items-center"
        >
          <div className="text-center flex justify-center items-center my-6">
            <Loader color="dark" size="lg" variant="dots" />
          </div>
        </td>
      </tr>
    );

  if (!isLoading && isError)
    content = (
      <tr className="bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 border-b text-white">
        <td
          colSpan={colSpan}
          className="text-center text-white py-6"
        >{`${error?.error}`}</td>
      </tr>
    );

  if (!isLoading && withdrawals?.data?.data?.withdrawals?.length === 0)
    content = (
      <tr className="bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 border-b text-white">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Withdrawals Found!
        </td>
      </tr>
    );

  if (!isLoading && withdrawals?.data?.data?.withdrawals?.length > 0)
    content = withdrawals?.data?.data?.withdrawals?.map((withdraw, key) => (
      <tr key={key} className="bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 border-b text-white borderBg">
        <td
          data-label="SL"
          className="block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-100 whitespace-nowrap px-6 p-4"
        >
          {key++}
        </td>
        <th
          scope="row"
          data-label="Transection Id"
          className="block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-100 whitespace-nowrap px-6 py-4 font-medium text-gray-100 whitespace-nowrap"
        >
          {withdraw?.transection_id}
        </th>
        <td
          data-label="Amount"
          className="block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-100 whitespace-nowrap px-6 py-4"
        >
          {withdraw?.amount}
        </td>
        <td
          data-label="Payment Method"
          className="block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-100 whitespace-nowrap px-6 py-4"
        >
          {withdraw?.payment_method}
        </td>
        <td
          data-label="Note"
          className="block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-100 whitespace-nowrap px-6 py-4"
        >
          {withdraw?.note}
        </td>
        <td
          data-label="Admin Note"
          className="block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-100 whitespace-nowrap px-6 py-4"
        >
          {withdraw?.admin_note}
        </td>
        <td
          data-label="Status"
          className="block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-100 whitespace-nowrap px-6 py-4"
        >
          {withdraw?.status}
        </td>
        <td
          data-label="Date"
          className="block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-100 whitespace-nowrap px-6 py-4"
        >
          {dateformat(withdraw?.created_at)}
        </td>
      </tr>
    ));

  return (
    <>
      <Breadcrumb title="Withdrawals" />
      <div className="container mx-auto my-5 p-5">
        <div className="p-5 mb-2 shadow-md rounded-lg bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 border-b text-white">
          <div className="block md:flex justify-between items-center">
            <p className="text-lg text-blue-600 font-bold my-6">
              Available Balance: ৳{withdrawals?.data?.data?.user?.balance}
            </p>

            {!isFetching &&
              withdrawals?.data?.data?.available_withdraw == true && (
                <button
                  onClick={() => modelOpen("withdraw-modal")}
                  data-modal-target="withdraw-modal"
                  data-modal-toggle="withdraw-modal"
                  className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-6"
                  type="button"
                >
                  Withdraw Now
                </button>
              )}

            {!isFetching &&
              withdrawals?.data?.data?.available_withdraw_for_admin == true && (
                <AdminBalanceCut />
              )}
          </div>
          {withdrawals?.data?.data?.available_withdraw == true ? null : (
            <div className="my-6">
              <p className="text-red-600 font-bold">
                {withdrawals?.data?.data?.not_available_for_withdraw_msg}
              </p>
              <p className="text-red-600 font-bold">
                {withdrawals?.data?.data?.next_withdrawal_date_string}
              </p>
            </div>
          )}
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 border-b text-white">
                <tr className="border">
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
              <Loader color="dark" size="lg" variant="dots" />
            </div>
          )}
        </div>
        <WithdrawalForm refetchFn={refetch} />
      </div>
    </>
  );
};

export default Withdrawal;

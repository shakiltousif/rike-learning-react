import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../layouts/Breadcrumb";
import { dateformat } from "../../helpers/helper.js";
import { useQuery } from "react-query";
// import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@mantine/core";
import { getStudentClicks } from "../../hooks/admin/gmeetApi";
import { toast } from "react-hot-toast";

const StudentClickList = () => {
  const [count, setCount] = useState(25);
  const increase = 25;
  const colSpan = 5;
  const {
    data: studentClicks,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuery("getStudentClicks", () => getStudentClicks({ count: count }), {
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

  if (!isLoading && studentClicks?.data?.data?.length === 0)
    content = (
      <tr className="bg-transparent border-b">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Student Click Found!
        </td>
      </tr>
    );

  if (!isLoading && studentClicks?.data?.data?.length > 0)
    content = studentClicks?.data?.data?.map((studentClick, key) => (
      <tr
        key={key}
        className="bg-transparent border-b"
      >
        <td data-label={"Serial"} className="px-6 py-4">
          {key + 1}
        </td>

        <td data-label={""} className="px-6 py-4">
          <p className="font-bold block md:hidden">Student Details</p> <br />
          Student ID: {studentClick?.user?.referral_code}
          <br />
          Name: {studentClick?.user?.name}
          <br />
          Email: {studentClick?.user?.email}
          <br />
          Phone: {studentClick?.user?.phone_number}
          <br />
          TL Name: {studentClick?.user?.team_leader?.name}
          <br />
          <p className="mt-4">
            <a
              href={`https://api.whatsapp.com/send?phone=${studentClick?.user?.area_code}${studentClick?.user?.mobile_number}`}
              className="bg-purple-500 text-white p-2 rounded-lg"
              target="_blank"
              rel="noreferrer"
            >
              Whatsapp
            </a>
          </p>
        </td>
        <td data-label={""} className="px-6 py-4">
          <p className="font-bold block md:hidden">Meet Details</p> <br />
          Meet ID: {studentClick?.meet?.id}
          <br />
          Name: {studentClick?.meet?.meetlink}
          <br />
          Creation Date: {dateformat(studentClick?.meet?.created_at)}
          <br />
        </td>
        <td data-label={"Click Time"} className="px-6 py-4">
          {studentClick?.clicks ? parseInt(studentClick?.clicks) : 0}
        </td>

        <td data-label={"Click Time"} className="px-6 py-4">
          {dateformat(studentClick?.created_at)}
        </td>
      </tr>
    ));

  return (
    <>
      <Breadcrumb title="Student Meet Join List" />
      <div className="container mx-auto my-5 p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-opacity-10 backdrop-blur-lg rounded drop-shadow-lg bg-white p-2 table-wrapper">
          {/* <InfiniteScroll
            dataLength={
              studentClicks?.data?.data?.length
                ? studentClicks?.data?.data?.length
                : 0
            }
            next={() => {
              setCount((prev) => prev + increase);
            }}
            hasMore={studentClicks?.data?.data?.length == count}
          > */}
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-transparent text-white">
              <tr>
                <th scope="col" className="p-4">
                  Serial
                </th>
                <th scope="col" className="p-4">
                  Student Details
                </th>
                <th scope="col" className="px-6 py-3">
                  Meet Details
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Clicks
                </th>

                <th scope="col" className="px-6 py-3">
                  Click Time
                </th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
          {/* </InfiniteScroll> */}
          {isFetching && (
            <div className="text-center flex justify-center items-center my-6">
              <Loader color="white" size="lg" variant="dots" />
            </div>
          )}

          {!isFetching && studentClicks?.data?.data?.length == count && (
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
    </>
  );
};
export default StudentClickList;

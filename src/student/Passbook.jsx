import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../student/layouts/Breadcrumb";
import { dateformat } from "../helpers/helper.js";
import { useQuery } from "react-query";
import { getStudentPassBook } from "../hooks/student/studentApi";
import { Loader } from "@mantine/core";
import InfiniteScroll from "react-infinite-scroll-component";

const Passbook = () => {
  const [count, setCount] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const colSpan = 8;

  const {
    data: passbooks,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery("getStudentPassBook", () => getStudentPassBook({count}));

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

    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(
    //       "https://api.usrike-learning.com/public/api/student/pass-book",
    //       {
    //         headers: {
    //           Authorization: "Bearer " + decryptedToken,
    //         },
    //       }
    //     );
    //     setData(response.data.data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData();
  }, [navigate]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = passbooks?.data?.data?.transactions?.slice(startIndex, endIndex) || [];

  let content = null;

  if (isLoading) {
    content = (
      <tr className="bg-white border-b hover:bg-gray-50">
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

  } else if (isError) {
    content = (
      <tr className="bg-white border-b hover:bg-gray-50 ">
        <td
          colSpan={colSpan}
          className="text-center text-white py-6"
        >{`${error?.error}`}</td>
      </tr>
    );
  } else if (currentPageData.length === 0) {
    content = (
      <tr className="bg-white border-b hover:bg-gray-50">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Transaction Found!
        </td>
      </tr>
    );
  } else {
    content = currentPageData.map((passBook, index) => (
      <tr
        key={index}
        className="bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 text-white border-b hover:bg-gray-200 borderBg"
      >
        <td data-label={"SL"} className="w-4 p-4">
          {index + 1}
        </td>
        <td data-label={"Type"} className="px-6 py-4">
          {passBook?.type == 1 ? "Credit" : "Debit"}
        </td>
        <td data-label={"Credit"} className="px-6 py-4">
          {passBook?.type == 1 ? passBook?.amount : ""}
        </td>
        <td data-label={"Debit"} className="px-6 py-4">
          {passBook?.type == 2 ? passBook?.amount : ""}
        </td>
        <td data-label={"Amount"} className="px-6 py-4">
          {passBook?.type == 1 ? "+" : "-"}
          {passBook?.amount}
        </td>
        <td data-label={"Note"} className="px-6 py-4">
          {passBook?.narration}
        </td>
        <td data-label={"Date"} className="px-6 py-4">
          {dateformat(passBook?.created_at)}
        </td>
      </tr>
    ));
  }


  const totalPages = Math.ceil(
    (passbooks?.data?.data?.transactions?.length || 0) / itemsPerPage
  );


  return (
    <>
      <Breadcrumb title="Passbook" />
      <div className="container mx-auto my-5 lg:p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-40 md:mb-20">
          <table className="w-full text-sm text-left text-gray-500 table-auto">
            <thead className="text-xs text-white uppercase">
                <tr className="bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 border">
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
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage((prevPage) => prevPage - 1);
              }
            }}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-blue-500 text-white mr-2"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage((prevPage) => prevPage + 1);
              }
            }}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 rounded-md bg-blue-500 text-white ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Passbook;

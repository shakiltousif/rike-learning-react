import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../student/layouts/Breadcrumb";
import { dateformat } from "../helpers/helper.js";
import { getStudentCourses } from "../hooks/student/studentApi";
import { Loader } from "@mantine/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { BASE_ASSETS_URL } from "../config/basic";
import { useQuery } from "react-query";

const Course = () => {
  const [count, setCount] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const increase = 25;
  const itemsPerPage = 10;
  const colSpan = 7;

  const {
    data: courses,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery("getStudentCourses", () => getStudentCourses({ count }));

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const luser = localStorage.getItem("user");

    // let decryptedToken = '';
    // Decrypt the user object
    if (token && luser) {
      // decryptedToken = AES.decrypt(token, 'token-secret-key').toString(
      //   CryptoJS.enc.Utf8
      // );
      // const decryptedUser = AES.decrypt(luser, 'user-secret-key').toString(
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData =
    courses?.data?.data?.slice(startIndex, endIndex) || [];

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
      <tr className="bg-white border-b hover:bg-gray-50">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Courses Found!
        </td>
      </tr>
    );
  } else if (currentPageData.length === 0) {
    content = (
      <tr className="bg-white border-b hover:bg-gray-50 ">
        <td
          colSpan={colSpan}
          className="text-center text-white py-6"
        >{`${error?.error}`}</td>
      </tr>
    );
  } else {
    content = currentPageData.map((course, key) => (
      <tr
        key={key}
        className="bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 border-b text-white "
      >
        <td className="w-4 p-4">{key + 1}</td>
        <td
          data-label={"Image"}
          className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap"
        >
          <div className="flex items-center justify-center">
            {course?.image ? (
              <img
                className="w-[150px]"
                src={`${BASE_ASSETS_URL}${course?.image}`}
              />
            ) : (
              ""
            )}
          </div>
        </td>
        <td
          data-label={"Title"}
          className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap"
        >
          {course?.title}
        </td>
        <td
          data-label={"Course Type"}
          className="px-6 py-4 font-medium text-center text-gray-100 whitespace-nowrap"
        >
          {course?.course_type}
        </td>
        <td
          data-label={"Category"}
          className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap"
        >
          {course?.category?.name}
        </td>
        <td
          data-label={"Price"}
          className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap"
        >
          {course?.price}
        </td>
        <td
          data-label={"Action"}
          className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap"
        >
          <Link
            to={`/student/courses/${course?.slug}`}
            className="font-medium text-white hover:underline"
          >
            View
          </Link>
        </td>
      </tr>
    ));
  }

  const totalPages = Math.ceil(
    (courses?.data?.data?.length || 0) / itemsPerPage
  );

  return (
    <>
      <Breadcrumb title="Course List" />
      <div className="container mx-auto my-5 lg:p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-40 md:mb-20">
          <table className="w-full text-sm text-left text-gray-500 table-auto">
            <thead className="text-xs text-white uppercase">
              <tr className="bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 border">
                <th scope="col" className="p-4">
                  SL
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Course Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
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

export default Course;

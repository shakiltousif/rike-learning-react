import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AES } from "crypto-js";
// import CryptoJS from "crypto-js";
import Breadcrumb from "../layouts/Breadcrumb";
import { dateformat } from "../../helpers/helper.js";
import { useQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@mantine/core";
import DeleteModal from "../../components/DeleteModal";
import TrashIcon from "../../components/Icons/TrashIcon";
import { deleteCourse, getApprovedCourses } from "../../hooks/admin/courseApi";

const AllCourses = () => {
  const [count, setCount] = useState(25);
  const increase = 25;
  const colSpan = 8;
  const {
    data: courses,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuery("getApprovedCourses", () => getApprovedCourses({ count }));

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
      <tr className="section-bg border-b dark:text-white">
        <td colSpan={colSpan} className="text-center text-white">
          <div className="text-center flex justify-center items-center my-6">
            <Loader color="white" size="lg" variant="dots" />
          </div>
        </td>
      </tr>
    );

  if (!isLoading && isError)
    content = (
      <tr className="section-bg border-b dark:text-white">
        <td
          colSpan={colSpan}
          className="text-center text-white py-6"
        >{`${error?.error}`}</td>
      </tr>
    );

  if (!isLoading && courses?.data?.data?.courses?.length === 0)
    content = (
      <tr className="section-bg border-b dark:text-white">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Courses Found!
        </td>
      </tr>
    );

  if (!isLoading && courses?.data?.data?.courses?.length > 0)
    content = courses?.data?.data?.courses?.map((course, key) => (
      <tr
        key={key}
        className="section-bg border-b dark:text-white"
      >
        <td
          data-label={"Serial"}
          className="px-6 py-4"
        >
          {key + 1}
        </td>
        <td
          data-label={"Name"}
          className="px-6 py-4"
        >
          {course?.title}
        </td>
        <td
          data-label={"Sub Title"}
          className="px-6 py-4"
        >
          {course?.subtitle}
        </td>
        <td
          data-label={"Description"}
          className="px-6 py-4"
        >
          {course?.description}
        </td>
        <td
          data-label={"Price"}
          className="px-6 py-4"
        >
          {course?.price}
        </td>
        <td
          data-label={"Status"}
          className="px-6 py-4"
        >
          {course?.status == 0
            ? "Pending"
            : course?.status == 1
            ? "Published"
            : course?.status == 2
            ? "Waiting For Review"
            : course?.status == 3
            ? "Hold"
            : "Draft"}
        </td>
        <td
          data-label={"Date"}
          className="px-6 py-4"
        >
          {dateformat(course?.created_at)}
        </td>
        <td
          data-label={"Action"}
          className="px-6 py-4"
        >
          <div className="flex items-center justify-end gap-2">
            <Link
              to={`/admin/updatecourse/${course?.uuid}`}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </Link>
            <DeleteModal
              buttonText={<TrashIcon />}
              mutationFn={deleteCourse}
              deleteId={course?.uuid}
              refetchFn={refetch}
            />
          </div>
        </td>
      </tr>
    ));

  return (
    <>
      <Breadcrumb title="Approved Courses" />
      <div className="container mx-auto my-5 p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg section-bg p-2">
          <InfiniteScroll
            dataLength={
              courses?.data?.data?.courses?.length
                ? courses?.data?.data?.courses?.length
                : 0
            }
            next={() => {
              setCount((prev) => prev + increase);
            }}
            hasMore={courses?.data?.data?.courses?.length == count}
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-white text-black">
                <tr>
                  <th scope="col" className="p-6">
                    Serial
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sub Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
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
export default AllCourses;

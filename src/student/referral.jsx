import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./layouts/Breadcrumb";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "react-query";
import { getStudentReferral } from "../hooks/student/studentApi";
import { Loader } from "@mantine/core";
import StatsModal from "../components/student/StatsModal";

const Referral = () => {
  const [count, setCount] = useState(25);
  const increase = 25;
  const colSpan = 7;

  const {
    data: referrals,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery("getStudentReferral", () => getStudentReferral({ count }));

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const luser = localStorage.getItem("user");

    // let decryptedToken = "";
    // Decrypt the user object
    if (token && luser) {
      //
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

  if (!isLoading && referrals?.data?.data?.referrences?.length === 0)
    content = (
      <tr className="bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 border-b text-white">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Referrences Found!
        </td>
      </tr>
    );

  if (!isLoading && referrals?.data?.data?.referrences?.length > 0)
    content = referrals?.data?.data?.referrences?.map((referral, key) => (
      <tr
        key={key}
        className="bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 border-b text-white"
      >
        <td
          data-label="SL"
          className="block md:table-cell text-end md:text-start md:before:content-[''] before:content-[attr(data-label)] before:float-left before:font-bold font-medium text-gray-100 whitespace-nowrap px-6 p-4"
        >
          {key + 1}
        </td>
        <td
          data-label={""}
          className="px-6 py-4"
        >
          <p className="font-bold block md:hidden">Details</p> <br />
          Student ID: {referral?.user?.referral_code}
          <br />
          Name: {referral?.user?.name}
          <br />
          Email: {referral?.user?.email}
          <br />
          Phone: {referral?.user?.phone_number}
          <br />
          Join Date:{" "}
          {referral?.user?.student?.status
            ? new Date(
                referral?.user?.student?.status == 1
                  ? referral?.user?.student?.approved_at
                  : referral?.user?.student?.created_at
              ).toLocaleString()
            : ""}
          <br />
          <p className="mt-4">
            <a
              href={`https://api.whatsapp.com/send?phone=${referral?.user?.area_code}${referral?.user?.mobile_number}`}
              className="bg-gradient-to-r hover:from-green-400 hover:to-blue-500 from-pink-500 to-yellow-500 text-white p-2 rounded-lg"
              target="_blank"
              rel="noreferrer"
            >
              Whatsapp
            </a>
          </p>
          <br />
        </td>

        <td
          data-label={""}
          className="px-6 py-4"
        >
          {referral?.user?.counsellor?.id ? (
            <>
              <p className="font-bold block md:hidden">Counsellor</p> <br />
              ID : {referral?.user?.counsellor?.referral_code}
              <br />
              Name : {referral?.user?.counsellor?.name}
              <br />
              <p className="mt-4">
                <a
                  href={`https://api.whatsapp.com/send?phone=${referral?.user?.counsellor?.area_code}${referral?.user?.counsellor?.mobile_number}`}
                  className="bg-purple-500 text-white p-2 rounded-lg"
                  target="_blank"
                  rel="noreferrer"
                >
                  Whatsapp
                </a>
              </p>
            </>
          ) : (
            "No Counsellor Assigned Yet!"
          )}
        </td>

        <td
          data-label={""}
          className="px-6 py-4"
        >
          <p className="font-bold block md:hidden">Reference</p> <br />
          {referral?.reffered_user?.id ? (
            <>
              ID : {referral?.reffered_user?.referral_code}
              <br />
              Name : {referral?.reffered_user?.name}
              <br />
              <p className="mt-4">
                <a
                  href={`https://api.whatsapp.com/send?phone=${referral?.reffered_user?.area_code}${referral?.reffered_user?.mobile_number}`}
                  className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white p-2 rounded-lg"
                  target="_blank"
                  rel="noreferrer"
                >
                  Whatsapp
                </a>
              </p>
            </>
          ) : (
            "No Reference Here"
          )}
        </td>
        <td
          data-label={"Status"}
          className="px-6 py-4"
        >
          <div className="flex items-center justify-end gap-2">
            {referral?.student?.status == 1
              ? "Active"
              : referral?.student?.status == 2
              ? "Blocked"
              : "Inactive"}
          </div>
        </td>
      </tr>
    ));

  return (
    <>
      <Breadcrumb title="Referral List" />
      <div className="container mx-auto my-5 lg:p-5">
        {!isLoading && <StatsModal />}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:pb-20 pb-40 mt-5">
          <InfiniteScroll
            dataLength={
              referrals?.data?.data?.referrences?.length
                ? referrals?.data?.data?.referrences?.length
                : 0
            }
            next={() => {
              setCount((prev) => prev + increase);
            }}
            hasMore={referrals?.data?.data?.referrences?.length == count}
          >
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-white uppercase bg-gray-50">
                <tr className="bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 border">
                  <th scope="col" className="p-4">
                    Serial
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Details
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Counsellor Details
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Referral Details
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
              <Loader color="dark" size="lg" variant="dots" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Referral;

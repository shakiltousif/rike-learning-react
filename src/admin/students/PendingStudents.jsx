import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AES } from "crypto-js";
// import CryptoJS from "crypto-js";
import Breadcrumb from "../layouts/Breadcrumb.jsx";
import { useQuery } from "react-query";
import {
  deleteStudent,
  getPendingStudents,
  postAdminCounsellorUpdate,
  postAdminStudentMessaged,
  postSingleStudentChangeStatus,
  postSingleStudentStatus,
} from "../../hooks/admin/studentApi";
// import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@mantine/core";
import DeleteModal from "../../components/DeleteModal";
import TrashIcon from "../../components/Icons/TrashIcon";
import ApproveModal from "../../components/admin/student/ApproveModal";
import { userCan, userRoleCan } from "../../hooks/common/useAuth";
import { BASE_ASSETS_URL } from "../../config/basic";
import user_image from "../../assets/user_image.png";
import StudentRequestToAdminModal from "../../components/admin/student/StudentRequestToAdminModal";
import RejectModal from "../../components/admin/student/RejectModal.jsx";
import StudentZoneModal from "../../components/admin/student/StudentZoneModal.jsx";
import MessagedModal from "../../components/admin/student/MessagedModal.jsx";
import ChangeCounsellor from "../../components/admin/student/ChangeCounsellor.jsx";

const PendingStudents = () => {
  const [count, setCount] = useState(25);
  const [search_string, setSearchString] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [zone, setZone] = useState(false);
  const increase = 25;
  const colSpan = 11;
  const {
    data: students,
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useQuery("getPendingStudents", () =>
    getPendingStudents({ count, search_string, zone })
  );

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
  }, [count, refetch, zone]);

  const selectUser = (checked, userId) => {
    if (checked) {
      // Check if the userId is not already in the selectedUsers array
      if (!selectedUsers.includes(userId)) {
        selectedUsers.push(userId); // Add the user if not already in the array
      }
    } else {
      // Remove the userId from the selectedUsers array if it exists
      const index = selectedUsers.indexOf(userId);
      if (index !== -1) {
        selectedUsers.splice(index, 1);
      }
    }
    setSelectedUsers(selectedUsers);
  };

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

  if (!isLoading && students?.data?.data?.students?.length === 0)
    content = (
      <tr className="bg-transparent border-b">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Student Found!
        </td>
      </tr>
    );

  if (!isLoading && students?.data?.data?.students?.length > 0)
    content = students?.data?.data?.students?.map((student, key) => (
      <tr key={key} className="bg-transparent border-b">
        <td data-label={"Serial"} className="px-6 py-4">
          <input
            type="checkbox"
            name="select_counsellor"
            onChange={(e) => selectUser(e.target.checked, student?.user?.id)}
          />
        </td>
        <td data-label={"Serial"} className="px-6 py-4">
          {key + 1}
        </td>
        <td data-label={"Image"} className="px-6 py-4">
          <p className="flex justify-end">
            <img
              className="w-10"
              src={
                student?.user?.image
                  ? `${BASE_ASSETS_URL}${student?.user?.image}`
                  : user_image
              }
            />
          </p>
        </td>
        <td data-label={""} className="px-6 py-4">
          Student ID: {student?.user?.referral_code}
          <br />
          Name: {student?.user?.name}
          <br />
          Email: {student?.user?.email}
          <br />
          Phone: {student?.user?.phone_number}
          <br />
          Join Date:{" "}
          {student?.created_at
            ? new Date(student?.created_at).toLocaleString()
            : ""}
          <br />
          <p className="mt-4">
            <a
              href={`https://api.whatsapp.com/send?phone=${student?.user?.area_code}${student?.user?.mobile_number}`}
              className="bg-purple-500 text-white p-2 rounded-lg"
              target="_blank"
              rel="noreferrer"
            >
              Whatsapp
            </a>
          </p>
          <br />
        </td>

        <td data-label={""} className="px-6 py-4">
          {student?.counsellor?.id ? (
            <>
              <p className="font-bold block md:hidden">Counsellor</p> <br />
              ID : {student?.counsellor?.referral_code}
              <br />
              Name : {student?.counsellor?.name}
              <br />
              <p className="mt-4">
                <a
                  href={`https://api.whatsapp.com/send?phone=${student?.counsellor?.area_code}${student?.counsellor?.mobile_number}`}
                  className="bg-purple-500 text-white p-2 rounded-lg"
                  target="_blank"
                  rel="noreferrer"
                >
                  Whatsapp
                </a>
              </p>
            </>
          ) : userRoleCan("Controller") ||
            userRoleCan("Super Admin") ||
            userRoleCan("Senior Counsellor") ? (
            <ChangeCounsellor
              selectedIds={selectedUsers}
              counsellorArr={students?.data?.data?.controllerUsers}
              buttonText={"Assign Counsellor"}
              className={
                "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }
              mutationFn={postAdminCounsellorUpdate}
              refetchFn={refetch}
            />
          ) : (
            <>Consellor not assigned yet!</>
          )}
        </td>

        <td data-label={""} className="px-6 py-4">
          <p className="font-bold block md:hidden">Reference</p> <br />
          ID : {student?.parentU?.referral_code}
          <br />
          Name : {student?.parentU?.name}
          <br />
          <p className="mt-4">
            <a
              href={`https://api.whatsapp.com/send?phone=${student?.parentU?.area_code}${student?.parentU?.mobile_number}`}
              className="bg-purple-500 text-white p-2 rounded-lg"
              target="_blank"
              rel="noreferrer"
            >
              Whatsapp
            </a>
          </p>
        </td>

        <td data-label={""} className="px-6 py-4">
          <p className="font-bold block md:hidden">Reference TL</p> <br />
          ID : {student?.parentULeader?.referral_code}
          <br />
          Name : {student?.parentULeader?.name}
          <br />
          <p className="mt-4">
            <a
              href={`https://api.whatsapp.com/send?phone=${student?.parentULeader?.area_code}${student?.parentULeader?.mobile_number}`}
              className="bg-purple-500 text-white p-2 rounded-lg"
              target="_blank"
              rel="noreferrer"
            >
              Whatsapp
            </a>
          </p>
        </td>

        {userCan("manage_student_zone_update") && (
          <td data-label={""} className="px-6 py-4">
            <p className="font-bold block md:hidden">Zone</p> <br />
            {student?.user?.zone && (
              <p className="capitalize">Current Zone: {student?.user?.zone}</p>
            )}
            <br />
            <StudentZoneModal
              studentID={student?.user?.id}
              buttonText={"Update Zone"}
              selectedZone={student?.user?.zone ? student?.user?.zone : ""}
              refetchFn={refetch}
            />
          </td>
        )}
        {userCan("manage_student_messaged_update") && (
          <td data-label={""} className="px-6 py-4">
            {student?.user?.counsellor_messaged != 1 ? (
              <MessagedModal
                buttonText={
                  student?.user?.counsellor_messaged == 1 ? "Yes" : "No"
                }
                studentId={student?.user?.id}
                refetchFn={refetch}
                mutationFn={postAdminStudentMessaged}
                className={
                  "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                }
              />
            ) : (
              <p
                className={
                  "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                }
              >
                {" "}
                Yes
              </p>
            )}
          </td>
        )}

        {userCan("manage_student_options") && (
          <td data-label={""} className="px-6 py-4">
            <p className="font-bold block md:hidden">Change Status</p> <br />
            {student?.status == 1 ? (
              <button
                className={
                  "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                }
              >
                Already Approved
              </button>
            ) : (
              <ApproveModal
                leadersArr={students?.data?.data?.leaders}
                buttonText={"Approve"}
                buttonTexting={"Approving..."}
                mutationFn={postSingleStudentStatus}
                studentId={student?.id}
                status={"1"}
                refetchFn={refetch}
                className={
                  "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                }
              />
            )}
            {student?.status == 2 ? (
              <button
                className={
                  "text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-orange-700 dark:hover:bg-orange-800 dark:focus:ring-blue-800 mt-4"
                }
              >
                Already Rejected
              </button>
            ) : (
              <RejectModal
                buttonText={"Reject"}
                buttonTexting={"Rejecting..."}
                mutationFn={postSingleStudentChangeStatus}
                studentId={student?.id}
                status={"2"}
                refetchFn={refetch}
                className={
                  "text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-orange-700 dark:hover:bg-orange-800 dark:focus:ring-blue-800 mt-4"
                }
              />
            )}
          </td>
        )}

        {userCan("manage_student_sent_request") && (
          <td data-label={"Request"} className="px-6 py-4">
            {student?.user?.counsellor_id ? (
              "Already Sent To Admin"
            ) : (
              <StudentRequestToAdminModal
                userId={student?.user?.id}
                refetchFn={refetch}
                buttonText={"Sent Request"}
              />
            )}
          </td>
        )}

        {userCan("manage_student_options") && (
          <td data-label={"Action"} className="px-6 py-4">
            <div className="flex items-center justify-end gap-2">
              <Link
                to={`/admin/student/${student?.uuid}`}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </Link>
              <DeleteModal
                buttonText={<TrashIcon />}
                mutationFn={deleteStudent}
                deleteId={student?.uuid}
                refetchFn={refetch}
              />
            </div>
          </td>
        )}
      </tr>
    ));

  return (
    <>
      <Breadcrumb title="Pending Student" />
      <div className="container mx-auto my-5 p-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-opacity-10 backdrop-blur-lg rounded drop-shadow-lg bg-white p-2">
          <div className="pb-4">
            <div className="block md:flex justify-between">
              {userRoleCan("Controller") ||
              userRoleCan("Super Admin") ||
              userRoleCan("Senior Counsellor") ? (
                <div className="my-4">
                  {!isLoading &&
                    students?.data?.data?.controllerUsers?.length > 0 && (
                      <ChangeCounsellor
                        selectedIds={selectedUsers}
                        counsellorArr={students?.data?.data?.controllerUsers}
                        buttonText={"Assign Counsellor"}
                        className={
                          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        }
                        mutationFn={postAdminCounsellorUpdate}
                        refetchFn={refetch}
                      />
                    )}
                </div>
              ) : (
                <></>
              )}
              <div className="my-4 flex gap-2">
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    onChange={(e) => {
                      setSearchString(e.target.value);
                    }}
                    className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#422e9d] dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search By Refferal Code Or Phone Number"
                  />
                </div>

                <button
                  onClick={refetch}
                  className={
                    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  }
                >
                  {isFetching && search_string ? "Searching..." : "Search"}
                </button>
              </div>
              <div className="my-4">
                <select
                  name="floating_zone_type"
                  id="floating_zone_type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#422e9d] dark:border-gray-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={zone ? zone : ""}
                  onChange={(e) => setZone(e.target.value)}
                  required
                >
                  <option value="">Search By Zone</option>
                  <option value="Whatsapp Number Wrong">
                    Whatsapp Number Wrong
                  </option>
                  <option value="Not Yet Paid">Not Yet Paid</option>

                  <option value="No activity since joining">
                    No activity since joining
                  </option>
                  <option value="Counsellor Messaged">
                    Counsellor Messaged
                  </option>
                </select>
              </div>
            </div>
          </div>
          {/* <InfiniteScroll
            dataLength={
              students?.data?.data?.students?.length
                ? students?.data?.data?.students?.length
                : 0
            }
            next={() => {
              setCount((prev) => prev + increase);
            }}
            hasMore={
              students?.data?.data?.students?.length == count && !search_string
            }
          > */}
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-transparent text-white">
              <tr>
                <th scope="col" className="p-4">
                  Select
                </th>
                <th scope="col" className="p-4">
                  Serial
                </th>
                <th>Image</th>
                <th>Details</th>
                <th>Counsellor</th>
                <th>Reference</th>
                <th>Reference TL</th>
                {userCan("manage_student_zone_update") && <th>Zone</th>}
                {userCan("manage_student_messaged_update") && <th>Messaged</th>}
                {userCan("manage_student") && <th>Change Status</th>}
                {userCan("manage_student_sent_request") && <th>Request</th>}
                {userCan("manage_student_options") && <th>Action</th>}
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

          {!isFetching && students?.data?.data?.students?.length == count && (
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
export default PendingStudents;

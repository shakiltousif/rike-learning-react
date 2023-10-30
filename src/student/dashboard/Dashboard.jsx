import { useMutation, useQuery } from "react-query";
import {
  getDashboard,
  postMeetLinkClick,
} from "../../hooks/student/studentApi";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import DashboardSkeleton from "../../components/Skeleton/student/DashboardSkeleton";
import VerifyButton from "../../components/student/VerifyButton";
import AccountVerification from "../../components/student/AccountVerification";
import { getAuth } from "../../hooks/common/common";

const Dashboard = () => {
  const {
    data: user,
    refetch,
    isLoading: userLoading,
  } = useQuery("getAuth", getAuth);

  const { data, isLoading } = useQuery("getDashboard", getDashboard);

  function getMeetings() {
    if (data?.data?.data?.gmeets && data?.data?.data?.gmeets?.length != 0) {
      const uniqueCategoryIds = Array.from(
        new Set(data?.data?.data?.gmeets.map((meeting) => meeting.category_id))
      );

      // Step 2: Create a new array with one meet object per unique category
      const uniqueMeetingsPerCategory = uniqueCategoryIds.map((categoryId) => {
        return data?.data?.data?.gmeets.find(
          (meeting) => meeting.category_id === categoryId
        );
      });

      return uniqueMeetingsPerCategory?.filter(
        (meet) => meet?.category_id != 0
      );
    } else {
      return [];
    }
  }

  function getHelpLineMeeting() {
    if (data?.data?.data?.gmeets && data?.data?.data?.gmeets?.length != 0) {
      const uniqueCategoryIds = Array.from(
        new Set(data?.data?.data?.gmeets.map((meeting) => meeting.category_id))
      );

      // Step 2: Create a new array with one meet object per unique category
      const uniqueMeetingsPerCategory = uniqueCategoryIds.map((categoryId) => {
        return data?.data?.data?.gmeets.find(
          (meeting) => meeting.category_id === categoryId
        );
      });

      return uniqueMeetingsPerCategory?.filter(
        (meet) => meet?.category_id == 0
      );
    } else {
      return [];
    }
  }

  const { mutate } = useMutation(postMeetLinkClick);

  const handleCopyClick = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.dismiss();
      toast.success("Link Copied To Clipboard");
    } catch (error) {
      console.error("Error copying text:", error);
    }
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Accessing a specific query parameter by its name
  const _token = queryParams.get("_token");

  return (
    <section>
      {/* <!-- component --> */}
      <div className="">
        <div className="w-full text-center pb-40">
          {isLoading ? (
            <DashboardSkeleton />
          ) : userLoading ? (
            <DashboardSkeleton />
          ) : (
            <>
              <div className="max-w-screen-xl mx-auto text-center">
                <h5 className="my-8 text-left text-4xl font-bold text-blue-500">
                  Welcome, {user?.data?.name?.split(" ")[0]}
                </h5>

                {!user?.data?.email_verified_at ? (
                  _token ? (
                    <AccountVerification refetchFn={refetch} token={_token} />
                  ) : (
                    <VerifyButton />
                  )
                ) : null}
                <div className="mb-5 flex items-center flex-col lg:flex-row justify-center bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 p-5 shadow-md sm:rounded-lg">
                  <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                </div>

                <div className="space-y-8 lg:grid lg:grid-cols-2 gap-4 lg:space-y-0">
                  <div className="w-full p-6 mx-auto text-center text-white bg-gradient-to-r to-gray-900 from-gray-700 border rounded-lg shadow-xl xl:p-8">
                    <i className="fa-solid fa-certificate text-5xl text-purple-500 my-4"></i>
                    <h3 className="mb-2 text-xl md:text-2xl lg:text-2xl font-bold text-left">
                      Trainer Info
                    </h3>
                    <div className=" font-medium text-white text-sm md:text-lg lg:text-lg">
                      {data?.data?.data?.instructorsData ? (
                        <>
                          <div className="flex  justify-between items-center border-white border-[1.5px] rounded p-4 my-2">
                            <p>Name: </p>
                            <p> {data?.data?.data?.instructorsData?.name}</p>
                          </div>
                          <div className="flex justify-between items-center border-white border-[1.5px] rounded p-4 my-2">
                            <p>ID: </p>
                            <p>
                              {" "}
                              {data?.data?.data?.instructorsData?.referral_code}
                            </p>
                          </div>
                          <div className="flex justify-between items-center border-white border-[1.5px] rounded p-4 my-2">
                            <p>Whatsapp: </p>
                            <p>
                              {" "}
                              <a
                                href={`https://api.whatsapp.com/send?phone=+${data?.data?.data?.instructorsData?.phone_number}`}
                                className="bg-gradient-to-r to-gray-900 from-gray-700 hover:to-[#070c44] hover:from-[#422e9d]  text-white p-2 rounded-lg px-6"
                              >
                                Whatsapp
                              </a>
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between items-center border border-1 p-4 my-2">
                          <p> No Instructor Assigned Yet!</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full p-6 mx-auto text-center text-white bg-gradient-to-r to-gray-900 from-gray-700 text-white border rounded-lg shadow-xl xl:p-8">
                    <i className="fa-solid fa-certificate text-5xl text-purple-500 my-4"></i>
                    <h3 className="mb-2 text-xl md:text-2xl lg:text-2xl font-bold text-left">
                      Team Leader Info
                    </h3>
                    <div className="font-light text-white text-sm md:text-lg lg:text-lg">
                      {data?.data?.data?.leader_u ? (
                        <>
                          <div className="flex justify-between items-center border-white border-[1.5px] rounded p-4 my-2">
                            <p>Name: </p>
                            <p> {data?.data?.data?.leader_u?.name}</p>
                          </div>
                          <div className="flex justify-between items-center border-white border-1 p-4 my-2">
                            <p>ID: </p>
                            <p> {data?.data?.data?.leader_u?.referral_code}</p>
                          </div>
                          <div className="flex justify-between items-center border-white border-[1.5px] rounded p-4 my-2">
                            <p>Whatsapp: </p>
                            <p>
                              {" "}
                              <a
                                href={`https://api.whatsapp.com/send?phone=+${data?.data?.data?.leader_u?.phone_number}`}
                                className="bg-gradient-to-r hover:from-green-400 hover:to-blue-500 from-pink-500 to-yellow-500 text-white p-2 rounded-lg px-6"
                              >
                                Whatsapp
                              </a>
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between items-center border-white border-[1.5px] rounded-md p-4 my-2 text-white font-medium">
                          <p> No Team Leader Assigned Yet!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-w-screen-xl px-4 mx-auto text-center ">
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-10">
                  <div className="lg:col-span-2">
                    <h1 className="my-8 text-left text-2xl font-bold bg-gradient-to-r to-gray-900 from-gray-700 my-5 py-2 px-4 rounded-md text-white shadow-lg">
                      Next Classes
                    </h1>
                    <div className="py-6 rounded-lg w-full px-6">
                      {getMeetings()?.length != 0 &&
                        getMeetings()?.map((gmeet, key) => (
                          <div
                            key={key}
                            className="w-full text-left p-4 flex justify-between items-center bg-gradient-to-r to-gray-900 from-gray-700 text-white hover:shadow-xl cursor-pointer my-2 rounded"
                          >
                            <div>
                              <h1 className="font-bold">
                                Topic: {gmeet?.category?.name}
                              </h1>
                              <p>{gmeet?.time}</p>
                            </div>
                            <span className="text-sm">
                              <p>
                                {" "}
                                <a
                                  href="#"
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    mutate({
                                      formdata: {
                                        meet_id: gmeet?.id,
                                      },
                                    });
                                    window.open(`${gmeet?.meetlink}`, "_blank");
                                  }}
                                  className="bg-gradient-to-r hover:from-fuchsia-500 hover:to-purple-600 from-pink-500 to-yellow-500 text-white p-2 rounded-lg px-6"
                                >
                                  Join
                                </a>
                              </p>
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="">
                    <div className="flex justify-between items-center bg-gradient-to-r to-gray-900 from-gray-700 my-5 py-2 px-4 rounded-md shadow-lg">
                      <h1 className="text-left text-2xl flex items-center gap-2 font-bold text-white">
                        Refer Your Friends
                        <svg
                          className="w-6 h-6 text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                        </svg>
                      </h1>
                      <div className="text-right py-6">
                        <button>
                          <i className="fa-solid fa-user-pen"></i>
                        </button>
                      </div>
                    </div>
                    <div className="py-6 border bg-gradient-to-r to-gray-900 from-gray-700 border-gray-400 rounded-lg w-full px-6 break-all shadow-lg">
                      <div className="flex items-center">
                        <p className="my-6 text-white text-left font-medium">
                          Get Exciting Rewards By Referring <br />
                          Your Friend
                        </p>
                      </div>
                      <div className="w-full text-left p-4 flex justify-between items-center bg-[#422e9d] shadow-xl cursor-pointer rounded-t-md">
                        <div>
                          <h1 className="font-bold text-white">
                            Referral Code:{" "}
                          </h1>
                        </div>
                        <span className="text-base font-medium text-white">
                          {user?.data?.referral_code}
                        </span>
                      </div>

                      <div className="w-full text-left p-4 flex justify-between items-center border border-t-0 border-gray-600 shadow-xl rounded-b-md cursor-pointer">
                        <div>
                          <p className="my-4 text-white p-2">
                            {" "}
                            {window.location.origin +
                              "/signup/" +
                              user?.data?.referral_code}
                          </p>
                          <div className="flex justify-center">
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                handleCopyClick(
                                  window.location.origin +
                                    "/signup/" +
                                    user?.data?.referral_code
                                );
                              }}
                              href={`#`}
                              className="bg-gradient-to-r hover:from-green-400 hover:to-blue-500 from-pink-500 to-yellow-500 text-white p-2 rounded-lg px-6"
                            >
                              Copy to Clipboard
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full p-6 mx-auto text-center text-white bg-gradient-to-r to-gray-900 from-gray-700 border border-gray-100 rounded-lg shadow shadow-xl border-gray-600 xl:p-8 bg-gray-100  my-6">
                      <i className="fa-solid fa-certificate text-5xl text-[#070c44] my-4"></i>
                      <h3 className="mb-2 text-xl md:text-2xl lg:text-2xl font-bold text-left">
                        Support Info
                      </h3>
                      <div className="font-light text-white text-sm md:text-lg lg:text-lg">
                        <>
                          <div className="flex justify-between items-center border border-1 p-4 my-2">
                            <p>Name: </p>
                            <p> Rike-Learning</p>
                          </div>
                          <div className="flex justify-between items-center border border-1 p-4 my-2">
                            <p>Whatsapp: </p>
                            <p>
                              {" "}
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href={`https://api.whatsapp.com/send?phone=${data?.data?.data?.app_contact_number?.option_value}`}
                                className="bg-gradient-to-r to-gray-900 from-gray-700 text-white p-2 rounded-lg px-6"
                              >
                                Whatsapp
                              </a>
                            </p>
                          </div>

                          <div className="flex justify-between items-center border border-1 p-4 my-2">
                            <p>Help Line: </p>
                            <p>
                              {" "}
                              <p>
                                {" "}
                                <a
                                  href="#"
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    window.open(
                                      `${getHelpLineMeeting()?.[0]?.meetlink}`,
                                      "_blank"
                                    );
                                  }}
                                  className="bg-gradient-to-r to-gray-900 from-gray-700 text-white p-2 rounded-lg px-6"
                                >
                                  Join
                                </a>
                              </p>
                            </p>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

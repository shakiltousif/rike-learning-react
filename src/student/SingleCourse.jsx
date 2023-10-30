import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getSingleCourse } from "../hooks/student/studentApi";
import ReactPlayer from "react-player";
import { BASE_ASSETS_URL } from "../config/basic";
const SingleCourses = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const params = useParams();
  const slug = params?.slug;

  const { data: course, isLoading } = useQuery("getSingleCourse", () =>
    getSingleCourse(slug)
  );

  const [activeLecture, setActiveLecture] = useState({});

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

  return (
    <>
      {!isLoading && course?.data?.data?.course_lessons ? (
        <div className="container mx-auto my-5 lg:p-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 p-6">
              <div className="my-6">
                <h1 className="p-4 rounded bg-blue-600 text-white text-xl my-4">
                  Course Lecture Details
                </h1>

                <div className="my-6">
                  {activeLecture?.id ? (
                    <>
                      <div className="my-4">Title: {activeLecture?.title}</div>
                      {activeLecture?.id && activeLecture?.type == "youtube" ? (
                        <ReactPlayer
                          url={`https://www.youtube.com/watch?v=${activeLecture?.url_path}`}
                          controls
                          width={"100%"}
                        />
                      ) : activeLecture?.type == "text" ? (
                        <p>{activeLecture?.text}</p>
                      ) : (
                        activeLecture?.type == "image" && (
                          <img
                            src={`${BASE_ASSETS_URL}${activeLecture?.image}`}
                            width={100}
                          />
                        )
                      )}
                    </>
                  ) : (
                    "No topic selected yet!"
                  )}
                </div>
              </div>

              <div className="my-6">
                <div className="p-4">
                  <h1 className="p-4 rounded bg-blue-600 text-white text-xl mb-6">
                    Course Lessons
                  </h1>

                  {course?.data?.data?.course_lessons?.length != 0 ? (
                    course?.data?.data?.course_lessons?.map(
                      (course_lesson, key) => (
                        <div key={key}>
                          <h1
                            className="p-2 rounded bg-blue-600 text-white text-lg cursor-pointer"
                            onClick={() =>
                              setActiveTab((tab) => (tab == key ? false : key))
                            }
                          >
                            {course_lesson?.name}
                          </h1>

                          <div
                            className={`my-6 px-4 ${
                              activeTab == key ? "block" : "hidden"
                            }`}
                          >
                            {course_lesson?.lectures?.map(
                              (lecture, lecture_key) => (
                                <div
                                  key={lecture_key + key}
                                  className={`flex justify-between items-center my-2 bg-blue-500 p-2 text-white cursor-pointer ${
                                    lecture?.id == activeLecture?.id &&
                                    "font-bold"
                                  }`}
                                  onClick={() => setActiveLecture(lecture)}
                                >
                                  <p>{lecture?.title}</p>

                                  <p>{lecture?.type}</p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <>No Lessons here</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default SingleCourses;

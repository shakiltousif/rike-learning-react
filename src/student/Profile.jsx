import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Breadcrumb from "../student/layouts/Breadcrumb";
import { useQuery } from "react-query";
import { getStudentProfile } from "../hooks/student/studentApi";
import { dateformat } from "../helpers/helper";
import ProfileSkeleton from "../components/Skeleton/student/ProfileSkeleton";
import { toast } from "react-hot-toast";

const Profile = () => {
  //   const [ctoken, setCtoken] = useState("");
  //   const [cuser, setCUser] = useState({});

  const { data: user, isLoading } = useQuery(
    "getStudentProfile",
    getStudentProfile
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const luser = localStorage.getItem("user");

    // let decryptedToken =""
    // Decrypt the user object
    if (token && luser) {
      // decryptedToken = AES.decrypt(token, 'token-secret-key').toString(CryptoJS.enc.Utf8);
      // const decryptedUser = AES.decrypt(luser, 'user-secret-key').toString(CryptoJS.enc.Utf8);
      // setCtoken(decryptedToken);
      // setCUser(JSON.parse(decryptedUser));
    } else {
      navigate("/login");
    }

    //     const fetchData = async () => {
    //     try {
    //       const response = await axios.get(
    //         'https://api.usrike-learning.com/public/api/student/profile',
    //         {
    //             headers: {
    //                 'Authorization': 'Bearer ' + decryptedToken
    //             }
    //         }
    //       );
    //       setData(response.data.data);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   };
    //   fetchData();
  }, [navigate]);

  //   if (!data) {
  //     return <Pageloader title="Profile Page" />;
  //   }

  //   const { user } = data;

  const handleCopyClick = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.dismiss();
      toast.success("Link Copied To Clipboard");
    } catch (error) {
      console.error("Error copying text:", error);
    }
  };

  return (
    <>
      <Breadcrumb title="Profile Page" />
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <div className="container mx-auto my-5 p-0 md:p-5 h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 md:gap-4">
            <div className="w-full md:mx-2">
              <div className="bg-blue-700 p-3 border-t-4 border-blue-600 break-all rounded-lg shadow-lg">
                <div className="image overflow-hidden">
                  <img
                    className="h-auto w-full mx-auto"
                    src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                    alt=""
                  />
                </div>
                <h1 className="text-white font-bold text-xl leading-8 my-1">
                  {user?.data?.data?.user?.name}
                </h1>
                <h3 className="text-red-200 text-md font-semibold leading-6">
                  Student ID: {user?.data?.data?.user?.referral_code}
                </h3>
                <p className="text-sm text-white hover:text-white leading-6">
                  {user?.data?.data?.user?.student.about_me}
                </p>
                <div className="py-2 mt-1 divide-y rounded shadow-sm">
                  <h3 className="text-white text-lg font-bold leading-6">
                    Balance: {user?.data?.data?.user?.balance}৳
                  </h3>
                </div>
                <div className="py-2 mt-1 divide-y rounded shadow-sm">
                  <h3 className="text-white text-lg text-semibold leading-6">
                    Facbook Link
                  </h3>
                  <p className="text-sm text-white font-bold hover:text-white leading-6">
                    {user?.data?.data?.user?.fb_link}
                  </p>
                </div>
                <div className="py-2 mt-1 divide-y rounded shadow-sm">
                  <h3 className="text-white text-lg text-semibold leading-6">
                    Youtube Link
                  </h3>
                  <p className="text-sm text-white font-bold hover:text-white leading-6">
                    {user?.data?.data?.user?.yt_link}
                  </p>
                </div>
                <ul className="bg-blue-500 text-white hover:text-white hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span
                        className={`${
                          user?.data?.data?.user?.student.status == 1
                            ? "bg-green-500"
                            : "bg-red-500"
                        }  " py-1 px-2 rounded shadow-lg text-white text-sm`}
                      >
                        {user?.data?.data?.user?.student.status == 1
                          ? "Active"
                          : "Close"}
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">
                      {dateformat(user?.data?.data?.user?.student.created_at)}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-900 p-5 shadow-sm rounded-sm border-t-4 border-blue-900 break-all mt-3">
                <div className="py-2 mt-1 divide-y rounded shadow-sm">
                  <h5 className="text-white text-xl font-bold leading-6">
                    Referral Code: {user?.data?.data?.user?.referral_code}
                  </h5>
                </div>
                <div className="py-2 mt-1 rounded shadow-sm">
                  <h3 className="text-red-700 text-xl font-bold leading-6 border-b-2 py-1">
                    Referral Link
                  </h3>
                  <p
                    onClick={() => {
                      handleCopyClick(
                        window.location.origin +
                          "/signup/" +
                          user?.data?.data?.user?.referral_code
                      );
                    }}
                    title="Click Me for Copy"
                    className="my-5 p-2 shadow-lg rounded-lg text-center hover:text-red-700 text-white bg-green-800"
                  >
                    <p className="font-bold">{"Click To Copy"}</p>
                    {window.location.origin +
                      "/signup/" +
                      user?.data?.data?.user?.referral_code}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full bg-blue-400 mx-0 mt-5 md:mt-0 md:mx-2 col-span-2 break-all">
              <div className="p-5 shadow-sm rounded-lg">
                <div className="flex justify-between items-center py-2 px-5 bg-blue-600 font-semibold shadow-md my-4 mb-12">
                  <div className="w-full">
                    <span className="font-bold text-xl text-white">About</span>
                  </div>
                  <div className="w-full md:w-2/4">
                    <Link
                      to="/student/edit_profile"
                      className="flex justify-center gap-2 bg-blue-900 py-2 px-4 text-white rounded-md shadow-md"
                    >
                      <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.109 17H1v-2a4 4 0 0 1 4-4h.87M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm7.95 2.55a2 2 0 0 1 0 2.829l-6.364 6.364-3.536.707.707-3.536 6.364-6.364a2 2 0 0 1 2.829 0Z"
                        />
                      </svg>
                      <span>Edit</span>
                    </Link>
                  </div>
                </div>
                <div className="text-white font-bold">
                  <div className="grid md:grid-cols-1 text-sm divide-y border">
                    <div className="grid grid-cols-2 divide-x">
                      <div className="px-4 py-2 font-semibold">First Name</div>
                      <div className="px-4 py-2">
                        {user?.data?.data?.user?.student.first_name}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x">
                      <div className="px-4 py-2 font-semibold">Last Name</div>
                      <div className="px-4 py-2">
                        {user?.data?.data?.user?.student.last_name}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">
                        <a
                          className="text-blue-800 font-medium"
                          href={`mailto:${user?.data?.data?.user?.email}`}
                        >
                          {user?.data?.data?.user?.email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">
                        {user?.data?.data?.user?.student.gender}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">
                        +{user?.data?.data?.user?.area_code}{" "}
                        {user?.data?.data?.user?.mobile_number}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x">
                      <div className="px-4 py-2 font-semibold">Country</div>
                      <div className="px-4 py-2">
                        {user?.data?.data?.user?.country}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x">
                      <div className="px-4 py-2 font-semibold">State</div>
                      <div className="px-4 py-2">
                        {user?.data?.data?.user?.state}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x">
                      <div className="px-4 py-2 font-semibold">City</div>
                      <div className="px-4 py-2">
                        {user?.data?.data?.user?.city}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x">
                      <div className="px-4 py-2 font-semibold">Postal Code</div>
                      <div className="px-4 py-2">
                        {user?.data?.data?.user?.postal_code}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 divide-x">
                      <div className="px-4 py-2 font-semibold">Address</div>
                      <div className="px-4 py-2">
                        {user?.data?.data?.user?.student.address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

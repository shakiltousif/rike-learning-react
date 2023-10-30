import { useState, useEffect } from "react";
import { AES } from "crypto-js";
// import CryptoJS from "crypto-js";
import LoginSkeleton from "../components/Skeleton/subadmin/LoginSkeleton.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getSubAdminLogin, postLogin } from "../hooks/auth/authApi.js";
import { toast } from "react-hot-toast";

const SubAdminLogin = () => {
  const navigate = useNavigate();

  const [accountTypes, setAccountTypes] = useState([]);

  const { isLoading: isAccountTypesLoading, isFetching } = useQuery(
    "getSubAdminLogin",
    getSubAdminLogin,
    {
      onSuccess: (response) => {
        if (response.data.success === "ok") {
          const account_types = response.data.data;
          setAccountTypes(account_types);
        }
      },
    }
  );

  const { isLoading: submitLoading, mutate } = useMutation(postLogin, {
    onSuccess: (response) => {
      const user = response.data.data.user;
      if (user && user.role == 1) {
        const token = response.data.data.token;
        const encryptedUser = AES.encrypt(
          JSON.stringify(user),
          "user-secret-key"
        ).toString();
        const encryptedToken = AES.encrypt(
          token,
          "token-secret-key"
        ).toString();
        localStorage.setItem("user", encryptedUser);
        localStorage.setItem("token", encryptedToken);

        if (localStorage.getItem("user")) {
          navigate("/subadmin/update_profile");
          // const menuList = menus("subadmin");

          // if (menuList?.length != 0) {
          //   if (menuList?.[0]?.path) {
          //     navigate(menuList?.[0]?.path);
          //   } else if (menuList?.[0]?.children?.length != 0) {
          //     navigate(menuList?.[0]?.children?.[0]?.path);
          //   } else {
          //     navigate("/subadmin/profile");
          //   }
          // } else {
          //   navigate("/subadmin/profile");
          // }
        }
      } else if (user && user.role == 2) {
        const token = response.data.data.token;
        const encryptedUser = AES.encrypt(
          JSON.stringify(user),
          "user-secret-key"
        ).toString();
        const encryptedToken = AES.encrypt(
          token,
          "token-secret-key"
        ).toString();
        localStorage.setItem("user", encryptedUser);
        localStorage.setItem("token", encryptedToken);
        navigate("/trainer/profile");
      }

      toast.success("Successfully Loggedin");
    },
    onError: (error) => {
      if (error?.response?.data?.error) {
        toast.error(`${error?.response?.data?.error}`);
      } else {
        toast.error("something went wrong!");
      }
    },
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    account_type: "0",
  });

  const [isPassShow, setIsPassShow] = useState(false);

  const handlePasswrodShow = () => {
    if (isPassShow == false) {
      document.getElementById("password").type = "text";
      setIsPassShow(true);
    } else {
      document.getElementById("password").type = "password";
      setIsPassShow(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const luser = localStorage.getItem("user");

    if (token && luser) {
      //
    } else {
      // Simulate page loading delay
      //   const timeout = setTimeout(() => {
      //     setIsLoading(false);
      //   }, 1000);
      //   return () => clearTimeout(timeout);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss();
    if (formData.account_type == "0") {
      toast.error("Account Types Field is required");
      return false;
    }
    if (!formData.email) {
      toast.error("Email is required");
      return false;
    }

    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }

    if (!submitLoading) {
      mutate({
        formdata: formData,
      });
    }
  };

  return (
    <>
      {isFetching ? ( // Render the page loader if isLoading is true
        <LoginSkeleton />
      ) : (
        <div className="min-h-screen bg-gray-100 py-8 flex justify-center items-center">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
                <p className="text-gray-600">Login to SubAdmin Panel.</p>
              </div>
              <form onSubmit={handleSubmit} method="post">
                <div className="mb-4">
                  <label
                    htmlFor="account_type"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Acount Type
                  </label>
                  <select
                    id="account_type"
                    name="account_type"
                    defaultValue={formData.account_type}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${"border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                    required
                  >
                    <option value={0} disabled hidden>
                      Select Account Type
                    </option>

                    {accountTypes?.map((types, key) => (
                      <>
                        {types?.name != "Super Admin" && (
                          <option key={key} value={types?.name}>
                            {types?.name}
                          </option>
                        )}
                      </>
                    ))}

                    <option key={100} value={"Trainer"}>
                      Trainer
                    </option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    defaultValue={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${"border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                    required
                  />
                </div>
                <div className="mb-6 relative">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${"border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                    required
                  />

                  {isPassShow == false ? (
                    <button
                      onClick={handlePasswrodShow}
                      type="button"
                      className="absolute top-10 right-4"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={handlePasswrodShow}
                      type="button"
                      className="absolute top-10 right-4"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      </span>
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
                >
                  {submitLoading ? "Logging..." : "Log In"}
                </button>
                <div className="mt-4 text-center">
                  <p className="text-gray-600">Forgot your password?</p>
                  <Link
                    to="/reset_password"
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Reset Password
                  </Link>
                </div>
              </form>

              <div className="text-center my-6">
                <Link
                  to={"/"}
                  className="w-full px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 my-6"
                >
                  Go to home
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubAdminLogin;

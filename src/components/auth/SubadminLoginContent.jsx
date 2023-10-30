import login_left from "../../assets/frontend/auth/login_left.png";
import logo from "../../assets/common/logo.png";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../common/PrimaryButton";
// import Facebook from "../Icons/Facebook";
// import Google from "../Icons/Google";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getSubAdminLogin, postLogin } from "../../hooks/auth/authApi";
import PasswordField from "../FormFields/PasswordField";
import { InputField } from "../FormFields/InputFields";
import toast from "react-hot-toast";
import { AES } from "crypto-js";

export default function SubAdminLoginContent() {
  const navigate = useNavigate();
  const [account_type, setAccountType] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { isLoading, mutate } = useMutation(postLogin, {
  //   onSuccess: (response) => {
  //     if (response?.data?.success && response?.data?.data?.user) {
  //       const user = response?.data?.data?.user;
  //       const token = response?.data?.data?.token;
  //       const encryptedUser = AES.encrypt(
  //         JSON.stringify(user),
  //         "user-secret-key"
  //       ).toString();
  //       const encryptedToken = AES.encrypt(
  //         token,
  //         "token-secret-key"
  //       ).toString();

  //       localStorage.setItem("user", encryptedUser);
  //       localStorage.setItem("token", encryptedToken);

  //       if (user.role == 3) {
  //         navigate("/student/dashboard");
  //       } else if (user.role == 2) {
  //         navigate("/trainer/profile");
  //       } else {
  //         navigate("/");
  //       }
  //       toast.success("Successfully Loggedin");
  //       navigate("/student/dashboard");
  //     }
  //   },
  //   onError: (error) => {
  //     if (error?.response?.data?.error) {
  //       toast.error(`${error?.response?.data?.error}`);
  //     } else {
  //       toast.error("something went wrong!");
  //     }
  //   },
  // });

  const { isLoading, mutate } = useMutation(postLogin, {
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

  const [accountTypes, setAccountTypes] = useState([]);

  const { isFetching } = useQuery("getSubAdminLogin", getSubAdminLogin, {
    onSuccess: (response) => {
      if (response.data.success === "ok") {
        const account_types = response.data.data;
        setAccountTypes(account_types);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Phone Email / Username Field Missing");
      return;
    }
    if (!password) {
      toast.error("Password Field Missing");
      return;
    }
    if (!isLoading) {
      mutate({
        formdata: {
          email,
          password,
          account_type,
        },
      });
    }
  };

  return (
    <section className="">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center p-10 md:p-0">
        <div className="col-span-1 md:col-span-1 hidden md:block">
          <img src={login_left} alt="Login Page" height={"100%"} />
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="max-w-screen-sm mx-auto py-10">
            <div className="flex justify-center my-2">
              <img src={logo} alt={"Rike-Learning"} />
            </div>
            <h2 className="text-center text-zinc-800 text-4xl font-bold">
              Welcome back!
            </h2>
            <p className="text-center">
              <span className="text-neutral-500 text-base font-normal">
                Don’t have an account?{" "}
              </span>
              <Link
                to={"/signup"}
                className="text-blue-800 text-base font-semibold"
              >
                Register Now!
              </Link>
            </p>

            <form className="my-10" onSubmit={handleSubmit}>
              <div className="my-4">
                {isFetching ? (
                  "Loading..."
                ) : (
                  <>
                    <label
                      htmlFor={"account_type"}
                      className="text-zinc-800 text-base font-normal my-2"
                    >
                      Account Type
                    </label>

                    <select
                      name="account_type"
                      id="account_type"
                      className="w-full bg-white py-3 px-2 border border-slate-400 rounded-lg outline-none my-2"
                      onChange={(e) => setAccountType(e.target.value)}
                    >
                      <option value={0} hidden key={"000000000"}>
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
                      <option value={"Trainer"}>Trainer</option>
                    </select>
                  </>
                )}
              </div>

              <InputField
                inputId="phone_email"
                inputLabel={"Phone Email / Username"}
                inputPlaceHolder={"Phone Email / Username"}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordField
                inputId="password"
                inputLabel={"Password"}
                inputPlaceHolder={"Password"}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div>
                <Link to={"/reset_password"}>Forget Password?</Link>
              </div>

              <div className="mt-6 flex justify-center">
                <PrimaryButton extraClasses="px-20">
                  {isLoading ? "Logging..." : "Login"}
                </PrimaryButton>
              </div>
            </form>

            {/* <div className="flex items-center justify-center text-center">
              <hr className="w-full" />
              <span className="w-full text-slate-700">Or log in with</span>
              <hr className="w-full" />
            </div> */}

            {/* <div className="flex items-center justify-center gap-6 my-4">
              <button className="flex items-center gap-2 px-6 py-2 rounded-[50px] border border-slate-700 text-black">
                <span>
                  <Facebook width={25} height={25} />
                </span>
                <span className="text-zinc-800 font-semibold">Facebook</span>
              </button>

              <button className="flex items-center gap-2 px-6 py-2 rounded-[50px] border border-slate-700 text-black">
                <span>
                  <Google width={25} height={25} />
                </span>
                <span className="text-zinc-800 font-semibold">Google</span>
              </button>
            </div> */}
          </div>

          {location?.pathname != "/" && (
            <p className="text-center">
              <Link to={"/"} className="text-blue-800 text-base font-semibold">
                Go To Home
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

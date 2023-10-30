import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AES } from "crypto-js";
// import login_img from "../../../assets/auth/login.png";
import { postLogin } from "../../../hooks/auth/authApi";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const { isLoading: submitLoading, mutate } = useMutation(postLogin, {
    onSuccess: (response) => {
      if (response.data.data.user) {
        const user = response.data.data.user;
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

        if (user.role == 3) {
          navigate("/student/dashboard");
        } else if (user.role == 2) {
          navigate("/trainer/profile");
        } else {
          navigate("/");
        }
        toast.success("Successfully Loggedin");
        setIsSubmitting(false);
      }
    },
    onError: (error) => {
      if (error?.response?.data?.error) {
        toast.error(`${error?.response?.data?.error}`);
      } else {
        toast.error("something went wrong!");
      }
      setIsSubmitting(false);
    },
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
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
    const user = localStorage.getItem("user");

    if (token && user) {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    // Form validation
    const newErrors = {};

    toast.dismiss();

    if (!formData.email) {
      toast.error("Email is required");
      return;
    }

    if (!formData.password) {
      toast.error("Password is required");
      return;
    }

    setErrors(newErrors);

    if (!submitLoading) {
      mutate({
        formdata: formData,
      });
    }
  };

  return (
    <div className="lg:w-5/12 w-full h-[100%] pt-28 pb-28 lg:mx-auto">
      <div
        className="md:p-10 p-5 mx-5 rounded-lg"
        style={{ boxShadow: "0 0 50px #ccc" }}
      >
        <h2 className="lg:text-4xl text-3xl font-semibold">Welcome back!</h2>
        <p className="text-gray-500 font-semibold py-3">
          Login to access your seller profile settings, do sales training, and
          sell services.
        </p>
        <form onSubmit={handleSubmit} method="post">
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
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.email
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 font-bold text-sm mt-1">
                {errors.email}
              </p>
            )}
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
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.password
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
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

            {errors.password && (
              <p className="text-red-500 font-bold text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 text-xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-medium rounded-lg "
          >
            {isSubmitting ? "Logging..." : "Log In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">Forgot your password?</p>
          <Link
            to="/reset_password"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Reset Password
          </Link>
          <p className="text-gray-600 pt-4">
            Don{"'"}t Have a Account? <br />
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Create a new Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

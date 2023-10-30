import { useState, useEffect } from "react";
import Sidebar from "./layouts/Sidebar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
import Pageloader from "../frontend/pages/layouts/PageLoader.jsx";
import { Suspense } from "react";

function Main() {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const ltoken = localStorage.getItem("token");
    const luser = localStorage.getItem("user");

    if (ltoken && luser) {
      const dToken = AES.decrypt(ltoken, "token-secret-key").toString(
        CryptoJS.enc.Utf8
      );
      const dUser = JSON.parse(
        AES.decrypt(luser, "user-secret-key").toString(CryptoJS.enc.Utf8)
      );

      if (dUser.role == 2) {
        setToken(dToken);
        setUser(dUser);
        setIsLoggedIn(true);
      } else if (dUser.role == 3) {
        setIsLoading(true);
        setIsAdminLoggedIn(true);
        navigate("/student/dashboard");
      } else if (dUser.role == 1) {
        setIsLoading(true);
        setIsAdminLoggedIn(true);
        navigate("/admin/dashboard");
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Suspense fallback={<div></div>}>
      {isLoading ? ( // Render the page loader if isLoading is true
        <Pageloader
          title={
            isAdminLoggedIn
              ? "Admin Logged In. Redirect Dashboard"
              : "Student Login"
          }
        />
      ) : (
        <>
          <Sidebar context={[user, token, isLoggedIn]} />
          <div className="bg-white dark:bg-black p-4 sm:ml-64">
            <div className="p-4 mt-14">
              <Outlet context={[user, token, isLoggedIn]} />
            </div>
          </div>
        </>
      )}
    </Suspense>
  );
}

export default Main;

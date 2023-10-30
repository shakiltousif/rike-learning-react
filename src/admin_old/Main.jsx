import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
import Sidebar from "./layouts/sidebar.jsx";

function Main() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

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

      if (dUser.role == 1 && dUser?.roles?.[0]?.name == "Super Admin") {
        setToken(dToken);
        setUser(dUser);
        setIsLoggedIn(true);
      }
      if (dUser?.roles?.[0]?.name != "Super Admin") {
        // Check if the pathname is "/admin/login"
        if (location?.pathname) {
          // Replace "admin" with "subadmin"
          const newPathname = location?.pathname.replace("/admin", "/subadmin");

          navigate(`${newPathname}`);
        }
      }
    } else {
      navigate("/admin/login");
    }
  }, [navigate, location]);

  return (
    <>
      {isLoggedIn && token && user && user.role == 1 ? (
        <>
          <Sidebar context={[user, token, isLoggedIn]} />
          <div className="bg-white dark:bg-[#070c44] sm:ml-64 overflow-y-auto h-screen p-1 md:p-6">
            <div className="mt-14 bg-white dark:bg-[#070c44]">
              <Outlet context={[user, token, isLoggedIn]} />
            </div>
          </div>
        </>
      ) : (
        <>
          <Outlet context={[user, token, isLoggedIn]} />
        </>
      )}
    </>
  );
}

export default Main;

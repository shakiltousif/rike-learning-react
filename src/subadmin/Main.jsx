import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
import Sidebar from "./layouts/Sidebar.jsx";
import { menus } from "../config/menu.jsx";
import { isMatchMenu } from "../hooks/common/useMenu.js";

function Main() {
  const [firstRedirect, setFirstRedirect] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
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

      if (dUser.role == 1 && dUser?.roles?.[0]?.name != "Super Admin") {
        setToken(dToken);
        setUser(dUser);
        setIsLoggedIn(true);
      } else {
        navigate("/subadmin/login");
      }
    } else {
      navigate("/subadmin/login");
    }
  }, [navigate]);

  const menuList = menus("subadmin");

  useEffect(() => {
    if (
      !isMatchMenu(menuList, location?.pathname) &&
      !firstRedirect &&
      location?.pathname?.split("/")?.length > 4
    ) {
      if (menuList?.length != 0) {
        if (menuList?.[0]?.path) {
          navigate(menuList?.[0]?.path);
        } else if (menuList?.[0]?.children?.length != 0) {
          navigate(menuList?.[0]?.children?.[0]?.path);
        }
        setFirstRedirect(true);
      }
    } else {
      //
    }
  }, [navigate, location, menuList, firstRedirect]);

  return (
    <>
      {isLoggedIn && token && user && user.role == 1 ? (
        <>
          <Sidebar context={[user, token, isLoggedIn]} />
          <div className="bg-gray-900 sm:ml-64 overflow-y-auto h-screen p-1 md:p-6">
            <div className="mt-14 bg-gray-900">
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

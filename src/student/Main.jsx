import { useState, useEffect } from "react";
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../frontend/pages/layouts/Header.jsx";
import Navbar from "./layouts/navbar";
import PageLoader from "../frontend/pages/layouts/PageLoader";
import { Suspense } from "react";

function Main() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOtherLoggedIn, setIsOtherLoggedIn] = useState("");
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

      if (dUser.role == 3) {
        setToken(dToken);
        setUser(dUser);
        setIsLoggedIn(true);
      } else if (dUser.role == 2) {
        setIsLoading(true);
        setIsOtherLoggedIn("Trainer Logged In. Redirect Dashboard");
        navigate("/trainer/dashboard");
      } else if (dUser.role == 1 && dUser?.roles?.[0]?.name == "Super Admin") {
        setIsLoading(true);
        setIsOtherLoggedIn("Admin Logged In. Redirect Dashboard");
        navigate("/admin/dashboard");
      } else if (dUser.role == 1) {
        setIsLoading(true);
        setIsOtherLoggedIn("Admin Logged In. Redirect Dashboard");
        navigate("/subadmin/dashboard");
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Suspense
      fallback={
        <>
          
        </>
      }
    >
      {isLoading ? ( // Render the page loader if isLoading is true
        <PageLoader
          title={isOtherLoggedIn ? isOtherLoggedIn : "Student Login"}
        />
      ) : (
        <>
          <Header />
          {isLoggedIn && (
            <>
              <Navbar context={[user, token, isLoggedIn]} />
              <div className="bg-white">
                <div className="p-4 pt-16">
                  <Outlet context={[user, token, isLoggedIn]} />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Suspense>
  );
}

export default Main;

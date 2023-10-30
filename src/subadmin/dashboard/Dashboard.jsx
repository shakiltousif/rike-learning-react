import { useState, useEffect } from "react";
import Cards from "./compontents/Cards";
import { useQuery } from "react-query";
import { getDashboard } from "../../hooks/admin/dashboardApi";
import Tables from "./compontents/Tables";
import TableSkeleton from "../../components/Skeleton/admin/dashboard/TableSkeleton";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // const [ctoken, setCtoken] = useState("");
  // const [cuser, setCUser] = useState({});
  // let i = 1;
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  const { isLoading } = useQuery("getDashboard", getDashboard, {
    onSuccess: (response) => {
      if (response.data.data) {
        setData(response.data.data);
      }
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const luser = localStorage.getItem("user");

    // let decryptedToken = "";
    // Decrypt the user object
    if (token && luser) {
      // decryptedToken = AES.decrypt(token, "token-secret-key").toString(
      //   CryptoJS.enc.Utf8
      // );
      // const decryptedUser = AES.decrypt(luser, "user-secret-key").toString(
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
      <Cards data={data} loading={isLoading} />

      {!isLoading && data ? <Tables data={data} /> : <TableSkeleton />}
    </>
  );
};

export default Dashboard;

import { useState, useEffect } from "react";
import Breadcrumb from "../layouts/Breadcrumb.jsx";
import Pageloader from "../layouts/PageLoader.jsx";
import privacyImage from "../../../assets/legal/privacy.svg";
import axios from "axios";

const Privacy = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.usrike-learning.com/public/api/frontend/privacy-policy"
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <Pageloader title="Privacy And Policy" />;
  }

  const { pageTitle, policy } = data;

  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <>
      <Breadcrumb title={pageTitle} />
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="w-full flex justify-center items-center">
            <img
              className="w-7/12 h-auto"
              src={privacyImage}
              alt="Privacy And Policy"
            />
          </div>
          <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 uppercase text-center">
            {pageTitle}
          </h2>
          {policy.description ? (
            <div
              dangerouslySetInnerHTML={createMarkup(policy.description)}
            ></div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Privacy;

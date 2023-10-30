import { useQuery } from "react-query";
import { updateCache } from "../../hooks/admin/settingsApi";
import { useState } from "react";
import Breadcrumb from "../layouts/Breadcrumb";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

export default function OtherSetting() {
  const [status, setStatus] = useState(false);

  const { isFetching, refetch } = useQuery(
    "updateCache",
    () => updateCache(status),
    {
      enabled: false,
      onSuccess: (response) => {
        if (response?.data?.success) {
          toast.success(response?.data?.success);
        }
      },
    }
  );

  const handleSubmit = (e, Id) => {
    e.preventDefault();
    toast.dismiss();

    setStatus(Id);
  };

  useEffect(() => {
    if (status) {
      refetch(status);
    }
  }, [status, refetch]);

  return (
    <>
      <Breadcrumb title={"Other Settings"} />
      <div className="my-12 h-screen">
        <div className="flex items-center space-x-6 dark:text-white text-black my-6">
          <h1>Views Cache:</h1>
          <button
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            disabled={isFetching}
            onClick={(e) => handleSubmit(e, 1)}
          >
            {isFetching && status == 1
              ? "Views cache updating..."
              : "Clear"}
          </button>
        </div>

        <div className="flex items-center space-x-6 dark:text-white text-black my-6">
          <h1> Route cache:</h1>
          <button
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            disabled={isFetching}
            onClick={(e) => handleSubmit(e, 2)}
          >
            {isFetching && status == 2
              ? " Route cache updating..."
              : " Clear"}
          </button>
        </div>

        <div className="flex items-center space-x-6 dark:text-white text-black my-6">
          <h1> Configuration cache:</h1>
          <button
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            disabled={isFetching}
            onClick={(e) => handleSubmit(e, 3)}
          >
            {isFetching && status == 3
              ? " Configuration cache updating..."
              : " Clear"}
          </button>
        </div>

        <div className="flex items-center space-x-6 dark:text-white text-black my-6">
          <h1> Application cache:</h1>
          <button
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            disabled={isFetching}
            onClick={(e) => handleSubmit(e, 4)}
          >
            {isFetching && status == 4
              ? " Application cache updating..."
              : " Clear"}
          </button>
        </div>
      </div>
    </>
  );
}

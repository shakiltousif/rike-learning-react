import { useState } from "react";
import Breadcrumb from "../layouts/Breadcrumb";
import { useMutation, useQuery } from "react-query";
import {
  getGeneralSettings,
  postSaveSettings,
} from "../../hooks/admin/settingsApi";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import objectToFormData from "../../components/ObjectToFormData";
import MailSettingsSkeleton from "../../components/Skeleton/admin/settings/MailSettingSkeleton";
import MailTestModal from "../../components/admin/settings/MailTestModal";

function GeneralSettings() {
  const [settings, setSettings] = useState([]);
  const { isLoading: isSettingsLoading, refetch } = useQuery(
    "getGeneralSettings",
    getGeneralSettings,
    {
      onSuccess: (response) => {
        if (response?.data?.data?.settings) {
          setSettings(response?.data?.data?.settings);
        }
      },
    }
  );
  const { isLoading, mutate } = useMutation(postSaveSettings, {
    onSuccess: () => {
      toast.success("Successfully Saved!");
      refetch();
    },
    onError: (error) => {
      if (error?.response?.data) {
        toast.error(`${error?.response?.data}`);
      } else {
        toast.error("something went wrong");
      }
    },
  });

  // State variables to store the input values
  const [mailMailer, setMailMailer] = useState("");
  const [mailHost, setMailHost] = useState("");
  const [mailPort, setMailPort] = useState("");
  const [mailUsername, setMailUsername] = useState("");
  const [mailPassword, setMailPassword] = useState("");
  const [mailEncryption, setMailEncryption] = useState("");
  const [mailFromAddress, setMailFromAddress] = useState("");
  const [mailFromName, setMailFromName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the formdata object
    let formdata = {};
    if (mailMailer != "") {
      formdata.MAIL_MAILER = mailMailer;
    }
    if (mailHost != "") {
      formdata.MAIL_HOST = mailHost;
    }
    if (mailPort != "") {
      formdata.MAIL_PORT = mailPort;
    }

    if (mailUsername != "") {
      formdata.MAIL_USERNAME = mailUsername;
    }

    if (mailPassword != "") {
      formdata.MAIL_PASSWORD = mailPassword;
    }

    if (mailEncryption != "") {
      formdata.MAIL_ENCRYPTION = mailEncryption;
    }
    if (mailFromAddress != "") {
      formdata.MAIL_FROM_ADDRESS = mailFromAddress;
    }
    if (mailFromName != "") {
      formdata.MAIL_FROM_NAME = mailFromName;
    }

    if (!isLoading) {
      mutate({
        formdata: objectToFormData(formdata),
      });
    }
  };

  useEffect(() => {
    if (settings?.length != 0) {
      settings?.map((setting) => {
        if (setting?.option_key == "MAIL_MAILER") {
          setMailMailer(setting.option_value);
        }
        if (setting?.option_key == "MAIL_HOST") {
          setMailHost(setting.option_value);
        }
        if (setting?.option_key == "MAIL_PORT") {
          setMailPort(setting.option_value);
        }
        if (setting?.option_key == "MAIL_USERNAME") {
          setMailUsername(setting.option_value);
        }
        if (setting?.option_key == "MAIL_PASSWORD") {
          setMailPassword(setting.option_value);
        }
        if (setting?.option_key == "MAIL_ENCRYPTION") {
          setMailEncryption(setting.option_value);
        }
        if (setting?.option_key == "MAIL_FROM_ADDRESS") {
          setMailFromAddress(setting.option_value);
        }
        if (setting?.option_key == "MAIL_FROM_NAME") {
          setMailFromName(setting.option_value);
        }
      });
    }
  }, [settings]);
  return (
    <>
      <Breadcrumb title={"Mail Settings"} />
      <div className="my-12">
        {isSettingsLoading ? (
          <MailSettingsSkeleton />
        ) : (
          <form action="#" onSubmit={handleSubmit}>
            {/* Submit button */}
            <div className="flex items-center justify-end space-x-6">
              <button
                type="submit"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Settings"}
              </button>

              <MailTestModal />
            </div>
            {/* MAIL_DRIVER */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="mailMailer"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  MAIL DRIVER
                </label>
                <input
                  type="text"
                  name="mailMailer"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="MAIL DRIVER"
                  required=""
                  value={mailMailer}
                  onChange={(e) => setMailMailer(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="mailHost"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  MAIL HOST
                </label>
                <input
                  type="text"
                  name="mailHost"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="MAIL HOST"
                  required=""
                  value={mailHost}
                  onChange={(e) => setMailHost(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="mailPort"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  MAIL PORT
                </label>
                <input
                  type="text"
                  name="mailPort"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="MAIL PORT"
                  required=""
                  value={mailPort}
                  onChange={(e) => setMailPort(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="mailUsername"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  MAIL USERNAME
                </label>
                <input
                  type="text"
                  name="mailUsername"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="MAIL USERNAME"
                  required=""
                  value={mailUsername}
                  onChange={(e) => setMailUsername(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="mailPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  MAIL PASSWORD
                </label>
                <input
                  type="password"
                  name="mailPassword"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="MAIL PASSWORD"
                  required=""
                  value={mailPassword}
                  onChange={(e) => setMailPassword(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="mailEncryption"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  MAIL ENCRYPTION
                </label>

                <select
                  name="mailEncryption"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={mailEncryption}
                  onChange={(e) => setMailEncryption(e.target.value)}
                  required
                >
                  <option value="">Select ENCRYPTION</option>
                  <option value="tls">tls</option>
                  <option value="ssl">ssl</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="mailFromAddress"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  MAIL FROM ADDRESS
                </label>
                <input
                  type="text"
                  name="mailFromAddress"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="MAIL ENCRYPTION"
                  required=""
                  value={mailFromAddress}
                  onChange={(e) => setMailFromAddress(e.target.value)}
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default GeneralSettings;

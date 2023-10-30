import { useState } from "react";
import Breadcrumb from "../layouts/Breadcrumb";
import { useMutation, useQuery } from "react-query";
import {
  getGeneralSettings,
  postSaveSettings,
} from "../../hooks/admin/settingsApi";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import GeneralSettingsSkeleton from "../../components/Skeleton/admin/settings/GeneralSettingsSkeleton";
import ImageUpload from "../../components/FormFields/ImageUpload";
import objectToFormData from "../../components/ObjectToFormData";

function GeneralSettings() {
  const [settings, setSettings] = useState([]);
  const [languages, setLanguages] = useState([]);
  const { isLoading: isSettingsLoading, refetch } = useQuery(
    "getGeneralSettings",
    getGeneralSettings,
    {
      onSuccess: (response) => {
        if (response?.data?.data?.settings) {
          setSettings(response?.data?.data?.settings);
          setLanguages(response?.data?.data?.languages);
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
  const [appName, setAppName] = useState("");
  const [appEmail, setAppEmail] = useState("");
  const [appContactNumber, setAppContactNumber] = useState("");
  const [appLocation, setAppLocation] = useState("");
  const [appCopyright, setAppCopyright] = useState("");
  const [developedBy, setDevelopedBy] = useState("");
  const [dateFormat, setDateFormat] = useState("");
  const [defaultLanguage, setDefaultLanguage] = useState("");
  const [signUpLeftText, setSignUpLeftText] = useState("");
  const [registrationEmailVerification, setRegistrationEmailVerification] =
    useState("");
  const [forgotTitle, setForgotTitle] = useState("");
  const [forgotSubtitle, setForgotSubtitle] = useState("");
  const [forgotButtonName, setForgotButtonName] = useState("");
  const [footerQuote, setFooterQuote] = useState("");
  const [appLogo, setAppLogo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the formdata object
    let formdata = {};
    if (appName != "") {
      formdata.app_name = appName;
    }
    if (appEmail != "") {
      formdata.app_email = appEmail;
    }
    if (appContactNumber != "") {
      formdata.app_contact_number = appContactNumber;
    }
    if (appLocation != "") {
      formdata.app_location = appLocation;
    }
    if (appCopyright != "") {
      formdata.app_copyright = appCopyright;
    }
    if (developedBy != "") {
      formdata.app_developed = developedBy;
    }
    if (dateFormat != "") {
      formdata.app_date_format = dateFormat;
    }
    if (defaultLanguage != "") {
      formdata.language_id = defaultLanguage;
    }
    if (signUpLeftText != "") {
      formdata.sign_up_left_text = signUpLeftText;
    }
    if (registrationEmailVerification != "") {
      formdata.registration_email_verification = registrationEmailVerification;
    }
    if (forgotTitle != "") {
      formdata.forgot_title = forgotTitle;
    }
    if (forgotSubtitle != "") {
      formdata.forgot_subtitle = forgotSubtitle;
    }
    if (forgotButtonName != "") {
      formdata.forgot_btn_name = forgotButtonName;
    }
    if (footerQuote != "") {
      formdata.footer_quote = footerQuote;
    }
    if (appLogo != "") {
      formdata.app_logo = appLogo;
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
        if (setting?.option_key == "app_name") {
          setAppName(setting?.option_value);
        }
        if (setting?.option_key == "app_email") {
          setAppEmail(setting?.option_value);
        }
        if (setting?.option_key == "app_contact_number") {
          setAppContactNumber(setting?.option_value);
        }
        if (setting?.option_key == "app_location") {
          setAppLocation(setting?.option_value);
        }
        if (setting?.option_key == "app_copyright") {
          setAppCopyright(setting?.option_value);
        }
        if (setting?.option_key == "app_developed") {
          setDevelopedBy(setting?.option_value);
        }
        if (setting?.option_key == "app_date_format") {
          setDateFormat(setting?.option_value);
        }
        if (setting?.option_key == "language_id") {
          setDefaultLanguage(setting?.option_value);
        }
        if (setting?.option_key == "sign_up_left_text") {
          setSignUpLeftText(setting?.option_value);
        }
        if (setting?.option_key == "registration_email_verification") {
          setRegistrationEmailVerification(setting?.option_value);
        }
        if (setting?.option_key == "forgot_title") {
          setForgotTitle(setting?.option_value);
        }
        if (setting?.option_key == "forgot_subtitle") {
          setForgotSubtitle(setting?.option_value);
        }
        if (setting?.option_key == "forgot_btn_name") {
          setForgotButtonName(setting?.option_value);
        }
        if (setting?.option_key == "footer_quote") {
          setFooterQuote(setting?.option_value);
        }
        if (setting?.option_key == "app_logo") {
          setAppLogo(setting?.option_value);
        }
      });
    }
  }, [settings]);
  return (
    <>
      <Breadcrumb title={"General Settings"} />
      <div className="my-12">
        {isSettingsLoading ? (
          <GeneralSettingsSkeleton />
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
            </div>
            {/* App Logo */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="app_logo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  App Logo
                </label>
                <ImageUpload
                  circle
                  id={"app_logo"}
                  placeHolder={"Profile Picture"}
                  url={appLogo}
                  InputChange={(e) => setAppLogo(e.target.files[0])}
                  className={"md:w-[10%] w-[40%] "}
                />
              </div>
            </div>

            {/* App Name */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="app_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  App Name
                </label>
                <input
                  type="text"
                  name="app_name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="App Name"
                  required=""
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                />
              </div>
            </div>

            {/* App Email */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="app_email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  App Email
                </label>
                <input
                  type="email"
                  name="app_email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="App Email"
                  required=""
                  value={appEmail}
                  onChange={(e) => setAppEmail(e.target.value)}
                />
              </div>
            </div>

            {/* App Contact Number */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="app_contact_number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  App Contact Number
                </label>
                <input
                  type="tel"
                  name="app_contact_number"
                  id="contact_number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="App Contact Number"
                  required=""
                  value={appContactNumber}
                  onChange={(e) => setAppContactNumber(e.target.value)}
                />
              </div>
            </div>

            {/* App Location */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="app_location"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  App Location
                </label>
                <input
                  type="text"
                  name="app_location"
                  id="location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="App Location"
                  required=""
                  value={appLocation}
                  onChange={(e) => setAppLocation(e.target.value)}
                />
              </div>
            </div>

            {/* App Copyright */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="app_copyright"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  App Copyright
                </label>
                <input
                  type="text"
                  name="app_copyright"
                  id="copyright"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="App Copyright"
                  required=""
                  value={appCopyright}
                  onChange={(e) => setAppCopyright(e.target.value)}
                />
              </div>
            </div>

            {/* Developed By */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="developed_by"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Developed By
                </label>
                <input
                  type="text"
                  name="developed_by"
                  id="developed_by"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Developed By"
                  required=""
                  value={developedBy}
                  onChange={(e) => setDevelopedBy(e.target.value)}
                />
              </div>
            </div>

            {/* Date Format */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="date_format"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date Format
                </label>
                <select
                  name="app_date_format"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  required
                >
                  <option value="">Select Date Format</option>
                  <option value="m/d/Y">m/d/Y (eg. 07/24/2023 )</option>
                  <option value="d/m/Y">d/m/Y (eg. 24/07/2023 )</option>
                  <option value="Y/m/d">Y/m/d (eg. 2023/07/24 )</option>
                  <option value="Y/d/m">Y/d/m (eg. 2023/24/07 )</option>
                  <option value="m-d-Y">m-d-Y (eg. 07-24-2023 )</option>
                  <option value="d-m-Y">d-m-Y (eg. 24-07-2023 )</option>
                  <option value="Y-m-d">Y-m-d (eg. 2023-07-24 )</option>
                  <option value="Y-d-m">Y-d-m (eg. 2023-24-07 )</option>
                  <option value="d M, Y">d M, Y (eg. 24 Jul, 2023 )</option>
                  <option value="M d, Y">M d, Y (eg. Jul 24, 2023 )</option>
                  <option value="Y M, d">Y M, d (eg. 2023 Jul, 24 )</option>
                  <option value="d F, Y">d F, Y (eg. 24 July, 2023 )</option>
                  <option value="Y F, d">Y F, d (eg. 2023 July, 24 )</option>
                </select>
              </div>
            </div>

            {/* Default Language */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="default_language"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Default Language
                </label>
                <select
                  name="default_language"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={defaultLanguage}
                  onChange={(e) => setDefaultLanguage(e.target.value)}
                  required
                >
                  <option value="">Select Language</option>
                  {languages?.length != 0 &&
                    languages?.map((lang, key) => (
                      <option key={key} value={lang?.id}>
                        {lang?.language}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Sign Up Left Text */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="sign_up_left_text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Sign Up Left Text
                </label>
                <input
                  type="text"
                  name="sign_up_left_text"
                  id="sign_up_left_text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Sign Up Left Text"
                  required=""
                  value={signUpLeftText}
                  onChange={(e) => setSignUpLeftText(e.target.value)}
                />
              </div>
            </div>

            {/* Registration Email Verification */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="registration_email_verification"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Registration Email Verification
                </label>
                <select
                  name="registration_email_verification"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={registrationEmailVerification}
                  onChange={(e) =>
                    setRegistrationEmailVerification(e.target.value)
                  }
                  required
                >
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="2">Deactive</option>
                </select>
              </div>
            </div>

            {/* Forgot Title */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="forgot_title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Forgot Title
                </label>
                <input
                  type="text"
                  name="forgot_title"
                  id="forgot_title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Forgot Title"
                  required=""
                  value={forgotTitle}
                  onChange={(e) => setForgotTitle(e.target.value)}
                />
              </div>
            </div>

            {/* Forgot Subtitle */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="forgot_subtitle"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Forgot Subtitle
                </label>
                <input
                  type="text"
                  name="forgot_subtitle"
                  id="forgot_subtitle"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Forgot Subtitle"
                  required=""
                  value={forgotSubtitle}
                  onChange={(e) => setForgotSubtitle(e.target.value)}
                />
              </div>
            </div>

            {/* Forgot Button Name */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="forgot_button_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Forgot Button Name
                </label>
                <input
                  type="text"
                  name="forgot_button_name"
                  id="forgot_button_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Forgot Button Name"
                  required=""
                  value={forgotButtonName}
                  onChange={(e) => setForgotButtonName(e.target.value)}
                />
              </div>
            </div>

            {/* Footer Quote */}
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                <label
                  htmlFor="footer_quote"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Footer Quote
                </label>
                <input
                  type="text"
                  name="footer_quote"
                  id="footer_quote"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Footer Quote"
                  required=""
                  value={footerQuote}
                  onChange={(e) => setFooterQuote(e.target.value)}
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

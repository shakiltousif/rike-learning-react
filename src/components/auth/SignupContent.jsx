import login_left from "../../assets/frontend/auth/login_left.png";
import logo from "../../assets/common/logo.png";
import { Stepper } from "@mantine/core";
import { useEffect, useState } from "react";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import SignupStep3 from "./SignupStep3";
import { Link, useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getRegister, postRegister } from "../../hooks/auth/authApi";
import toast from "react-hot-toast";
import Success from "../../frontend/pages/auth/Success";

export default function SignUpContent() {
  // const [successRegister, setSuccessRegister] = useState();

  const params = useParams();
  const Id = params?.Id;

  useEffect(() => {
    setterFunction("referral_code", Id);
  }, [Id]);
  const [registerInfo, setRegisterInfo] = useState(null);

  const { isLoading } = useQuery("getRegister", getRegister, {
    onSuccess: (response) => {
      setRegisterInfo(response?.data?.data);
    },
  });

  const { isLoading: submitLoading, mutate } = useMutation(postRegister, {
    onSuccess: () => {
      toast.success("Register is Successful. Please Login.");
      // setSuccessRegister(true);
      nextStep();
    },
    onError: (error) => {
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("something went wrong");
      }
    },
  });

  const location = useLocation();

  const [active, setActive] = useState(0);

  const nextStep = () => {
    const next = () => {
      setActive((current) => (current < 3 ? current + 1 : current));
    };
    if (active == 0) {
      if (getFormData("full_name") && getFormData("lang")) {
        next();
      } else {
        if (!getFormData("full_name")) {
          toast.error("Fill the full name field");
        } else if (!getFormData("lang")) {
          toast.error("Fill the lang field");
        }
      }
    } else if (active == 1) {
      if (
        getFormData("phone_number") &&
        getFormData("area_code") &&
        getFormData("email")
      ) {
        next();
      } else {
        if (!getFormData("phone_number")) {
          toast.error("Fill the phone number field");
        } else if (!getFormData("email")) {
          toast.error("Fill the email field");
        } else if (!getFormData("area_code")) {
          toast.error("Fill the area code field");
        }
      }
    } else {
      next();
    }
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const [formData, setFormData] = useState({
    full_name: "",
    lang: "",
    phone_number: "",
    email: "",
    username: "",
    password: "",
    area_code: "",
    referral_code: "",
  });

  const setterFunction = (key, value) => {
    setFormData((prev) => {
      let obj = { ...prev };
      obj[key] = value; // Remove the dot before square brackets
      return obj;
    });
  };

  const getFormData = (key) => {
    return formData[key];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const firstName = formData?.full_name?.split(" ")?.[0];
    const lastName = formData?.full_name?.split(" ")?.[1];

    const userData = {
      first_name: firstName,
      last_name: lastName,
      email: formData.email,
      password: formData.password,
      area_code: formData.area_code,
      mobile_number: formData.phone_number,
      referral_code: formData.referral_code,
    };

    mutate({
      formdata: userData,
    });
  };

  return (
    <section className="">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center p-10 md:p-0">
        <div className="col-span-1 md:col-span-1 hidden md:block">
          <img src={login_left} alt="Login Page" height={"100%"} />
        </div>
        <div className="col-span-1 md:col-span-2">
          <div className="max-w-screen-sm mx-auto py-10">
            <div className="flex justify-center my-2">
              <img src={logo} alt={"Rike learning"} />
            </div>
            <h2 className="text-center text-zinc-800 text-4xl font-bold">
              Create an Account
            </h2>
            <p className="text-center">
              <span className="text-neutral-500 text-base font-normal">
                Already have an account?{" "}
              </span>
              <Link
                to={"/login"}
                className="text-blue-800 text-base font-semibold"
              >
                Log in
              </Link>
            </p>

            {isLoading ? (
              "Loading..."
            ) : (
              <form className="my-10" onSubmit={handleSubmit}>
                <Stepper active={active} breakpoint="md">
                  <Stepper.Step label="First step">
                    <SignupStep1
                      nextStep={nextStep}
                      prevStep={prevStep}
                      formDataState={getFormData}
                      setFormDataState={setterFunction}
                    />
                  </Stepper.Step>
                  <Stepper.Step label="Second step">
                    <SignupStep2
                      nextStep={nextStep}
                      prevStep={prevStep}
                      formDataState={getFormData}
                      setFormDataState={setterFunction}
                      regiInfo={registerInfo}
                    />
                  </Stepper.Step>
                  <Stepper.Step label="Final step">
                    <SignupStep3
                      nextStep={nextStep}
                      prevStep={prevStep}
                      formDataState={getFormData}
                      setFormDataState={setterFunction}
                      submitLoading={submitLoading}
                    />
                  </Stepper.Step>
                  <Stepper.Completed>
                    <Success
                      user={{
                        first_name: formData.full_name,
                        email: formData.email,
                        password: formData.password,
                        area_code: formData.area_code,
                        mobile_number: formData.phone_number,
                        referral_code: formData.referral_code,
                      }}
                    />
                  </Stepper.Completed>
                </Stepper>
              </form>
            )}

            {location?.pathname != "/" && (
              <p className="text-center">
                <Link
                  to={"/"}
                  className="text-blue-800 text-base font-semibold"
                >
                  Go To Home
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import PrimaryButton from "../common/PrimaryButton";
import SecondaryButton from "../common/SecondaryButton";

export default function SignupStep3({
  prevStep,
  //nextStep,
  formDataState,
  setFormDataState,
  submitLoading,
}) {
  return (
    <div>
      <div className="my-4">
        <label
          htmlFor="username"
          className="text-zinc-800 text-base font-normal my-2"
        >
          User Name
        </label>
        <input
          type="text"
          name="username"
          placeholder="User Name"
          className="w-full bg-white py-3 px-2 border border-slate-400 rounded-lg outline-none my-2"
          defaultValue={formDataState("username")}
          onChange={(e) => setFormDataState("username", e.target.value)}
        />
      </div>

      <div className="my-4">
        <div className="flex justify-between">
          <label
            htmlFor="password"
            className="text-zinc-800 text-base font-normal"
          >
            Password
          </label>
          <p className="flex gap-2 items-center hover:text-black cursor-pointer">
            Hide
          </p>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full bg-white py-3 px-2 border border-slate-400 rounded-lg outline-none my-2"
          defaultValue={formDataState("password")}
          onChange={(e) => setFormDataState("password", e.target.value)}
        />
      </div>

      <div className="my-4">
        <label
          htmlFor="referral_code"
          className="text-zinc-800 text-base font-normal my-2"
        >
          Referral Code
        </label>
        <input
          type="nummber"
          name="referral_code"
          placeholder="Referral Code"
          className="w-full bg-white py-3 px-2 border border-slate-400 rounded-lg outline-none my-2"
          defaultValue={formDataState("referral_code")}
          onChange={(e) => setFormDataState("referral_code", e.target.value)}
        />
      </div>

      <div className="mt-6 block md:flex justify-center gap-4 text-center space-y-4 md:space-y-0">
        <SecondaryButton extraClasses="px-20" onClick={prevStep}>
          Back
        </SecondaryButton>
        <PrimaryButton
          extraClasses="px-20"
          type="submit"
          disabled={submitLoading}
        >
          {submitLoading ? "Submitting..." : "Submit"}
        </PrimaryButton>
      </div>
    </div>
  );
}

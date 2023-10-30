import PrimaryButton from "../common/PrimaryButton";

export default function SignupStep1({
  nextStep,
  formDataState,
  setFormDataState,
}) {
  return (
    <div>
      <div className="my-4">
        <label
          htmlFor="full_name"
          className="text-zinc-800 text-base font-normal my-2"
        >
          Full Name
        </label>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          className="w-full bg-white py-3 px-2 border border-slate-400 rounded-lg outline-none my-2"
          defaultValue={formDataState("full_name")}
          onChange={(e) => setFormDataState("full_name", e.target.value)}
        />
      </div>

      <div className="my-4">
        <label
          htmlFor="lang"
          className="text-zinc-800 text-base font-normal my-2"
        >
          Language
        </label>
        <select
          name="lang"
          placeholder="Language"
          className="w-full bg-white py-3 px-2 border border-slate-400 rounded-lg outline-none my-2"
          defaultValue={formDataState("lang")}
          onChange={(e) => setFormDataState("lang", e.target.value)}
        >
          <option>Select Language</option>
          <option value={"english"}>English</option>
          <option value={"bangla"}>Bangla</option>
        </select>
      </div>

      <div className="mt-6 block md:flex justify-center gap-4 text-center space-y-4">
        {/* <SecondaryButton extraClasses="px-20" onClick={prevStep}>Back</SecondaryButton> */}
        <PrimaryButton extraClasses="px-20" type="button" onClick={nextStep}>
          Next
        </PrimaryButton>
      </div>
    </div>
  );
}

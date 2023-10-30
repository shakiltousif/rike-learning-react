import SecondaryButton from "../common/SecondaryButton";
import PrimaryButton from "../common/PrimaryButton";

export default function SignupStep2({
  prevStep,
  nextStep,
  formDataState,
  setFormDataState,
  regiInfo,
}) {
  console.log(regiInfo);
  return (
    <div>
      <div className="my-4">
        <div className="flex gap-2 items-center">
          <div>
            <label
              htmlFor="phone_number"
              className="text-zinc-800 text-base font-normal my-2"
            >
              Country
            </label>
            <select
              name="area_code"
              id="area_code"
              className="w-full bg-white py-3 px-2 border border-slate-400 rounded-lg outline-none my-2"
              defaultValue={formDataState("area_code")}
              onChange={(e) => setFormDataState("area_code", e.target.value)}
            >
              <option hidden>Select</option>
              {regiInfo &&
                regiInfo?.map((code, key) => (
                  <option
                    key={key}
                    value={code?.phonecode?.split("+").join("")}
                  >
                    {code?.country_name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="phone_number"
              className="text-zinc-800 text-base font-normal my-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              className="w-full bg-white py-3 px-2 border border-slate-400 rounded-lg outline-none my-2"
              defaultValue={formDataState("phone_number")}
              onChange={(e) => setFormDataState("phone_number", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="my-4">
        <label
          htmlFor="email"
          className="text-zinc-800 text-base font-normal my-2"
        >
          Email
        </label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="w-full bg-white py-3 px-2 border border-slate-400 rounded-lg outline-none my-2"
          defaultValue={formDataState("email")}
          onChange={(e) => setFormDataState("email", e.target.value)}
        />
      </div>

      <div className="mt-6 block md:flex justify-center gap-4 text-center space-y-4 md:space-y-0">
        <SecondaryButton extraClasses="px-20" type="button" onClick={prevStep}>
          Back
        </SecondaryButton>
        <PrimaryButton extraClasses="px-20" type="button" onClick={nextStep}>
          Next
        </PrimaryButton>
      </div>
    </div>
  );
}

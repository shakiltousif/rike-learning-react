import { useState } from "react";

export default function PasswordField({
  inputId,
  inputPlaceHolder,
  inputLabel,
  extraClasses,
  ...rest
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="my-4">
      <div className="flex justify-between">
        <label
          htmlFor={inputId}
          className="text-zinc-800 text-base font-normal"
        >
          {inputLabel}
        </label>
        <p
          className="flex gap-2 items-center hover:text-black cursor-pointer"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? "Show" : "Hide"}
        </p>
      </div>
      <input
        type={show ? "text" : "password"}
        name={inputId}
        placeholder={inputPlaceHolder}
        className={`w-full bg-white py-3 px-2 border border-slate-400 rounded-lg outline-none my-2 ${extraClasses}`}
        {...rest}
      />
    </div>
  );
}

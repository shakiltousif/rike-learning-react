export function InputField({
  inputId,
  inputPlaceHolder,
  inputLabel,
  type = "text",
  extraClasses,
  ...rest
}) {
  return (
    <div className="my-4">
      <label
        htmlFor={inputId}
        className="text-zinc-800 text-base font-normal my-2"
      >
        {inputLabel}
      </label>
      <input
        type={type}
        name={inputId}
        placeholder={inputPlaceHolder}
        className={`w-full bg-white py-3 px-2 border border-slate-400 rounded-lg outline-none my-2 ${extraClasses}`}
        {...rest}
      />
    </div>
  );
}

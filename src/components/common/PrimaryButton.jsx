import { Link } from "react-router-dom";

export default function PrimaryButton({
  buttonHref,
  children,
  extraClasses,
  ...rest
}) {
  return buttonHref ? (
    <Link
      to={buttonHref}
      className={`bg-ulprimary px-10 py-3 rounded-full font-bold text-white shadow-lg hover:shadow-xl ${extraClasses}`}
      {...rest}
    >
      {children}
    </Link>
  ) : (
    <button
      className={`bg-ulprimary px-10 py-3 rounded-full font-bold text-white shadow-lg hover:shadow-xl ${extraClasses}`}
      {...rest}
    >
      {children}
    </button>
  );
}

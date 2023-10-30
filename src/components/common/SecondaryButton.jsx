import { Link } from "react-router-dom";

export default function SecondaryButton({
  buttonHref,
  extraClasses,
  children,
  ...rest
}) {
  return buttonHref ? (
    <Link
      to={buttonHref}
      className={`bg-ulsecondary px-10 py-3 rounded-full font-bold text-white shadow-lg hover:shadow-xl ${extraClasses}`}
      {...rest}
    >
      {children}
    </Link>
  ) : (
    <button
      className={`bg-ulsecondary px-10 py-3 rounded-full font-bold text-white shadow-lg hover:shadow-xl ${extraClasses}`}
      {...rest}
    >
      {children}
    </button>
  );
}

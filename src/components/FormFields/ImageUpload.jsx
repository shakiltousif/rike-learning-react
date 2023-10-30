import { useRef } from "react";
import user_img from "../../assets/user_image.png";
import { BASE_ASSETS_URL } from "../../config/basic";
export default function ImageUpload({
  title,
  id,
  placeHolder,
  url,
  circle = null,
  imageAlt,
  className,
  InputChange,
  InputField = false,
  IsImage = true,
  imageH = false,
  imageW = false,
  defaultImg = false,
  ...rest
}) {
  const input = useRef(null);
  return (
    <>
      <label htmlFor={id} className="">
        {title}
      </label>
      {IsImage ? (
        <img
          src={
            url
              ? url instanceof Object
                ? URL.createObjectURL(url)
                : `${BASE_ASSETS_URL}${url}`
              : defaultImg
              ? defaultImg
              : user_img
          }
          className={`cursor-pointer ${
            circle ? `rounded-full h-[50%] w-[50%]` : `h-40 w-60`
          } ${className}`}
          onClick={() => input.current.click()}
          {...rest}
          alt={imageAlt ? imageAlt : "..."}
          height={imageH ? imageH : "150"}
          width={imageW ? imageW : "150"}
        />
      ) : null}
      <input
        ref={input}
        id={id}
        name={id}
        type={"file"}
        className={`${
          InputField ? "" : "hidden"
        } rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
        placeholder={placeHolder}
        onChange={InputChange}
      />
    </>
  );
}

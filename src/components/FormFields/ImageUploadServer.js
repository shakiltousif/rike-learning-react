import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import user_img from "../../assets/img/userImage.jpg";
import { useUploadImageMutation } from "@/redux/features/admin/common/commonApi";
import { PUBLIC_IMAGE_URL } from "@/Config";
import objectToFormData from "../objectToFormData";
export default function ImageUploadServer({
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

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [fileURL, setFileURL] = useState(false);




    const [upload, { isLoading }] = useUploadImageMutation()

    const uploading = async (e) => {



        const res = await upload(objectToFormData({ image: e.target.files[0] }));

        if (res?.data?.success === 'ok') {
            setFileURL(res?.data?.data)
            InputChange(res?.data?.data)
        }
    }

    return (
        <>
            <label htmlFor={id} className="">
                {title}
            </label>
            {IsImage ? (
                <Image
                    src={
                        url
                            ? url instanceof Object
                                ? URL.createObjectURL(url)
                                : `${PUBLIC_IMAGE_URL}${url}`
                            : defaultImg
                                ? defaultImg
                                : user_img.src
                    }
                    className={`cursor-pointer ${circle ? `rounded-full h-[50%] w-[50%]` : `h-40 w-60`
                        } ${className}`}
                    onClick={() => input.current.click()}
                    {...rest}
                    alt={imageAlt ? imageAlt : "..."}
                    height={imageH ? imageH : "150"}
                    width={imageW ? imageW : "150"}
                />
            ) : null}
            <div className={` ${isLoading && 'hidden'} ${InputField ? "" : "hidden"
                }`}>
                <input
                    ref={input}
                    id={id}
                    name={id}
                    type={"file"}
                    className={`${InputField ? "" : "hidden"
                        } rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                    placeholder={placeHolder}
                    // onChange={InputChange}
                    onChange={uploading}
                />
                <p className="text-white">only supported file type : jpeg,png,bmp</p>
            </div>


            {
                isLoading &&
                <div className="flex gap-2 my-2 text-white items-center">
                    <p>Uploading. Please wait...</p>
                    <i className="fa-solid fa-spinner animate-spin text-xm"></i>
                </div>
            }
        </>
    );
}

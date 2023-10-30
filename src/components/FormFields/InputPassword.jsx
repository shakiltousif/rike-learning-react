import { useState } from "react"

export default function InputPassword({ Id, inputID, type, labelText, placeHolderText, Isrequired, extraClasses, ...props }) {


    const [seen, setSeen] = useState(false);


    return (
        <div>
            <label htmlFor={Id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labelText}</label>
            <div className="relative">
                <input type={seen ? 'text' : type} name={Id} id={inputID} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${extraClasses}`} placeholder={placeHolderText} required={Isrequired} {...props} />
                <div className="absolute top-[25%] right-[5%] text-white cursor-pointer" onClick={() => setSeen(prev => !prev)}>
                    {
                        seen ?
                            <i className="fa-solid fa-eye"></i>
                            :
                            <i className="fa-solid fa-eye-slash"></i>
                    }
                </div>
            </div>
        </div>
    )
}
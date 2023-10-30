import { Loader } from "@mantine/core";

const RoleSkeleton = () => {
  return (
    <form className="p-5">
      <div className="relative z-0 w-full mb-6 group">
        <div className="block py-2.5 px-0 w-full text-sm text-transparent bg-transparent border-0 border-b-2 border-gray-300 animate-pulse appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600">
          Placeholder Role Name
        </div>
        <label
          htmlFor="floating_role_name"
          className="peer-focus:font-medium absolute text-sm text-transparent duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Role Name
        </label>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <h2 className="text-xl font-bold mb-4 dark:text-white text-black">
          Select Permissions:
        </h2>
        <div className="grid grid-cols-2">
          {/* Placeholder skeleton for permissions checkboxes */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center mb-4">
              <div className="w-5 h-5 bg-gray-100 border-gray-300 rounded animate-pulse dark:bg-gray-700 dark:border-gray-600" />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-lg font-medium dark:text-white text-black"
              >
                <span className="ml-2 bg-transparent animate-pulse">
                  Placeholder Permission
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled // Disable the button in the skeleton mode
      >
        {/* Display the loader in the skeleton mode */}
        <Loader color="white" size="lg" variant="dots" />
      </button>
    </form>
  );
};

export default RoleSkeleton;

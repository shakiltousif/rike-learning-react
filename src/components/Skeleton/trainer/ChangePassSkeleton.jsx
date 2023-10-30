const ChangePasswordSkeleton = () => {
  return (
    <div className="my-12 h-screen">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white dark:bg-gray-900 p-2 animate-pulse">
        <form className="p-5">
          <div className="mb-6">
            <div className="h-8 w-96 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg mb-2"></div>
            <div className="h-8 w-80 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
          </div>
          <div className="mb-6">
            <div className="h-8 w-96 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg mb-2"></div>
            <div className="h-8 w-80 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
          </div>
          <div className="h-12 w-40 bg-gradient-to-r from-blue-200 dark:from-gray-700 to-blue-100 dark:to-gray-800 rounded-lg mb-6"></div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 animate-pulse"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordSkeleton;

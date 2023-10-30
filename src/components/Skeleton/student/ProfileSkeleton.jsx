const ProfileSkeleton = () => {
  return (
    <div className="container mx-auto my-5 p-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:-mx-2 ">
        <div className="w-full md:mx-2">
          <div className="bg-white p-3 border-t-4 border-blue-600 animate-pulse">
            <div className="h-48 w-full bg-gradient-to-r from-gray-900 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg mb-2"></div>
            <div className="h-4 w-48 bg-gradient-to-r from-gray-900 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
            <div className="h-8 w-56 bg-gradient-to-r from-gray-900 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg my-1"></div>
            <div className="py-2 mt-1 divide-y rounded shadow-sm">
              <h3 className="h-6 w-32 bg-gradient-to-r from-gray-900 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></h3>
            </div>
            <div className="py-2 mt-1 divide-y rounded shadow-sm">
              <h3 className="h-6 w-32 bg-gradient-to-r from-gray-900 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></h3>
            </div>
            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span className="h-6 w-16 bg-gradient-to-r from-gray-900 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></span>
                <span className="ml-auto h-6 w-16 bg-gradient-to-r from-gray-900 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></span>
              </li>
              <li className="flex items-center py-3">
                <span className="h-6 w-32 bg-gradient-to-r from-gray-900 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></span>
                <span className="ml-auto h-6 w-32 bg-gradient-to-r from-gray-900 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-5 shadow-sm rounded-sm border-t-4 border-blue-600 animate-pulse">
            <div className="py-2 mt-1 divide-y rounded shadow-sm">
              <h5 className="h-8 w-96 bg-gradient-to-r from-gray-900 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></h5>
            </div>
            <div className="py-2 mt-1 divide-y rounded shadow-sm">
              <h3 className="h-8 w-56 bg-gradient-to-r from-gray-900 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></h3>
              <p className="h-6 my-4 w-96 bg-gradient-to-r from-gray-900 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></p>
            </div>
          </div>
        </div>

        <div className="w-full mx-2 col-span-2">
          <div className="bg-white p-5 shadow-sm rounded-sm animate-pulse">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span className="h-6 w-6 bg-green-500 rounded-full"></span>
              <span className="h-4 w-16 bg-gradient-to-r from-gray-900 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></span>
            </div>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-1 text-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;

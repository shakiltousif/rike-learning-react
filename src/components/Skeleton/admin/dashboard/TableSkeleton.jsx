
const TableSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Top Courses Table Skeleton */}
      <div className="relative shadow-md sm:rounded-lg bg-white dark:bg-gray-900 p-5 animate-pulse overflow-y-scroll">
        <div>
          <p className="text-3xl py-5 font-bold text-gray-400 text-center xl:text-left">
            Top Courses
          </p>
        </div>
        <table className="w-full text-sm text-center xl:text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-6">
                Course
              </th>
              <th scope="col" className="px-6 py-3">
                Instructor Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Total Order
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">
                  <div className="h-4 w-16 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-20 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-10 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="h-4 w-8 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Enrollment Chart Skeleton */}
      <div className="w-full h-auto rounded p-5 bg-gray-50 dark:bg-gray-800 mb-5 animate-pulse">
        <h1 className="mb-5 text-xl font-bold lg:text-2xl text-gray-900 dark:text-gray-200">
          Total Enrollment: Loading...
        </h1>
        {/* Chart Component Skeleton (Adjust the height accordingly) */}
        <div className="w-full h-60 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
      </div>

      {/* Withdraws Component Skeleton */}
      <div className="w-full h-auto rounded p-5 bg-gray-50 dark:bg-gray-800 animate-pulse">
        <h1 className="mb-5 text-xl font-bold lg:text-2xl text-gray-900 dark:text-gray-200">
          Withdraws
        </h1>
        {/* Withdraw Component Skeleton (Adjust the height accordingly) */}
        <div className="w-full h-72 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
      </div>
    </div>
  );
};

export default TableSkeleton;

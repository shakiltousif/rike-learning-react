export default function AddGmeetSkeleton() {
  return (
    <div className="my-6">
      <div className="relative z-0 w-full mb-6 group">
        <div className="h-10 w-96 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg mb-2"></div>
        <div className="h-6 w-40 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <div className="h-10 w-96 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg mb-2"></div>
        <div className="h-6 w-40 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <div className="h-10 w-96 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg mb-2"></div>
        <div className="h-6 w-40 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
      </div>

      <div className="flex gap-4 my-4">
        <button
          className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800 animate-pulse"
          disabled
        >
          Adding...
        </button>

        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 animate-pulse"
          disabled
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

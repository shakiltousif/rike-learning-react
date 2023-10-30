const CardSkeleton = () => {
  return [...Array(5)]?.map((__, key) => (
    <div key={key} className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8 animate-pulse"
        >
          <div className="flex flex-col gap-3">
            <div className="h-12 w-32 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
            <div className="h-8 w-16 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
          </div>
          <div className="h-12 w-12 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-full"></div>
        </div>
      ))}
    </div>
  ));
};

export default CardSkeleton;

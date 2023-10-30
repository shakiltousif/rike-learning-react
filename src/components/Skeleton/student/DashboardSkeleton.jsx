const SkeletonLoader = () => (
  <div className="animate-pulse bg-gray-300 rounded-lg h-4 w-1/4 mb-4"></div>
);

const DashboardSkeleton = () => {
  return (
    <div className="max-w-screen-xl mx-auto text-center">
      <h1 className="my-8 text-center text-4xl">
        <SkeletonLoader />
      </h1>

      <div className="space-y-8 lg:grid lg:grid-cols-3 gap-4 lg:space-y-0">
        {/* Render skeleton loader for each card */}
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="w-full p-6 mx-auto text-center text-gray-900 bg-white border border-gray-100 rounded-lg shadow shadow-xl border-gray-600 xl:p-8 bg-gray-100  "
          >
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        ))}
      </div>

      <div className="max-w-screen-xl px-4 mx-auto text-center">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Render skeleton loader for next classes section */}
          <div className="lg:col-span-2">
            <h1 className="my-8 text-left text-2xl">
              <SkeletonLoader />
            </h1>
            <div className="py-6 border border-gray-700 rounded-lg w-full px-6">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="w-full text-left p-4 flex justify-between items-center bg-gray-100 hover:shadow-xl cursor-pointer my-2"
                >
                  <div>
                    <SkeletonLoader />
                  </div>
                  <span className="text-sm">
                    <SkeletonLoader />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Render skeleton loader for referral section */}
          <div className="">
            <div className="flex justify-between items-center">
              <h1 className="my-8 text-left text-2xl flex items-center gap-2">
                <SkeletonLoader />
              </h1>
              <div className="text-right py-6">
                <button>
                  <i className="fa-solid fa-user-pen"></i>
                </button>
              </div>
            </div>
            <div className="py-6 border border-gray-700 rounded-lg w-full px-6">
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className="w-full text-left p-4 flex justify-between items-center bg-gray-100 shadow-xl cursor-pointer"
                >
                  <div>
                    <SkeletonLoader />
                  </div>
                  <span className="text-sm">
                    <SkeletonLoader />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;

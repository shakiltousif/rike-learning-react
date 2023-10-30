const LoginSkeleton = () => {
    return (
      <div className="min-h-screen bg-gray-100 py-8 flex justify-center items-center">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 animate-pulse">
            <div className="mb-8">
              <div className="h-12 w-32 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg mb-2"></div>
              <div className="h-4 w-48 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
            </div>
            <form method="post">
              <div className="mb-4">
                <div className="h-10 w-full bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
              </div>
              <div className="mb-6">
                <div className="h-10 w-full bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-lg"></div>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-2 bg-gradient-to-r from-blue-200 dark:from-blue-700 to-blue-100 dark:to-blue-800 text-white font-medium rounded-lg hover:bg-blue-600"
              >
                Login in
              </button>
  
              <div className="text-center my-6">
                <div className="h-10 w-full bg-gradient-to-r from-blue-200 dark:from-blue-700 to-blue-100 dark:to-blue-800 rounded-lg"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default LoginSkeleton;
  
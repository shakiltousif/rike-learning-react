import { Link } from "react-router-dom";
// import success_image from "../../../assets/auth/success.png";

const Success = ({ user }) => {
  return (
    <div className="py-20 flex justify-center items-center">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-center items-center">
          {/* <img src={success_image} className="block w-60" /> */}
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Name
                  </th>
                  <td className="px-6 py-4">
                    {user?.first_name} {user?.last_name}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Phone
                  </th>
                  <td className="px-6 py-4">{user?.mobile_number}</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Email
                  </th>
                  <td className="px-6 py-4">{user?.email}</td>
                </tr>

                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Reference
                  </th>
                  <td className="px-6 py-4">{user?.referral_code}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="my-6 text-center">
          <Link
            to="/login"
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
          >
            Go to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;

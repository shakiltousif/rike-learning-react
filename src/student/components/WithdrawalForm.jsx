import { useState } from "react";
import { modelClose } from "../../helpers/helper.js";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { postStudentWithdraw } from "../../hooks/student/studentApi.js";

function WithdrawalForm({ refetchFn }) {
  // Withdrawal Form Submit
  const [formData, setFormData] = useState({
    withdraw_amount: "",
    withdraw_method: "",
    withdraw_description: "",
  });

  const { mutate, isLoading: submitLoading } = useMutation(
    postStudentWithdraw,
    {
      onSuccess: (response) => {
        if (response?.data?.success) {
          toast.success(response?.data?.success);
        }
        // Reset the form fields if needed
        setFormData({
          withdraw_amount: "",
          withdraw_method: "",
          withdraw_description: "",
        });
        modelClose("withdraw-modal");
        refetchFn();
      },
      onError: (error) => {
        if (error?.response?.data?.error) {
          toast.error(error?.response?.data?.error);
        } else {
          toast.error("something went wrong!");
        }
      },
    }
  );

  const validateForm = () => {
    // Validate the 'amount' field
    if (!formData.withdraw_amount) {
      toast.error("Amount is required");
      return true;
    }

    // Validate the 'withdraw_method' field
    if (!formData.withdraw_method) {
      toast.error("Payment method is required");
      return true;
    }

    // Validate the 'withdraw_description' field
    if (!formData.withdraw_description) {
      toast.error("Withdrawal description is required");
      return true;
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate the form fields
    const validationErrors = validateForm();

    if (validationErrors == false && !submitLoading) {
      mutate({
        formdata: formData,
      });
    }
  };

  return (
    <>
      <div
        id="withdraw-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-screen bg-tranblack"
      >
        <div className="relative w-full max-w-md max-h-full m-auto">
          <div className="relative bg-white rounded-lg shadow">
            <button
              onClick={() => modelClose("withdraw-modal")}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-hide="withdraw-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900">
                Sign in to our platform
              </h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="amount"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Withdrawal Amount
                  </label>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        withdraw_amount: e.target.value,
                      })
                    }
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${""}`}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label
                    htmlFor="withdraw_method"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Withdrawal Method
                  </label>
                  <select
                    name="withdraw_method"
                    id="withdraw_method"
                    value={formData.withdraw_method}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        withdraw_method: e.target.value,
                      })
                    }
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${""}`}
                  >
                    <option value="">Select a payment method</option>
                    <option value="bkash">Bkash</option>
                    <option value="rocket">Rocket</option>
                    <option value="upay">Upay</option>
                    <option value="nagad">Nagad</option>
                    <option value="google pay">Google Pay</option>
                    <option value="PhonePe">PhonePe</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="withdraw_description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Withdrawal Description
                  </label>
                  <textarea
                    name="withdraw_description"
                    id="withdraw_description"
                    value={formData.withdraw_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        withdraw_description: e.target.value,
                      })
                    }
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${""}`}
                    placeholder="Phone Details, Trx Id"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {submitLoading ? "Sending..." : "Send Request"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WithdrawalForm;

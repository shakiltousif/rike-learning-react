import { useDisclosure } from "@mantine/hooks";
import { Modal, Group } from "@mantine/core";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { postWithdrawRequest } from "../../hooks/common/common";

export default function WithdrawModal({ refetchFn }) {
  const [opened, { open, close }] = useDisclosure(false);

  // Withdrawal Form Submit
  const [formData, setFormData] = useState({
    withdraw_amount: "",
    withdraw_method: "",
    withdraw_description: "",
  });

  const { mutate, isLoading: submitLoading } = useMutation(
    postWithdrawRequest,
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
        close();
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
      <Modal
        opened={opened}
        onClose={close}
        title="Withdraw Request"
        centered
        classNames={{
          content: "bg-gray-900 text-white",
          header: "bg-gray-900 text-white",
        }}
      >
        <div className="px-6 py-6 lg:px-8">
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
                defaultValue={formData.withdraw_amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    withdraw_amount: e.target.value,
                  })
                }
                className={`bg-gray-50 dark:bg-gray-800 text-black dark:text-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${""}`}
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
                defaultValue={formData.withdraw_method}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    withdraw_method: e.target.value,
                  })
                }
                className={`bg-gray-50 dark:bg-gray-800 text-black dark:text-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${""}`}
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
                defaultValue={formData.withdraw_description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    withdraw_description: e.target.value,
                  })
                }
                className={`bg-gray-50 dark:bg-gray-800 text-black dark:text-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${""}`}
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
      </Modal>

      <Group position="center">
        <button
          onClick={open}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Withdraw Now
        </button>
      </Group>
    </>
  );
}

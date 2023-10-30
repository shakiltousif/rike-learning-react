import { useDisclosure } from "@mantine/hooks";
import { Modal, Group } from "@mantine/core";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { sendMail } from "../../../hooks/admin/settingsApi";

export default function MailTestModal() {
  const [opened, { open, close }] = useDisclosure(false);

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const { mutate, isLoading: submitLoading } = useMutation(sendMail, {
    onSuccess: (response) => {
      if (response?.data?.success) {
        toast.success(response?.data?.success);
      }
      setTo("");
      setSubject("");
      setMessage("");
      close();
    },
    onError: (error) => {
      if (error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      } else {
        toast.error("something went wrong!");
      }
    },
  });

  const validateForm = () => {
    // Validate the 'to' field
    if (!to) {
      toast.error("Recipient is required");
      return true;
    }

    // Validate the 'subject' field
    if (!subject) {
      toast.error("Subject is required");
      return true;
    }

    // Validate the 'message' field
    if (!message) {
      toast.error("Message is required");
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
        formdata: {
          to,
          subject,
          message,
        },
      });
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Send Test Mail"
        centered
        classNames={{
          content: "bg-gray-900 text-white",
          header: "bg-gray-900 text-white",
        }}
      >
        <div className="px-6 py-6 lg:px-8 dark:text-white text-black">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="Recipient"
                className="block mb-2 text-sm font-medium text-black dark:text-white"
              >
                Recipient
              </label>
              <input
                type="text"
                name="Recipient"
                id="Recipient"
                className={`bg-gray-50 dark:bg-gray-800 border border-gray-300 text-black dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${""}`}
                placeholder="Recipient Mail"
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="Subject"
                className="block mb-2 text-sm font-medium text-black dark:text-white"
              >
                Subject
              </label>
              <input
                type="text"
                name="Subject"
                id="Subject"
                className={`bg-gray-50 dark:bg-gray-800 border border-gray-300 text-black dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${""}`}
                placeholder="Test Mail"
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="Message"
                className="block mb-2 text-sm font-medium text-black dark:text-white"
              >
                Message
              </label>
              <textarea
                name="Message"
                id="Message"
                className={`bg-gray-50 dark:bg-gray-800 border border-gray-300 text-black dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${""}`}
                placeholder="Test Mail"
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              type="buttons"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={submitLoading}
            >
              {submitLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </Modal>

      <Group position="center">
        <button
          onClick={open}
          type="button"
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Send Test Mail
        </button>
      </Group>
    </>
  );
}

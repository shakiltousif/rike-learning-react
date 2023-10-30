import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { postAdminSingleStudentZone } from "../../../hooks/admin/studentApi";
import { useMutation } from "react-query";

export default function StudentZoneModal({
  studentID,
  buttonText,
  refetchFn,
  selectedZone,
}) {
  const [type, setType] = useState(selectedZone);
  const [opened, { open, close }] = useDisclosure(false);

  const { isLoading, mutate } = useMutation(postAdminSingleStudentZone, {
    onSuccess: (response) => {
      if (response?.data?.success) {
        toast.success(response?.data?.success);
        refetchFn();
        close();
      }
    },
    onError: (error) => {
      if (error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      } else {
        toast.error("something went wrong");
      }
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss();

    if (!type) {
      toast.error("Type field is required");
      return false;
    }

    if (!isLoading) {
      mutate({
        formdata: {
          id: studentID,
          status: type,
        },
      });
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Update Zone"
        centered
        classNames={{
          content: "bg-gray-900 text-white",
          header: "bg-gray-900 text-white",
        }}
      >
        <div className="my-10">
          <div className="relative z-0 w-full mb-6 group">
            <select
              name="floating_zone_type"
              id="floating_zone_type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              value={type ? type : ""}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select Zone Type</option>
              <option value="Whatsapp Number Wrong">
                Whatsapp Number Wrong
              </option>
              <option value="Not Yet Paid">Not Yet Paid</option>

              <option value="No activity since joining">
                No activity since joining
              </option>
              <option value="Counsellor Messaged">Counsellor Messaged</option>
            </select>
          </div>

          <div className="flex gap-4 my-4">
            <button
              className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800"
              onClick={(e) => handleSubmit(e)}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </Modal>

      <button
        onClick={open}
        className={
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        }
      >
        {buttonText}
      </button>
    </>
  );
}

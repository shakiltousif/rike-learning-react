import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Select } from "@mantine/core";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import objectToFormData from "../../ObjectToFormData";
import { useState } from "react";

export default function ApproveModal({
  buttonText,
  buttonTexting,
  className,
  mutationFn,
  refetchFn,
  studentId,
  status,
  leadersArr,
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [leader_id, set_leader_id] = useState(null);

  const { isLoading, mutate } = useMutation(mutationFn, {
    onSuccess: () => {
      close();
      refetchFn();
      toast.dismiss();
      toast.success("Successfully status updated!");
    },
    onError: (error) => {
      toast.dismiss();
      if (error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      } else {
        toast.error("something went wrong. Please try again");
      }
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Confirmation"
        centered
        classNames={{
          content: "bg-gray-900 text-white",
          header: "bg-gray-900 text-white",
        }}
      >
        <p>Are you sure you want to approve this student?</p>

        <div className="my-10 text-white">
          <Select
            searchable
            data={leadersArr.map((option) => ({
              value: `${option.id}`, // Replace with your API response's value field
              label: `${option?.name} ID: ( ${option?.referral_code} )`, // Replace with your API response's label field
            }))}
            value={leader_id}
            onChange={(value) => set_leader_id(value)}
            classNames={{ input: "text-white bg-slate-500" }}
            filter={(value, item) => {
              return item.label
                .toLowerCase()
                .includes(value.toLowerCase().trim());
            }}
            dropdownPosition="bottom"
            required
          />
        </div>
        <div className="flex gap-4 my-4">
          <button
            type="submit"
            className="text-white bg-amber-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-amber-400 dark:hover:bg-amber-400 dark:focus:ring-blue-800"
            onClick={() =>
              mutate({
                formdata: objectToFormData({
                  student_id: studentId,
                  status,
                  leader_id,
                  approved: 1,
                }),
              })
            }
          >
            {isLoading ? buttonTexting : buttonText}
          </button>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Group position="center">
        <button onClick={open} className={className}>
          {buttonText}
        </button>
      </Group>
    </>
  );
}

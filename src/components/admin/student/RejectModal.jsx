import { useDisclosure } from "@mantine/hooks";
import { Modal, Group } from "@mantine/core";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import objectToFormData from "../../ObjectToFormData";

export default function RejectModal({
  buttonText,
  buttonTexting,
  className,
  mutationFn,
  refetchFn,
  studentId,
  status,
}) {
  const [opened, { open, close }] = useDisclosure(false);

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
        <p>Are you sure you want to reject this student?</p>

        <div className="flex gap-4 my-4">
          <button
            type="submit"
            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-700 dark:hover:bg-orange-700 dark:focus:ring-blue-800"
            onClick={() =>
              mutate({
                formdata: objectToFormData({
                  student_id: studentId,
                  status,
                  rejected: 1,
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

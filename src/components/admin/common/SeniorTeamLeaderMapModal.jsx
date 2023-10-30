import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { postChangeSeniorTeamLeader } from "../../../hooks/admin/adminCommonApi";

export default function SeniorTeamLeaderMap() {
  const [team_leader_id_number, set_team_leader_id_number] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const { isLoading, mutate } = useMutation(postChangeSeniorTeamLeader, {
    onSuccess: (response) => {
      if (response?.data?.success) {
        toast.success(response?.data?.success);
      }
    },
    onError: (error) => {
      if (error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      } else {
        toast.error("something went wrong. Please try again");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss();
    if (!isLoading) {
      mutate({
        formdata: {
          team_leader_id_number,
        },
      });
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Change Senior Counsellor"
        centered
        classNames={{
          content: "bg-gray-900 text-white",
          header: "bg-gray-900 text-white",
        }}
      >
        <div className="my-10">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="floating_team_leader_id_number"
              id="floating_team_leader_id_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder="6546463"
              onChange={(e) => set_team_leader_id_number(e.target.value)}
              required
            />
            <label
              htmlFor="floating_team_leader_id_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Senior Team Leader ID
            </label>
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
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        }
      >
        Change Senior Team Leader
      </button>
    </>
  );
}

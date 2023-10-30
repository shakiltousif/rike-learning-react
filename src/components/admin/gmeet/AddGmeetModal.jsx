import { useDisclosure } from "@mantine/hooks";
import { Group, Modal } from "@mantine/core";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-hot-toast";
import { useState } from "react";
import AddGmeetSkeleton from "../../Skeleton/admin/gmeet/AddGmeetSkeleton";
import { getAdminGmeet } from "../../../hooks/admin/gmeetApi";
import { DateTimePicker } from "@mantine/dates";

export default function AddGmeetModal({ refetchFn, mutationFn }) {
  const { data: categoryList, isLoading: categoryLoading } = useQuery(
    "getAdminCatGmeet",
    () => getAdminGmeet({ count: 25 })
  );

  const [cat, setCat] = useState("");
  const [time_first, setMeetDateFirst] = useState("");
  const [time_sec, setMeetDateSec] = useState("");
  const [meet_link, setMeetLink] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const { isLoading, mutate } = useMutation(mutationFn, {
    onSuccess: () => {
      close();
      refetchFn();
      toast.success("Successfully added!");
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
          cat,
          meet_link,
          time: `${time_first.toLocaleString()}  - ${time_sec.toLocaleString()}`,
        },
      });
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Add Gmeet"
        centered
        classNames={{
          content: "bg-gray-900 text-white",
          header: "bg-gray-900 text-white",
        }}
      >
        {categoryLoading ? (
          <AddGmeetSkeleton />
        ) : (
          <div className="my-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_meet_link"
                id="floating_meet_link"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                placeholder="https://meet.google.com/vzj-czen-dyx"
                onChange={(e) => setMeetLink(e.target.value)}
                required
              />
              <label
                htmlFor="floating_meet_link"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Meet Link
              </label>
            </div>

            <div
              className="relative z-0 w-full mb-6 group"
              // onClick={(e) => console.log(e)}
            >
              {/* <input
                type="date"
                name="floating_meet_date"
                id="floating_meet_date"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                onChange={(e) => setMeetDate(e.target.value)}
                required
              /> */}

              <Group>
                <DateTimePicker
                  placeholder="Pick date and time"
                  onChange={(e) => setMeetDateFirst(e)}
                  value={time_first}
                  dropdownType="modal"
                  classNames={{ root: "text-white my-4", input: "text-white" }}
                  locale="bn"
                  valueFormat="DD/MM/YYYY HH:mm"
                />
              </Group>

              <label
                htmlFor="floating_meet_time_first"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Meet Time (From)
              </label>
            </div>

            <div
              className="relative z-0 w-full mb-6 group"
              // onClick={(e) => console.log(e)}
            >
              {/* <input
                type="date"
                name="floating_meet_date"
                id="floating_meet_date"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
                onChange={(e) => setMeetDate(e.target.value)}
                required
              /> */}

              <Group>
                <DateTimePicker
                  placeholder="Pick date and time"
                  onChange={(e) => setMeetDateSec(e)}
                  value={time_sec}
                  dropdownType="modal"
                  classNames={{ root: "text-white my-4", input: "text-white" }}
                  locale="bn"
                  valueFormat="DD/MM/YYYY HH:mm"
                />
              </Group>

              <label
                htmlFor="floating_meet_sec"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Meet Time (To)
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <select
                name="floating_cat"
                id="floating_cat"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                onChange={(e) => setCat(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categoryList?.data?.data?.categories?.length != 0 &&
                  categoryList?.data?.data?.categories?.map((cat, key) => (
                    <option key={key} value={cat?.id}>
                      {cat?.name}
                    </option>
                  ))}

                <option key={1000} value={0}>
                  Help Line
                </option>
              </select>
            </div>

            <div className="flex gap-4 my-4">
              <button
                className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800"
                onClick={(e) => handleSubmit(e)}
              >
                {isLoading ? "Adding..." : "Add New"}
              </button>

              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={close}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>

      <button
        onClick={open}
        className={
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        }
      >
        Add New
      </button>
    </>
  );
}

import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useQuery } from "react-query";
import { getReferralQuery } from "../../hooks/student/studentApi";

export default function StatsModal() {
  const [type, setType] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const { data, isLoading, refetch, isFetching } = useQuery(
    "getReferralQuery",
    () => getReferralQuery({ type, to, from }),
    {
      enabled: false,
      onError: (error) => {
        if (error?.response?.data?.error) {
          toast.error(error?.response?.data?.error);
        } else {
          toast.error("something went wrong. Please try again");
        }
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss();

    if (!to) {
      toast.error("To field is required");
      return false;
    }

    if (!from) {
      toast.error("From field is required");
      return false;
    }

    if (!type) {
      toast.error("Type field is required");
      return false;
    }

    if (!isLoading) {
      refetch();
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Get Student Stats"
        centered
        classNames={{
          content: "bg-gray-100 text-black",
          header: "bg-gray-100 text-black",
        }}
      >
        {!isFetching && data?.data?.data?.referrencesConvertToday && (
          <>
            <h2>Search Details:</h2>
            <div className="my-6">
              {data?.data?.data?.referrencesConvert && (
                <div className="flex justify-between items-center p-4 border border-2 my-2">
                  <p>Total {type}:</p>
                  <p>
                    {data?.data?.data?.referrencesConvert
                      ? data?.data?.data?.referrencesConvert?.length
                      : data?.data?.data?.referrencesConvert?.length}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center p-4 border border-2 my-2">
                <p>Today {type}:</p>
                <p>{data?.data?.data?.referrencesConvertToday?.length}</p>
              </div>
            </div>
          </>
        )}
        {!isFetching && data?.data?.data?.referrencesToday && (
          <>
            <h2>Search Details:</h2>
            <div className="my-6">
              {data?.data?.data?.referrences && (
                <div className="flex justify-between items-center p-4 border border-2 my-2">
                  <p>Total {type}:</p>
                  <p>
                    {data?.data?.data?.referrences
                      ? data?.data?.data?.referrences?.length
                      : data?.data?.data?.referrences?.length}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center p-4 border border-2 my-2">
                <p>Today {type}:</p>
                <p>{data?.data?.data?.referrencesToday?.length}</p>
              </div>
            </div>
          </>
        )}
        <div className="my-10">
          <div className="relative z-0 w-full mb-6 group">
            <select
              name="floating_type"
              id="floating_type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="leads">Leads</option>
              <option value="convert">Convert</option>
            </select>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="date"
              name="floating_from"
              id="floating_from"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
              onChange={(e) => setFrom(e.target.value)}
              required
            />
            <label
              htmlFor="floating_from"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              From
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="date"
              name="floating_to"
              id="floating_to"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
              onChange={(e) => setTo(e.target.value)}
              required
            />
            <label
              htmlFor="floating_to"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              To
            </label>
          </div>

          <div className="flex gap-4 my-4">
            <button
              className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800"
              onClick={(e) => handleSubmit(e)}
            >
              {isFetching ? "Checking..." : "Check"}
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
        Get Stats
      </button>
    </>
  );
}

import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { postSingleCourseLessonUpdate } from "../../../../hooks/admin/courseApi";

export default function EditLesson({
  Id,
  courseId,
  refetchFn,
  _short_description,
  _name,
}) {
  const [short_description, setShortDescription] = useState("");
  const [name, setName] = useState("");
  const [opened, { open, close }] = useDisclosure(false);

  const { isLoading, mutate } = useMutation(postSingleCourseLessonUpdate, {
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
        Id,
        CourseId: courseId,
        formdata: {
          name,
          short_description,
        },
      });
    }
  };

  useEffect(() => {
    setShortDescription(_short_description);
    setName(_name);
  }, [_name, _short_description]);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Update Lesson"
        centered
        classNames={{
          content: "bg-gray-900 text-white",
          header: "bg-gray-900 text-white",
        }}
      >
        <div className="my-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_name"
              id="floating_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
              placeholder="Lesson Name"
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
              required
            />
            <label
              htmlFor="floating_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <textarea
              name="floating_lesson_short_description"
              id="floating_lesson_short_description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600"
              onChange={(e) => setShortDescription(e.target.value)}
              defaultValue={short_description}
              placeholder="Short Description"
            ></textarea>
          </div>
          <div className="flex gap-4 my-4">
            <button
              className="text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800"
              onClick={(e) => handleSubmit(e)}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>

            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={close}
            >
              Cancel
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
        Edit
      </button>
    </>
  );
}

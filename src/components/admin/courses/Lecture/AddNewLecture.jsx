import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { postSingleCourseLessonLectureCreate } from "../../../../hooks/admin/courseApi";
import FormSelectors from "../../../FormFields/FormSelectors";
import LectureImage from "./Fields/LectureImage";
import LectureText from "./Fields/LectureText";
import LectureYoutube from "./Fields/LectureYoutube";

export default function AddNewLecture({ LessonId, courseId, refetchFn }) {
  const [type, setType] = useState("image");
  const [fieldObj, setFieldObj] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  const { isLoading, mutate } = useMutation(
    postSingleCourseLessonLectureCreate,
    {
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
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss();
    if (!isLoading) {
      let formdata = new FormData();
      formdata.append("type", type);
      fieldObj?.map((item) => {
        formdata.append(`${item?.key}`, item?.value);
      });

      mutate({
        LessonId,
        CourseId: courseId,
        formdata,
      });
    }
  };

  const fieldsArr = [
    {
      type: "image",
      field: <LectureImage setterFn={setFieldObj} />,
    },
    {
      type: "text",
      field: <LectureText setterFn={setFieldObj} />,
    },
    {
      type: "youtube",
      field: <LectureYoutube setterFn={setFieldObj} />,
    },
  ];

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Add New Lecture"
        centered
        classNames={{
          content: "bg-gray-900 text-white",
          header: "bg-gray-900 text-white",
        }}
      >
        <div className="my-6">
          <div className="relative z-0 w-full mb-6 group">
            <FormSelectors
              Id={"lecture_type"}
              labelText={"Select Type"}
              firstOptionLabel={"Select Type"}
              onChange={(e) => setType(e.target.value)}
            >
              <option value={"image"}>image</option>
              <option value={"youtube"}>Youtube</option>
              <option value={"text"}>text</option>
            </FormSelectors>
          </div>

          {fieldsArr.filter((field) => field?.type == type)?.[0]?.field}

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

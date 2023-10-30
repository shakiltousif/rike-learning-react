import { Group, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import InputText from "../../FormFields/InputText";
import TextArea from "../../FormFields/TextArea";
import InputRepeater from "../../FormFields/InputRepeater";
import FormSelectors from "../../FormFields/FormSelectors";
import { useMutation } from "react-query";
import { postSingleCourseOverviewUpdate } from "../../../hooks/admin/courseApi";
import { toast } from "react-hot-toast";

export default function OverviewForm({
  courseEditInfo,
  refetchFn,
  stepHandle,
}) {
  const course = courseEditInfo?.course;

  const { isLoading, mutate } = useMutation(postSingleCourseOverviewUpdate, {
    onSuccess: () => {
      stepHandle(0, "n");
      refetchFn();
    },
    onError: (error) => {
      if (error?.response?.data?.error) {
        toast.error(`${error?.response?.data?.error}`);
      } else {
        toast.error("Course isn't loadded yet. Please refresh to clear cache!");
      }
    },
  });

  const [title, setTitle] = useState("");
  const [course_type, setCourseType] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [key_points, setKeyPoints] = useState("");
  const [status, setStatus] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoading) {
      mutate({
        Id: course?.uuid,
        formdata: {
          title,
          course_type,
          subtitle,
          description,
          key_points,
          status,
        },
      });
    }
  };

  useEffect(() => {
    if (course) {
      setTitle(course?.title);
      setSubTitle(course?.subtitle);
      setKeyPoints(course?.keyPoints);
      setCourseType(course?.course_type);
      setDescription(course?.description);
      setStatus(course?.status);
    }
  }, [course]);

  return (
    <form
      className="space-y-4 md:space-y-6 py-10"
      action="#"
      onSubmit={handleSubmit}
    >
      <InputText
        Id="title"
        inputID="title"
        type="text"
        placeHolderText="Title"
        labelText="Title"
        Isrequired={true}
        onChange={(e) => setTitle(e.target.value)}
        defaultValue={course?.title}
      />

      <TextArea
        Id="subtitle"
        inputID="subtitle"
        placeHolderText="Subtitle"
        labelText="Subtitle"
        Isrequired={true}
        onChange={(e) => setSubTitle(e.target.value)}
        defaultValue={course?.subtitle}
      />

      <InputRepeater
        inputPlaceHolderText="Type key point name"
        onChangeGetObj={(e) => setKeyPoints(e)}
        defaultObj={courseEditInfo?.keyPoints}
        idKey={"id"}
        valueKey={"name"}
        labelText={"Key Points"}
        Id={"key_points"}
      />

      <FormSelectors
        Id={"course_type"}
        labelText={"Select Type"}
        firstOptionLabel={"Select Course Type"}
        onChange={(e) => setCourseType(e.target.value)}
        selectedValue={course?.course_type}
      >
        <option value={1}>General</option>
        <option value={2} disabled>
          Scorm
        </option>
      </FormSelectors>

      <FormSelectors
        Id={"course_status"}
        labelText={"Select Status"}
        firstOptionLabel={"Select Course Status"}
        onChange={(e) => setStatus(e.target.value)}
        selectedValue={status}
      >
        <option value={0}>Pending</option>
        <option value={1}>Published</option>
        <option value={2}>Waiting For Review</option>
        <option value={3}>Hold</option>
      </FormSelectors>

      <TextArea
        Id="description"
        inputID="description"
        placeHolderText="Description"
        labelText="Description"
        Isrequired={true}
        onChange={(e) => setDescription(e.target.value)}
        value={course?.description}
      />

      <Group position="center" mt="xl">
        <button
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? (
            <p className="flex gap-4 items-center">
              Updating
              <Loader color="white" size="lg" variant="dots" />
            </p>
          ) : (
            "Next"
          )}
        </button>
      </Group>
    </form>
  );
}

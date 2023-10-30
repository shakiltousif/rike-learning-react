import { Group, Loader } from "@mantine/core";
import { useQuery } from "react-query";
import {
  deleteSingleCourseLesson,
  getSingleCourseLesson,
} from "../../../hooks/admin/courseApi";
import DeleteModal from "../../DeleteModal";
import { useEffect } from "react";
import { useState } from "react";
import TrashIcon from "../../Icons/TrashIcon";
import InfiniteScroll from "react-infinite-scroll-component";
import AddNewLesson from "./Lesson/AddNewLesson";
import EditLesson from "./Lesson/EditLesson";
import LectureList from "./Lecture/LectureList";

export default function LessonForm({ courseEditInfo, stepHandle }) {
  const [count, setCount] = useState(25);

  const increase = 25;
  const colSpan = 5;

  const course = courseEditInfo?.course;

  const {
    data: lessons,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery("getSingleCourseLesson", () =>
    getSingleCourseLesson({ Id: course?.uuid })
  );
  const currentStep = 2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    stepHandle(currentStep, "n");
  };

  useEffect(() => {
    refetch();
  }, [count, refetch]);
  let content = null;

  if (isLoading)
    content = (
      <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white">
        <td colSpan={colSpan} className="text-center text-white">
          <div className="text-center flex justify-center items-center my-6">
            <Loader color="white" size="lg" variant="dots" />
          </div>
        </td>
      </tr>
    );

  if (!isLoading && isError)
    content = (
      <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white">
        <td
          colSpan={colSpan}
          className="text-center text-white py-6"
        >{`${error?.error}`}</td>
      </tr>
    );

  if (!isLoading && lessons?.data?.data?.length === 0)
    content = (
      <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Lessons Found!
        </td>
      </tr>
    );

  if (!isLoading && lessons?.data?.data?.length > 0)
    content = lessons?.data?.data?.map((lesson, key) => (
      <tr
        key={key}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td
          data-label={"Serial"}
          className="px-6 py-4"
        >
          {key + 1}
        </td>
        <td
          data-label={"Name"}
          className="px-6 py-4"
        >
          {lesson?.name}
        </td>
        <td
          data-label={"Description"}
          className="px-6 py-4"
        >
          {lesson?.short_description}
        </td>

        <td
          data-label={"Lectures"}
          className="px-6 py-4"
        >
          <LectureList Id={lesson?.uuid} courseId={course?.uuid} />
        </td>

        <td
          data-label={"Action"}
          className="px-6 py-4"
        >
          <div className="flex items-center justify-end gap-2">
            <EditLesson
              _name={lesson?.name}
              _short_description={lesson?.short_description}
              Id={lesson?.uuid}
              courseId={course?.uuid}
              refetchFn={refetch}
            />
            <DeleteModal
              buttonText={<TrashIcon />}
              mutationFn={deleteSingleCourseLesson}
              deleteId={lesson?.uuid}
              refetchFn={refetch}
            />
          </div>
        </td>
      </tr>
    ));

  return (
    <div className="space-y-4 md:space-y-6 py-10">
      <div className="my-6">
        <AddNewLesson refetchFn={refetch} courseId={course?.uuid} />
      </div>
      <div>
        <InfiniteScroll
          dataLength={
            lessons?.data?.data?.length ? lessons?.data?.data?.length : 0
          }
          next={() => {
            setCount((prev) => prev + increase);
          }}
          hasMore={lessons?.data?.data?.length == count}
        >
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  Serial
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Lectures
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </InfiniteScroll>
        {isFetching && (
          <div className="text-center flex justify-center items-center my-6">
            <Loader color="white" size="lg" variant="dots" />
          </div>
        )}
      </div>
      <Group position="center" mt="xl">
        <button
          onClick={() => stepHandle(currentStep, "p")}
          className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
        >
          Back
        </button>

        <button
          onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Next
        </button>
      </Group>
    </div>
  );
}

import { useDisclosure } from "@mantine/hooks";
import { Loader, Modal } from "@mantine/core";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import {
  deleteSingleCourseLessonLecture,
  getSingleCourseLessonLecture,
} from "../../../../hooks/admin/courseApi";
import InfiniteScroll from "react-infinite-scroll-component";
import AddNewLecture from "./AddNewLecture";
import DeleteModal from "../../../DeleteModal";
import TrashIcon from "../../../Icons/TrashIcon";

export default function LectureList({ Id, courseId }) {
  const [opened, { open, close }] = useDisclosure(false);

  const [count, setCount] = useState(25);

  const increase = 25;
  const colSpan = 3;

  const {
    data: lectures,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery("getSingleCourseLessonLecture", () =>
    getSingleCourseLessonLecture({ LessonId: Id, CourseId: courseId })
  );

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

  if (!isLoading && lectures?.data?.data?.lectures.length === 0)
    content = (
      <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 hover:text-white">
        <td colSpan={colSpan} className="text-center text-white py-6">
          No Lectures Found!
        </td>
      </tr>
    );

  if (!isLoading && lectures?.data?.data?.lectures.length > 0)
    content = lectures?.data?.data?.lectures.map((lecture, key) => (
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
          {lecture?.type}
        </td>

        <td
          data-label={"Action"}
          className="px-6 py-4"
        >
          <div className="flex items-center justify-end gap-2">
            <DeleteModal
              buttonText={<TrashIcon />}
              mutationFn={deleteSingleCourseLessonLecture}
              deleteId={lecture?.uuid}
              refetchFn={refetch}
            />
          </div>
        </td>
      </tr>
    ));
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Lecture List"
        centered
        size={"100%"}
        classNames={{
          content: "bg-gray-900 text-white",
          header: "bg-gray-900 text-white",
        }}
      >
        <div className="my-6">
          <div className="my-6">
            <AddNewLecture
              refetchFn={refetch}
              courseId={courseId}
              LessonId={Id}
            />
          </div>
          <div>
            <InfiniteScroll
              dataLength={
                lectures?.data?.data?.lectures.length
                  ? lectures?.data?.data?.lectures.length
                  : 0
              }
              next={() => {
                setCount((prev) => prev + increase);
              }}
              hasMore={lectures?.data?.data?.lectures.length == count}
            >
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      Serial
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Type
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
        </div>
      </Modal>

      <button
        onClick={open}
        className={
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        }
      >
        Get Lectures
      </button>
    </>
  );
}

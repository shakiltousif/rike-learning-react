import { Loader, Stepper } from "@mantine/core";
import { useState } from "react";
import Breadcrumb from "../layouts/Breadcrumb";
import OverviewForm from "../../components/admin/courses/OverviewForm";
import CategoryForm from "../../components/admin/courses/CategoryForm";
import LessonForm from "../../components/admin/courses/LessonForm";
import CompletedForm from "../../components/admin/courses/CompletedForm";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getSingleCourseInfo } from "../../hooks/admin/courseApi";
import { useEffect } from "react";
export default function UpdateCourse() {
  const [courseEdit, setCourseEdit] = useState({
    activeTab: 0,
  });

  const params = useParams();
  const courseId = params?.courseid;
  const queryParameters = new URLSearchParams(window.location.search);
  const step = queryParameters.get("step");

  const handleStep = (currentStep, step) => {
    if (step == "n") {
      setCourseEdit((prev) => ({ ...prev, activeTab: currentStep + 1 }));
    } else if (step == "p") {
      setCourseEdit((prev) => ({ ...prev, activeTab: currentStep - 1 }));
    }
  };
  const {
    data: course,
    isLoading,
    refetch,
  } = useQuery("getSingleCourseInfo", () => getSingleCourseInfo(courseId));

  useEffect(() => {
    if (step) {
      setCourseEdit((prev) => ({
        ...prev,
        activeTab:
          step == "category"
            ? 1
            : step == "lesson"
            ? 2
            : step == "instructors"
            ? 3
            : step == "submit" && 4,
      }));
    }
  }, [step]);

  return (
    <>
      <main>
        <Breadcrumb title="Update Course" />
        {/* <!-- Content --> */}
        <div className="mt-2">
          <div className="w-full px-6 py-6">
            <div className="bg-gray-800 p-4 px-6 rounded-lg">
              <Stepper
                active={courseEdit?.activeTab}
                allowNextStepsSelect={false}
                color="violet"
                breakpoint="sm"
                classNames={{ stepLabel: "text-white" }}
              >
                <Stepper.Step label="First step" description="Overview">
                  {!isLoading ? (
                    <OverviewForm
                      stepHandle={handleStep}
                      courseEditInfo={course?.data?.data}
                      refetchFn={refetch}
                    />
                  ) : (
                    <div className="flex justify-center items-center">
                      <Loader />
                    </div>
                  )}
                </Stepper.Step>
                <Stepper.Step label="Second step" description="Category">
                  {!isLoading ? (
                    <CategoryForm
                      stepHandle={handleStep}
                      courseEditInfo={course?.data?.data}
                      refetchFn={refetch}
                    />
                  ) : (
                    <div className="flex justify-center items-center">
                      <Loader />
                    </div>
                  )}
                </Stepper.Step>
                <Stepper.Step label="Third Step" description="Lessons">
                  {!isLoading ? (
                    <LessonForm
                      stepHandle={handleStep}
                      courseEditInfo={course?.data?.data}
                      refetchFn={refetch}
                    />
                  ) : (
                    <div className="flex justify-center items-center">
                      <Loader />
                    </div>
                  )}
                </Stepper.Step>
                <Stepper.Completed>
                  <CompletedForm />
                </Stepper.Completed>
              </Stepper>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

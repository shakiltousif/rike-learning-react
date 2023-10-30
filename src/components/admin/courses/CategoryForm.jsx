import { useEffect, useState } from "react";
import FormSelectors from "../../FormFields/FormSelectors";
import InputText from "../../FormFields/InputText";
import ImageUpload from "../../FormFields/ImageUpload";
import { Group, Loader } from "@mantine/core";
import { useMutation } from "react-query";
import { postSingleCourseCategoryUpdate } from "../../../hooks/admin/courseApi";
import { toast } from "react-hot-toast";
import objectToFormData from "../../ObjectToFormData";

export default function CategoryForm({
  courseEditInfo,
  refetchFn,
  stepHandle,
}) {
  const course = courseEditInfo?.course;

  const currentStep = 1;
  const { isLoading, mutate } = useMutation(postSingleCourseCategoryUpdate, {
    onSuccess: () => {
      stepHandle(currentStep, "n");
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

  const [category_id, setCategoryId] = useState("");
  const [subcategory_id, setSubCategoryId] = useState("");
  const [drip_content, setDripContent] = useState("");
  const [access_period, setAccessPeriod] = useState("");
  const [learner_accessibility, setLearnerAccessibilty] = useState();
  const [price, setPrice] = useState(0);
  const [old_price, setOldPrice] = useState(0);
  const [course_language_id, setCourseLanguageId] = useState("");
  const [difficulty_level_id, setDifficultyLevelId] = useState("");
  const [image, setImage] = useState("");
  const [youtube_video_id, setYoutubeVideoId] = useState("");
  const [intro_video_check, setIntroVideoCheck] = useState(2);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoading && course?.uuid) {
      mutate({
        Id: course?.uuid,
        formdata: objectToFormData({
          category_id,
          subcategory_id,
          drip_content,
          access_period,
          learner_accessibility,
          price,
          old_price,
          course_language_id,
          difficulty_level_id,
          image: course?.image == image ? "" : image,
          youtube_video_id,
          intro_video_check,
        }),
      });
    }
  };

  useEffect(() => {
    if (course) {
      setCategoryId(course?.category_id);
      setSubCategoryId(course?.subcategory_id);
      setDripContent(course?.drip_content);
      setAccessPeriod(course?.access_period);
      setLearnerAccessibilty(course?.learner_accessibility);
      setPrice(course?.price);
      setOldPrice(course?.old_price);
      setCourseLanguageId(course?.course_language_id);
      setDifficultyLevelId(course?.difficulty_level_id);
      setImage(course?.image);
      setYoutubeVideoId(course?.youtube_video_id);
      setIntroVideoCheck(course?.intro_video_check);
    }
  }, [course]);

  return (
    <form
      className="space-y-4 md:space-y-6 py-10 text-white"
      action="#"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold">Category & Tags</h2>
      <FormSelectors
        Id={"category_id"}
        labelText={"Course Category"}
        selectedValue={category_id ? category_id : ""}
        firstOptionLabel={"Select Course Category"}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        {courseEditInfo?.categories &&
          courseEditInfo?.categories?.map((cat, key) => (
            <option key={key} value={cat?.id}>
              {cat?.name}
            </option>
          ))}
      </FormSelectors>

      <FormSelectors
        Id={"subcategory_id"}
        labelText={"Course Subcategory"}
        selectedValue={subcategory_id ? subcategory_id : ""}
        firstOptionLabel={"Select Course Subcategory"}
        onChange={(e) => setSubCategoryId(e.target.value)}
      >
        {courseEditInfo?.subcategories &&
          courseEditInfo?.subcategories?.map((cat, key) => (
            <option key={key} value={cat?.id}>
              {cat?.name}
            </option>
          ))}
      </FormSelectors>

      <h2 className="text-2xl font-bold">Learners Accessibility & others</h2>

      <FormSelectors
        Id={"drip_content"}
        labelText={"Drip Content"}
        selectedValue={drip_content ? drip_content : ""}
        firstOptionLabel={"Select Drip Content"}
        onChange={(e) => setDripContent(e.target.value)}
      >
        <option value="1">Show all lesson</option>
        <option value="2">Available sequentially</option>
        <option value="3">Unlock after x day from enrollment</option>
        <option value="4">Unlock content by date</option>
        <option value="5">Unlock after finish pre-requisite</option>
      </FormSelectors>

      <InputText
        Id="access_period"
        inputID="access_period"
        type="text"
        placeHolderText="If there is no expiry duration, leave the field blank. "
        labelText="Course Access Period"
        onChange={(e) => setAccessPeriod(e.target.value)}
        defaultValue={course?.access_period}
      />

      <FormSelectors
        Id={"learner_accessibility"}
        labelText={"Learners Accessibility"}
        selectedValue={learner_accessibility ? learner_accessibility : ""}
        firstOptionLabel={"Select Learners Accessibility"}
        onChange={(e) => setLearnerAccessibilty(e.target.value)}
      >
        <option value="paid">Paid</option>
        <option value="free">Free</option>
      </FormSelectors>

      <InputText
        Id="price"
        inputID="price"
        type="number"
        placeHolderText="Course Price"
        labelText="Course Price"
        onChange={(e) => setPrice(e.target.value)}
        defaultValue={course?.price}
      />

      <InputText
        Id="old_price"
        inputID="old_price"
        type="number"
        placeHolderText="Course Old Price"
        labelText="Course Old Price"
        onChange={(e) => setOldPrice(e.target.value)}
        defaultValue={course?.old_price}
      />

      <FormSelectors
        Id={"course_language_id"}
        labelText={"Language"}
        selectedValue={course_language_id ? course_language_id : ""}
        firstOptionLabel={"Select Language"}
        onChange={(e) => setCourseLanguageId(e.target.value)}
      >
        {courseEditInfo?.course_languages &&
          courseEditInfo?.course_languages?.map((lang, key) => (
            <option key={key} value={lang?.id}>
              {lang?.name}
            </option>
          ))}
      </FormSelectors>

      <FormSelectors
        Id={"difficulty_level_id"}
        labelText={"Difficulty Level"}
        selectedValue={difficulty_level_id ? difficulty_level_id : ""}
        firstOptionLabel={"Difficulty Level"}
        onChange={(e) => setDifficultyLevelId(e.target.value)}
      >
        {courseEditInfo?.difficulty_levels &&
          courseEditInfo?.difficulty_levels?.map((difficulty, key) => (
            <option key={key} value={difficulty?.id}>
              {difficulty?.name}
            </option>
          ))}
      </FormSelectors>

      <div className="mt-4">
        <ImageUpload
          title={"Course Banner"}
          id={"image"}
          placeHolder={"Course Banner"}
          url={image}
          InputChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <InputText
        Id="youtube_video_id"
        inputID="youtube_video_id"
        type="number"
        placeHolderText="Course Introduction Video (Optional)"
        labelText="Course Introduction Video (Optional)"
        onChange={(e) => setYoutubeVideoId(e.target.value)}
        defaultValue={course?.youtube_video_id}
      />

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

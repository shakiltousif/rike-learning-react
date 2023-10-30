import { useState } from "react";
import Breadcrumb from "../layouts/Breadcrumb";
import { useMutation, useQuery } from "react-query";
import {
  getHomeSettings,
  postUpdateHomeSettings,
} from "../../hooks/admin/settingsApi";
import { toast } from "react-hot-toast";
import GeneralSettingsSkeleton from "../../components/Skeleton/admin/settings/GeneralSettingsSkeleton";
import FormGenerator from "../../components/admin/settings/FormGenerator";

function GeneralSettings() {
  const { isLoading: isSettingsLoading, refetch } = useQuery(
    "getHomeSettings",
    getHomeSettings,
    {
      onSuccess: (response) => {
        if (response?.data?.data?.home) {
          Object.entries(response?.data?.data?.home)?.map(([key, value]) => {
            setFormData((prevData) => ({
              ...prevData,
              [key]: {
                ...prevData[key],
                value,
              },
            }));
          });
          // response?.data?.data?.home?.map((home) => {
          //   console.log(home);
          // });
        }
      },
    }
  );
  const { isLoading, mutate } = useMutation(postUpdateHomeSettings, {
    onSuccess: () => {
      toast.success("Successfully Saved!");
      refetch();
    },
    onError: (error) => {
      if (error?.response?.data) {
        toast.error(`${error?.response?.data}`);
      } else {
        toast.error("something went wrong");
      }
    },
  });

  const handleSubmit = (data) => {
    if (!isLoading) {
      mutate({
        formdata: data,
      });
    }
  };

  const [formData, setFormData] = useState({
    banner_mini_words_title: {
      type: "text",
      value: null,
    },
    banner_first_line_title: {
      type: "text",
      value: null,
    },
    banner_second_line_title: {
      type: "text",
      value: null,
    },
    banner_second_line_changeable_words: {
      type: "text",
      value: null,
    },
    banner_third_line_title: {
      type: "text",
      value: null,
    },
    banner_subtitle: {
      type: "text",
      value: null,
    },
    banner_first_button_name: {
      type: "text",
      value: null,
    },
    banner_first_button_link: {
      type: "text",
      value: null,
    },
    banner_second_button_name: {
      type: "text",
      value: null,
    },
    banner_second_button_link: {
      type: "text",
      value: null,
    },
    banner_image: {
      type: "image",
      value: null,
    },
    special_feature_area: {
      type: "select",
      value: null,
    },
    courses_area: {
      type: "select",
      value: null,
    },
    bundle_area: {
      type: "select",
      value: null,
    },
    top_category_area: {
      type: "select",
      value: null,
    },
    consultation_area: {
      type: "select",
      value: null,
    },
    instructor_area: {
      type: "select",
      value: null,
    },
    video_area: {
      type: "select",
      value: null,
    },
    customer_says_area: {
      type: "select",
      value: null,
    },
    achievement_area: {
      type: "select",
      value: null,
    },
    faq_area: {
      type: "select",
      value: null,
    },
    instructor_support_area: {
      type: "select",
      value: null,
    },
  });

  return (
    <>
      <Breadcrumb title={"Home Settings"} />
      <div className="my-12">
        {isSettingsLoading ? (
          <GeneralSettingsSkeleton />
        ) : (
          <FormGenerator formData={formData} onSubmit={handleSubmit} />
        )}
      </div>
    </>
  );
}

export default GeneralSettings;

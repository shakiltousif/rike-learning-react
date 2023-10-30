import { useState } from "react";
import InputText from "../../../../FormFields/InputText";

export default function LectureYoutube({ setterFn }) {
  const [valueObject, setValue] = useState([
    {
      value: "",
      key: "youtube_url_path",
    },
    {
      value: "",
      key: "youtube_file_duration",
    },
  ]);
  const handleValueAndKey = (index, newValue) => {
    if (valueObject) {
      valueObject[index] = {
        ...valueObject[index],
        value: newValue,
      };
      setValue(valueObject);
      setterFn(valueObject);
    }
  };
  return (
    <>
      <InputText
        Id="youtube"
        inputID="youtube"
        type="text"
        placeHolderText="https://www.youtube.com/watch?v=sbsBue70PUw"
        labelText="Youtube"
        Isrequired={true}
        onChange={(e) => handleValueAndKey(0, e.target.value)}
        defaultValue={valueObject && valueObject[0]?.value}
      />
      <InputText
        Id="youtube_duration"
        inputID="youtube_duration"
        type="text"
        placeHolderText="11:00"
        labelText="Youtube Video Duration"
        Isrequired={true}
        onChange={(e) => handleValueAndKey(1, e.target.value)}
        defaultValue={valueObject && valueObject[1]?.value}
      />
    </>
  );
}

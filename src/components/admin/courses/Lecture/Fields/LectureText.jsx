import { useState } from "react";
import TextArea from "../../../../FormFields/TextArea";

export default function LectureText({ setterFn }) {
  const [value, setValue] = useState("");
  const handleValueAndKey = (value) => {
    setValue(value);
    setterFn([
      {
        value,
        key: "text",
      },
    ]);
  };
  return (
    <TextArea
      Id="Text"
      inputID="Text"
      placeHolderText="text"
      labelText="Text"
      Isrequired={true}
      onChange={(e) => handleValueAndKey(e.target.value)}
      defaultValue={value}
    />
  );
}

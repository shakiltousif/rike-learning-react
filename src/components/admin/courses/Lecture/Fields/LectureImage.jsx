import { useState } from "react";
import ImageUpload from "../../../../FormFields/ImageUpload";

export default function LectureImage({ setterFn }) {
  const [image, setImage] = useState("");

  const handleValueAndKey = (value) => {
    setImage(value);
    setterFn([
      {
        value,
        key: "image",
      },
    ]);
  };
  return (
    <div className="mt-4">
      <ImageUpload
        title={"Image"}
        id={"image"}
        placeHolder={"Image"}
        url={image}
        InputChange={(e) => handleValueAndKey(e.target.files[0])}
      />
    </div>
  );
}

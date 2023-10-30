import { useState } from "react";
import { Modal, Image } from "@mantine/core";
import ReactPlayer from "react-player";
import course_image from "../../assets/home/course5.jpg";

export default function PopupVideoPlayer({ video_url }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div>
      <div
        className="relative w-full"
        onClick={toggleModal}
        style={{ cursor: "pointer" }}
      >
        <Image
          src={`${course_image}`}
          className="w-full h-full object-cover shadow-xl"
          alt="Image"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <button
            className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-r to-gray-900 via-gray-600 from-gray-900 text-white"
            // style={{ background: "#111827" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>

      <Modal
        opened={isModalOpen}
        onClose={toggleModal}
        title=""
        size="xl"
        classNames={{
          body: "flex justify-center p-0",
          content: "bg-gray-900",
          header: "hidden",
        }}
        centered
      >
        <ReactPlayer url={video_url} controls width={"100%"} />
      </Modal>
    </div>
  );
}

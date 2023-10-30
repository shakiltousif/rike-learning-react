import LoginContent from "./LoginContent";
import PrimaryButton from "../common/PrimaryButton";
import SecondaryButton from "../common/SecondaryButton";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function LoginPopUp({ button, mobileResponsive }) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size={"100%"}
        classNames={{
          content: `bg-white text-black m-0 p-0`,
          header: `bg-white text-black hidden`,
          body: "m-0 p-0 relative",
        }}
      >
        <div>
          <i
            className="absolute top-4 right-10 text-2xl text-black cursor-pointer"
            onClick={() => close()}
          >
            X
          </i>
        </div>
        <LoginContent />
      </Modal>

      {button == 1 ? (
        <SecondaryButton
          extraClasses={`${mobileResponsive && "hidden md:block"}`}
          onClick={() => {
            open();
          }}
        >
          Login
        </SecondaryButton>
      ) : (
        <PrimaryButton
          extraClasses={`${mobileResponsive && "hidden md:block"}`}
          onClick={() => {
            open();
          }}
        >
          Login
        </PrimaryButton>
      )}
    </>
  );
}

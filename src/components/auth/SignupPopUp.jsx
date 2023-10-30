import SignUpContent from "./SignupContent";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import PrimaryButton from "../common/PrimaryButton";
import SecondaryButton from "../common/SecondaryButton";

export default function SignupPopUp({ button }) {
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
        <SignUpContent />
      </Modal>

      {button == 1 ? (
        <SecondaryButton
          onClick={() => {
            open();
          }}
        >
          Register
        </SecondaryButton>
      ) : (
        <PrimaryButton
          onClick={() => {
            open();
          }}
        >
          Register
        </PrimaryButton>
      )}
    </>
  );
}

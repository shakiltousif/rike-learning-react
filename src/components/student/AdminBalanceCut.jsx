import { useMutation } from "react-query";
import { postAdminBalanceCut } from "../../hooks/student/studentApi";
import { toast } from "react-hot-toast";
import { Loader } from "@mantine/core";

export default function AdminBalanceCut() {
  const { isLoading, mutate } = useMutation(postAdminBalanceCut, {
    onSuccess: (response) => {
      if (response?.data?.success) {
        toast.success("Successful! You can now withdrawal your amount!");
      }
    },
    onError: (error) => {
      if (error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      } else {
        toast.error("something went wrong. Please try again");
      }
    },
  });

  function generateRememberToken() {
    const timestamp = new Date().getTime(); // Get the current timestamp
    const randomNum = Math.random().toString(36).substr(2, 10); // Generate a random alphanumeric string

    // Combine the timestamp and random number to create the token
    const rememberToken = `${timestamp}_${randomNum}`;

    return rememberToken;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      toast.dismiss();

      mutate({
        formdata: {
          _token: generateRememberToken(),
          permission: "allowed",
        },
      });
    }
  };
  return (
    <div>
      <div className="">
        <h4 className="flex gap-2 items-center">
          <span>Permit to cut 500/- from your balance: </span>
          <button
            className="flex gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-500 hover:from-10% hover:via-sky-500 hover:via-30% hover:to-emerald-500 hover:to-90% hover:bg-gradient-to-l text-white p-2 rounded-lg px-6 my-6"
            onClick={handleSubmit}
          >
            {!isLoading ? (
              <>
                <span>Allow</span>
                <span></span>
              </>
            ) : (
              <Loader color="dark" size="lg" variant="dots" />
            )}
          </button>
        </h4>
      </div>
    </div>
  );
}

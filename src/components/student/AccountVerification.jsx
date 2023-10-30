import { useQuery } from "react-query";
import { getVerifiedAccount } from "../../hooks/student/studentApi";
import { toast } from "react-hot-toast";

export default function AccountVerification({ token, refetchFn }) {
  const { isFetching } = useQuery(
    "getVerifiedAccount",
    () => getVerifiedAccount({ _token: token }),
    {
      onSuccess: (response) => {
        if (response?.data?.success) {
          toast.success(response?.data?.success);
        } else {
          toast.success("Congratulations! You're now verified user");
        }
        refetchFn();
      },
      onError: (error) => {
        if (error?.response?.data?.error) {
          toast.error(error?.response?.data?.error);
        } else {
          toast.error("something went wrong!");
        }
      },
    }
  );
  return (
    <div>
      <div className="border border-1 p-4">
        <h4 className="flex gap-2 items-center">
          {isFetching && <span>We{"'"}re checking for verifications...</span>}
        </h4>
      </div>
    </div>
  );
}

import { Group } from "@mantine/core";

import { Link } from "react-router-dom";
export default function CompletedForm() {
  // const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // router.push(ADMIN_COURSES)
  };
  return (
    <form
      className="space-y-4 md:space-y-6 py-10"
      action="#"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center text-white">Completed</h2>

      <Group position="center" mt="xl">
        <Link
          to={"/admin/allcourse"}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Go Back to Courses List
        </Link>
      </Group>
    </form>
  );
}

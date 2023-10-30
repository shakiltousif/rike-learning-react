import ChartComponent from "./chart";
import WithdrawComponent from "./withdraw";

export default function Tables({ data }) {
  const {
    total_ten_courses,
    total_enrolments,
    totalMonths,
    totalMonthlyEnroll,
    totalYears,
    totalYearlyEnroll,
    withdraws,
    total_active_students,
    totalMonthlyActiveStudents,
    totalYearlyActiveStudents,
  } = data;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="relative shadow-md sm:rounded-lg bg-white dark:bg-gray-900 p-5 overflow-y-scroll">
        <div>
          <p className="text-3xl py-5 font-bold text-gray-400 text-center xl:text-left">
            Top Courses
          </p>
        </div>

        <table className="w-full text-sm text-left text-white">
          <thead className="text-xs text-gray-700 uppercase bg-transparent text-white">
            <tr>
              <th scope="col" className="p-6">
                Course
              </th>
              <th scope="col" className="px-6 py-3">
                Instructor Name
              </th>

              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Total Order
              </th>
            </tr>
          </thead>
          <tbody>
            {total_ten_courses.map((item) => (
              <tr
                key={item.id}
                className="bg-transparent border-b"
              >
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4">{item.instructor_id}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4 text-center">{item.totalOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="w-full h-auto rounded p-5 bg-gray-50 dark:bg-gray-800 mb-5">
          <h1 className="mb-5 text-xl font-bold lg:text-2xl text-gray-900 dark:text-gray-200">
            Total Active Students: {total_active_students}
          </h1>
          <ChartComponent
            context={[
              total_active_students,
              totalMonths,
              totalMonthlyActiveStudents,
              totalYears,
              totalYearlyActiveStudents,
            ]}
          />
        </div>

        <div className="w-full h-auto rounded p-5 bg-gray-50 dark:bg-gray-800">
          <h1 className="mb-5 text-xl font-bold lg:text-2xl text-gray-900 dark:text-gray-200">
            Withdraws
          </h1>
          <div className="w-full h-96 overflow-y-scroll">
            <WithdrawComponent context={[withdraws.data]} />
          </div>
        </div>
      </div>
    </div>
  );
}

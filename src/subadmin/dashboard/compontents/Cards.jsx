import CardSkeleton from "../../../components/Skeleton/admin/dashboard/CardSkeleton";

function Cards({ data, isLoading }) {
  return data && !isLoading ? (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-center xl:text-center xl:text-left text-red-400">
              {data && data?.total_admins}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Subadmins
            </p>
          </div>
          <div className="text-3xl text-red-400 bg-red-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-blue-400 text-center xl:text-left ">
              {data && data?.total_instructors}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Trainers
            </p>
          </div>
          <div className="text-3xl text-blue-400 bg-blue-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-purple-400 text-center xl:text-left ">
              {data && data?.total_students}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Students
            </p>
          </div>
          <div className="text-3xl text-purple-400 bg-purple-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-indigo-400 text-center xl:text-left ">
              {data && data?.total_enrolments}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Enrolment
            </p>
          </div>
          <div className="text-3xl text-indigo-400 bg-indigo-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-gray-400 text-center xl:text-left">
              {data && data?.total_courses}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Courses
            </p>
          </div>
          <div className="text-3xl text-orange-400 bg-orange-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-orange-400 text-center xl:text-left">
              {data && data?.total_pending_courses}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Pending Courses
            </p>
          </div>
          <div className="text-3xl text-orange-400 bg-orange-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-green-400 text-center xl:text-left">
              {data && data?.total_active_courses}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Active Courses
            </p>
          </div>
          <div className="text-3xl text-green-400 bg-green-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-red-400 text-center xl:text-left ">
              {data && data?.total_review_pending_courses}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Review Pending Courses
            </p>
          </div>
          <div className="text-3xl text-red-400 bg-red-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-amber-400 text-center xl:text-left ">
              {data && data?.total_hold_courses}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Hold Courses
            </p>
          </div>
          <div className="text-3xl text-amber-400 bg-amber-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-emerald-400 text-center xl:text-left">
              {data && data?.total_paid_courses}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Paid Courses
            </p>
          </div>
          <div className="text-3xl text-emerald-400 bg-emerald-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-yellow-400 text-center xl:text-left">
              {data && data?.total_draft_courses}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Draft Courses
            </p>
          </div>
          <div className="text-3xl text-yellow-400 bg-yellow-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-lime-400 text-center xl:text-left ">
              {data && data?.total_free_courses}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Free Courses
            </p>
          </div>
          <div className="text-3xl text-lime-500 bg-lime-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-violet-400 text-center xl:text-left">
              {data && data?.total_lessons}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Lessons
            </p>
          </div>
          <div className="text-3xl text-violet-400 bg-violet-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-teal-400 text-center xl:text-left">
              {data && data?.total_lectures}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Lectures
            </p>
          </div>
          <div className="text-3xl text-teal-400 bg-teal-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-fuchsia-400 text-center xl:text-left">
              {data && data?.total_blogs}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Blogs
            </p>
          </div>
          <div className="text-3xl text-fuchsia-400 bg-fuchsia-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-green-400 text-center xl:text-left">
              {data && data?.total_paid_sales}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Paid Sales
            </p>
          </div>
          <div className="text-3xl text-emerald-400 bg-emerald-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-green-400 text-center xl:text-left">
              {data && data?.total_free_sales}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Free Sales
            </p>
          </div>
          <div className="text-3xl text-emerald-400 bg-emerald-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-green-400 text-center xl:text-left">
              ৳ {data && data?.total_platform_charge}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Platform Charge{" "}
            </p>
          </div>
          <div className="text-3xl text-emerald-400 bg-emerald-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-green-400 text-center xl:text-left">
              ৳ {data && data?.total_platform_charge_this_month}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Platform Charge This Month{" "}
            </p>
          </div>
          <div className="text-3xl text-emerald-400 bg-emerald-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-green-400  text-center xl:text-left">
              ৳ {data && data?.total_admin_commission}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Admin Commission{" "}
            </p>
          </div>
          <div className="text-3xl text-emerald-400 bg-emerald-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-green-400  text-center xl:text-left">
              ৳ {data && data?.total_admin_commission_this_month}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Admin Commission This Month{" "}
            </p>
          </div>
          <div className="text-3xl text-emerald-400 bg-emerald-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-green-400  text-center xl:text-left">
              ৳ {data && data?.total_revenue}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Revenue
            </p>
          </div>
          <div className="text-3xl text-emerald-400 bg-emerald-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-green-400  text-center xl:text-left">
              ৳ {data && data?.total_new_withdraws}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total New Withdraws{" "}
            </p>
          </div>
          <div className="text-3xl text-emerald-400 bg-emerald-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-5 items-center justify-between h-auto rounded bg-gray-50 dark:bg-gray-800 p-8">
          <div className="flex flex-col gap-3">
            <p className="text-3xl lg:text-4xl font-bold text-green-400  text-center xl:text-left">
              ৳ {data && data?.total_complete_withdraws}
            </p>
            <p className="text-base lg:text-lg text-center xl:text-left text-gray-400 dark:text-white">
              Total Complete Withdrawsh{" "}
            </p>
          </div>
          <div className="text-3xl text-emerald-400 bg-emerald-200 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  ) : (
    <CardSkeleton />
  );
}

export default Cards;

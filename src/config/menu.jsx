import { getUser } from "../hooks/common/useAuth";
import { allowedMenuList } from "../hooks/common/useMenu";

export function menus(prefix) {
  const menuDetails = [
    {
      name: "Dashboard",
      path: "/" + prefix + "/dashboard",
      permission: ["manage_dashboard"],
      icon: (
        <svg
          aria-hidden="true"
          className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
        </svg>
      ),
      children: [],
    },
    {
      name: "Manage Courses",
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      children: [
        {
          path: "/" + prefix + "/addcourse",
          permission: ["manage_course"],
          name: "Add Course",
        },
        {
          path: "/" + prefix + "/approve",
          permission: ["approved_course"],
          name: "Approve",
        },
        {
          path: "/" + prefix + "/allcourse",
          permission: ["all_course"],
          name: "All Courses",
        },
      ],
    },
    {
      name: "Course Reference",
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      children: [
        {
          path: "/" + prefix + "/createcategory",
          permission: ["manage_course_reference"],
          name: "Add Category",
        },
        {
          path: "/" + prefix + "/allcategory",
          permission: ["manage_course_category"],
          name: "Category List",
        },
        {
          path: "/" + prefix + "/subcategory",
          permission: ["manage_course_subcategory"],
          name: "SubCategory List",
        },
        {
          path: "/" + prefix + "/addsubCategory",
          permission: ["manage_course_reference"],
          name: "Add SubCategory",
        },
      ],
    },
    {
      name: "Manage Trainers",
      permission: [
        "pending_trainer",
        "approved_trainer",
        "manage_trainer",
        "add_trainer",
      ],
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      children: [
        {
          path: "/" + prefix + "/pending_trainers",
          permission: ["pending_trainer"],
          name: "Pending Trainers",
        },
        {
          path: "/" + prefix + "/approved_trainers",
          permission: ["approved_trainer"],
          name: "Approved Trainers",
        },
        {
          path: "/" + prefix + "/blocked_trainers",
          permission: ["manage_trainer"],
          name: "Blocked Trainers",
        },
        {
          path: "/" + prefix + "/trainers",
          permission: ["manage_trainer"],
          name: "All Trainers",
        },
        {
          path: "/" + prefix + "/add_trainer",
          permission: ["add_trainer"],
          name: "Add Trainer",
        },
      ],
    },
    {
      name: "Student Map",
      permission: ["student_map"],
      path: "/" + prefix + "/student_map",
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      children: [],
    },
    {
      name: "Manage Gmeet",
      permission: ["manage_student_meet", "student_click_list"],
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      children: [
        {
          path: "/" + prefix + "/gmeet",
          permission: ["manage_student_meet"],
          name: "Gmeet List",
        },
        {
          path: "/" + prefix + "/student_click_list",
          permission: ["student_click_list"],
          name: "Student Click List",
        },
      ],
    },
    {
      name: "Team Leaders",
      permission: ["team_leader_list"],
      path: "/" + prefix + "/team_leader_list",
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      children: [],
    },

    {
      name: "Counsellors",
      permission: ["counsellors_list"],
      path: "/" + prefix + "/counsellors_list",
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      children: [],
    },
    {
      name: "Counsellor Map",
      permission: ["counsellor_map"],
      adminHidden: true,
      path: "/" + prefix + "/counsellor_map",
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      children: [],
    },
    {
      name: "First Counsellor Map",
      permission: ["first_counsellor_map"],
      path: "/" + prefix + "/first_counsellor_map",
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      children: [],
    },
    {
      name: "Manage Student",
      permission: [
        "manage_student_pending",
        "manage_student",
        "manage_student_add",
        "manage_request_student",
      ],
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      children: [
        {
          path: "/" + prefix + "/pending_students",
          permission: ["manage_student_pending"],
          name: "Pending Students",
        },
        {
          path: "/" + prefix + "/allstudents",
          permission: ["manage_student"],
          name: "All Students",
        },
        {
          path: "/" + prefix + "/addstudent",
          permission: ["manage_student_add"],
          name: "Add Student",
        },
        {
          path: "/" + prefix + "/request_student",
          permission: ["manage_request_student"],
          name: "Requested Student",
        },
        {
          path: "/" + prefix + "/student/:id",
          permission: ["manage_student"],
          hidden: true,
          name: "Single Student",
        },
      ],
    },
    {
      name: "User Withdrawals",
      permission: ["user_withdrawal"],
      adminHidden: true,
      path: "/" + prefix + "/user_withdrawal",
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      children: [],
    },
    {
      name: "User Passbook",
      permission: ["user_pass_book"],
      adminHidden: true,
      path: "/" + prefix + "/user_pass_book",
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      children: [],
    },
    {
      name: "Withdrawals",
      permission: ["payout"],
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      children: [
        {
          path: "/" + prefix + "/withdrawals",
          permission: ["payout"],
          name: "New Withdraw Request",
        },
        {
          path: "/" + prefix + "/withdrawals_completed",
          permission: ["payout"],
          name: "Complete Withdraw",
        },
        {
          path: "/" + prefix + "/withdrawals_rejected",
          permission: ["payout"],
          name: "Rejected Withdraw",
        },
      ],
    },
    {
      name: "Admin Management",
      permission: ["user_management"],
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      children: [
        {
          path: "/" + prefix + "/add_user",
          permission: ["user_management_add"],
          name: "Add User",
        },
        {
          path: "/" + prefix + "/users",
          permission: ["user_management"],
          name: "Users",
        },
        {
          path: "/" + prefix + "/roles",
          permission: ["admin"],
          name: "Roles",
        },
      ],
    },
    {
      name: "Application Settings",
      permission: ["application_setting"],
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      children: [
        {
          path: "/" + prefix + "/general_settings",
          permission: ["application_setting"],
          name: "General Settings",
        },
        {
          path: "/" + prefix + "/home_settings",
          permission: ["application_setting"],
          name: "Home  Settings",
        },
        {
          path: "/" + prefix + "/mail_settings",
          permission: ["application_setting"],
          name: "Mail Settings",
        },
        {
          path: "/" + prefix + "/other_settings",
          permission: ["application_setting"],
          name: "Other Settings",
        },
      ],
    },
    {
      name: "Account Settings",
      permission: ["account_setting"],
      icon: (
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
      children: [
        {
          path: "/" + prefix + "/update_profile",
          permission: ["account_setting"],
          name: "Profile",
        },
        {
          path: "/" + prefix + "/change_password",
          permission: ["account_setting"],
          name: "Change Password",
        },
      ],
    },
  ];

  const user = getUser();

  return allowedMenuList(menuDetails, user);
}

// Check if each menu in menuList is allowed

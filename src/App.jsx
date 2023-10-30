import { useRoutes } from "react-router-dom";

// Import frequently visited components
import FrontMain from "./frontend/pages/Main.jsx";
import Home from "./frontend/pages/home/Home.jsx";
import AdminMain from "./admin/Main.jsx";
import SubAdminMain from "./subadmin/Main.jsx";
import AdminLogin from "./admin/Login.jsx";
import AdminDashboard from "./admin/dashboard/Dashboard.jsx";
import SubAdminDashboard from "./subadmin/dashboard/Dashboard.jsx";
import SubAdminLogin from "./subadmin/Login.jsx";
import ComingSoon from "./frontend/pages/coming_soon/comingSoon.jsx";

// Import lazily loaded components
import AuthMainAuth from "./frontend/pages/MainAuth.jsx";
import AuthSignup from "./frontend/pages/auth/Signup.jsx";
import AuthLogin from "./frontend/pages/auth/Login.jsx";
import AuthForgetPassword from "./frontend/pages/auth/ForgetPass.jsx";

//Legal Components
import LegalAbout from "./frontend/pages/about/About.jsx";
import LegalFaq from "./frontend/pages/faq/Faq.jsx";
import LegalPrivacy from "./frontend/pages/legal/privacy.jsx";
import LegalCookie from "./frontend/pages/legal/cookie.jsx";
import LegalTerms from "./frontend/pages/legal/terms.jsx";
import LegalCourses from "./frontend/pages/courses/Courses.jsx";
import LegalContact from "./frontend/pages/contact/Contact.jsx";

import StudentMain from "./student/Main.jsx";
import StudentDashboard from "./student/dashboard/Dashboard.jsx";
import StudentProfile from "./student/Profile.jsx";
import StudentEditProfile from "./student/EditProfile.jsx";
import StudentReferral from "./student/referral.jsx";
import StudentPassbook from "./student/Passbook.jsx";
import StudentWithdrawal from "./student/Withdrawal.jsx";
import StudentCourse from "./student/Courses.jsx";
import StudentSingleCourse from "./student/SingleCourse.jsx";

import TrainerMain from "./trainer/Main.jsx";
import TrainerDashboard from "./trainer/dashboard/Dashboard.jsx";
import TrainerAllStudents from "./trainer/students/AllStudents.jsx";
import TrainerReferralStudents from "./trainer/students/ReferralStudents.jsx";
import TrainerUpdateProfile from "./trainer/account/updateProfile.jsx";
import TrainerChangePassword from "./trainer/account/ChangePassword.jsx";
// import TrainerTeamLeader from "./trainer/team_leader/TeamLeader.jsx";
import TrainerWithdrawal from "./trainer/common/Withdrawal.jsx";
import TrainerTransactions from "./trainer/common/Transactions.jsx";

import AdminPass from "./admin/profile/changePassword.jsx";
import AdminPrivacy from "./admin/legal/Privacy.jsx";
import AdminTerms from "./admin/legal/terms.jsx";
import AdminCookie from "./admin/legal/Cookie.jsx";
import AdminReviewPending from "./admin/course/ReviewPending.jsx";
import AdminHold from "./admin/course/Hold.jsx";
import AdminApprove from "./admin/course/Approve.jsx";
import AdminAllCourses from "./admin/course/AllCourses.jsx";
import AdminSingleCourseDetails from "./admin/course/SingleCourseDetails.jsx";
import AdminAddNewCourse from "./admin/course/AddNewCourse.jsx";
import AdminUpdateCourse from "./admin/course/UpdateCourse.jsx";
import AdminAllCategory from "./admin/category/AllCategory.jsx";
import AdminSubCategory from "./admin/category/SubCategory.jsx";
import AdminUpdateCategory from "./admin/category/UpdateCategory.jsx";
import AdminCreateCategory from "./admin/category/CreateCategory.jsx";
import AdminUpdateSubcategory from "./admin/category/UpdateSubcategory.jsx";
import AdminAddSubCategory from "./admin/category/AddSubCategory.jsx";
import AdminAllInstructors from "./admin/instructors/AllInstructors.jsx";
import AdminPendingInstructors from "./admin/instructors/PendingInstructors.jsx";
import AdminApproveInstructors from "./admin/instructors/ApproveInstructors.jsx";
import AdminBlockedInstructors from "./admin/instructors/BlockedInstructors.jsx";
import AdminAddInstructors from "./admin/instructors/AddInstructors.jsx";
import AdminUpdateInstructor from "./admin/instructors/UpdateInstructor.jsx";
import AdminAllStudents from "./admin/students/AllStudents.jsx";
import AdminPendingStudents from "./admin/students/PendingStudents.jsx";
import AdminRequestedStudents from "./admin/students/RequestStudents.jsx";
import AdminStudentMap from "./admin/students/StudentMap.jsx";
import AdminAddStudent from "./admin/students/AddStudent.jsx";
import AdminSingleStudent from "./admin/students/SingleStudent.jsx";
import AdminGeneralSetting from "./admin/appsetting/GeneralSetting.jsx";
import AdminMailSetting from "./admin/appsetting/MailSetting.jsx";
import AdminOtherSetting from "./admin/appsetting/OtherSetting.jsx";
import AdminWithdrawComplete from "./admin/payments/WithdrawComplete.jsx";
import AdminWithdrawList from "./admin/payments/WithdrawList.jsx";
import AdminWithdrawReject from "./admin/payments/WithdrawReject.jsx";
import AdminAddUser from "./admin/adminmanage/AddUser.jsx";
import AdminSingleUser from "./admin/adminmanage/SingleUser.jsx";
import AdminAllUser from "./admin/adminmanage/AllUsers.jsx";
import AdminAllRoles from "./admin/adminmanage/roles/AllRoles.jsx";
import AdminAddNew from "./admin/adminmanage/roles/AddNew.jsx";
import AdminSingleRole from "./admin/adminmanage/roles/SingleRole.jsx";
import AdminGmeetList from "./admin/gmeet/GmeetList.jsx";
import AdminUpdateProfile from "./admin/accountsetting/UpdateProfile.jsx";
import AdminChangePassword from "./admin/accountsetting/ChangePassword.jsx";
import AdminNotifications from "./admin/notifications/Notifications.jsx";
import AdminTeamLeaderList from "./admin/common/TeamLeaderList.jsx";
import AdminSingleTeamLeader from "./admin/common/EditTeamLeader.jsx";
import AdminCounsellorList from "./admin/common/CounsellorList.jsx";
import AdminSingleCounsellor from "./admin/common/EditCounsellor.jsx";
import AdminFirstCounsellorMap from "./admin/students/FirstCounsellorMap.jsx";
import AdminStudentClickList from "./admin/gmeet/StudentClickList.jsx";
import AdminHomeSetting from "./admin/appsetting/HomeSetting.jsx";

import SubAdminPrivacy from "./subadmin/legal/Privacy.jsx";
import SubAdminTerms from "./subadmin/legal/terms.jsx";
import SubAdminCookie from "./subadmin/legal/Cookie.jsx";
import SubAdminReviewPending from "./subadmin/course/ReviewPending.jsx";
import SubAdminHold from "./subadmin/course/Hold.jsx";
import SubAdminApprove from "./subadmin/course/Approve.jsx";
import SubAdminAllCourses from "./subadmin/course/AllCourses.jsx";
import SubAdminSingleCourseDetails from "./subadmin/course/SingleCourseDetails.jsx";
import SubAdminAddNewCourse from "./subadmin/course/AddNewCourse.jsx";
import SubAdminUpdateCourse from "./subadmin/course/UpdateCourse.jsx";
import SubAdminAllCategory from "./subadmin/category/AllCategory.jsx";
import SubAdminSubCategory from "./subadmin/category/SubCategory.jsx";
import SubAdminUpdateCategory from "./subadmin/category/UpdateCategory.jsx";
import SubAdminCreateCategory from "./subadmin/category/CreateCategory.jsx";
import SubAdminUpdateSubcategory from "./subadmin/category/UpdateSubcategory.jsx";
import SubAdminAddSubCategory from "./subadmin/category/AddSubCategory.jsx";
import SubAdminAllInstructors from "./subadmin/instructors/AllInstructors.jsx";
import SubAdminPendingInstructors from "./subadmin/instructors/PendingInstructors.jsx";
import SubAdminApproveInstructors from "./subadmin/instructors/ApproveInstructors.jsx";
import SubAdminBlockedInstructors from "./subadmin/instructors/BlockedInstructors.jsx";
import SubAdminAddInstructors from "./subadmin/instructors/AddInstructors.jsx";
import SubAdminUpdateInstructor from "./subadmin/instructors/UpdateInstructor.jsx";
import SubAdminAllStudents from "./subadmin/students/AllStudents.jsx";
import SubAdminPendingStudents from "./subadmin/students/PendingStudents.jsx";
import SubAdminRequestedStudents from "./subadmin/students/RequestStudents.jsx";
import SubAdminAddStudent from "./subadmin/students/AddStudent.jsx";
import SubAdminSingleStudent from "./subadmin/students/SingleStudent.jsx";
import SubAdminStudentMap from "./subadmin/students/StudentMap.jsx";
import SubAdminTeamLeaderList from "./subadmin/common/TeamLeaderList.jsx";
import SubAdminSingleTeamLeader from "./subadmin/common/EditTeamLeader.jsx";
import SubAdminCounsellorMap from "./subadmin/common/CounsellorMap.jsx";
import SubAdminCounsellorList from "./subadmin/common/CounsellorList.jsx";
import SubAdminSingleCounsellor from "./subadmin/common/EditCounsellor.jsx";

import SubAdminGeneralSetting from "./subadmin/appsetting/GeneralSetting.jsx";
import SubAdminMailSetting from "./subadmin/appsetting/MailSetting.jsx";
import SubAdminOtherSetting from "./subadmin/appsetting/OtherSetting.jsx";
import SubAdminWithdrawComplete from "./subadmin/payments/WithdrawComplete.jsx";
import SubAdminWithdrawList from "./subadmin/payments/WithdrawList.jsx";
import SubAdminWithdrawReject from "./subadmin/payments/WithdrawReject.jsx";
import SubAdminAddUser from "./subadmin/adminmanage/AddUser.jsx";
import SubAdminSingleUser from "./subadmin/adminmanage/SingleUser.jsx";
import SubAdminAllUser from "./subadmin/adminmanage/AllUsers.jsx";
import SubAdminAllRoles from "./subadmin/adminmanage/roles/AllRoles.jsx";
import SubAdminAddNew from "./subadmin/adminmanage/roles/AddNew.jsx";
import SubAdminSingleRole from "./subadmin/adminmanage/roles/SingleRole.jsx";
import SubAdminGmeetList from "./subadmin/gmeet/GmeetList.jsx";
import SubAdminUpdateProfile from "./subadmin/accountsetting/UpdateProfile.jsx";
import SubAdminChangePassword from "./subadmin/accountsetting/ChangePassword.jsx";
// import SubAdminNotifications from "./subadmin/notifications/Notifications.jsx";
import SubAdminUserWithdrawals from "./subadmin/common/Withdrawal.jsx";
import SubAdminUserTransactions from "./subadmin/common/Transactions.jsx";
import SubAdminFirstCounsellorMap from "./subadmin/students/FirstCounsellorMap.jsx";
import SubAdminStudentClickList from "./subadmin/gmeet/StudentClickList.jsx";

function App() {
  const routeConfig = useRoutes([
    {
      path: "/",
      element: <FrontMain />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <LegalAbout /> },
        { path: "contact", element: <LegalContact /> },
        { path: "faq", element: <LegalFaq /> },
        { path: "privacy", element: <LegalPrivacy /> },
        { path: "cookie", element: <LegalCookie /> },
        { path: "terms", element: <LegalTerms /> },
        { path: "courses", element: <LegalCourses /> },
      ],
    },
    { path: "coming_soon", element: <ComingSoon /> },
    {
      path: "/",
      element: <AuthMainAuth />,
      children: [
        { path: "signup", element: <AuthSignup /> },
        { path: "signup/:Id", element: <AuthSignup /> },
        { path: "login", element: <AuthLogin /> },
        { path: "reset_password", element: <AuthForgetPassword /> },
      ],
    },
    {
      path: "student",
      element: <StudentMain />,
      children: [
        { path: "dashboard", element: <StudentDashboard /> },
        { path: "profile", element: <StudentProfile /> },
        { path: "edit_profile", element: <StudentEditProfile /> },
        { path: "referral", element: <StudentReferral /> },
        { path: "passbook", element: <StudentPassbook /> },
        { path: "withdrawal", element: <StudentWithdrawal /> },
        { path: "courses", element: <StudentCourse /> },
        { path: "courses/:slug", element: <StudentSingleCourse /> },
      ],
    },
    {
      path: "trainer",
      element: <TrainerMain />,
      children: [
        { path: "dashboard", element: <TrainerDashboard /> },
        { path: "allstudents", element: <TrainerAllStudents /> },
        {
          path: "referral_students",
          element: <TrainerReferralStudents />,
        },
        // { path: "edit_teamleader", element: <TrainerTeamLeader /> },
        { path: "profile", element: <TrainerUpdateProfile /> },
        {
          path: "changepassword",
          element: <TrainerChangePassword />,
        },
        {
          path: "withdrawals",
          element: <TrainerWithdrawal />,
        },
        {
          path: "passbook",
          element: <TrainerTransactions />,
        },
      ],
    },
    { path: "admin/login", element: <AdminLogin /> },
    {
      path: "admin",
      element: <AdminMain />,
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "changepassword", element: <AdminPass /> },
        { path: "privacy", element: <AdminPrivacy /> },
        { path: "term-conditions", element: <AdminTerms /> },
        { path: "cookie", element: <AdminCookie /> },
        { path: "reviewpending", element: <AdminReviewPending /> },
        { path: "hold", element: <AdminHold /> },
        { path: "approve", element: <AdminApprove /> },
        { path: "allcourse", element: <AdminAllCourses /> },
        {
          path: "coursedetails/:courseid",
          element: <AdminSingleCourseDetails />,
        },
        { path: "addcourse", element: <AdminAddNewCourse /> },
        {
          path: "updatecourse/:courseid",
          element: <AdminUpdateCourse />,
        },
        { path: "allcategory", element: <AdminAllCategory /> },
        { path: "subcategory", element: <AdminSubCategory /> },
        {
          path: "updatecategory/:upcatid",
          element: <AdminUpdateCategory />,
        },
        { path: "createcategory", element: <AdminCreateCategory /> },
        {
          path: "updatesubcategory/:upscatid",
          element: <AdminUpdateSubcategory />,
        },
        { path: "addSubcategory", element: <AdminAddSubCategory /> },
        { path: "trainers", element: <AdminAllInstructors /> },
        {
          path: "pending_trainers",
          element: <AdminPendingInstructors />,
        },
        {
          path: "approved_trainers",
          element: <AdminApproveInstructors />,
        },
        {
          path: "blocked_trainers",
          element: <AdminBlockedInstructors />,
        },
        { path: "add_trainer", element: <AdminAddInstructors /> },
        {
          path: "trainer/:trainerId",
          element: <AdminUpdateInstructor />,
        },
        { path: "allstudents", element: <AdminAllStudents /> },
        {
          path: "pending_students",
          element: <AdminPendingStudents />,
        },
        {
          path: "student_map",
          element: <AdminStudentMap />,
        },
        { path: "addstudent", element: <AdminAddStudent /> },
        {
          path: "student/:studentId",
          element: <AdminSingleStudent />,
        },
        {
          path: "request_student",
          element: <AdminRequestedStudents />,
        },
        {
          path: "general_settings",
          element: <AdminGeneralSetting />,
        },
        {
          path: "mail_settings",
          element: <AdminMailSetting />,
        },
        {
          path: "other_settings",
          element: <AdminOtherSetting />,
        },

        {
          path: "withdrawals",
          element: <AdminWithdrawList />,
        },
        {
          path: "withdrawals_completed",
          element: <AdminWithdrawComplete />,
        },
        {
          path: "withdrawals_rejected",
          element: <AdminWithdrawReject />,
        },

        {
          path: "add_user",
          element: <AdminAddUser />,
        },
        {
          path: "user/:userId",
          element: <AdminSingleUser />,
        },
        {
          path: "users",
          element: <AdminAllUser />,
        },
        {
          path: "roles",
          element: <AdminAllRoles />,
        },
        {
          path: "add_role",
          element: <AdminAddNew />,
        },
        {
          path: "role/:roleId",
          element: <AdminSingleRole />,
        },
        {
          path: "gmeet",
          element: <AdminGmeetList />,
        },

        {
          path: "update_profile",
          element: <AdminUpdateProfile />,
        },

        {
          path: "change_password",
          element: <AdminChangePassword />,
        },
        {
          path: "notifications",
          element: <AdminNotifications />,
        },
        {
          path: "team_leader_list",
          element: <AdminTeamLeaderList />,
        },
        {
          path: "team_leader/:userId",
          element: <AdminSingleTeamLeader />,
        },
        {
          path: "counsellor/:userId",
          element: <AdminSingleCounsellor />,
        },
        {
          path: "counsellors_list",
          element: <AdminCounsellorList />,
        },
        {
          path: "first_counsellor_map",
          element: <AdminFirstCounsellorMap />,
        },
        {
          path: "student_click_list",
          element: <AdminStudentClickList />,
        },
        {
          path: "home_settings",
          element: <AdminHomeSetting />,
        },
      ],
    },
    { path: "subadmin/login", element: <SubAdminLogin /> },
    {
      path: "subadmin",
      element: <SubAdminMain />,
      children: [
        { path: "dashboard", element: <SubAdminDashboard /> },
        { path: "privacy", element: <SubAdminPrivacy /> },
        { path: "term-conditions", element: <SubAdminTerms /> },
        { path: "cookie", element: <SubAdminCookie /> },
        {
          path: "reviewpending",
          element: <SubAdminReviewPending />,
        },
        { path: "hold", element: <SubAdminHold /> },
        { path: "approve", element: <SubAdminApprove /> },
        { path: "allcourse", element: <SubAdminAllCourses /> },
        {
          path: "coursedetails/:courseid",
          element: <SubAdminSingleCourseDetails />,
        },
        { path: "addcourse", element: <SubAdminAddNewCourse /> },
        {
          path: "updatecourse/:courseid",
          element: <SubAdminUpdateCourse />,
        },
        { path: "allcategory", element: <SubAdminAllCategory /> },
        { path: "subcategory", element: <SubAdminSubCategory /> },
        {
          path: "updatecategory/:upcatid",
          element: <SubAdminUpdateCategory />,
        },
        {
          path: "createcategory",
          element: <SubAdminCreateCategory />,
        },
        {
          path: "updatesubcategory/:upscatid",
          element: <SubAdminUpdateSubcategory />,
        },
        {
          path: "addSubcategory",
          element: <SubAdminAddSubCategory />,
        },
        {
          path: "trainers",
          element: <SubAdminAllInstructors />,
        },
        {
          path: "pending_trainers",
          element: <SubAdminPendingInstructors />,
        },
        {
          path: "approved_trainers",
          element: <SubAdminApproveInstructors />,
        },
        {
          path: "blocked_trainers",
          element: <SubAdminBlockedInstructors />,
        },
        {
          path: "add_trainer",
          element: <SubAdminAddInstructors />,
        },
        {
          path: "trainer/:trainerId",
          element: <SubAdminUpdateInstructor />,
        },
        { path: "allstudents", element: <SubAdminAllStudents /> },
        {
          path: "pending_students",
          element: <SubAdminPendingStudents />,
        },
        { path: "addstudent", element: <SubAdminAddStudent /> },
        {
          path: "student/:studentId",
          element: <SubAdminSingleStudent />,
        },
        {
          path: "request_student",
          element: <SubAdminRequestedStudents />,
        },
        {
          path: "general_settings",
          element: <SubAdminGeneralSetting />,
        },
        {
          path: "mail_settings",
          element: <SubAdminMailSetting />,
        },
        {
          path: "other_settings",
          element: <SubAdminOtherSetting />,
        },

        {
          path: "withdrawals",
          element: <SubAdminWithdrawList />,
        },
        {
          path: "withdrawals_completed",
          element: <SubAdminWithdrawComplete />,
        },
        {
          path: "withdrawals_rejected",
          element: <SubAdminWithdrawReject />,
        },

        {
          path: "add_user",
          element: <SubAdminAddUser />,
        },
        {
          path: "user/:userId",
          element: <SubAdminSingleUser />,
        },
        {
          path: "users",
          element: <SubAdminAllUser />,
        },
        {
          path: "roles",
          element: <SubAdminAllRoles />,
        },
        {
          path: "add_role",
          element: <SubAdminAddNew />,
        },
        {
          path: "role/:roleId",
          element: <SubAdminSingleRole />,
        },
        {
          path: "gmeet",
          element: <SubAdminGmeetList />,
        },

        {
          path: "update_profile",
          element: <SubAdminUpdateProfile />,
        },

        {
          path: "change_password",
          element: <SubAdminChangePassword />,
        },
        {
          path: "user_withdrawal",
          element: <SubAdminUserWithdrawals />,
        },
        {
          path: "user_pass_book",
          element: <SubAdminUserTransactions />,
        },
        {
          path: "student_map",
          element: <SubAdminStudentMap />,
        },
        {
          path: "team_leader_list",
          element: <SubAdminTeamLeaderList />,
        },
        {
          path: "counsellors_list",
          element: <SubAdminCounsellorList />,
        },
        {
          path: "counsellor_map",
          element: <SubAdminCounsellorMap />,
        },
        {
          path: "first_counsellor_map",
          element: <SubAdminFirstCounsellorMap />,
        },
        {
          path: "student_click_list",
          element: <SubAdminStudentClickList />,
        },
        {
          path: "team_leader/:userId",
          element: <SubAdminSingleTeamLeader />,
        },
        {
          path: "counsellor/:userId",
          element: <SubAdminSingleCounsellor />,
        },
      ],
    },
  ]);

  return routeConfig;
}

export default App;

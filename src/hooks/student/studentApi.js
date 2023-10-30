import { Headertoken, authenticate } from "../../lib/axios";

//get student profile info
export function getStudentProfile() {
    return authenticate.get(`student/profile`, Headertoken());
}

//get student passbook info
export function getStudentPassBook({ count }) {
    return authenticate.get(`student/pass-book?count=${count}`, Headertoken());
}


//get student courses info
export function getStudentCourses({ count }) {
    return authenticate.get(`student/courses?count=${count}`, Headertoken());
}

//get student courses info
export function getSingleCourse(Id) {
    return authenticate.get(`student/courses/${Id}`, Headertoken());
}



//get student withdrawal info
export function getStudentWithdrawal({ count }) {
    return authenticate.get(`student/withdrawal?count=${count}`, Headertoken());
}

//post withdraw
export function postStudentWithdraw({ formdata }) {
    return authenticate.post(`student/withdrawal`, formdata, Headertoken());
}


//get student withdrawal info
export function getStudentReferral({ count }) {
    return authenticate.get(`student/referral?count=${count}`, Headertoken());
}


export function getDashboard() {
    return authenticate.get(`student`, Headertoken())
}


//post withdraw
export function postStudentProfileSave({ Id, formdata }) {
    return authenticate.post(`student/profile/${Id}`, formdata, Headertoken());
}


//post meet link click
export function postMeetLinkClick({ formdata }) {
    return authenticate.post(`student/meet-link-click`, formdata, Headertoken());
}


export function postSendVerificationMail({ formdata }) {
    return authenticate.post(`student/send-verification-mail`, formdata, Headertoken())
}

export function getVerifiedAccount({ _token }) {
    return authenticate.get(`student/verify-account?_token=${_token}`, Headertoken())
}




//post meet link click
export function getReferralQuery({ type, to, from }) {
    return authenticate.get(`student/referral-query?from=${from}&type=${type}&to=${to}`, Headertoken());
}



//post meet link click
export function postAdminBalanceCut({ formdata }) {
    return authenticate.post(`student/cut-balance-admin`, formdata, Headertoken());
}






import { Headertoken, authenticate } from "../../lib/axios";

//get student list info
export function getTrainerInfo() {
    return authenticate.get(`instructor/profile`, Headertoken());
}


//get trainer list info
export function postTrainerEdit({ Id, formdata }) {
    return authenticate.post(`instructor/profile/${Id}`, formdata, Headertoken());
}

//get student list info
export function getTrainerStudentList({ count, search_string }) {
    return authenticate.get(`instructor/students?count=${count}${search_string ? `&search_string=${search_string}` : ''}`, Headertoken());
}


//get referral student list info
export function getTrainerReferralStudentList({ count, search_string }) {
    return authenticate.get(`instructor/referral-students?count=${count}${search_string ? `&search_string=${search_string}` : ''}`, Headertoken());
}


// change team leader 
export function postChangeTeamLeader({ formdata }) {
    return authenticate.post('instructor/students-team-leader', formdata, Headertoken())
}

//get referral student list info
export function getTrainerReferralStudentListWithSearch({ type, to, from }) {
    return authenticate.get(`instructor/search-referral-students?type=${type}&to=${to}&from=${from}`, Headertoken());
}


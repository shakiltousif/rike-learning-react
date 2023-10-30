import { Headertoken, authenticate } from "../../lib/axios";

//get Team Leader List api
export function getTeamLeadersList({ count, search_string }) {
    return authenticate.get(`admin/team-leader-index?count=${count}${search_string ? `&search_string=${search_string}` : ''}`, Headertoken());
}

//get single team leader user 
export function getSingleTeamLeaderUser(Id) {
    return authenticate.get(`admin/team-leader-edit/${Id}`, Headertoken())
}

//update single admin user 
export function postSingleTeamLeaderUser({ Id, formdata }) {
    return authenticate.post(`admin/team-leader-update/${Id}`, formdata, Headertoken());
}

//update single admin user balance
export function postSingleTeamLeaderBalanceUpdate({ Id, formdata }) {
    return authenticate.post(`admin/team-leader-balance/${Id}`, formdata, Headertoken());
}

//delete single admin user 
export function deleteTeamLeaderUser(Id) {
    return authenticate.delete(`admin/team-leader-delete/${Id}`, Headertoken());
}

//get LC Team Leader api
export function postLCTeamLeader({ formdata }) {
    return authenticate.post(`admin/team-leader-get-leads-by-tl`, formdata, Headertoken());
}


//get Team Leader List api
export function getCounsellorList({ count, search_string }) {
    return authenticate.get(`admin/counsellor?count=${count}${search_string ? `&search_string=${search_string}` : ''}`, Headertoken());
}


//get single team leader user 
export function getSingleCounsellor(Id) {
    return authenticate.get(`admin/counsellor-edit/${Id}`, Headertoken())
}

//update single admin user 
export function postSingleCounsellorUser({ Id, formdata }) {
    return authenticate.post(`admin/counsellor-update/${Id}`, formdata, Headertoken());
}

//update single admin user balance
export function postSingleCounsellorBalanceUpdate({ Id, formdata }) {
    return authenticate.post(`admin/counsellor-balance/${Id}`, formdata, Headertoken());
}

//delete single admin user 
export function deleteCounsellorUser(Id) {
    return authenticate.delete(`admin/counsellor-delete/${Id}`, Headertoken());
}


//post student mapping counsellor api
export function postCounsellorMapping({ formdata }) {
    return authenticate.post(`admin/counsellor`, formdata, Headertoken());
}


//post Senior Controller mapping counsellor api
export function postChangeSeniorCounsellor({ formdata }) {
    return authenticate.post(`admin/update-senior-counsellor`, formdata, Headertoken());
}


//post student mapping counsellor api
export function postChangeSeniorTeamLeader({ formdata }) {
    return authenticate.post(`admin/update-senior-team-leader`, formdata, Headertoken());
}


//get first counsellor details
export function getFirstCounsellorDetails() {
    return authenticate.get(`admin/first-counsellor-details`, Headertoken())
}

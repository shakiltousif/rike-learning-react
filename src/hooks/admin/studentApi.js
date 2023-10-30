import { Headertoken, authenticate } from "../../lib/axios";

//get students api
export function getStudents({ count, search_string, zone }) {
    let query = '';
    query += `${search_string ? `search_string=${search_string}` : ''}`;
    query += `${zone ? `&zone=${zone}` : ''}`;

    return authenticate.get(`admin/students?count=${count}${query != '' ? `&${query}` : ''} `, Headertoken());
}

//get single Student api
export function getSingleStudent(Id) {
    return authenticate.get(`admin/students-edit/${Id}`, Headertoken());
}


//single student eidt
export function postEditStudent({ Id, formdata }) {
    return authenticate.post(`admin/students-update/${Id}`, formdata, Headertoken());
}

//get single Student create info api
export function getSingleStudentCreateInfo() {
    return authenticate.get(`admin/students-create`, Headertoken());
}

//post single Student create api
export function postSingleStudentCreate({ formdata }) {
    return authenticate.post(`admin/students-store`, formdata, Headertoken());
}

//delete student api
export function deleteStudent(Id) {
    return authenticate.delete(`admin/students/${Id}`, Headertoken());
}


//get pending students api
export function getPendingStudents({ count, search_string, zone }) {
    let query = '';
    query += `${search_string ? `search_string=${search_string}&` : ''}`;
    query += `${zone ? `zone=${zone}` : ''}`;

    return authenticate.get(`admin/students-pending?count=${count}${query != '' ? `&${query}` : ''}`, Headertoken());
}


//post approve student api
export function postSingleStudentStatus({ formdata }) {
    return authenticate.post(`admin/students-change-status-credit`, formdata, Headertoken());
}


//post change status student api
export function postSingleStudentChangeStatus({ formdata }) {
    return authenticate.post(`admin/students-change-status`, formdata, Headertoken());
}

//post change status student api
export function postSingleStudentChangeTeamLeader({ formdata }) {
    return authenticate.post(`admin/students-change-team-leader`, formdata, Headertoken());
}

//post student mapping api
export function postStudentMapping({ formdata }) {
    return authenticate.post(`admin/instructors-map`, formdata, Headertoken());
}


//post student mapping api
export function getPendingStudentsCounsellors({ count }) {
    return authenticate.get(`admin/students-pending-by-counsellors?count=${count}`, Headertoken());
}


export function getStudentStats({ to, from, type }) {
    return authenticate.get(`admin/students-type-search?type=${type}&to=${to}&from=${from}`, Headertoken());
}

//get team leader student stats
export function getStudentStatsTL({ to, from, type }) {
    return authenticate.get(`admin/students-type-search-tl?type=${type}&to=${to}&from=${from}`, Headertoken());
}



//update single student balance
export function postAdminSingleStudentBalanceEdit({ Id, formdata }) {
    return authenticate.post(`admin/students-update-balance/${Id}`, formdata, Headertoken());
}


//update single student zone
export function postAdminSingleStudentZone({ formdata }) {
    return authenticate.post(`admin/students-update-zone`, formdata, Headertoken());
}


//update student request to admin
export function postAdminStudentRequestToAdmin({ formdata }) {
    return authenticate.post(`admin/students-request-to-admin`, formdata, Headertoken());
}


//update student messaged
export function postAdminStudentMessaged({ formdata }) {
    return authenticate.post(`admin/students-update-messaged`, formdata, Headertoken());
}


//update student messaged
export function postAdminCounsellorUpdate({ formdata }) {
    return authenticate.post(`admin/assign-counsellor`, formdata, Headertoken());
}
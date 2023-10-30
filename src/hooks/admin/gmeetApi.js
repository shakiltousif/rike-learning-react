import { Headertoken, authenticate } from "../../lib/axios";

//get meet api
export function getAdminGmeet({ count }) {
    return authenticate.get(`admin/gmeet?count=${count}`, Headertoken());
}

//add gmeet api
export function postAdminGmeet({ formdata }) {
    return authenticate.post(`admin/gmeet`, formdata, Headertoken());
}

//delete gmeet api
export function deleteAdminMeet(Id) {
    return authenticate.delete(`admin/gmeet/${Id}`, Headertoken());
}



//getstudent clicks
export function getStudentClicks({ count }) {
    return authenticate.get(`admin/student-link-clicks?count=${count}`, Headertoken());
}
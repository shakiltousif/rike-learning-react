import { Headertoken, authenticate } from "../../lib/axios";

//get trainers api
export function getTrainers({ count, search_string }) {
    return authenticate.get(`admin/instructors?count=${count}${search_string ? `&search_string=${search_string}` : ''}`, Headertoken());
}


//get pending trainers api
export function getPendingTrainers({ count, search_string }) {
    return authenticate.get(`admin/instructors-pending?count=${count}${search_string ? `&search_string=${search_string}` : ''}`, Headertoken());
}


//get pending trainers api
export function getApprovedTrainers({ count, search_string }) {
    return authenticate.get(`admin/instructors-approved?count=${count}${search_string ? `&search_string=${search_string}` : ''}`, Headertoken());
}

//get blocked trainers api
export function getBlockedTrainers({ count, search_string }) {
    return authenticate.get(`admin/instructors-blocked?count=${count}${search_string ? `&search_string=${search_string}` : ''}`, Headertoken());
}

//delete trainer api
export function deleteTrainer(Id) {
    return authenticate.delete(`admin/instructors-delete/${Id}`, Headertoken());
}


//get pending trainers api
export function getTrainerCreateInfo() {
    return authenticate.get(`admin/instructors-create`, Headertoken());
}


//post single trainer create api
export function postSingleTrainerStore({ formdata }) {
    return authenticate.post(`admin/instructors-store`, formdata, Headertoken());
}

//get single trainer api
export function getSingleTrainer(Id) {
    return authenticate.get(`admin/instructors-edit/${Id}`, Headertoken());
}


//single trainer eidt
export function postSingleTrainerUpdate({ Id, formdata }) {
    return authenticate.post(`admin/instructors-update/${Id}`, formdata, Headertoken());
}

//update single trainer balance
export function postSingleTrainerBalanceUpdate({ Id, formdata }) {
    return authenticate.post(`admin/instructors-update-balance/${Id}`, formdata, Headertoken());
}

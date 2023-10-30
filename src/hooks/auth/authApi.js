import { guest } from "../../lib/axios";

//sign in
export function postLogin({ formdata }) {
    return guest.post(`auth/login`, formdata);
}


//register
export function postRegister({ formdata }) {
    return guest.post(`auth/register`, formdata);
}


//register info
export function getRegister({ formdata }) {
    return guest.get(`auth/register`, formdata);
}

//get subadmin login info
export function getSubAdminLogin() {
    return guest.get(`auth/login-subadmin`);
}

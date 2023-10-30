import { Headertoken, authenticate } from "../../lib/axios";

//change password api
export function postAdminChangePassword({ formdata }) {
    return authenticate.post(`admin/change-password`, formdata, Headertoken());
}

//update profile api
export function postAdminProfileEdit({ formdata }) {
    return authenticate.post(`admin/profile`, formdata, Headertoken());
}

//get Auth
export function getAdminAuth() {
    return authenticate.get(`admin/get-auth`, Headertoken())
}

export function getAdminCountry() {
    return authenticate.get(`admin/location-country`, Headertoken())
}
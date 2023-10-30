import { Headertoken, authenticate } from "../../lib/axios";

//get withdrawals api
export function getAdminWithdrawals({ count }) {
    return authenticate.get(`admin/withdraws?count=${count}`, Headertoken());
}


//get completed withdrawals api
export function getAdminCompletedWithdrawals({ count }) {
    return authenticate.get(`admin/withdraws-complete?count=${count}`, Headertoken());
}


//get rejected withdrawals api
export function getAdminRejectedWithdrawals({ count }) {
    return authenticate.get(`admin/withdraws-reject?count=${count}`, Headertoken());
}

//update withdrawal request 
export function postWithdrawStatusUpdate({ formdata }) {
    return authenticate.post(`admin/withdraws-status`, formdata, Headertoken());
}

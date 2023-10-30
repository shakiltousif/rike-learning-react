import { Headertoken, authenticate } from "../../lib/axios";

//get transaction info
export function getWithdrawals({ count }) {
    return authenticate.get(`common/withdrawal?count=${count}`, Headertoken());
}

//get transaction info
export function getTransactions({ count, search_string }) {
    return authenticate.get(`common/transactions?count=${count}${search_string ? `&search_string=${search_string}` : ''}`, Headertoken());
}

//post withdraw
export function postWithdrawRequest({ formdata }) {
    return authenticate.post(`common/withdrawal`, formdata, Headertoken());
}

//get Auth
export function getAuth() {
    return authenticate.get(`common/get-auth`, Headertoken())
}


//get notifications
export function getNotifications({ count }) {
    return authenticate.get(`common/notifications?count=${count}`, Headertoken());
}


export function getTeamLeadersList({ ID }) {
    return authenticate.get(`common/team-leaders${ID ? `?ID=${ID}` : ''}`)
}


//post meet link click
export function postAdminBalanceCutCommon({ formdata }) {
    return authenticate.post(`common/cut-balance-admin`, formdata, Headertoken());
}

import { Headertoken, authenticate } from "../../lib/axios";

//post save settings
export function postSaveSettings({ formdata }) {
    return authenticate.post(`admin/settings-general`, formdata, Headertoken());
}


//get settings
export function getGeneralSettings() {
    return authenticate.get(`admin/settings-general`, Headertoken());
}

//get home settings
export function getHomeSettings() {
    return authenticate.get(`admin/home-setting`, Headertoken());
}

//get home settings
export function postUpdateHomeSettings({ formdata }) {
    return authenticate.post(`admin/home-banner`, formdata, Headertoken());
}



//send mail
export function sendMail({ formdata }) {
    return authenticate.post(`admin/settings-mail-test`, formdata, Headertoken());
}



//post save settings
export function updateCache(status) {
    return authenticate.get(`admin/settings-cache-update/${status}`, Headertoken());
}


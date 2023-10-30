import { Headertoken, authenticate } from "../../lib/axios";

//get users api
export function getAdminUsers({ count, search_string }) {
    return authenticate.get(`admin/user?count=${count}${search_string ? `&search_string=${search_string}` : ''}`, Headertoken());
}

//get single admin user 
export function getAdminSingleUser(Id) {
    return authenticate.get(`admin/user-edit/${Id}`, Headertoken())
}

//update single admin user 
export function postAdminSingleUserEdit({ Id, formdata }) {
    return authenticate.post(`admin/user-update/${Id}`, formdata, Headertoken());
}

//update single admin user balance
export function postAdminSingleUserBalanceEdit({ Id, formdata }) {
    return authenticate.post(`admin/user-balance/${Id}`, formdata, Headertoken());
}

//delete single admin user 
export function deleteAdminUser(Id) {
    return authenticate.delete(`admin/user/${Id}`, Headertoken());
}

//get single user create info
export function getAdminUserCreateInfo() {
    return authenticate.get(`admin/user-create`, Headertoken())
}

//update single admin user 
export function postAdminSingleUserCreate({ formdata }) {
    return authenticate.post(`admin/user-store`, formdata, Headertoken());
}



//get roles api
export function getAdminRoles({ count }) {
    return authenticate.get(`admin/roles?count=${count}`, Headertoken());
}

//get roles create info
export function getAdminRolesCreateInfo() {
    return authenticate.get(`admin/roles-create`, Headertoken())
}

//admin roles create 
export function postAdminRolesCreate({ formdata }) {
    return authenticate.post(`admin/roles-store`, formdata, Headertoken());
}


//get single role 
export function getAdminSingleRole(Id) {
    return authenticate.get(`admin/roles/${Id}`, Headertoken())
}

//update role
export function postAdminSingleRole({ Id, formdata }) {
    return authenticate.post(`admin/roles-update/${Id}`, formdata, Headertoken());
}

//delete single role 
export function deleteAdminRole(Id) {
    return authenticate.delete(`admin/roles-delete/${Id}`, Headertoken());
}
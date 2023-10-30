import { Headertoken, authenticate } from "../../lib/axios";

//get students api
export function getDashboard() {
    return authenticate.get(`admin/dashboard`, Headertoken());
}

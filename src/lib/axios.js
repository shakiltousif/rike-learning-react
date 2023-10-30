import axios from "axios";
import { BASE_API_URL } from "../config/basic";
import { getToken } from "../hooks/common/useAuth";

export const guest = axios.create({
    baseURL: `${BASE_API_URL}`,
});

export const authenticate = axios.create({
    baseURL: `${BASE_API_URL}`,
});
export const Headertoken = () => {
    const options = {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    };
    return options;
};
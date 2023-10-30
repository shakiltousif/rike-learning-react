import CryptoJS, { AES } from "crypto-js";

export const getToken = () => {

    const token = localStorage.getItem('token');

    let decryptedToken = '';
    // Decrypt the user object
    if (token) {
        decryptedToken = AES.decrypt(token, 'token-secret-key').toString(
            CryptoJS.enc.Utf8
        );
        return decryptedToken;
    } else {
        return false;
    }

}


export const getUser = () => {

    const luser = localStorage.getItem("user");

    let decryptedToken = '';
    // Decrypt the user object
    if (luser) {
        decryptedToken = JSON.parse(
            AES.decrypt(luser, "user-secret-key").toString(CryptoJS.enc.Utf8)
        );
        return decryptedToken;
    } else {
        return false;
    }

}


export const userCan = (permission_name) => {
    return getUser()?.id &&
        getUser()?.roles?.[0]?.permissions?.filter(
            (permission) => permission?.name == permission_name
        )?.length != 0
}

export const userRoleCan = (role_name) => {
    return getUser()?.id && getUser()?.roles?.[0]?.name == role_name;
}
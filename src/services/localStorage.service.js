import { jwtDecode } from "jwt-decode";

export class LocalStorageService {
    setAccessToken(token) {
        const decodedToken = jwtDecode(token);
        localStorage.setItem('userData', JSON.stringify(decodedToken));
        localStorage.setItem('accessToken', token);
    }

    getAccessKey() {
        return localStorage.getItem('accessToken');
    }

    getUserData() {
        return JSON.parse(localStorage.getItem('userData')) 
    }

    removeUser() {
        localStorage.removeItem('userData');
        localStorage.removeItem('accessToken');
    }
}
import axios from "axios";
import axiosInstance from "../interseptor";
const defaultUrl = "http://localhost:3000/"

export class UserService {

    login(login, password) {
        let type = 'em'
        if(login[0] === '+') {
            type = 'ph'
        }
        return axios.post(`${defaultUrl}user/authorization/${type}`, {login: login, password: password})
    }

    registration(data) {
        return axios.post(`${defaultUrl}user/`, data)
    }

    async getUserData() {
        const response = await axiosInstance.get(`${defaultUrl}user/getUser`)
        return response.data
    }
}
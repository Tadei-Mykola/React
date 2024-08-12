import axios from "axios";
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
}
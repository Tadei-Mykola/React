import axios from "axios";
const defaultUrl = "http://localhost:3000/"

export class TodoService {

    async createNewTodo(todo) {
        const response = await axios.post(`${defaultUrl}todo/createTodo`, todo);
        return response.data;
    }

    async getTodos() {
        const response = await axios.get(`${defaultUrl}todo/`);
        return response.data;
    }

    async updateTodo(id, data) {
        const response = await axios.patch(`${defaultUrl}todo/updateTodo/${id}`, data)
        return response.data;
    }

    deleteTodoById(id) {
        return axios.delete(`${defaultUrl}todo/deleteTodo/${id}`)
    }
}
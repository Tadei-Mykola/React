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

    updateTodoToDone(id, data) {
        return axios.patch(`${defaultUrl}todo/updateTodoToDone/${id}`, data)
    }

    deleteTodoById(id) {
        return axios.delete(`${defaultUrl}todo/deleteTodo/${id}`)
    }
}
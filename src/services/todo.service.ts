import axiosInstance from "../interseptor";
const defaultUrl = "http://localhost:3000/"

export class TodoService {

    autoSetStatus = (loading = false, message = null, severity = null) => {
        return { loading, message, severity };
    }

    async createNewTodo(todo) {
        const response = await axiosInstance.post(`${defaultUrl}todo/createTodo`, todo);
        return response.data;
    }

    async getTodos(page, limit) {
        const response = await axiosInstance.get(`${defaultUrl}todo/`, {params: {page, limit}});
        return response.data;
    }

    async updateTodo(id, data) {
        const response = await axiosInstance.patch(`${defaultUrl}todo/updateTodo/${id}`, data)
        return response.data;
    }

    deleteTodoById(id) {
        return axiosInstance.delete(`${defaultUrl}todo/deleteTodo/${id}`)
    }
}
import { 
    addTodoStart,  
    addTodoSuccess, 
    addTodoFailure,
    getTodoStart, 
    getTodoSuccess, 
    getTodoFailure,
    updateTodoStart,
    updateTodoSuccess,
    updateTodoFailure,
    deleteTodoStart,
    deleteTodoSuccess,
    deleteTodoFailure,
  } from '../storeSlice/todoSlice';
import { TodoService } from '../../services/todo.service';

const todoService = new TodoService();

export const addTodoAsync = (todo) => async (dispatch) => {
dispatch(addTodoStart());
try {
    const newTodo = await todoService.createNewTodo(todo);
    dispatch(addTodoSuccess(newTodo));
} catch (error) {
    dispatch(addTodoFailure(error.message));
}
};

export const getTodoAsync = () => async (dispatch) => {
dispatch(getTodoStart());
try {
    const todos = await todoService.getTodos();
    dispatch(getTodoSuccess(todos));
} catch (error) {
    dispatch(getTodoFailure(error.message));
}
};

export const updateTodoAsync = (data) => async (dispatch) => {
dispatch(updateTodoStart());
try {
    const todo = await todoService.updateTodo(data.id, data);
    dispatch(updateTodoSuccess(todo));
} catch (error) {
    dispatch(updateTodoFailure(error.message));
}
};

export const deleteTodoAsync = (id) => async (dispatch) => {
dispatch(deleteTodoStart());
try {
    const response = await todoService.deleteTodoById(id);
    if (response.status === 200){
        dispatch(deleteTodoSuccess(id));
    }
} catch (error) {
    dispatch(deleteTodoFailure(error.message));
}
};
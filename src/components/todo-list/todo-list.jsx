
import { useEffect, useState } from 'react';
import './todo-list.scss';
import { TodoItem } from '../todo-item/todo-item';
import { TodoService } from '../../services/todo.service';

const todoService = new TodoService()
export function TodoList({todoItem}) {
  const [todoList, setTodoList] = useState([]);

  const deleteTodoItem = async (id) => {
    todoService.deleteTodoById(id)
    setTodoList(todoList.filter((item) => item.id !== id));
    
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await todoService.getTodos();
      if (data) {
        setTodoList(data);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    if (Object.keys(todoItem).length !== 0) {
      setTodoList((prevList) => [...prevList, todoItem]);
    }
  }, [todoItem]);

  return (
    <div className="todo-list">
      {todoList.map((todo) => (
        <TodoItem key={todo.id} todoItem={todo} deleteTodoItem={deleteTodoItem}/>
      ))}
    </div>
  );
}


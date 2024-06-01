import './App.scss'
import {CreateTodoItem} from './components/create-todo-item/create-todo-item.jsx'
import {TodoList} from './components/todo-list/todo-list.jsx'
import { useState } from 'react';
import { TodoService } from './services/todo.service';

const todoService = new TodoService()
export default function App() {

  const [todoItem, setTodoItem] = useState({});

  const addTodoItem = async (todoItem) => {
    const newTodo = await todoService.createNewTodo(todoItem)
    setTodoItem(newTodo);
  };

  return ( 
   <>
      <CreateTodoItem onAddItem={addTodoItem} />
      <TodoList todoItem={todoItem} />
   </>
  );
}

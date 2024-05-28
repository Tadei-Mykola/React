import './App.scss'
import {CreateTodoItem} from './components/create-todo-item/create-todo-item.jsx'
import {TodoList} from './components/todo-list/todo-list.jsx'
import { useState } from 'react';

export default function App() {

  const [todoItem, setTodoItem] = useState({});

  const addTodoItem = (todoItem) => {
    setTodoItem(todoItem);
  };

  return ( 
   <>
      <CreateTodoItem onAddItem={addTodoItem} />
      <TodoList todoItem={todoItem} />
   </>
  );
}


import { useEffect, useState } from 'react';
import './todo-list.scss';
import { LocalStorageService } from '../../services/localStorage.service';
import { TodoItem } from '../todo-item/todo-item';

const localStorageService = new LocalStorageService()

export function TodoList({todoItem}) {
  const [todoList, setTodoList] = useState([]);
  const deleteTodoItem = (item) => {
    setTodoList(todoList.filter(item1 => item1.text !== item.text));
  };
  useEffect(() => {
    const data = localStorageService.getArray('todoList');
    if (data) {
      setTodoList(data);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(todoItem).length !== 0) {
      setTodoList((prevList) => [...prevList, todoItem]);
    }
  }, [todoItem]);

  return (
    <div className="todo-list">
      {todoList.map((todo, index) => (
        <TodoItem key={index} todoItem={todo} deleteTodoItem={deleteTodoItem}/>
      ))}
    </div>
  );
}


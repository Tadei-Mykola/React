
import { useState } from 'react';
import './create-todo-item.scss';
import { LocalStorageService } from '../../services/localStorage.service';

const localStorageService = new LocalStorageService()
export function CreateTodoItem({onAddItem}) {
  const [todoItem, setTodoItem] = useState({text: '', done: false})

  return (
    <div className='create-todo-item'>
      <div className='field'>
        <label htmlFor="nameItem">Веддіть дію яку хочете зробити</label>
        <input type="text" name='nameItem' value={todoItem.text} onChange={(event) => setTodoItem((prev) => ({...prev, text: event.target.value}))}/>
      </div>
      <button onClick={() => {
        if(!!todoItem.text.trim()) {
          localStorageService.setArray('todoList', todoItem)
          onAddItem(todoItem)
          setTodoItem({text: '', done: false})
        }
      }}>&#10003;</button>
    </div>
  );
}


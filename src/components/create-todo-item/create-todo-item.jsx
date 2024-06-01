
import { useState } from 'react';
import './create-todo-item.scss';

export function CreateTodoItem({onAddItem}) {
  const [todoItem, setTodoItem] = useState({name: '', isDone: false})

  return (
    <div className='create-todo-item'>
      <div className='field'>
        <label htmlFor="nameItem">Веддіть дію яку хочете зробити</label>
        <input type="text" name='nameItem' value={todoItem.name} onChange={(event) => setTodoItem((prev) => ({...prev, name: event.target.value}))}/>
      </div>
      <button onClick={() => {
        if(!!todoItem.name.trim()) {
          onAddItem(todoItem)
          setTodoItem({name: '', isDone: false})
        }
      }}>&#10003;</button>
    </div>
  );
}


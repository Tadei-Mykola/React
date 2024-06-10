import { useDispatch } from 'react-redux';
import { useState } from 'react';
import './create-todo.scss';
import { addTodoAsync } from '../../store/storeActions/todoAction';

export function CreateTodo() {
  const [todo, setTodo] = useState({name: '', isDone: false})
  const dispatch = useDispatch();

  return (
    <div className='create-todo'>
      <div className='field'>
        <label htmlFor="nameItem">Веддіть дію яку хочете зробити</label>
        <input type="text" name='nameItem' value={todo.name} onChange={(event) => setTodo((prev) => ({...prev, name: event.target.value}))}/>
      </div>
      <button onClick={() => {
        if(!!todo.name.trim()) {
          dispatch(addTodoAsync(todo))
          setTodo({name: '', isDone: false})
        }
      }}>&#10003;</button>
    </div>
  );
}



import './todo-item.scss';
import { useState } from 'react';
import { DeleteConfirmationModal } from '../delete-confirmation-modal/confirmation-modal';
import { useDispatch } from 'react-redux';
import { deleteTodoAsync, updateTodoAsync } from '../../store/storeActions/todoAction';

export function TodoItem(props) {
  const [todo, setTodo] = useState(props.todo)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false)
  const dispatch = useDispatch()
  
  const deleteItem = () => {
    dispatch(deleteTodoAsync(todo.id))
    setModalIsOpen(false)
  }

  const changeToDone = () => { 
    dispatch(updateTodoAsync({...todo, isDone: true}))
  }

  const changeName = () => {
    dispatch(updateTodoAsync(todo))
    setIsEditMode(false)
  }

  return (
    <div className='todo-item' style={{ backgroundColor: todo.isDone ? 'green' : '' }}>
      {
        !isEditMode ? <h1>{todo.name}</h1> : 
        <input className='todo-text' value={todo.name} onChange={(event) => setTodo((prev) => ({...prev, name: event.target.value}))}></input>
      }

      <div className='button-group'>
        <button className='edit-button' onClick={() => { return isEditMode ? changeName(): setIsEditMode(true)}}>{ isEditMode ? '\u2713' : '\u270F' }</button>
        <div>
          <button className='done-button' onClick={changeToDone} disabled={todo.isDone}>&#10003;</button>
          <button className='delete-button' onClick={() => setModalIsOpen(true)}>&#x2715;</button>
        </div>
        <DeleteConfirmationModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onDelete={deleteItem} />
      </div>
    </div>
  );
}


import './todoItem.scss';
import { useState, useEffect } from 'react';
import { ConfirmationModal } from '../../UI';
import { TodoService } from '../../services';
import { useStatus } from '../../hooks';

const todoService = new TodoService()
export function TodoItem(props) {
  const [todo, setTodo] = useState(props.todo)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false)
  const {setStatus, todos, setTodos } = useStatus()
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (todo.date) {
      const currentDate = new Date();
      const todoDate = new Date(todo.date);
      setIsExpired(todoDate < currentDate)
    }
    setTodo(props.todo);
  }, [props.todo]);

  
  const deleteTodo = () => {
    setStatus(todoService.autoSetStatus(true, 'Очікування відповіді від сервера', 'info'))
    todoService.deleteTodoById(todo.id).then(() => {  
      setStatus(todoService.autoSetStatus(false, 'Задачу видалено', 'success'))
      setTodos(todos.filter(item => item.id!== todo.id))
    })
    .catch((error) => {
      setStatus(todoService.autoSetStatus(false, error.message, 'error'))
    })
    setModalIsOpen(false)
  }

  const changeToDone = () => { 
    setStatus(todoService.autoSetStatus(true, 'Очікування відповіді від сервера', 'info'))
    todoService.updateTodo(todo.id, {...todo, isDone: true}).then((data) => {
      setStatus(todoService.autoSetStatus(false, 'Задачу змінено статусом', 'success'))
      setTodos(todos.map(item => item.id === todo.id ? data : item))
    })
    .catch((error) => {
      setStatus(todoService.autoSetStatus(false, error.message, 'error'))
    })
  }

  const changeName = () => {
    setStatus(todoService.autoSetStatus(true, 'Очікування відповіді від сервера', 'info'))
    todoService.updateTodo(todo.id, todo).then((data) => {
      setStatus(todoService.autoSetStatus(false, 'Задачу успішно оновлено', 'success'))
      setTodos(todos.map(item => item.id === todo.id ? data : item))
    })
    .catch((error) => {
      setStatus(todoService.autoSetStatus(false, error.message, 'error'))
    })
    setIsEditMode(false)
  }

  const changeTodo = (event) => {
    setTodo((prev) => ({...prev, name: event.target.value}))
  }

  const toggleEditMode = () => { isEditMode ? changeName(): setIsEditMode(true) }

  return (
    <div className='todo-item' style={{ backgroundColor: todo.isDone ? 'green' : isExpired ? 'purple' : '' }}>
      {
        !isEditMode ? <h1>{todo.name}</h1> : 
        <input className='todo-text' value={todo.name} onChange={changeTodo}></input>
      }
      <div className='button-group'>
        <button className='edit-button' onClick={toggleEditMode} disabled={todo.isDone || isExpired}>{ isEditMode ? '\u2713' : '\u270F' }</button>
        <div>
          <button className='done-button' onClick={changeToDone} disabled={todo.isDone || isExpired}>&#10003;</button>
          <button className='delete-button' onClick={() => setModalIsOpen(true)}>&#x2715;</button>
        </div>
        <ConfirmationModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onDelete={deleteTodo} text={"Ви дійсно хочете видалити дію"} isDelete={true}/>
      </div>
    </div>
  );
}

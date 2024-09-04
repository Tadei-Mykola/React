
import './todoItem.scss';
import { useState, useEffect } from 'react';
import { ConfirmationModal } from '@UI';
import { TodoService } from '@services';
import { useStatus } from '@hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const todoService = new TodoService()
export function TodoItem(props) {
  const [todo, setTodo] = useState(props.todo)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false)
  const { setStatus } = useStatus()
  const [isExpired, setIsExpired] = useState(false);
  const queryClient = useQueryClient()

  const { mutate: deleteTodo } = useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: () => todoService.deleteTodoById(todo.id),
    onMutate: () => setStatus(todoService.autoSetStatus(true, 'Очікування відповіді від сервера', 'info')),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
      console.log(queryClient.getQueriesData(['todos']))
      setStatus(todoService.autoSetStatus(false, 'Задачу видалено', 'success'))
    },
    onError: (error) => setStatus(todoService.autoSetStatus(false, error.message, 'error')),
    onSettled: () => setModalIsOpen(false),
  })

  const { mutate: changeName } = useMutation({
    mutationKey: ['changeTodo'],
    mutationFn: () => todoService.updateTodo(todo.id, todo),
    onMutate: () => setStatus(todoService.autoSetStatus(true, 'Очікування відповіді від сервера', 'info')),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
      setStatus(todoService.autoSetStatus(false, 'Задачу успішно оновлено', 'success'))
    },
    onError: (error) => setStatus(todoService.autoSetStatus(false, error.message, 'error')),
    onSettled: () => setIsEditMode(false),
  })

  const { mutate: changeToDone } = useMutation({
    mutationKey: ['changeTodo'],
    mutationFn: () => todoService.updateTodo(todo.id, {...todo, isDone: true}),
    onMutate: () => setStatus(todoService.autoSetStatus(true, 'Очікування відповіді від сервера', 'info')),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
      setStatus(todoService.autoSetStatus(false, 'Задачі змінено статус', 'success'))
    },
    onError: (error) => setStatus(todoService.autoSetStatus(false, error.message, 'error')),
  })

  useEffect(() => {
    if (todo.date) {
      const currentDate = new Date();
      const todoDate = new Date(todo.date);
      setIsExpired(todoDate < currentDate)
    }
    setTodo(props.todo);
  }, [props.todo]);

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
        <ConfirmationModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onConfirm={deleteTodo} text={"Ви дійсно хочете видалити дію"} isDelete={true}/>
      </div>
    </div>
  );
}

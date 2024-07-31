
import './todoList.scss';
import { TodoItem } from '../todoItem/todoItem';
import { useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { CustomAlert } from '../../UI'
import { TodoService } from '../../services';
import { useStatus } from '../../hooks';

const todoService = new TodoService()
export function TodoList() {
  const {status, setStatus, todos, setTodos } = useStatus()
  const [isOpenCustomAlert, setIsOpenCustomAlert] = useState(false)

  useEffect((() => {
    setStatus(todoService.autoSetStatus(true));
    todoService.getTodos().then(data => {
      setStatus(todoService.autoSetStatus(false));
        setTodos(data);
     })
     .catch (error => {
      setStatus(todoService.autoSetStatus(false, error.message, 'error'))
    })
  }),[])

  useEffect((() => {
    if (status.message) {
      setIsOpenCustomAlert(true);
      const timer = setTimeout(() => {
        setIsOpenCustomAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }),[status.message])

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo}/>  
      ))}
      <div style={{margin:'auto', display:'flex', justifyContent:'center'}}>
        {status.loading &&
          <InfinitySpin
          visible={true}
          width="200"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"   
          />
        }
      </div>
     {isOpenCustomAlert && <CustomAlert message={status.message} severity={status.severity}/>}
    </div>
  );
}


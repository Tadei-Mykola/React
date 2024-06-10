
import './todo-list.scss';
import { TodoItem } from '../todo-item/todo-item';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getTodoAsync } from '../../store/storeActions/todoAction';
import { useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import CustomAlert from '../../pop-up/customAlert'

export function TodoList() {
  const todos = useSelector((state) => state.todos.items);
  const [isOpenCustomAlert, setIsOpenCustomAlert] = useState(false)
  const { loading, message, severity } = useSelector((state) => state.todos);
  const dispatch = useDispatch()

  useEffect((() => {
    dispatch(getTodoAsync())
  }),[])

  useEffect((() => {
    if (message) {
      setIsOpenCustomAlert(true);
      const timer = setTimeout(() => {
        setIsOpenCustomAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }),[message])

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo}/>  
      ))}
      <div style={{margin:'auto', display:'flex', justifyContent:'center'}}>
        {loading &&
          <InfinitySpin
          visible={true}
          width="200"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"   
          />
        }
      </div>
     {isOpenCustomAlert && <CustomAlert message={message} severity={severity}/>}
    </div>
  );
}


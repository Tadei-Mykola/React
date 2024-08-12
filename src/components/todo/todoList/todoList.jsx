
import './todoList.scss';
import { TodoItem } from '@components';
import { useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { CustomAlert } from '@UI'
import { TodoService } from '@services';
import { useStatus } from '@hooks';
import InfiniteScroll from 'react-infinite-scroller';

const todoService = new TodoService()
export function TodoList() {
  const {status, setStatus, todos, setTodos } = useStatus()
  const [isOpenCustomAlert, setIsOpenCustomAlert] = useState(false)
  const [hasMore, setHasMore] = useState(true);
  const limitTodos = 10;

  useEffect((() => {
    if (status.message) {
      setIsOpenCustomAlert(true);
      const timer = setTimeout(() => {
        setIsOpenCustomAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }),[status.message])


  const loadMore = (page) => {
    setStatus(todoService.autoSetStatus(true));
    todoService.getTodos(page, limitTodos).then(data => {
      setStatus(todoService.autoSetStatus(false));
      const newTodos = [...todos, ...data.todos]
      setTodos(newTodos);
      setHasMore(data.hasMore)
     })
     .catch (error => {
      setStatus(todoService.autoSetStatus(false, error.message, 'error'))
    })
  }

  return (
    <div className="todo-list">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore && !status.loading}
        loader={<InfinitySpin visible={true} width="200" color="#4fa94d" ariaLabel="infinity-spin-loading" />}
      >
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
      ))}
      </InfiniteScroll>
      {isOpenCustomAlert && <CustomAlert message={status.message} severity={status.severity} />}
    </div>
  );
}


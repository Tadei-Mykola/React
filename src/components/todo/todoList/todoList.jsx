import { TodoItem } from '@components';
import { useStatus } from '@hooks';
import { TodoService } from '@services';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { InfinitySpin } from 'react-loader-spinner';
import './todoList.scss';

const todoService = new TodoService()
export function TodoList() {
  const { setStatus } = useStatus()
  const limitTodos = 10;
  const {data, isLoading, error, isSuccess, isError, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ["todos"],
    queryFn: ({pageParam = 1}) => {
      setStatus(todoService.autoSetStatus(isLoading));
      return todoService.getTodos(pageParam, limitTodos)},
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.currentPage + 1 : undefined
  })

  useEffect(() => {
    if (isSuccess) {
      setStatus(todoService.autoSetStatus(isLoading, 'Data loaded successfully', 'success'));
    }
    if (isError) {
      setStatus(todoService.autoSetStatus(isLoading, error.message, 'error'));
    }
  }, [isSuccess, isError, hasNextPage]);

  const todos = data?.pages.flatMap(page => page.todos) || []

  return (
    <div className="todo-list">
      <InfiniteScroll
        pageStart={0}
        loadMore={() => fetchNextPage()}
        hasMore={hasNextPage && !isFetchingNextPage}
        loader={<InfinitySpin visible={true} width="200" color="#4fa94d" ariaLabel="infinity-spin-loading" />}
      >
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
      ))}
      </InfiniteScroll>
    </div>
  );
}



import './todo.scss';
import { CreateTodo, TodoList } from '@components';
import { StatusProvider } from '@hooks';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


export function Todo() {
  return (
    <div className='todo'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StatusProvider>
                <CreateTodo/>
                <TodoList/>
            </StatusProvider>
        </LocalizationProvider>
    </div>
  );
}


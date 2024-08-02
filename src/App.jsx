import './App.scss'
import { CreateTodo, TodoList } from './components/index.js';
import { StatusProvider } from './hooks/index.js';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function App() {


  return ( 
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StatusProvider>
        <CreateTodo/>
        <TodoList/>
      </StatusProvider>
    </LocalizationProvider>
  );
}

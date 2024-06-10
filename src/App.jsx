import './App.scss'
import {CreateTodo} from './components/create-todo-item/create-todo.jsx'
import {TodoList} from './components/todo-list/todo-list.jsx'
import  store  from './store/store.js';
import { Provider } from 'react-redux';

export default function App() {


  return ( 
   <Provider store={store}>
      <CreateTodo/>
      <TodoList/>
   </Provider>
  );
}

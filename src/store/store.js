import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { todoSlice } from './storeSlice/todoSlice';



const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

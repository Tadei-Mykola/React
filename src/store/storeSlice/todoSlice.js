import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
      items: [],
      message: null,
      loading: false,
      severity: null,
    },
    reducers: {
      addTodoStart: (state) => {
        state.loading = true;
        state.message = 'Очікування відповіді від сервера';
        state.severity = 'info'
      },
      addTodoSuccess: (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.message = 'Задачу успішно додано';
        state.severity = 'success'
      },
      addTodoFailure: (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.severity = 'error'
      },

      getTodoStart: (state) => {
        state.loading = true;
      },
      getTodoSuccess: (state, action) => {
        state.loading = false;
        state.items = [...action.payload];
      },
      getTodoFailure: (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.severity = 'error'
      },

      updateTodoStart: (state) => {
        state.loading = true;
        state.message = 'Очікування відповіді від сервера';
        state.severity = 'info'
      },
      updateTodoSuccess: (state, action) => {
        state.loading = false;
        state.items = [...state.items.map(item => item.id != action.payload.id ? item : action.payload)];
        state.message = 'Задачу успішно оновлено';
        state.severity = 'success'
      },
      updateTodoFailure: (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.severity = 'error'
      },

      deleteTodoStart: (state) => {
        state.loading = true;
        state.message = 'Очікування відповіді від сервера';
        state.severity = 'info'
      },
      deleteTodoSuccess: (state, action) => {
        state.loading = false;
        state.items = [...state.items.filter(item => item.id != action.payload)];
        state.message = 'Задачу видалено';
        state.severity = 'success'
      },
      deleteTodoFailure: (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.severity = 'error'
      },
    },
  });
  
  export const { addTodoStart, 
    addTodoSuccess, 
    addTodoFailure,  
    getTodoStart, 
    getTodoSuccess, 
    getTodoFailure,
    updateTodoStart,
    updateTodoSuccess,
    updateTodoFailure,
    deleteTodoStart,
    deleteTodoSuccess,
    deleteTodoFailure,
  } = todoSlice.actions;
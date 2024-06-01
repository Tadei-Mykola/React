
import './todo-item.scss';
import { useState } from 'react';
import { DeleteConfirmationModal } from '../delete-confirmation-modal/delete-confirmation-modal';
import { TodoService } from '../../services/todo.service';

const todoService = new TodoService()

export function TodoItem({todoItem, deleteTodoItem}) {
  const [item, setItem] = useState(todoItem);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function deleteItem() {
    deleteTodoItem(item.id)
    closeModal()
  }

  async function changeToDone() { 
    setItem((await todoService.updateTodoToDone(item.id, {isDone: true})).data);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className='todo-item' style={{ backgroundColor: item.isDone ? 'green' : '' }}>
      <h1 className='todo-text'>{item.name}</h1>
      <div>
        <button className='done-button' onClick={changeToDone}>&#10003;</button>
        <button className='delete-button' onClick={openModal}>&#x2715;</button>
        <DeleteConfirmationModal isOpen={modalIsOpen} onClose={closeModal} onDelete={deleteItem} />
      </div>
    </div>
  );
}

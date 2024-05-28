
import './todo-item.scss';
import { useState } from 'react';
import { DeleteConfirmationModal } from '../delete-confirmation-modal/delete-confirmation-modal';
import { LocalStorageService } from '../../services/localStorage.service';

const localStorageService = new LocalStorageService()

export function TodoItem({todoItem, deleteTodoItem}) {
  const [item, setItem] = useState(todoItem);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function deleteItem() {
    localStorageService.setArray('todoList', item, 'delete')
    deleteTodoItem(item)
    closeModal()
  }

  function changeToDone() {
    localStorageService.setArray('todoList', {...item, done: true}, 'change')
    setItem(prevItem => ({ ...prevItem, done: true }));
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className='todo-item' style={{ backgroundColor: item.done ? 'green' : '' }}>
      <h1 className='todo-text'>{item.text}</h1>
      <div>
        <button className='done-button' onClick={changeToDone}>&#10003;</button>
        <button className='delete-button' onClick={openModal}>&#x2715;</button>
        <DeleteConfirmationModal isOpen={modalIsOpen} onClose={closeModal} onDelete={deleteItem} />
      </div>
    </div>
  );
}

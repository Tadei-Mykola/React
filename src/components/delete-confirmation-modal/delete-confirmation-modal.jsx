import './delete-confirmation-modal.scss';
import Modal from 'react-modal';

export function DeleteConfirmationModal({ isOpen, onClose, onDelete }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={{
      content: {
        width: '300px',
        height: '200px',
        margin: 'auto'
      }
    }}>
      <div className="delete-confirmation-modal" >
        <h2>Ви дійсно хочете видалити задачу?</h2>
        <div>
          <button className='yes' onClick={onDelete}>Yes</button>
          <button className='no' onClick={onClose}>No</button>
        </div>
      </div>
    </Modal>  
  );
}
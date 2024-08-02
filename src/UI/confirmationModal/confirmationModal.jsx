import './confirmationModal.scss';
import Modal from 'react-modal';

export function ConfirmationModal({ isOpen, onClose, onDelete, text, isDelete }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={{
      content: {
        width: '300px',
        height: '200px',
        margin: 'auto'
      }
    }}>
      <div className="confirmation-modal" >
        <h2>{text}</h2>
        <div>
          <button style={{backgroundColor: isDelete ? 'red' : 'green'}} onClick={onDelete}>Yes</button>
          <button style={{color: isDelete ? 'red' : 'green'}} onClick={onClose}>No</button>
        </div>
      </div>
    </Modal>  
  );
}
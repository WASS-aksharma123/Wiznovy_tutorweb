import React from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import '../../assets/Styles/Components/ConfirmModal.scss';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, cancelText, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <div className="modal-header">
          <button className="close-btn" onClick={onClose} disabled={loading}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-content">
          <div className="warning-icon">
            <FaExclamationTriangle />
          </div>
          <h2>{title || 'Confirm Action'}</h2>
          <p>{message || 'Are you sure you want to proceed?'}</p>
        </div>

        <div className="modal-footer">
          <button 
            className="cancel-btn" 
            onClick={onClose}
            disabled={loading}
          >
            {cancelText || 'Cancel'}
          </button>
          <button 
            className="confirm-btn" 
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Processing...' : (confirmText || 'Confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
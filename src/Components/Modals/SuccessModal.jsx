import React from 'react';
import { FaCheckCircle, FaTimes, FaExclamationCircle } from 'react-icons/fa';
import '../../assets/Styles/Components/SuccessModal.scss';

const SuccessModal = ({ isOpen, onClose, title, message, type = 'success' }) => {
  if (!isOpen) return null;

  const isError = type === 'error';

  return (
    <div className="success-modal-overlay">
      <div className="success-modal">
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-content">
          <div className={`success-icon ${isError ? 'error' : ''}`}>
            {isError ? <FaExclamationCircle /> : <FaCheckCircle />}
          </div>
          <h2>{title || (isError ? 'Error' : 'Success!')}</h2>
          <p>{message || (isError ? 'Something went wrong.' : 'Operation completed successfully.')}</p>
        </div>

        <div className="modal-footer">
          <button className="ok-btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
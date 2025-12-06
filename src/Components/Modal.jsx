import { useEffect } from "react";
import "../assets/Styles/Modal.scss";

export default function Modal({ isOpen, onClose, image, heading, subheading, buttonText = "OK", onButtonClick, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Enter' && onClose()}
      tabIndex={-1}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {image && <img src={image} alt="Wiznovy" className="modal-image" />}
        <h3 className="modal-heading">{heading}</h3>
        {subheading && <p className="modal-subheading">{subheading}</p>}
        {children || (
          <button className="modal-button" onClick={onButtonClick || onClose}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

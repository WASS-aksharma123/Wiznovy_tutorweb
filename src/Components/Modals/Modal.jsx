import { useEffect } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import "../../assets/Styles/Modal.scss";

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
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
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

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string,
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  children: PropTypes.node
};

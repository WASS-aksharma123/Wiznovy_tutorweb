import React from 'react';
import PropTypes from 'prop-types';
import { ImCross } from 'react-icons/im';
import '../assets/Styles/TermsModal.scss';

/**
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 */
const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="terms-modal-overlay">
      <div className="terms-modal">
        <div className="terms-modal-header">
          <h2>Terms and Conditions</h2>
          <ImCross className="close-icon" onClick={onClose} />
        </div>
        
        <div className="terms-modal-content">
          <p className="last-updated">Last updated: January 2024</p>
          
          <div className="terms-section">
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing and using Wiznovy's platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
          </div>

          <div className="terms-section">
            <h3>2. Service Description</h3>
            <p>Wiznovy provides an online platform connecting students with qualified tutors and educational professionals.</p>
          </div>

          <div className="terms-section">
            <h3>3. User Accounts and Registration</h3>
            <p>To access our services, you must create an account by providing accurate, current, and complete information.</p>
          </div>

          <div className="terms-section">
            <h3>4. User Conduct and Responsibilities</h3>
            <p>All users must treat others with respect, provide accurate information, and comply with all applicable laws.</p>
          </div>

          <div className="terms-section">
            <h3>5. Payment Terms</h3>
            <p>All payments are processed securely through our platform. Wiznovy charges a service fee for facilitating connections.</p>
          </div>

          <div className="terms-section">
            <h3>6. Privacy and Data Protection</h3>
            <p>Your privacy is important to us. We collect, use, and protect your personal information in accordance with our Privacy Policy.</p>
          </div>

          <div className="terms-section">
            <h3>7. Limitation of Liability</h3>
            <p>Wiznovy provides the platform "as is" and our liability is limited to the amount paid for services in the preceding 12 months.</p>
          </div>

          <div className="contact-info">
            <p><strong>Contact:</strong> legal@wiznovy.com | +1 (555) 012-3456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

TermsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TermsModal;
import React from 'react'
import { Clock, Mail, Phone } from 'lucide-react'
import '../assets/Styles/PendingStatusPage.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'

const PendingStatusPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBackToSignIn = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <div className="pending-container">
      <div className="pending-content">
        <div className="pending-icon">
          <Clock className="clock-icon" />
        </div>
        
        <h1 className="pending-title">Account Under Review</h1>
        
        <p className="pending-message">
          Your tutor account is currently pending approval. Our team is reviewing your 
          application and will notify you once the verification process is complete.
        </p>
        
        <div className="info-card">
          <h3>What happens next?</h3>
          <ul>
            <li>Review typically takes 24-48 hours</li>
            <li>You'll receive an email notification once approved</li>
            <li>All features will be unlocked after approval</li>
          </ul>
        </div>
        
        <div className="contact-info">
          <p>Need help? Contact our admin team:</p>
          <div className="contact-methods">
            <div className="contact-item">
              <Mail className="contact-icon" />
              <span>admin@wiznovy.com</span>
            </div>
            <div className="contact-item">
              <Phone className="contact-icon" />
              <span>+1 (555) 123-4567</span>
            </div>
            <button className='backtosignin' onClick={handleBackToSignIn}>Back to Sign In</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PendingStatusPage
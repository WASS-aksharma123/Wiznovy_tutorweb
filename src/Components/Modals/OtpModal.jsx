import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Clock } from "lucide-react";
import { verifyOtpUser, verifyOtpPassword, forgotPasswordUser } from "../../store/authSlice.js";
import "../../assets/Styles/OtpModal.scss";

export default function OtpModal({ email, onVerify, onResend, onClose, isPasswordReset = false }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  
  const otpInputIds = ['otp-0', 'otp-1', 'otp-2', 'otp-3', 'otp-4', 'otp-5'];

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setIsDisabled(false);
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; 
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      if (isPasswordReset) {
        const result = await dispatch(verifyOtpPassword({ email, otp: otpValue })).unwrap();
        if (result.success) {
          onVerify(otpValue, true);
        }
      } else {
        const result = await dispatch(verifyOtpUser({ email, otp: otpValue })).unwrap();
        if (result.success) {
          onVerify(otpValue, true);
        }
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      onVerify(otpValue, false);
    }
  };

  const handleResend = async () => {
    setTimer(120);
    setIsDisabled(true);
    setOtp(["", "", "", "", "", ""]);
    
    if (isPasswordReset) {
      try {
        await dispatch(forgotPasswordUser(email)).unwrap();
      } catch (error) {
        console.error('Failed to resend OTP:', error);
      }
    }
    
    onResend();
  };

  return (
    
      <div className="otp-modal">
      <div className="otp-modal__container">
        <h2 className="otp-modal__title">
          {isPasswordReset ? 'Enter Password Reset Code' : 'Verify Your Email Address'}
        </h2>
        <p className="otp-modal__description">
          {isPasswordReset 
            ? `Please enter the 6-digit password reset code sent to ${email}.`
            : `To verify your email, please enter the OTP sent to ${email}.`
          }
        </p>

        {/* OTP Inputs */}
        <div className="otp-modal__inputs">
          {otp.map((digit, index) => (
            <input
              key={otpInputIds[index]}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="otp-modal__input"
              required
            />
          ))}
        </div>

        {/* Timer */}
        <div className="otp-modal__timer">
          <Clock size={16} />
          {isDisabled ? (
            <span>Request new OTP : {timer} sec</span>
          ) : (
            <button
              onClick={handleResend}
              className="otp-modal__resend-button"
            >
              Request new OTP
            </button>
          )}
        </div>

        {error && (
          <div style={{ color: "red", fontSize: "14px", marginBottom: "10px", textAlign: "center" }}>
            {error}
          </div>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="otp-modal__verify-button"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
        
        <button
          onClick={onClose}
          className="otp-modal__close-button"
          style={{ marginTop: "10px", background: "transparent", border: "1px solid #ccc", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
        >
          Cancel
        </button>
      </div>
    </div>
    
  );
}

OtpModal.propTypes = {
  email: PropTypes.string.isRequired,
  onVerify: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isPasswordReset: PropTypes.bool
};

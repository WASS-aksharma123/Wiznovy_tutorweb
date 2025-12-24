import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Lock, Eye, EyeOff, X } from "lucide-react";
import { resetPasswordUser } from "../../store/authSlice.js";
import "../../assets/Styles/SignIn.scss";

export default function ResetPasswordModal({ isOpen, onClose, email, onSuccess }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await dispatch(resetPasswordUser({ email, password })).unwrap();
      if (result.success) {
        onSuccess();
        onClose();
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      alert(error || 'Failed to reset password');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Reset Password</h2>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleResetPassword}>
          {/* New Password Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="new-password">New Password</label>
            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input
                id="new-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="form-input"
                minLength={8}
                maxLength={16}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: "none", border: "none", cursor: "pointer", position: "absolute", right: "10px", top: "12px" }}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="form-input"
                minLength={8}
                maxLength={16}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ background: "none", border: "none", cursor: "pointer", position: "absolute", right: "10px", top: "12px" }}
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
              {error}
            </div>
          )}

          <button type="submit" className="signin-button" disabled={loading} style={{marginTop:"1.5rem"}}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

ResetPasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import "../assets/Styles/SignIn.scss";
import { useNavigate, Link } from "react-router-dom";
import Modal from "./Modal";
import OtpModal from "./OtpModal";
import { signInUser, forgotPasswordUser, clearError } from "../store/authSlice.js";
import ResetPasswordModal from "./ResetPasswordModal";
import passwordicon from "../assets/Images/EmailPassword.png";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showPasswordResetSentModal, setShowPasswordResetSentModal] =
    useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // Clear any existing errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(signInUser({ email, password })).unwrap();
      if (result.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!forgotPasswordEmail) {
      alert('Please enter your email address');
      return;
    }

    try {
      const result = await dispatch(forgotPasswordUser(forgotPasswordEmail)).unwrap();
      if (result.success) {
        setShowForgotPasswordModal(false);
        setShowPasswordResetSentModal(true);
      }
    } catch (error) {
      alert(error || 'Failed to send reset email');
    }
  };

  return (
    <div className="container">
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Log in to Wiznovy</h2>

          <form onSubmit={handleSignIn}>
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email address</label>
              <div className="input-container">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z0-9@.]*$/.test(value)) {
                      setEmail(value);
                    }
                  }}
                  placeholder="demo12@gmail.com"
                  className="form-input"
                  required
                  maxLength={40}
                  onInvalid={(e) => {
                    e.preventDefault();
                    setValidationErrors(prev => ({ ...prev, email: e.target.validationMessage }));
                  }}
                  onInput={() => setValidationErrors(prev => ({ ...prev, email: '' }))}
                />
              </div>
            </div>
            {validationErrors.email && (
              <button
                type="button"
                style={{ color: "red", fontSize: "14px", marginTop: "5px", cursor: "pointer", background: "none", border: "none", padding: 0, textAlign: "left" }}
                onClick={() => document.getElementById("email").focus()}
              >
                {validationErrors.email}
              </button>
            )}

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-container">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.replaceAll(/\s/g, ''))}
                  placeholder="Enter your Password"
                  className="form-input"
                  maxLength="16"
                  required
                  onInvalid={(e) => {
                    e.preventDefault();
                    setValidationErrors(prev => ({ ...prev, password: e.target.validationMessage }));
                  }}
                  onInput={() => setValidationErrors(prev => ({ ...prev, password: '' }))}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="input-icon-eye"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>
            {validationErrors.password && (
              <button
                type="button"
                style={{ color: "red", fontSize: "14px", marginTop: "5px", cursor: "pointer", background: "none", border: "none", padding: 0, textAlign: "left" }}
                onClick={() => document.getElementById("password").focus()}
              >
                {validationErrors.password}
              </button>
            )}

            {/* Options */}
            <div className="form-options">
              <label className="checkbox-container" htmlFor="keep-logged-in">
                <input type="checkbox" id="keep-logged-in" className="checkbox" />
                <span>Keep me logged in</span>
              </label>
              <button
                type="button"
                className="forgot-link"
                onClick={() => setShowForgotPasswordModal(true)}
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <button
                type="button"
                style={{ color: "red", fontSize: "14px", marginBottom: "10px", cursor: "pointer", background: "none", border: "none", padding: 0, textAlign: "left" }}
                onClick={() => {
                  if (error.includes("email") || error.includes("Email")) {
                    document.getElementById("email").focus();
                  } else if (error.includes("password") || error.includes("Password")) {
                    document.getElementById("password").focus();
                  }
                }}
              >
                {error}
              </button>
            )}

            {/* Sign In Button */}
            <button type="submit" className="signin-button" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <hr className="divider-line" />
            <span className="divider-text">OR</span>
            <hr className="divider-line" />
          </div>

          {/* Social Login Buttons */}
          <div className="social-buttons">
            <button className="social-button">
              <FcGoogle size={18} /> Login with Google
            </button>
            <button className="social-button">
              <FaApple size={18} /> Login with Apple
            </button>
          </div>

          {/* Signup Link */}
          <p className="signup-text">
            Don't have a Wiznovy account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>

        {/* <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          image={notlinked}
          heading="Account is under review"
          subheading="The email address you entered is not verified yet."
          buttonText="Back to Sign-In"
          onButtonClick={() => setShowModal(false)}
        /> */}

        <Modal
          isOpen={showForgotPasswordModal}
          onClose={() => setShowForgotPasswordModal(false)}
          heading="Forgot password"
        // image={passwordicon}
        >
          <form onSubmit={handleForgotPassword}>
            <div className="form-group">
              <label className="form-label" htmlFor="forgot-password-email">Email Address</label>
              <div className="input-container">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  id="forgot-password-email"
                  value={forgotPasswordEmail}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z0-9@.]*$/.test(value)) {
                      setForgotPasswordEmail(value);
                    }
                  }}
                  placeholder="Enter your email"
                  className="form-input"
                  required
                  maxLength={50}
                />
              </div>
            </div>
            <button type="submit" className="signin-button">
              Reset my password
            </button>
          </form>
        </Modal>

        <Modal
          isOpen={showPasswordResetSentModal}
          onClose={() => setShowPasswordResetSentModal(false)}
          image={passwordicon}
          heading="Password Reset Email Sent"
          subheading="Password reset link has been sent to your registered email address. Please check your inbox and follow the instructions to reset your password."
          buttonText="Continue"
          onButtonClick={() => {
            setShowPasswordResetSentModal(false);
            setShowOtpModal(true);
          }}
        />

        {showOtpModal && (
          <OtpModal
            email={forgotPasswordEmail}
            isPasswordReset={true}
            onVerify={(otpValue, isValid) => {
              if (isValid) {
                setShowOtpModal(false);
                setShowResetPasswordModal(true);
              } else {
                alert('Invalid OTP. Please try again.');
              }
            }}
            onResend={() => {
              console.log("OTP resent for password reset");
            }}
            onClose={() => setShowOtpModal(false)}
          />
        )}

        <ResetPasswordModal
          isOpen={showResetPasswordModal}
          onClose={() => setShowResetPasswordModal(false)}
          email={forgotPasswordEmail}
          onSuccess={() => {
            alert('Password reset successfully! You can now sign in with your new password.');
          }}
        />
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import "../assets/Styles/SignIn.scss";
import Modal from "./Modal";
import OtpModal from "./OtpModal";
import TermsModal from "./TermsModal";
import { signUpUser, clearError } from "../store/authSlice.js";
import wlcm from "../assets/Images/wlcm.png";
import invalidotp from "../assets/Images/invalidotp.png";


export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showInvalidOtpModal, setShowInvalidOtpModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  // Clear any existing errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Sign up to Wiznovy</h2>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              // Password validation
              if (password.length < 6) {
                setPasswordError("Password must be at least 6 characters long");
                return;
              }
              if (password !== confirmPassword) {
                setPasswordError("Passwords do not match, Please check and try again");
                return;
              }

              setPasswordError("");

              try {
                const result = await dispatch(signUpUser({
                  name,
                  email,
                  phoneNumber: phone,
                  password
                })).unwrap();

                if (result.success) {
                  setShowOtpModal(true);
                }
              } catch (error) {
                console.error('Sign up failed:', error);
                // The error is already handled by the Redux store and will be displayed
              }
            }}
          >
            {/* Name Field */}
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <div className="input-container">
                <User className="input-icon" size={18} />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (name.length === 0 && value === ' ') return;
                    setName(value);
                  }}
                  placeholder="Enter your full name"
                  className="form-input"
                  maxLength="20"
                  required
                  onInvalid={(e) => {
                    e.preventDefault();
                    setValidationErrors(prev => ({ ...prev, name: e.target.validationMessage }));
                  }}
                  onInput={() => setValidationErrors(prev => ({ ...prev, name: '' }))}
                />
              </div>
              {validationErrors.name && (
                <div
                  style={{ color: "red", fontSize: "14px", marginTop: "5px", cursor: "pointer" }}
                  onClick={() => document.getElementById("name").focus()}
                >
                  {validationErrors.name}
                </div>
              )}
            </div>

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
                  maxLength="30"
                  required
                  onInvalid={(e) => {
                    e.preventDefault();
                    setValidationErrors(prev => ({ ...prev, email: e.target.validationMessage }));
                  }}
                  onInput={() => setValidationErrors(prev => ({ ...prev, email: '' }))}
                />
              </div>
              {validationErrors.email && (
                <div
                  style={{ color: "red", fontSize: "14px", marginTop: "5px", cursor: "pointer" }}
                  onClick={() => document.getElementById("email").focus()}
                >
                  {validationErrors.email}
                </div>
              )}
            </div>

            {/* Phone Field */}
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number</label>
              <div className="input-container">
                <Phone className="input-icon" size={18} />
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Enter your phone number"
                  className="form-input"
                  minLength={10}
                  maxLength={10}
                  required
                  onInvalid={(e) => {
                    e.preventDefault();
                    setValidationErrors(prev => ({ ...prev, phone: e.target.validationMessage }));
                  }}
                  onInput={() => setValidationErrors(prev => ({ ...prev, phone: '' }))}
                />
              </div>
              {validationErrors.phone && (
                <div
                  style={{ color: "red", fontSize: "14px", marginTop: "5px", cursor: "pointer" }}
                  onClick={() => document.getElementById("phone").focus()}
                >
                  {validationErrors.phone}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-container">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
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
              {validationErrors.password && (
                <div
                  style={{ color: "red", fontSize: "14px", marginTop: "5px", cursor: "pointer" }}
                  onClick={() => document.getElementById("password").focus()}
                >
                  {validationErrors.password}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
              <div className="input-container">
                <Lock className="input-icon" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  placeholder="Confirm your password"
                  className="form-input"
                  maxLength="16"
                  required
                  onInvalid={(e) => {
                    e.preventDefault();
                    setValidationErrors(prev => ({ ...prev, confirmPassword: e.target.validationMessage }));
                  }}
                  onInput={() => setValidationErrors(prev => ({ ...prev, confirmPassword: '' }))}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="input-icon-eye">
                  {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <div
                  style={{ color: "red", fontSize: "14px", marginTop: "5px", cursor: "pointer" }}
                  onClick={() => document.getElementById("confirm-password").focus()}
                >
                  {validationErrors.confirmPassword}
                </div>
              )}
              {passwordError && (
                <div
                  style={{ color: "red", fontSize: "14px", marginTop: "5px", cursor: "pointer" }}
                  onClick={() => {
                    if (passwordError.includes("Password must be at least")) {
                      document.getElementById("password").focus();
                    } else if (passwordError.includes("Passwords do not match")) {
                      document.getElementById("confirm-password").focus();
                    }
                  }}
                >
                  {passwordError}
                </div>
              )}
              {error && (
                <div
                  style={{ color: "red", fontSize: "14px", marginTop: "5px", cursor: "pointer" }}
                  onClick={() => {
                    if (error.includes("name") || error.includes("Name")) {
                      document.getElementById("name").focus();
                    } else if (error.includes("email") || error.includes("Email")) {
                      document.getElementById("email").focus();
                    } else if (error.includes("phone") || error.includes("Phone")) {
                      document.getElementById("phone").focus();
                    } else if (error.includes("password") || error.includes("Password")) {
                      document.getElementById("password").focus();
                    }
                  }}
                >
                  {error}
                </div>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="form-options">
              <label className="checkbox-container" htmlFor="terms-agreement">
                <input
                  type="checkbox"
                  id="terms-agreement"
                  className="checkbox"
                  required
                  onInvalid={(e) => {
                    e.preventDefault();
                    setValidationErrors(prev => ({ ...prev, terms: e.target.validationMessage }));
                  }}
                  onChange={() => setValidationErrors(prev => ({ ...prev, terms: '' }))}
                />
                <span>I agree to the <button type="button" className="terms" onClick={() => setShowTermsModal(true)}>Terms & Conditions</button></span>
              </label>
              {validationErrors.terms && (
                <div
                  style={{ color: "red", fontSize: "14px", marginTop: "5px", cursor: "pointer" }}
                  onClick={() => document.getElementById("terms-agreement").focus()}
                >
                  {validationErrors.terms}
                </div>
              )}
            </div>

            {/* Sign Up Button */}
            <button type="submit" className="signin-button" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign up'}
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
              <FcGoogle size={18} /> Sign up with Google
            </button>
            <button className="social-button">
              <FaApple size={18} /> Sign up with Apple
            </button>
          </div>

          {/* Login Link */}
          <p className="signup-text">
            Already have a Wiznovy account?{" "}
            <Link to="/" className="signup-link">
              Sign in
            </Link>
          </p>
        </div>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          heading="Looks Like You Already Have an Account"
          subheading="Our system shows that this email is already in use. To access your account, please log in or reset your password if you can't remember it."
          buttonText="Sign-In"
          onButtonClick={() => navigate("/login")}
        />

        {showOtpModal && (
          <OtpModal
            email={email}
            onVerify={(otpValue, isValid) => {
              if (isValid) {
                setShowOtpModal(false);
                setShowWelcomeModal(true);
              } else {
                setShowOtpModal(false);
                setShowInvalidOtpModal(true);
              }
            }}
            onResend={() => {
              console.log("OTP resent");
            }}
            onClose={() => setShowOtpModal(false)}
          />
        )}

        <Modal
          isOpen={showWelcomeModal}
          onClose={() => setShowWelcomeModal(false)}
          image={wlcm}
          heading="Welcome aboard"
          subheading="Your email has been successfully verified. You're all set to get started!"
          buttonText="Continue"
          onButtonClick={() => {
            const progress = { 0: true, 1: false, 2: false, 3: false };
            localStorage.setItem('onboardingProgress', JSON.stringify(progress));
            localStorage.setItem('currentUser', JSON.stringify({ name, email, phone }));
            setShowWelcomeModal(false);
            navigate('/onboarding');
          }}
        />

        <Modal
          isOpen={showInvalidOtpModal}
          onClose={() => setShowInvalidOtpModal(false)}
          image={invalidotp}
          heading="Code you entered is invalid"
          subheading="Ensure you enter the exact digits as provided to successfully verify your identity and proceed."
          buttonText="Resend OTP"
          onButtonClick={() => {
            setShowInvalidOtpModal(false);
            setShowOtpModal(true);
          }}
        />

        {/* <Modal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        heading="Register Now – Get Matched With Clients"
      >
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div
            className="tabss"
            style={{
              flex: 1,
              textAlign: "center",
              cursor: "pointer",
              padding: "20px",
              border: "1px solid #C4DAD2",
              borderRadius: "8px",
            }}
            onClick={() => {
              setShowRegistrationModal(false);
              navigate("/onboarding");
            }}
          >
            <div className="usericon">
              <img src={usericon} alt="wiznovy" />
            </div>
            <h4>User</h4>
          </div>
          <div
            className="tabss"
            style={{
              flex: 1,
              textAlign: "center",
              cursor: "pointer",
              padding: "20px",
              border: "1px solid #C4DAD2",
              borderRadius: "8px",
            }}
            onClick={() => {
              setShowRegistrationModal(false);
              navigate("/");
            }}
          >
            <div className="usericon ">
              <img src={careericon} alt="wiznovy" />
            </div>
            <h4>Start Your Career</h4>
          </div>
        </div>
      </Modal> */}

        <TermsModal
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
        />


      </div>
    </div>
  );
}


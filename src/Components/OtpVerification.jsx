import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyOtpUser, clearError } from '../store/authSlice.js';

// eslint-disable-next-line react/prop-types
const OtpVerification = ({ email, onClose }) => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      alert('Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      const result = await dispatch(verifyOtpUser({ email, otp })).unwrap();
      if (result.success) {
        alert('Registration verified successfully!');
        onClose();
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replaceAll(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>
        
        <p className="text-gray-600 text-center mb-6">
          We've sent a 6-digit verification code to {email}
        </p>

        <form onSubmit={handleVerifyOtp}>
          <div className="mb-6">
            <label htmlFor="otp-input" className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP
            </label>
            <input
              id="otp-input"
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="000000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
              maxLength="6"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
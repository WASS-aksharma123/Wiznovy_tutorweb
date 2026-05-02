import { API_BASE_URL } from '../config/api.js';

export const registerUser = async (userData) => {
  try {
    const formData = new URLSearchParams();
    formData.append('name', userData.name);
    formData.append('phoneNumber', userData.phoneNumber);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    
    const response = await fetch(`${API_BASE_URL}/auth/tutor/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: data.message || 'Registration successful',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Registration failed',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const loginUser = async (userData) => {
  try {
    const formData = new URLSearchParams();
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    
    const response = await fetch(`${API_BASE_URL}/auth/tutor/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: data.message || 'Login successful',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Login failed',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const verifyRegistration = async (userData) => {
  try {
    const formData = new URLSearchParams();
    formData.append('email', userData.email);
    formData.append('otp', userData.otp);
    
    const response = await fetch(`${API_BASE_URL}/auth/tutor/verify-registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: data.message || 'Registration verified successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to verify registration',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const forgotPassword = async (email) => {
  try {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('role', 'TUTOR');
    
    const response = await fetch(`${API_BASE_URL}/auth/forgotPass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: data.message || 'OTP sent to email successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to send password reset email',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const verifyOtp = async ({ email, otp }) => {
  try {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('otp', otp);
    
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: data.message || 'OTP verified successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Invalid OTP',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const resetPassword = async ({ email, password }) => {
  try {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('newPassword', password);
    formData.append('role', 'TUTOR');
    
    const response = await fetch(`${API_BASE_URL}/auth/resetPass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: data.message || 'Password reset successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to reset password',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const resendOtp = async ({ email, name }) => {
  try {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('name', name);
    
    const response = await fetch(`${API_BASE_URL}/auth/tutor/resend-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: data.message || 'OTP sent successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to resend OTP',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};
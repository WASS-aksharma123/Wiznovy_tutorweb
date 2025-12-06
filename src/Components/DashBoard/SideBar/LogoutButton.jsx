import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../store/authSlice';
import { clearProfile } from '../../../store/profileSlice';
import { LogOut } from 'lucide-react';
import '../../../assets/Styles/DashBoard/LogoutButton.scss';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProfile());
    navigate('/');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
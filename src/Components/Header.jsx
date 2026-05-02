import React, { useState, useEffect, useRef } from "react";
import wizlogo from '../assets/Images/wiznovylogo.svg'
import { IoIosArrowDown } from "react-icons/io";
import "../assets/Styles/Header.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { PiWalletBold } from "react-icons/pi";
import { FaChalkboardTeacher, FaBriefcase, FaGraduationCap, FaUsers, FaCertificate, FaBookOpen, FaLaptopCode } from "react-icons/fa";
import { User, Edit, LogOut } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { getTutorProfile } from '../store/profileSlice.js';
import { fetchNotificationsAsync, fetchUnreadCountAsync } from '../store/notificationSlice.js';
import { fetchBalance } from '../store/walletSlice.js';
import { logout } from '../store/authSlice.js';
import { openProfileUpdate, openNewCourse, closeNewCourse, openCreateBook, closeCreateBook } from '../store/modalSlice.js';
import Notification from './Notification.jsx';
import NewCourse from './Course/NewCourse.jsx';
import CreateBook from './Book/CreateBook.jsx';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const { balance } = useSelector((state) => state.wallet);
  const { isNewCourseOpen, isCreateBookOpen } = useSelector((state) => state.modal);

  const isOnboarding = location.pathname === '/onboarding';
  const isPending = user?.status === 'PENDING' || profile?.status === 'PENDING';

  useEffect(() => {
    if (isAuthenticated) {
      // Batch initial data fetching
      const fetchInitialData = async () => {
        try {
          await Promise.allSettled([
            dispatch(getTutorProfile()),
            dispatch(fetchNotificationsAsync()),
            dispatch(fetchUnreadCountAsync()),
            dispatch(fetchBalance())
          ]);
        } catch (error) {
          console.error('Error fetching initial data:', error);
        }
      };
      
      fetchInitialData();
      
      // Set up periodic unread count refresh
      const unreadCountInterval = setInterval(() => {
        dispatch(fetchUnreadCountAsync());
      }, 30000); // Refresh every 30 seconds
      
      return () => clearInterval(unreadCountInterval);
    }
  }, [dispatch, isAuthenticated]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getUserInitials = () => {
    const name = profile?.tutorDetail?.name || user?.userDetail?.name || user?.name;
    return name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'TN';
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsUserDropdownOpen(false);
  };

  const handleEditProfile = () => {
    dispatch(openProfileUpdate());
    setIsUserDropdownOpen(false);
  };

  const handleMyProfile = () => {
    navigate('/dashboard');
    setIsUserDropdownOpen(false);
  };

  const handleMenuItemClick = (heading) => {
    const actions = {
      "My Listed Courses": () => navigate('/all-courses'),
      "Create New Course": () => dispatch(openNewCourse()),
      "My Books": () => navigate('/my-books'),
      "Create New Book": () => dispatch(openCreateBook()),
      "FAQ": () => navigate('/support'),
      "Contact Us": () => navigate('/contact'),
      "Today's Sessions": () => navigate('/my-sessions?tab=today'),
      "Upcoming Sessions": () => navigate('/my-sessions?tab=upcoming'),
      "Completed Sessions": () => navigate('/my-sessions?tab=completed'),
      "Cancelled Sessions": () => navigate('/my-sessions?tab=cancelled'),
      "All Sessions": () => navigate('/my-sessions?tab=all')
    };
    
    actions[heading]?.();
  };

  const menuItems = {
    "My Sessions": [
      { icon: <FaChalkboardTeacher />, heading: "Today's Sessions", subheading: "View today's scheduled classes" },
      { icon: <FaGraduationCap />, heading: "Upcoming Sessions", subheading: "Future tutoring appointments" },
      { icon: <FaBookOpen />, heading: "Completed Sessions", subheading: "Successfully finished classes" },
      { icon: <FaLaptopCode />, heading: "Cancelled Sessions", subheading: "Cancelled or missed sessions" },
      { icon: <FaCertificate />, heading: "All Sessions", subheading: "Complete session history" },
    ],
    "My Courses": [
      { icon: <FaChalkboardTeacher />, heading: "My Listed Courses", subheading: "Manage your course offerings" },
      { icon: <FaBriefcase />, heading: "Create New Course", subheading: "Design and publish courses" },
      { icon: <FaLaptopCode />, heading: "My Books", subheading: "Your published study materials" },
      { icon: <FaUsers />, heading: "Create New Book", subheading: "Author educational content" },
    ],
    "Resources": [
      { icon: <FaBookOpen />, heading: "FAQ", subheading: "Frequently asked questions" },
      { icon: <FaLaptopCode />, heading: "Contact Us", subheading: "Get help and support" },
      { icon: <FaCertificate />, heading: "Terms & Conditions", subheading: "Platform usage guidelines" },
      { icon: <FaChalkboardTeacher />, heading: "Privacy Policy", subheading: "Data protection information" },
    ]
  };

  const renderMenuItem = (item, hasClickHandler = false) => (
    <div 
      key={item.heading} 
      className="menu-item" 
      onClick={hasClickHandler ? () => handleMenuItemClick(item.heading) : undefined}
    >
      <div className="item-header">
        <span className="item-icon">{item.icon}</span>
        <span className="item-heading">{item.heading}</span>
      </div>
      <span className="item-subheading">{item.subheading}</span>
    </div>
  );

  const renderDropdownMenu = (title, items, hasClickHandler = false) => (
    <li className="dropdown-item">
      <p className="linksss">{title} <IoIosArrowDown /></p>
      <div className="dropdown-menu">
        <div className="menu-grid">
          {items.map(item => renderMenuItem(item, hasClickHandler))}
        </div>
      </div>
    </li>
  );

  return (
    <div className="header">
      <div className="container">
        <button
          type="button"
          className="Logo_section"
          onClick={() => !isOnboarding && navigate("/")}
          style={{ 
            background: "none", 
            border: "none", 
            cursor: isOnboarding ? "default" : "pointer", 
            padding: 0,
            opacity: isOnboarding ? 0.6 : 1
          }}
          disabled={isOnboarding}
        >
          <img src={wizlogo} alt="Wiznovy" />
        </button>

        <div className="menu_section">
          <ul className={isMenuOpen ? "menu-open" : "menu-close"}>
            <ImCross
              className="hamburger"
              style={{ color: "white", width: "1rem", height: "1rem" }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            {isAuthenticated && (
              <li className="mobile-notification">
                <Notification />
              </li>
            )}
            {isAuthenticated && renderDropdownMenu("My Sessions", menuItems["My Sessions"], true)}
            {isAuthenticated && renderDropdownMenu("My Courses", menuItems["My Courses"], true)}
            {renderDropdownMenu("Resources", menuItems["Resources"], true)}
          </ul>
        </div>

        {isAuthenticated ? (
          <div className="Sign_btns">
            <div className="desktop-notification">
              <Notification />
            </div>
            {!isOnboarding && !isPending && (
              <Link to="/wallet">
                <button style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <PiWalletBold />| $ {balance || '0.00'}
                </button>
              </Link>
            )}
            {!isOnboarding && !isPending && (
              <div className="user-dropdown-container" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <HiOutlineUserCircle /> {getUserInitials()}
                </button>
                
                {isUserDropdownOpen && (
                  <div className="user-dropdown">
                    <div className="dropdown-item" onClick={handleMyProfile}>
                      <User size={16} />
                      <span>My Dashboard</span>
                    </div>
                    <div className="dropdown-item" onClick={handleEditProfile}>
                      <Edit size={16} />
                      <span>Edit Profile</span>
                    </div>
                    <div className="dropdown-item logout" onClick={handleLogout}>
                      <LogOut size={16} />
                      <span>Logout</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            {(isOnboarding || isPending) && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.9rem", color: "#666" }}>
                  {isOnboarding ? "Completing Setup..." : "Account Pending..."}
                </span>
                <button
                  style={{ display: "flex", alignItems: "center", gap: "0.3rem", cursor: "default", opacity: "0.7" }}
                  disabled
                >
                  <HiOutlineUserCircle /> {getUserInitials()}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="Sign_btns">
            <Link to="/">
              <button>Sign In</button>
            </Link>
            <Link to="/signup">
              <button>Sign up</button>
            </Link>
          </div>
        )}
        
        {!isMenuOpen && (
          <button
            type="button"
            className="hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <RxHamburgerMenu style={{ width: "1.7rem", height: "1.7rem" }} />
          </button>
        )}
      </div>
      
      <NewCourse 
        isOpen={isNewCourseOpen} 
        onClose={() => dispatch(closeNewCourse())} 
      />
      <CreateBook 
        isOpen={isCreateBookOpen} 
        onClose={() => dispatch(closeCreateBook())} 
      />
    </div>
  );
};

export default Header;
import React, { useState, useEffect } from "react";
import wizlogo from '../assets/Images/wiznovylogo.svg'
import { IoIosArrowDown } from "react-icons/io";
import "../assets/Styles/Header.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { PiWalletBold } from "react-icons/pi";
import { FaChalkboardTeacher, FaBriefcase, FaStore, FaGraduationCap, FaUsers, FaCertificate, FaBookOpen, FaLaptopCode, FaRocket } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { getTutorProfile } from '../store/profileSlice.js';
import { fetchNotificationsAsync } from '../store/notificationSlice.js';
import Notification from './Notification.jsx';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  const isOnboarding = location.pathname === '/onboarding';
  const isPending = user?.status === 'PENDING' || profile?.status === 'PENDING';

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getTutorProfile());
      dispatch(fetchNotificationsAsync());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (user) {
      dispatch(getTutorProfile());
    }
  }, [user, dispatch]);



  const getUserInitials = () => {
    if (profile?.tutorDetail?.name) {
      return profile.tutorDetail.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    }
    if (user?.userDetail?.name) {
      return user.userDetail.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    }
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    }
    return 'TN';
  };

  const menuItems = {
    "Find a tutor": [
      { icon: <FaChalkboardTeacher />, heading: "Math Tutors", subheading: "Expert math guidance" },
      { icon: <FaGraduationCap />, heading: "Science Tutors", subheading: "Physics, Chemistry, Biology" },
      { icon: <FaBookOpen />, heading: "Language Tutors", subheading: "Learn new languages" },
      { icon: <FaLaptopCode />, heading: "Programming", subheading: "Code with experts" },
      { icon: <FaCertificate />, heading: "Test Prep", subheading: "SAT, GRE, GMAT prep" },
      { icon: <FaUsers />, heading: "Group Classes", subheading: "Learn with peers" },
      { icon: <FaRocket />, heading: "Advanced Topics", subheading: "Specialized subjects" },
      { icon: <FaStore />, heading: "All Subjects", subheading: "Browse all categories" },
      { icon: <FaBriefcase />, heading: "Professional", subheading: "Career development" }
    ],
    "Find work": [
      { icon: <FaChalkboardTeacher />, heading: "Become Tutor", subheading: "Start teaching today" },
      { icon: <FaBriefcase />, heading: "Freelance Jobs", subheading: "Find project work" },
      { icon: <FaLaptopCode />, heading: "Tech Jobs", subheading: "Programming roles" },
      { icon: <FaUsers />, heading: "Part-time", subheading: "Flexible schedules" },
      { icon: <FaCertificate />, heading: "Certified Roles", subheading: "Professional positions" },
      { icon: <FaGraduationCap />, heading: "Academic Jobs", subheading: "University positions" },
      { icon: <FaBookOpen />, heading: "Content Writing", subheading: "Educational content" },
      { icon: <FaRocket />, heading: "Remote Work", subheading: "Work from anywhere" },
      { icon: <FaStore />, heading: "All Opportunities", subheading: "Browse all jobs" }
    ],
    "Market place": [
      { icon: <FaBookOpen />, heading: "Course Materials", subheading: "Study resources" },
      { icon: <FaLaptopCode />, heading: "Software Tools", subheading: "Learning applications" },
      { icon: <FaCertificate />, heading: "Certificates", subheading: "Skill certifications" },
      { icon: <FaChalkboardTeacher />, heading: "Live Sessions", subheading: "Interactive classes" },
      { icon: <FaUsers />, heading: "Study Groups", subheading: "Collaborative learning" },
      { icon: <FaGraduationCap />, heading: "Degree Programs", subheading: "Full courses" },
      { icon: <FaBriefcase />, heading: "Career Services", subheading: "Professional guidance" },
      { icon: <FaRocket />, heading: "Premium Content", subheading: "Exclusive materials" },
      { icon: <FaStore />, heading: "All Products", subheading: "Browse marketplace" }
    ]
  };



  return (
    <div className="header">
      <div className="container">
        <button
          type="button"
          className="Logo_section"
          onClick={() => navigate("/")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <img src={wizlogo} alt="Wiznovy" />
        </button>

        <div className="menu_section">
          <ul className={isMenuOpen ? "menu-open" : "menu-close"}>
            <ImCross
              className="hamburger"
              style={{ color: "white", width: "1rem", height: "1rem" }}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            />
            {isAuthenticated && (
              <li className="mobile-notification">
                <Notification />
              </li>
            )}
            <li className="dropdown-item">
              <p className="linksss">What's New <IoIosArrowDown /></p>
              <div className="dropdown-menu">
                <div className="menu-grid">
                  {menuItems["Find a tutor"].map((item) => (
                    <div key={item.heading} className="menu-item">
                      <div className="item-header">
                        <span className="item-icon">{item.icon}</span>
                        <span className="item-heading">{item.heading}</span>
                      </div>
                      <span className="item-subheading">{item.subheading}</span>
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li className="dropdown-item">
              <p className="linksss">Find Work <IoIosArrowDown /></p>
              <div className="dropdown-menu">
                <div className="menu-grid">
                  {menuItems["Find work"].map((item) => (
                    <div key={item.heading} className="menu-item">
                      <div className="item-header">
                        <span className="item-icon">{item.icon}</span>
                        <span className="item-heading">{item.heading}</span>
                      </div>
                      <span className="item-subheading">{item.subheading}</span>
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li className="dropdown-item">
              <p className="linksss">Market Place <IoIosArrowDown /></p>
              <div className="dropdown-menu">
                <div className="menu-grid">
                  {menuItems["Market place"].map((item) => (
                    <div key={item.heading} className="menu-item">
                      <div className="item-header">
                        <span className="item-icon">{item.icon}</span>
                        <span className="item-heading">{item.heading}</span>
                      </div>
                      <span className="item-subheading">{item.subheading}</span>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </div>



        {isAuthenticated ? (
          <div className="Sign_btns">
            <div className="desktop-notification">
              <Notification />
            </div>
            {!isOnboarding && !isPending && (
              <Link to="/wallet">
                <button
                  style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <PiWalletBold />| $00
                </button>
              </Link>
            )}
            {!isOnboarding && !isPending && (
              <Link to="/dashboard">
                <button
                  style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
                >
                  <HiOutlineUserCircle /> {getUserInitials()}
                </button>
              </Link>
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
        {isMenuOpen ? null : (
          <button
            type="button"
            className="hamburger"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <RxHamburgerMenu style={{ width: "1.7rem", height: "1.7rem" }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

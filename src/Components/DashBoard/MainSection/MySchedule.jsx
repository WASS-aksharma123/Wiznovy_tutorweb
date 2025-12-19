import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchTutorSessions, clearSessions } from "../../../store/scheduleSlice";
import "../../../assets/Styles/DashBoard/MySchedule.scss";
import { GoSidebarCollapse } from "react-icons/go";

const MySchedule = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const { sessions, loading, error } = useSelector((state) => state.schedule);

  const [activeTab, setActiveTab] = useState("today");
  const [selectedDate, setSelectedDate] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (selectedDate && (activeTab === "upcoming" || activeTab === "past")) {
      dispatch(fetchTutorSessions({ date: selectedDate }));
      setHasSearched(true);
    }
  }, [selectedDate]);

  useEffect(() => {
    const today = new Date();
    setSelectedDay(today.getDate());
    dispatch(fetchTutorSessions({ date: formatDate(today) }));
    setHasSearched(true);
  }, [dispatch]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedDate("");
    dispatch(clearSessions());
    setHasSearched(false);

    if (tab === "today") {
      const today = new Date();
      setSelectedDay(today.getDate());
      dispatch(fetchTutorSessions({ date: formatDate(today) }));
      setHasSearched(true);
    } else if (tab === "all") {
      setSelectedDay(null);
      dispatch(fetchTutorSessions({}));
      setHasSearched(true);
    } else {
      setSelectedDay(null);
    }
  };

  const renderSessionCard = (session) => {
    if (activeTab === 'all') {
      console.log('Session object:', session);
    }
    
    const sessionDate = session.date || session.sessionDate || session.createdAt || session.scheduledDate;
    
    return (
      <div key={session.id} className="event-item live">
        <div className="event-info">
          <h4>{session.user?.userDetail?.name || "Unknown User"}</h4>
          {activeTab === 'all' && sessionDate && (
            <p><strong>Date: {new Date(sessionDate).toLocaleDateString()}</strong></p>
          )}
          <p>
            {session.startTime} - {session.endTime} ({session.duration} min)
          </p>
          <p>Status: {session.status}</p>
          <p>Amount: ${session.amount}</p>
          {session.notes && <p>Notes: {session.notes}</p>}
        </div>
        <span className="event-dot live"></span>
      </div>
    );
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDay(null);
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    const formattedDate = formatDate(clickedDate);
    
    if (formatDate(clickedDate) === formatDate(today)) {
      setActiveTab('today');
    } else if (clickedDate > today) {
      setActiveTab('upcoming');
    } else {
      setActiveTab('past');
    }
    
    setSelectedDate(formattedDate);
    setSelectedDay(day);
    dispatch(fetchTutorSessions({ date: formattedDate }));
    setHasSearched(true);
    
    if (window.innerWidth <= 1024) {
      const scheduleSection = document.querySelector('.mySchedule');
      if (scheduleSection) {
        scheduleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const renderCalendarDates = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const dates = [];

    for (let i = 0; i < firstDay; i++) {
      dates.push(<span key={`empty-${i}`} className="empty"></span>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(
        <button 
          key={day} 
          className="date clickable" 
          onClick={() => handleDateClick(day)}
          style={{
            backgroundColor: selectedDay === day ? '#F2FFFA' : 'transparent',
            color: selectedDay === day ? '#113D38' : 'inherit',
            fontWeight: selectedDay === day ? '600' : 'normal',
            border: selectedDay === day ? '1px solid #113D38' : '1px solid transparent',
          }}
        >
          {day}
        </button>
      );
    }

    return dates;
  };

  return (
    <div className="mySchedule">
      <div className="schedule-card">
        {/* Left Side */}
        <div className="left-section">
          <button className="collapse" onClick={toggleSidebar}>
            <GoSidebarCollapse style={{ width: "1.8rem", height: "1.8rem" }} />
          </button>

          <h2>My Schedule</h2>

          {/* Tabs */}
          <div className="schedule-tabs">
            {['all', 'today', 'upcoming', 'past'].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Date Selection */}
          {selectedDate && (
            <div className="selected-date">
              Selected: {new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric"
              })}
            </div>
          )}
          

          {/* Session List */}
          <div className="events-list">
            {loading && <div className="loading">Loading sessions...</div>}
            {error && <div className="error">Error: {error}</div>}

            {!loading && !error && hasSearched && sessions?.length === 0 && (
              <div className="no-sessions">No sessions found.</div>
            )}

            {sessions?.length > 0 && sessions.map(renderSessionCard)}
          </div>
        </div>

        {/* Right Side - Calendar */}
        <div className="right-section">
          <h2>Live Calendar View</h2>
          <div className="calendar-container">
            <div className="calendar-header">
              <span>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <div className="calendar-nav">
                <button className="arrow" onClick={() => navigateMonth(-1)}>‹</button>
                <button className="arrow" onClick={() => navigateMonth(1)}>›</button>
              </div>
            </div>

            <div className="calendar">
              <div className="days">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              <div className="dates">{renderCalendarDates()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MySchedule.propTypes = {
  toggleSidebar: PropTypes.func.isRequired
};

export default MySchedule;

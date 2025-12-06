import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTutorSessions, clearSessions } from '../store/scheduleSlice.js';
import '../assets/Styles/Schedule.scss';

const Schedule = () => {
  const dispatch = useDispatch();
  const { sessions, loading, error } = useSelector((state) => state.schedule);
  const [activeTab, setActiveTab] = useState('today');
  const [selectedDate, setSelectedDate] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getDateOptions = (type) => {
    const dates = [];
    const today = new Date();
    
    if (type === 'upcoming') {
      for (let i = 1; i <= 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push({
          value: formatDate(date),
          label: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
        });
      }
    } else if (type === 'past') {
      for (let i = 1; i <= 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push({
          value: formatDate(date),
          label: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
        });
      }
    }
    return dates;
  };

  useEffect(() => {
    if (selectedDate && (activeTab === 'upcoming' || activeTab === 'past')) {
      dispatch(fetchTutorSessions({ date: selectedDate }));
      setHasSearched(true);
    }
  }, [selectedDate, dispatch]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedDate('');
    dispatch(clearSessions());
    setHasSearched(false);
    if (tab === 'today') {
      const today = new Date();
      dispatch(fetchTutorSessions({ date: formatDate(today) }));
      setHasSearched(true);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const renderSessionCard = (session) => (
    <div key={session.id} className="session-card">
      <div className="session-info">
        <h4>{session.user?.userDetail?.name || 'Unknown User'}</h4>
        <p>Time: {session.startTime} - {session.endTime}</p>
        <p>Duration: {session.duration} minutes</p>
        <p>Amount: ${session.amount}</p>
        <p>Status: {session.status}</p>
        {session.notes && <p>Notes: {session.notes}</p>}
      </div>
    </div>
  );

  return (
    <div className="schedule-container">
      <h1>My Schedule</h1>
      <div className="schedule-tabs">
        <button 
          className={`tab-button ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => handleTabChange('today')}
        >
          Today
        </button>
        <button 
          className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => handleTabChange('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
          onClick={() => handleTabChange('past')}
        >
          Past
        </button>
      </div>

      {(activeTab === 'upcoming' || activeTab === 'past') && (
        <div className="date-selector">
          <select 
            value={selectedDate} 
            onChange={(e) => handleDateChange(e.target.value)}
          >
            <option value="">Select a date</option>
            {getDateOptions(activeTab).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="sessions-content">
        {loading && <div className="loading">Loading sessions...</div>}
        {error && <div className="error">Error: {error}</div>}
        {!loading && !error && Array.isArray(sessions) && sessions.length === 0 && hasSearched && (
          <div className="no-sessions">No sessions found for this date.</div>
        )}
        {!loading && !error && Array.isArray(sessions) && sessions.length > 0 && (
          <div className="sessions-list">
            {sessions.map(renderSessionCard)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;

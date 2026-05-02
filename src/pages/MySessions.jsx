import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchTutorSessions, clearSessions } from '../store/scheduleSlice.js';
import { cancelSession } from '../services/sessionService.js';
import RescheduleModal from '../Components/Modals/RescheduleModal.jsx';
import SuccessModal from '../Components/Modals/SuccessModal.jsx';
import ConfirmModal from '../Components/Modals/ConfirmModal.jsx';
import '../assets/Styles/Pages/MySessions.scss';
import Loader from '../Components/Loader.jsx';

const MySessions = () => {
  const dispatch = useDispatch();
  const { sessions, loading, error, total } = useSelector((state) => state.schedule);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [modalType, setModalType] = useState('success');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [sessionToCancel, setSessionToCancel] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  
  // Get tab from URL params or default to 'today'
  const getInitialTab = () => {
    const tabParam = searchParams.get('tab');
    const validTabs = ['all', 'today', 'upcoming', 'completed', 'cancelled', 'past'];
    return validTabs.includes(tabParam) ? tabParam : 'today';
  };
  
  const [activeTab, setActiveTab] = useState(getInitialTab());
  
  const sessionsPerPage = 9;

  const tabs = [
    { key: 'all', label: 'All Sessions' },
    { key: 'today', label: "Today's Sessions" },
    { key: 'upcoming', label: 'Upcoming Sessions' },
    { key: 'completed', label: 'Completed Sessions' },
    { key: 'cancelled', label: 'Cancelled Sessions' },
    { key: 'past', label: 'Past Sessions' }
  ];

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getDateForTab = (tab) => {
    const today = new Date();
    switch (tab) {
      case 'today':
        return formatDate(today);
      case 'upcoming':
        return null; // Will fetch future sessions
      case 'past':
        return null; // Will fetch past sessions
      default:
        return null;
    }
  };

  const fetchSessionsForTab = (tab, page = 1) => {
    const offset = (page - 1) * sessionsPerPage;
    const date = getDateForTab(tab);
    
    let params = {
      limit: sessionsPerPage,
      offset: offset
    };

    if (date) {
      params.date = date;
    }

    // Add status filter based on tab
    switch (tab) {
      case 'completed':
        params.status = 'COMPLETED';
        break;
      case 'cancelled':
        params.status = 'CANCELLED';
        break;
      case 'upcoming':
        params.upcoming = true;
        break;
      case 'past':
        params.past = true;
        break;
      default:
        break;
    }

    dispatch(fetchTutorSessions(params));
    setHasSearched(true);
  };

  // Update tab when URL params change
  useEffect(() => {
    const newTab = getInitialTab();
    if (newTab !== activeTab) {
      setActiveTab(newTab);
      setCurrentPage(1);
      dispatch(clearSessions());
      setHasSearched(false);
      fetchSessionsForTab(newTab, 1);
    }
  }, [searchParams]);

  useEffect(() => {
    // Load initial tab (Today's Sessions by default or from URL)
    fetchSessionsForTab(activeTab, 1);
  }, [dispatch]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    dispatch(clearSessions());
    setHasSearched(false);
    
    // Update URL params
    setSearchParams({ tab });
    
    fetchSessionsForTab(tab, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchSessionsForTab(activeTab, page);
  };

  const filteredSessions = useMemo(() => {
    if (!Array.isArray(sessions)) return [];
    
    const today = new Date();
    const todayStr = formatDate(today);
    
    switch (activeTab) {
      case 'all':
        return sessions;
      case 'today':
        return sessions.filter(session => {
          const sessionDate = session.sessionDate;
          return sessionDate === todayStr;
        });
      case 'upcoming':
        return sessions.filter(session => {
          const sessionDate = new Date(session.sessionDate + 'T00:00:00');
          return sessionDate > today && session.status !== 'CANCELLED';
        });
      case 'completed':
        return sessions.filter(session => session.status === 'COMPLETED');
      case 'cancelled':
        return sessions.filter(session => session.status === 'CANCELLED');
      case 'past':
        return sessions.filter(session => {
          const sessionDate = new Date(session.sessionDate + 'T00:00:00');
          return sessionDate < today;
        });
      default:
        return sessions;
    }
  }, [sessions, activeTab]);

  const totalPages = Math.ceil((total || filteredSessions.length) / sessionsPerPage);

  const handleRescheduleSession = (session) => {
    setSelectedSession(session);
    setShowRescheduleModal(true);
  };

  const handleCancelSession = async (sessionId) => {
    setSessionToCancel(sessionId);
    setShowConfirmModal(true);
  };

  const confirmCancelSession = async () => {
    if (!sessionToCancel) return;

    setCancelLoading(true);
    try {
      const response = await cancelSession(sessionToCancel);
      if (response.success) {
        setSuccessMessage('Session cancelled successfully!');
        setModalType('success');
        setShowSuccessModal(true);
        setShowConfirmModal(false);
        // Refresh sessions
        fetchSessionsForTab(activeTab, currentPage);
      } else {
        setSuccessMessage(response.message || 'Failed to cancel session');
        setModalType('error');
        setShowSuccessModal(true);
        setShowConfirmModal(false);
      }
    } catch (error) {
      setSuccessMessage('Error cancelling session');
      setModalType('error');
      setShowSuccessModal(true);
      setShowConfirmModal(false);
    } finally {
      setCancelLoading(false);
      setSessionToCancel(null);
    }
  };

  const handleRescheduleSuccess = () => {
    // Refresh sessions after successful reschedule
    fetchSessionsForTab(activeTab, currentPage);
  };

  const canModifySession = (session) => {
    // Only allow modification for scheduled sessions
    return session.status === 'SCHEDULED';
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'completed';
      case 'cancelled':
        return 'cancelled';
      case 'ongoing':
        return 'ongoing';
      default:
        return 'upcoming';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    try {
      return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return timeString;
    }
  };

  const formatDate2 = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      // Handle date-only strings (YYYY-MM-DD format)
      const date = new Date(dateString + 'T00:00:00');
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const renderSessionCard = (session) => (
    <div key={session.id} className="session-card">
      <div className={`session-status ${getStatusClass(session.status)}`}>
        {session.status || 'Scheduled'}
      </div>
      
      <div className="session-header">
        <h4>{session.user?.userDetail?.name || session.studentName || 'Unknown Student'}</h4>
        <div className="session-subject">
          {session.subject?.name || session.subjectName || 'General Session'}
        </div>
      </div>

      <div className="session-details">
        <div className="detail-row">
          <span className="label">Date:</span>
          <span className="value">{formatDate2(session.sessionDate)}</span>
        </div>
        
        <div className="detail-row">
          <span className="label">Time:</span>
          <span className="value">
            {formatTime(session.startTime)} - {formatTime(session.endTime)}
          </span>
        </div>
        
        <div className="detail-row">
          <span className="label">Duration:</span>
          <span className="value">{session.duration || 60} minutes</span>
        </div>
        
        <div className="detail-row amount">
          <span className="label">Amount:</span>
          <span className="value">${session.amount || '0.00'}</span>
        </div>

        {session.notes && (
          <div className="session-notes">
            <div className="label">Notes:</div>
            <div className="notes-text">{session.notes}</div>
          </div>
        )}
      </div>

      {canModifySession(session) && (
        <div className="session-actions">
          <button 
            className="action-btn reschedule-btn"
            onClick={() => handleRescheduleSession(session)}
          >
            Reschedule Session
          </button>
          <button 
            className="action-btn cancel-btn"
            onClick={() => handleCancelSession(session.id)}
          >
            Cancel Session
          </button>
        </div>
      )}
    </div>
  );

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        <div className="page-numbers">
          {startPage > 1 && (
            <>
              <button className="pagination-button" onClick={() => handlePageChange(1)}>
                1
              </button>
              {startPage > 2 && <span>...</span>}
            </>
          )}
          
          {pages}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span>...</span>}
              <button className="pagination-button" onClick={() => handlePageChange(totalPages)}>
                {totalPages}
              </button>
            </>
          )}
        </div>
        
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        
        <div className="pagination-info">
          Showing {((currentPage - 1) * sessionsPerPage) + 1} to {Math.min(currentPage * sessionsPerPage, total || filteredSessions.length)} of {total || filteredSessions.length} sessions
        </div>
      </div>
    );
  };

  if (loading && !hasSearched) {
    return <Loader fullScreen text="Loading sessions..." />;
  }

  return (
    <div className="my-sessions-container">
      <div className="page-header">
        {/* <h1>My Sessions</h1> */}
        <p>Manage and view all your tutoring sessions</p>
      </div>

      <div className="sessions-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => handleTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="sessions-content">
        {loading && hasSearched && (
          <div className="loading">
            <Loader text="Loading sessions..." />
          </div>
        )}
        
        {error && (
          <div className="error">
            Error loading sessions: {error}
          </div>
        )}
        
        {!loading && !error && filteredSessions.length === 0 && hasSearched && (
          <div className="no-sessions">
            No sessions found for {tabs.find(t => t.key === activeTab)?.label.toLowerCase()}.
          </div>
        )}
        
        {!loading && !error && filteredSessions.length > 0 && (
          <>
            <div className="sessions-grid">
              {filteredSessions.map(renderSessionCard)}
            </div>
            {renderPagination()}
          </>
        )}
      </div>
      
      <RescheduleModal
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        session={selectedSession}
        onRescheduleSuccess={handleRescheduleSuccess}
      />
      
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={modalType === 'success' ? 'Success!' : 'Error'}
        message={successMessage}
        type={modalType}
      />
      
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setSessionToCancel(null);
        }}
        onConfirm={confirmCancelSession}
        title="Cancel Session"
        message="Are you sure you want to cancel this session? This action cannot be undone."
        confirmText="Yes, Cancel Session"
        cancelText="Keep Session"
        loading={cancelLoading}
      />
    </div>
  );
};

export default MySessions;
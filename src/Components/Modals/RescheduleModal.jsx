import React, { useState, useEffect } from 'react';
import { FaTimes, FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa';
import { getTutorAvailability } from '../../services/availabilityService';
import { rescheduleSession } from '../../services/sessionService';
import SuccessModal from './SuccessModal';
import '../../assets/Styles/Components/RescheduleModal.scss';

const RescheduleModal = ({ isOpen, onClose, session, onRescheduleSuccess }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rescheduleLoading, setRescheduleLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success');

  useEffect(() => {
    if (isOpen) {
      fetchAvailability();
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedDate && availability.length > 0) {
      generateAvailableSlots();
    }
  }, [selectedDate, availability]);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const response = await getTutorAvailability();
      if (response.success) {
        setAvailability(response.data.result || []);
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAvailableSlots = () => {
    if (!selectedDate) return;

    const selectedDateObj = new Date(selectedDate);
    const dayOfWeek = selectedDateObj.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    
    const dayAvailability = availability.find(avail => avail.dayOfWeek === dayOfWeek && avail.status === 'ACTIVE');
    
    if (!dayAvailability) {
      setAvailableSlots([]);
      return;
    }

    const slots = [];
    const startTime = new Date(`2000-01-01T${dayAvailability.startTime}`);
    const endTime = new Date(`2000-01-01T${dayAvailability.endTime}`);
    
    // Generate 1-hour slots
    const current = new Date(startTime);
    while (current < endTime) {
      const slotStart = new Date(current);
      const slotEnd = new Date(current.getTime() + 60 * 60 * 1000); // Add 1 hour
      
      if (slotEnd <= endTime) {
        slots.push({
          startTime: slotStart.toTimeString().slice(0, 5),
          endTime: slotEnd.toTimeString().slice(0, 5),
          displayStart: slotStart.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
          displayEnd: slotEnd.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
        });
      }
      
      current.setTime(current.getTime() + 60 * 60 * 1000); // Move to next hour
    }
    
    setAvailableSlots(slots);
  };

  const handleDateSelect = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date >= today) {
      setSelectedDate(date.toISOString().split('T')[0]);
      setSelectedSlot(null);
    }
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleReschedule = async () => {
    if (!selectedDate || !selectedSlot || !session) return;

    // Validate sessionId
    if (!session.id) {
      alert('Session ID is missing');
      return;
    }

    console.log('Rescheduling session:', {
      sessionId: session.id,
      sessionIdType: typeof session.id,
      rescheduleData: {
        newSessionDate: selectedDate,
        newStartTime: selectedSlot.startTime,
        newEndTime: selectedSlot.endTime
      }
    });

    setRescheduleLoading(true);
    try {
      const rescheduleData = {
        newSessionDate: selectedDate,
        newStartTime: selectedSlot.startTime,
        newEndTime: selectedSlot.endTime
      };

      // Ensure sessionId is a string
      const sessionId = String(session.id).trim();
      const response = await rescheduleSession(sessionId, rescheduleData);
      
      if (response.success) {
        onRescheduleSuccess();
        onClose();
        setModalMessage('Your session has been successfully rescheduled to the new date and time.');
        setModalType('success');
        setShowSuccessModal(true);
      } else {
        console.error('Reschedule failed:', response);
        setModalMessage(response.message || 'Failed to reschedule session');
        setModalType('error');
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Reschedule error:', error);
      setModalMessage('Error rescheduling session');
      setModalType('error');
      setShowSuccessModal(true);
    } finally {
      setRescheduleLoading(false);
    }
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      const isSelected = selectedDate === dateStr;
      const isPast = date < today;
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
      const hasAvailability = availability.some(avail => avail.dayOfWeek === dayOfWeek && avail.status === 'ACTIVE');

      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${isPast ? 'past' : ''} ${hasAvailability ? 'available' : 'unavailable'}`}
          onClick={() => !isPast && hasAvailability && handleDateSelect(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  if (!isOpen) return null;

  return (
    <div className="reschedule-modal-overlay">
      <div className="reschedule-modal">
        <div className="modal-header">
          <h2>Reschedule Session</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-content">
          {/* Session Details */}
          <div className="session-info">
            <h3>Current Session Details</h3>
            <div className="session-details">
              <div className="detail-item">
                <FaUser className="icon" />
                <span>{session?.user?.userDetail?.name || 'Unknown Student'}</span>
              </div>
              <div className="detail-item">
                <FaCalendarAlt className="icon" />
                <span>{session?.sessionDate}</span>
              </div>
              <div className="detail-item">
                <FaClock className="icon" />
                <span>{session?.startTime} - {session?.endTime}</span>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="calendar-section">
            <h3>Select New Date</h3>
            <div className="calendar-container">
              <div className="calendar-header">
                <button onClick={() => navigateMonth(-1)}>&lt;</button>
                <span>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                <button onClick={() => navigateMonth(1)}>&gt;</button>
              </div>
              
              <div className="calendar-weekdays">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              
              <div className="calendar-days">
                {renderCalendar()}
              </div>
            </div>
          </div>

          {/* Available Slots */}
          {selectedDate && (
            <div className="slots-section">
              <h3>Available Time Slots for {new Date(selectedDate).toLocaleDateString()}</h3>
              {loading ? (
                <div className="loading">Loading slots...</div>
              ) : availableSlots.length > 0 ? (
                <div className="slots-grid">
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
                      onClick={() => handleSlotSelect(slot)}
                    >
                      {slot.displayStart} - {slot.displayEnd}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="no-slots">No available slots for this date</div>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="reschedule-btn"
            onClick={handleReschedule}
            disabled={!selectedDate || !selectedSlot || rescheduleLoading}
          >
            {rescheduleLoading ? 'Rescheduling...' : 'Reschedule Session'}
          </button>
        </div>
      </div>
      
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={modalType === 'success' ? 'Session Rescheduled!' : 'Error'}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
};

export default RescheduleModal;
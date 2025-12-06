import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { X, Upload, User, Mail, Phone, Users, Globe, DollarSign, BookOpen, MapPin, FileText, Clock, Languages } from "lucide-react";
import "../assets/Styles/ProfileUpdate.scss";
import { API_BASE_URL } from '../config/api';
import { createAvailability } from '../store/availabilitySlice';
import { subjectsService } from '../services/subjectsService';

// Reusable function to update tutor details
export const updateTutorDetails = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/tutor-details/update`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to update tutor details');
  } catch (error) {
    console.error('Error updating tutor details:', error);
    throw error;
  }
};

// eslint-disable-next-line react/prop-types
const ProfileUpdate = ({ isOpen, onClose, userData, onUpdate }) => {
  const dispatch = useDispatch();
  const { loading: availabilityLoading } = useSelector(state => state.availability);
  const [subjects, setSubjects] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [countries, setCountries] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    profileImage: null,
    name: "",
    email: "",
    phone: "",
    bio: "",
    qualifications: "",
    hourlyRate: "",
    subjects: "",
    subjectId: "",
    address: "",
    country: "",
    countryId: "",
    state: "",
    stateId: "",
    city: "",
    pincode: "",
    documents: null,
    documentPath: "",
    availableDays: [],
    preferredLanguage: "",
    languageId: "",
    qualificationId: ""
  });

  const [timeSlotPopup, setTimeSlotPopup] = useState({
    isOpen: false,
    selectedDay: '',
    fromTime: '09:00',
    toTime: '17:00'
  });

  const [viewPopup, setViewPopup] = useState({
    isOpen: false,
    selectedDay: '',
    availability: null
  });

  const [availabilityData, setAvailabilityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResponse, subjectsResponse, languagesResponse, countriesResponse, qualificationsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/account/tutor/profile`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          }),
          subjectsService.getAllSubjects(),
          fetch(`${API_BASE_URL}/languages/all?limit=50&offset=0`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          }),
          fetch(`${API_BASE_URL}/country/all`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          }),
          fetch(`${API_BASE_URL}/qualification/all?limit=50&offset=0`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          })
        ]);
        
        // First set the arrays
        const subjectsData = subjectsResponse.result || [];
        setSubjects(subjectsData);
        
        let languagesData = [];
        if (languagesResponse.ok) {
          const langData = await languagesResponse.json();
          languagesData = langData.result || [];
          setLanguages(languagesData);
        }
        
        let countriesData = [];
        if (countriesResponse.ok) {
          const countryData = await countriesResponse.json();
          countriesData = countryData.result || [];
          setCountries(countriesData);
        }
        
        let qualificationsData = [];
        if (qualificationsResponse.ok) {
          const qualData = await qualificationsResponse.json();
          qualificationsData = qualData.result || [];
          setQualifications(qualificationsData);
        }
        
        // Now process profile data with populated arrays
        if (profileResponse.ok) {
          const data = await profileResponse.json();
          const profileImageUrl = data.tutorDetail?.profileImage 
            ? (data.tutorDetail.profileImage.startsWith('http') 
                ? data.tutorDetail.profileImage 
                : `${API_BASE_URL}/${data.tutorDetail.profileImage.replaceAll('\\', '/')}`)
            : null;
          
          // Find names by IDs using populated arrays
          const qualificationName = qualificationsData.find(q => q.id === data.tutorDetail?.qualificationId)?.name || "";
          const subjectName = subjectsData.find(s => s.id === data.tutorDetail?.subjectId)?.name || "";
          const countryName = countriesData.find(c => c.id === data.tutorDetail?.countryId)?.name || "";
          const languageName = languagesData.find(l => l.id === data.tutorDetail?.languageId)?.name || "";
          
          // Fetch states if country exists
          let stateName = "";
          if (data.tutorDetail?.countryId) {
            const statesData = await fetchStates(data.tutorDetail.countryId);
            stateName = statesData.find(s => s.id === data.tutorDetail?.stateId)?.name || "";
          }
          
          // Fetch cities if state exists
          let cityName = "";
          if (data.tutorDetail?.stateId) {
            const citiesData = await fetchCities(data.tutorDetail.stateId);
            cityName = citiesData.find(c => c.id === data.tutorDetail?.cityId)?.name || "";
          }
          
          setFormData({
            profileImage: profileImageUrl,
            name: data.tutorDetail?.name || "",
            email: data.email || "",
            phone: data.phoneNumber || "",
            bio: data.tutorDetail?.bio || "",
            qualifications: qualificationName,
            hourlyRate: data.tutorDetail?.hourlyRate || "",
            subjects: subjectName,
            subjectId: data.tutorDetail?.subjectId || "",
            address: data.tutorDetail?.address || "",
            country: countryName,
            countryId: data.tutorDetail?.countryId || "",
            state: stateName,
            stateId: data.tutorDetail?.stateId || "",
            city: cityName,
            pincode: data.tutorDetail?.pincode || "",
            documents: null,
            documentPath: data.tutorDetail?.documentName || "",
            availableDays: data.tutorDetail?.availableDays || [],
            preferredLanguage: languageName,
            languageId: data.tutorDetail?.languageId || "",
            qualificationId: data.tutorDetail?.qualificationId || ""
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (isOpen) {
      fetchData();
      fetchAvailabilityData();
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updates = { [name]: value };
    
    if (name === 'subjects') {
      const subject = subjects.find(s => s.name === value);
      updates.subjectId = subject ? subject.id : "";
    } else if (name === 'country') {
      const country = countries.find(c => c.name === value);
      updates.countryId = country ? country.id : "";
      updates.state = "";
      updates.stateId = "";
      if (country) {
        fetchStates(country.id);
      } else {
        setStates([]);
      }
    } else if (name === 'state') {
      const state = states.find(s => s.name === value);
      updates.stateId = state ? state.id : "";
      updates.city = "";
      if (state) {
        fetchCities(state.id);
      } else {
        setCities([]);
      }
    } else if (name === 'preferredLanguage') {
      const language = languages.find(l => l.name === value);
      updates.languageId = language ? language.id : "";
    } else if (name === 'qualifications') {
      const qualification = qualifications.find(q => q.name === value);
      updates.qualificationId = qualification ? qualification.id : "";
    }
    
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleDayChange = (day) => {
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day]
    }));
  };

  const handleDayClick = (day) => {
    setTimeSlotPopup({
      isOpen: true,
      selectedDay: day,
      fromTime: '09:00',
      toTime: '17:00'
    });
  };

  const handleTimeSlotChange = (field, value) => {
    setTimeSlotPopup(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getDayAvailability = (day) => {
    return availabilityData.find(
      item => item.dayOfWeek === day.toUpperCase()
    );
  };

  const handleTimeSlotSave = async () => {
    try {
      const existingAvailability = getDayAvailability(timeSlotPopup.selectedDay);
      
      if (existingAvailability) {
        // Update existing availability
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/tutor-availability/${existingAvailability.id}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            startTime: timeSlotPopup.fromTime,
            endTime: timeSlotPopup.toTime,
            status: 'ACTIVE'
          })
        });
        
        if (response.ok) {
          await fetchAvailabilityData(); // Refresh data
        }
      } else {
        // Create new availability
        const availabilityData = {
          dayOfWeek: timeSlotPopup.selectedDay.toUpperCase(),
          startTime: timeSlotPopup.fromTime,
          endTime: timeSlotPopup.toTime,
          status: 'ACTIVE'
        };
        
        await dispatch(createAvailability(availabilityData)).unwrap();
        await fetchAvailabilityData(); // Refresh data
      }
      
      console.log(`Time slot saved for ${timeSlotPopup.selectedDay}: ${timeSlotPopup.fromTime} - ${timeSlotPopup.toTime}`);
      setTimeSlotPopup(prev => ({ ...prev, isOpen: false }));
    } catch (error) {
      console.error('Error saving availability:', error);
    }
  };

  const handleTimeSlotCancel = () => {
    setTimeSlotPopup(prev => ({ ...prev, isOpen: false }));
  };

  const fetchStates = async (countryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/state/user?countryId=${countryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const statesData = data.result || [];
        setStates(statesData);
        return statesData;
      }
    } catch (error) {
      console.error('Error fetching states:', error);
    }
    return [];
  };

  const fetchCities = async (stateId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/city/user?stateId=${stateId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const citiesData = data.result || [];
        setCities(citiesData);
        return citiesData;
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
    return [];
  };

  const fetchAvailabilityData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/tutor-availability/my-availability?limit=10&offset=0`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAvailabilityData(data.result || []);
      }
    } catch (error) {
      console.error('Error fetching availability data:', error);
    }
  };

  const handleViewTimeSlot = (day) => {
    const dayAvailability = getDayAvailability(day);
    setViewPopup({
      isOpen: true,
      selectedDay: day,
      availability: dayAvailability
    });
  };

  const handleEditTimeSlot = async (day) => {
    const dayAvailability = availabilityData.find(
      item => item.dayOfWeek === day.toUpperCase()
    );
    
    if (dayAvailability) {
      setTimeSlotPopup({
        isOpen: true,
        selectedDay: day,
        fromTime: dayAvailability.startTime.slice(0, 5),
        toTime: dayAvailability.endTime.slice(0, 5)
      });
    } else {
      setTimeSlotPopup({
        isOpen: true,
        selectedDay: day,
        fromTime: '09:00',
        toTime: '17:00'
      });
    }
  };

  const handleDocumentUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const token = localStorage.getItem('token');
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        const response = await fetch(`${API_BASE_URL}/tutor-details/document`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formDataUpload
        });

        if (response.ok) {
          const result = await response.json();
          setFormData(prev => ({
            ...prev,
            documents: file,
            documentPath: result.documentPath
          }));
          console.log('Document uploaded successfully:', result);
        } else {
          console.error('Failed to upload document');
        }
      } catch (error) {
        console.error('Error uploading document:', error);
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const token = localStorage.getItem('token');
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        const response = await fetch(`${API_BASE_URL}/tutor-details/profileImage`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formDataUpload
        });

        if (response.ok) {
          const result = await response.json();
          const imageUrl = result.profileImage?.startsWith('http') 
            ? result.profileImage 
            : `${API_BASE_URL}/${result.profileImage?.replaceAll('\\', '/')}`;
          
          setFormData(prev => ({
            ...prev,
            profileImage: imageUrl
          }));
          console.log('Profile image uploaded successfully:', result);
        } else {
          console.error('Failed to upload profile image');
        }
      } catch (error) {
        console.error('Error uploading profile image:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate bio word count
    const wordCount = formData.bio.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount < 15 || wordCount > 80) {
      alert('Bio must be between 15 and 80 words');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/tutor-details/update`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          bio: formData.bio,
          hourlyRate: String(formData.hourlyRate) || "0",
          ...(formData.subjectId && { subjectId: formData.subjectId }),
          ...(formData.countryId && { countryId: formData.countryId }),
          ...(formData.stateId && { stateId: formData.stateId }),
          ...(formData.city && { city: formData.city }),
          ...(formData.languageId && { languageId: formData.languageId }),
          ...(formData.qualificationId && { qualificationId: formData.qualificationId })
        })
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log('Profile updated successfully:', updatedData);
        onUpdate?.(updatedData);
        onClose();
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="profile-update-overlay">
      <div className="profile-update-modal">
        <div className="modal-header">
          <h2>Update Profile</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="image-upload-section">
            <div className="current-image">
              <div 
                className="profile-img-preview"
                style={{
                  backgroundImage: formData.profileImage 
                    ? `url(${formData.profileImage})` 
                    : 'url("https://cdn-icons-png.flaticon.com/512/847/847969.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
            </div>
            <div className="upload-controls">
              <label htmlFor="profileImage" className="upload-btn">
                <Upload size={16} />
                Upload Image
              </label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </div>
          </div>

          <div className="form-fields">
            <div className="field-group">
              <label>
                <User size={16} />
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
                maxLength={40}
              />
            </div>

            <div className="field-group">
              <label>
                <Mail size={16} />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                disabled
              />
            </div>

            <div className="field-group">
              <label>
                <Phone size={16} />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                disabled
              />
            </div>

            <div className="field-group">
              <label>
                <BookOpen size={16} />
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself (15-80 words)"
                rows="3"
              />
              <div className="word-count">
                {(() => {
                  const wordCount = formData.bio.trim().split(/\s+/).filter(word => word.length > 0).length;
                  const isValid = wordCount >= 15 && wordCount <= 80;
                  return (
                    <span style={{ color: isValid ? 'green' : 'red' }}>
                      {wordCount}/80 words {wordCount < 15 ? '(min 15)' : wordCount > 80 ? '(max 80)' : ''}
                    </span>
                  );
                })()} 
              </div>
            </div>

            <div className="field-group">
              <label>
                <Users size={16} />
                Qualifications
              </label>
              <select
                name="qualifications"
                value={formData.qualifications}
                onChange={handleInputChange}
              >
                <option value="">Select Qualification</option>
                {qualifications.map(qualification => (
                  <option key={qualification.id} value={qualification.name}>
                    {qualification.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label>
                <DollarSign size={16} />
                Hourly Rate ($)
              </label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleInputChange}
                placeholder="Enter your hourly rate"
                min="0"
                step="0.01"
              />
            </div>

            <div className="field-group">
              <label>
                <Globe size={16} />
                Subjects
              </label>
              <select
                name="subjects"
                value={formData.subjects}
                onChange={handleInputChange}
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="field-group">
              <label>
                <MapPin size={16} />
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your full address"
                rows="2"
              />
            </div> */}

            <div className="field-row">
              <div className="field-group">
                <label>
                  <Globe size={16} />
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="">Select Country</option>
                  {countries.map(country => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label>
                  <MapPin size={16} />
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state.id} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label>
                  <MapPin size={16} />
                  City
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={!formData.state}
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field-group">
              <label>
                <FileText size={16} />
                Documents
              </label>
              <div className="file-upload">
                <label htmlFor="documents" className="file-upload-btn">
                  <Upload size={16} />
                  {formData.documents ? formData.documents.name : 'Upload Documents'}
                </label>
                <input
                  type="file"
                  id="documents"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleDocumentUpload}
                  hidden
                />
              </div>
            </div>

            <div className="field-group">
              <label>
                <Clock size={16} />
                Available Days
              </label>
              <div className="days-selector">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <div key={day} className="day-item">
                    <label className="day-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.availableDays.includes(day)}
                        onChange={() => handleDayChange(day)}
                      />
                      <span onClick={() => handleDayClick(day)}>{day.slice(0, 3)}</span>
                    </label>
                    <div className="day-actions">
                      <button type="button" className="view-btn-small" onClick={() => handleViewTimeSlot(day)}>V</button>
                      <button type="button" className="edit-btn-small" onClick={() => handleEditTimeSlot(day)}>E</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="field-group">
              <label>
                <Languages size={16} />
                Preferred Language
              </label>
              <select
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleInputChange}
              >
                <option value="">Select Language</option>
                {languages.map(language => (
                  <option key={language.id} value={language.name}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Time Slot Popup */}
      {timeSlotPopup.isOpen && (
        <div className="time-slot-overlay">
          <div className="time-slot-modal">
            <h3>Add time slot for {timeSlotPopup.selectedDay}</h3>
            
            <div className="time-inputs">
              <div className="time-field">
                <label htmlFor="fromTime">From</label>
                <input
                  id="fromTime"
                  type="time"
                  value={timeSlotPopup.fromTime}
                  onChange={(e) => handleTimeSlotChange('fromTime', e.target.value)}
                />
              </div>
              
              <div className="time-field">
                <label htmlFor="toTime">To</label>
                <input
                  id="toTime"
                  type="time"
                  value={timeSlotPopup.toTime}
                  onChange={(e) => handleTimeSlotChange('toTime', e.target.value)}
                />
              </div>
            </div>
            
            <div className="time-slot-actions">
              <button type="button" onClick={handleTimeSlotCancel}>Cancel</button>
              <button type="button" onClick={handleTimeSlotSave} disabled={availabilityLoading}>
                {availabilityLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Availability Popup */}
      {viewPopup.isOpen && (
        <div className="time-slot-overlay">
          <div className="time-slot-modal">
            <div className="modal-header">
              <h3>{viewPopup.selectedDay} Availability</h3>
              <button className="close-btn" onClick={() => setViewPopup(prev => ({ ...prev, isOpen: false }))}>
                <X size={16} />
              </button>
            </div>
            
            <div className="availability-info">
              {viewPopup.availability ? (
                <>
                  <div className="info-item">
                    <strong>Start Time:</strong> {viewPopup.availability.startTime}
                  </div>
                  <div className="info-item">
                    <strong>End Time:</strong> {viewPopup.availability.endTime}
                  </div>
                  <div className="info-item">
                    <strong>Status:</strong> {viewPopup.availability.status}
                  </div>
                </>
              ) : (
                <div className="no-availability">
                  No availability set for {viewPopup.selectedDay}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUpdate;
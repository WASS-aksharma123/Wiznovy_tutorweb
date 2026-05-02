import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { X, Upload, User, Mail, Phone, Users, Globe, DollarSign, BookOpen, MapPin, FileText, Clock, Languages } from "lucide-react";
import "../assets/Styles/ProfileUpdate.scss";
import { API_BASE_URL } from '../config/api';
import { createAvailability } from '../store/availabilitySlice';
import { subjectsService } from '../services/subjectsService';

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
    throw error;
  }
};

const ProfileUpdate = ({ isOpen, onClose, userData, onUpdate, scrollToField }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const initialPathRef = useRef(null);
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
    cityId: "",
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
        
        if (profileResponse.ok) {
          const data = await profileResponse.json();
          
          
          let profileImageUrl = null;
          if (data.tutorDetail?.profileImage) {
            if (data.tutorDetail.profileImage.startsWith('http')) {
              profileImageUrl = data.tutorDetail.profileImage;
            } else {
              profileImageUrl = `${API_BASE_URL}/${data.tutorDetail.profileImage.replaceAll('\\', '/')}`;
            }
          }
          
          // Check multiple possible locations for qualification ID
          const qualificationId = data.tutorDetail?.qualificationId || data.qualificationId || data.tutorDetail?.qualification?.id;
          
          const selectedQualification = qualificationsData.find(q => 
            q.id === qualificationId || 
            q.id === String(qualificationId) ||
            String(q.id) === String(qualificationId)
          );
          const qualificationName = selectedQualification?.name || "";
          
          // Check multiple possible locations for subject ID
          const subjectId = data.tutorDetail?.subjectId || data.subjectId || data.tutorDetail?.subject?.id;
         
          const selectedSubject = subjectsData.find(s => 
            s.id === subjectId || 
            s.id === String(subjectId) ||
            String(s.id) === String(subjectId)
          );
          const subjectName = selectedSubject?.name || "";
          // Check multiple possible locations for country ID
          const countryId = data.tutorDetail?.countryId || data.countryId || data.tutorDetail?.country?.id;
      
          
          const selectedCountry = countriesData.find(c => 
            c.id === countryId || 
            c.id === String(countryId) ||
            String(c.id) === String(countryId)
          );
          const countryName = selectedCountry?.name || "";
          // Check multiple possible locations for language ID
          const languageId = data.tutorDetail?.languageId || data.languageId || data.tutorDetail?.language?.id;
        
          
          const selectedLanguage = languagesData.find(l => 
            l.id === languageId || 
            l.id === String(languageId) ||
            String(l.id) === String(languageId)
          );
          const languageName = selectedLanguage?.name || "";
          
          let stateName = "";
          let stateId = "";
          if (countryId) {
            const statesData = await fetchStates(countryId);
            stateId = data.tutorDetail?.stateId || data.stateId || data.tutorDetail?.state?.id || data.tutorDetail?.cityId;
       
            
            const selectedState = statesData.find(s => 
              s.id === stateId || 
              s.id === String(stateId) ||
              String(s.id) === String(stateId)
            );
            stateName = selectedState?.name || "";
            
            // Set states array so the dropdown is populated
            setStates(statesData);
          }
          
          let cityName = "";
          let cityId = "";
          if (stateId) {
            const citiesData = await fetchCities(stateId);
            cityId = data.tutorDetail?.cityId || data.cityId || data.tutorDetail?.city?.id;
          
            
            const selectedCity = citiesData.find(c => 
              c.id === cityId || 
              c.id === String(cityId) ||
              String(c.id) === String(cityId)
            );
            cityName = selectedCity?.name || "";
            
            // Set cities array so the dropdown is populated
            setCities(citiesData);
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
            subjectId: subjectId || "",
            address: data.tutorDetail?.address || "",
            country: countryName,
            countryId: countryId || "",
            state: stateName,
            stateId: stateId || "",
            city: cityName,
            cityId: cityId || "",
            pincode: data.tutorDetail?.pincode || "",
            documents: null,
            documentPath: data.tutorDetail?.documentName || "",
            availableDays: data.tutorDetail?.availableDays || [],
            preferredLanguage: languageName,
            languageId: languageId || "",
            qualificationId: qualificationId || ""
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

  // Close modal when route changes
  useEffect(() => {
    if (isOpen && initialPathRef.current && location.pathname !== initialPathRef.current) {
      onClose();
    }
  }, [location.pathname, isOpen, onClose]);

  // Track initial path when modal opens
  useEffect(() => {
    if (isOpen) {
      initialPathRef.current = location.pathname;
    } else {
      initialPathRef.current = null;
    }
  }, [isOpen, location.pathname]);

  // Auto-scroll to specific field when modal opens
  useEffect(() => {
    if (isOpen && scrollToField) {
      const timer = setTimeout(() => {
        const fieldElement = document.querySelector(`[name="${scrollToField}"]`);
        if (fieldElement) {
          fieldElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          fieldElement.focus();
        }
      }, 300); // Wait for modal to fully render
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, scrollToField]);

  const handleSubjectChange = (value, updates) => {
    const subject = subjects.find(s => s.name === value);
    updates.subjectId = subject ? subject.id : "";
  };

  const handleCountryChange = (value, updates) => {
    const country = countries.find(c => c.name === value);
    updates.countryId = country ? country.id : "";
    updates.state = "";
    updates.stateId = "";
    updates.city = "";
    updates.cityId = "";
    if (country) {
      fetchStates(country.id);
    } else {
      setStates([]);
    }
    setCities([]);
  };

  const handleStateChange = (value, updates) => {
    const state = states.find(s => s.name === value);
    updates.stateId = state ? state.id : "";
    updates.city = "";
    updates.cityId = "";
    if (state) {
      fetchCities(state.id);
    } else {
      setCities([]);
    }
  };

  const handleLanguageChange = (value, updates) => {
    const language = languages.find(l => l.name === value);
    updates.languageId = language ? language.id : "";
  };

  const handleQualificationChange = (value, updates) => {
    const qualification = qualifications.find(q => q.name === value);
    updates.qualificationId = qualification ? qualification.id : "";
  };

  const handleCityChange = (value, updates) => {
    const city = cities.find(c => c.name === value);
    updates.cityId = city ? city.id : "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Restrict hourlyRate to 5 digits
    if (name === 'hourlyRate') {
      if (value.length > 5) return;
    }
    
    const updates = { [name]: value };
    
    const fieldHandlers = {
      subjects: handleSubjectChange,
      country: handleCountryChange,
      state: handleStateChange,
      city: handleCityChange,
      preferredLanguage: handleLanguageChange,
      qualifications: handleQualificationChange
    };
    
    const handler = fieldHandlers[name];
    if (handler) {
      handler(value, updates);
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
    if (field === 'fromTime') {
      const [fromHour, fromMinute] = value.split(':').map(Number);
      const [toHour, toMinute] = timeSlotPopup.toTime.split(':').map(Number);
      
      // If the new from time is >= to time, adjust the to time
      if (fromHour > toHour || (fromHour === toHour && fromMinute >= toMinute)) {
        const newToMinute = fromMinute + 1;
        if (newToMinute >= 60) {
          const newToHour = fromHour + 1;
          if (newToHour < 24) {
            setTimeSlotPopup(prev => ({
              ...prev,
              fromTime: value,
              toTime: `${newToHour.toString().padStart(2, '0')}:00`
            }));
          } else {
            setTimeSlotPopup(prev => ({
              ...prev,
              fromTime: value,
              toTime: '23:59'
            }));
          }
        } else {
          setTimeSlotPopup(prev => ({
            ...prev,
            fromTime: value,
            toTime: `${fromHour.toString().padStart(2, '0')}:${newToMinute.toString().padStart(2, '0')}`
          }));
        }
      } else {
        setTimeSlotPopup(prev => ({
          ...prev,
          [field]: value
        }));
      }
    } else {
      setTimeSlotPopup(prev => ({
        ...prev,
        [field]: value
      }));
    }
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
          await fetchAvailabilityData(); 
        }
      } else {
        
        const availabilityData = {
          dayOfWeek: timeSlotPopup.selectedDay.toUpperCase(),
          startTime: timeSlotPopup.fromTime,
          endTime: timeSlotPopup.toTime,
          status: 'ACTIVE'
        };
        
        await dispatch(createAvailability(availabilityData)).unwrap();
        await fetchAvailabilityData();
      }
      
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
      
      // Prepare the payload with proper validation
      const payload = {
        name: formData.name,
        bio: formData.bio,
        hourlyRate: parseFloat(formData.hourlyRate) || 0
      };
      
      // Only add IDs if they are valid (not empty strings)
      if (formData.subjectId && formData.subjectId !== "") {
        payload.subjectId = String(formData.subjectId);
      }
      if (formData.countryId && formData.countryId !== "") {
        payload.countryId = String(formData.countryId);
      }
      if (formData.stateId && formData.stateId !== "") {
        payload.stateId = String(formData.stateId);
      }
      if (formData.cityId && formData.cityId !== "") {
        payload.cityId = String(formData.cityId);
      }
      if (formData.languageId && formData.languageId !== "") {
        payload.languageId = String(formData.languageId);
      }
      if (formData.qualificationId && formData.qualificationId !== "") {
        payload.qualificationId = String(formData.qualificationId);
      }
      
      
      const response = await fetch(`${API_BASE_URL}/tutor-details/update`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const updatedData = await response.json();
        onUpdate?.(updatedData);
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Failed to update profile: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Network error occurred while updating profile');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="profile-update-overlay" onClick={onClose}>
      <div className="profile-update-modal" onClick={(e) => e.stopPropagation()}>
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
                maxLength={100}
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
                  let message = '';
                  if (wordCount < 15) {
                    message = '(min 15)';
                  } else if (wordCount > 80) {
                    message = '(max 80)';
                  }
                  return (
                    <span style={{ color: isValid ? 'green' : 'red' }}>
                      {wordCount}/80 words {message}
                    </span>
                  );
                })()} 
              </div>
            </div>

            <div className="field-group">
              <label>
                <Users size={16} />
                Education Level
              </label>
              <select
                name="qualifications"
                value={formData.qualifications}
                onChange={handleInputChange}
              >
                <option value="">Select Education Level</option>
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
                max="99999"
                step="0.5"
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
                  // disabled={!formData.state}
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

            <div className="field-group" name="availableDays">
              <label>
                <Clock size={16} />
                Available Days
              </label>
              <div className="days-selector">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <div 
                    key={day} 
                    className={`day-item ${formData.availableDays.includes(day) ? 'selected' : ''}`}
                  >
                    <label className="day-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.availableDays.includes(day)}
                        onChange={() => handleDayChange(day)}
                      />
                      <button 
                        type="button" 
                        className="day-toggle-btn" 
                        onClick={() => handleDayClick(day)}
                      >
                        {day}
                      </button>
                    </label>
                    <div className="day-actions">
                      <button 
                        type="button" 
                        className="availability-btn view-availability" 
                        onClick={() => handleViewTimeSlot(day)}
                      >
                        View Availability
                      </button>
                      <button 
                        type="button" 
                        className="availability-btn edit-availability" 
                        onClick={() => handleEditTimeSlot(day)}
                      >
                        Edit Availability
                      </button>
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
        <div className="time-slot-overlay" onClick={handleTimeSlotCancel}>
          <div className="time-slot-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add time slot for {timeSlotPopup.selectedDay}</h3>
            
            <div className="time-inputs">
              <div className="time-field">
                <label htmlFor="fromTime">From</label>
                <div className="custom-time-input">
                  <select 
                    value={timeSlotPopup.fromTime.split(':')[0]} 
                    onChange={(e) => {
                      const minutes = timeSlotPopup.fromTime.split(':')[1] || '00';
                      handleTimeSlotChange('fromTime', `${e.target.value}:${minutes}`);
                    }}
                    className="time-select"
                  >
                    {Array.from({length: 24}, (_, i) => (
                      <option key={i} value={i.toString().padStart(2, '0')}>
                        {i.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <span>:</span>
                  <select 
                    value={timeSlotPopup.fromTime.split(':')[1] || '00'} 
                    onChange={(e) => {
                      const hours = timeSlotPopup.fromTime.split(':')[0];
                      handleTimeSlotChange('fromTime', `${hours}:${e.target.value}`);
                    }}
                    className="time-select"
                  >
                    {Array.from({length: 60}, (_, i) => (
                      <option key={i} value={i.toString().padStart(2, '0')}>
                        {i.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="time-field">
                <label htmlFor="toTime">To</label>
                <div className="custom-time-input">
                  <select 
                    value={timeSlotPopup.toTime.split(':')[0]} 
                    onChange={(e) => {
                      const minutes = timeSlotPopup.toTime.split(':')[1] || '00';
                      handleTimeSlotChange('toTime', `${e.target.value}:${minutes}`);
                    }}
                    className="time-select"
                  >
                    {Array.from({length: 24}, (_, i) => {
                      const fromHour = parseInt(timeSlotPopup.fromTime.split(':')[0]);
                      const fromMinute = parseInt(timeSlotPopup.fromTime.split(':')[1]);
                      const currentHour = i;
                      
                      // Disable hours that are before the from time
                      const isDisabled = currentHour < fromHour || 
                        (currentHour === fromHour && fromMinute >= 59);
                      
                      return (
                        <option 
                          key={i} 
                          value={i.toString().padStart(2, '0')}
                          disabled={isDisabled}
                        >
                          {i.toString().padStart(2, '0')}
                        </option>
                      );
                    })}
                  </select>
                  <span>:</span>
                  <select 
                    value={timeSlotPopup.toTime.split(':')[1] || '00'} 
                    onChange={(e) => {
                      const hours = timeSlotPopup.toTime.split(':')[0];
                      handleTimeSlotChange('toTime', `${hours}:${e.target.value}`);
                    }}
                    className="time-select"
                  >
                    {Array.from({length: 60}, (_, i) => {
                      const fromHour = parseInt(timeSlotPopup.fromTime.split(':')[0]);
                      const fromMinute = parseInt(timeSlotPopup.fromTime.split(':')[1]);
                      const toHour = parseInt(timeSlotPopup.toTime.split(':')[0]);
                      const currentMinute = i;
                      
                      // Disable minutes that would make the to time <= from time
                      const isDisabled = toHour === fromHour && currentMinute <= fromMinute;
                      
                      return (
                        <option 
                          key={i} 
                          value={i.toString().padStart(2, '0')}
                          disabled={isDisabled}
                        >
                          {i.toString().padStart(2, '0')}
                        </option>
                      );
                    })}
                  </select>
                </div>
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
        <div className="time-slot-overlay" onClick={() => setViewPopup(prev => ({ ...prev, isOpen: false }))}>
          <div className="time-slot-modal" style={{padding:"15px"}} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header" style={{padding:"0"}}>
              <h3>{viewPopup.selectedDay} Availability</h3>
              <button className="close-btn" onClick={() => setViewPopup(prev => ({ ...prev, isOpen: false }))}>
                <X size={16} />
              </button>
            </div>
            
            <div className="availability-info">
              {viewPopup.availability ? (
                <div style={{display:"flex", gap:"0.5rem", marginTop:"1rem"}}>
                  <div className="info-item">
                    <strong>Start Time:</strong> {viewPopup.availability.startTime}
                  </div>
                  <p>To</p>
                  <div className="info-item">
                    <strong>End Time:</strong> {viewPopup.availability.endTime}
                  </div>
                  {/* <div className="info-item">
                    <strong>Status:</strong> {viewPopup.availability.status}
                  </div> */}
                </div>
              ) : (
                <div className="no-availability" style={{marginTop:"1rem"}}>
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
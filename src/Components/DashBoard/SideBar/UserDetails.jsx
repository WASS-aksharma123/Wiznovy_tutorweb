import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Phone,
  Edit,
  BookOpen,
  Library,
  Heart,
  CirclePlus,
  Camera,
} from "lucide-react";
import "../../../assets/Styles/DashBoard/UserDetails.scss";
import verified from "../../../assets/Images/verified.png";
import { getTutorProfile } from '../../../store/profileSlice.js';
import ProfileUpdate from "../../ProfileUpdate";
import NewCourse from "../../NewCourse";
import CreateBook from "../../CreateBook";
import { API_BASE_URL } from "../../../config/api";

const UserDetails = () => {
  const [isProfileUpdateOpen, setIsProfileUpdateOpen] = useState(false);
  const [isNewCourseOpen, setIsNewCourseOpen] = useState(false);
  const [isCreateBookOpen, setIsCreateBookOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profile);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/tutor-details/profileImage`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      if (response.ok) {
        dispatch(getTutorProfile());
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getTutorProfile());
    }
  }, [dispatch, isAuthenticated]);

  const userData = {
    name: profile?.tutorDetail?.name || profile?.name || "User",
    email: profile?.email || "Not available",
    phone: profile?.phoneNumber || profile?.tutorDetail?.phoneNumber || "Not provided",
    profileImage: profile?.tutorDetail?.profileImage 
      ? profile.tutorDetail.profileImage.replaceAll('\\', '/').replace('http:/', 'http://') 
      : ""
  };

  return (
    <div className="user-card">
      <div className="edit-btn">
        <button onClick={() => setIsProfileUpdateOpen(true)}>
          <Edit size={14} /> Edit
        </button>
      </div>

      <div className="profileback">
        <div 
          className="profile-img"
          style={{
            backgroundImage: userData.profileImage 
              ? `url(${userData.profileImage})` 
              : 'url("https://cdn-icons-png.flaticon.com/512/847/847969.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <label htmlFor="imageUpload" className="image-upload-btn">
            <Camera size={16} />
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            hidden
          />
        </div>
      </div>

      <div className="user-name">
        <h2>{userData.name}</h2>
        <div className="verified">
          <img src={verified} alt="" />
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-item">
          <Phone size={16} />
          <span>{userData.phone}</span>
        </div>
        <div className="detail-item">
          <Mail size={16} />
          <span>{userData.email}</span>
        </div>
        {/* <div className="detail-item">
          <MapPin size={16} />
          <span>NYC, USA 6:23 pm local time</span>
        </div> */}
      </div>

      <div className="headline">
        <div className="headline-item">
          <BookOpen size={16} />
          <button onClick={() => navigate('/all-courses')}>Courses</button>
        </div>
        <div className="headline-item">
          <Library size={16} />
          <span>Open Library</span>
        </div>
        <div className="headline-item">
          <Heart size={16} />
          <span>Wishlist profile</span>
        </div>
      </div>

      <button className="add-btn" onClick={() => setIsNewCourseOpen(true)}>
        <CirclePlus /> Create New Course
      </button>

      <button className="add-btn" onClick={() => setIsCreateBookOpen(true)}>
        <CirclePlus /> Create New Book
      </button>

      <ProfileUpdate 
        isOpen={isProfileUpdateOpen}
        onClose={() => setIsProfileUpdateOpen(false)}
        userData={userData}
        onUpdate={() => dispatch(getTutorProfile())}
      />

      <NewCourse 
        isOpen={isNewCourseOpen}
        onClose={() => setIsNewCourseOpen(false)}
      />

      <CreateBook 
        isOpen={isCreateBookOpen}
        onClose={() => setIsCreateBookOpen(false)}
      />
    </div>
  );
};

export default UserDetails;

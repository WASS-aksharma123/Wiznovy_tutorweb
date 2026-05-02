import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  Mail,
  Phone,
  Edit,
  CirclePlus,
  Camera,
  Loader2,
} from "lucide-react";
import "../../../assets/Styles/DashBoard/UserDetails.scss";
import verified from "../../../assets/Images/verified.png";
import { getTutorProfile } from '../../../store/profileSlice.js';
import { openProfileUpdate, closeProfileUpdate } from '../../../store/modalSlice.js';
import ProfileUpdate from "../../ProfileUpdate";
import NewCourse from "../../Course/NewCourse.jsx";
import CreateBook from "../../Book/CreateBook.jsx";
import { API_BASE_URL } from "../../../config/api";

const UserDetails = () => {
  const [isNewCourseOpen, setIsNewCourseOpen] = useState(false);
  const [isCreateBookOpen, setIsCreateBookOpen] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isProfileUpdateOpen, scrollToField } = useSelector((state) => state.modal);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsImageUploading(true);
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
    } finally {
      setIsImageUploading(false);
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

  const handleEditClick = () => {
    dispatch(openProfileUpdate());
  };

  return (
    <div className="user-card">
      <div className="edit-btn">
        <button onClick={handleEditClick}>
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
          {isImageUploading && (
            <div className="upload-loader">
              <Loader2 size={20} className="spinning" />
            </div>
          )}
          <label htmlFor="imageUpload" className={`image-upload-btn ${isImageUploading ? 'uploading' : ''}`}>
            <Camera size={16} />
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isImageUploading}
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

      {/* <div className="headline">
        <div className="headline-item">
          <Heart size={16} />
          <span>Wishlist profile</span>
        </div>
      </div> */}

      <button className="add-btn" onClick={() => setIsNewCourseOpen(true)}>
        <CirclePlus /> Create New Course
      </button>

      <button className="add-btn" onClick={() => setIsCreateBookOpen(true)}>
        <CirclePlus /> Create New Book
      </button>

      <ProfileUpdate 
        isOpen={isProfileUpdateOpen}
        onClose={() => dispatch(closeProfileUpdate())}
        userData={userData}
        onUpdate={() => dispatch(getTutorProfile())}
        scrollToField={scrollToField}
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

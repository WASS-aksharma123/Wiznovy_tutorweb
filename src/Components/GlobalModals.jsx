import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeProfileUpdate } from '../store/modalSlice';
import { getTutorProfile } from '../store/profileSlice';
import ProfileUpdate from './ProfileUpdate';

const GlobalModals = () => {
  const dispatch = useDispatch();
  const { isProfileUpdateOpen, scrollToField } = useSelector((state) => state.modal);
  const { profile } = useSelector((state) => state.profile);

  const handleCloseProfileUpdate = () => {
    dispatch(closeProfileUpdate());
  };

  const handleProfileUpdate = () => {
    dispatch(getTutorProfile());
  };

  const userData = {
    name: profile?.tutorDetail?.name || profile?.name || "User",
    email: profile?.email || "Not available",
    phone: profile?.phoneNumber || profile?.tutorDetail?.phoneNumber || "Not provided",
    profileImage: profile?.tutorDetail?.profileImage 
      ? profile.tutorDetail.profileImage.replaceAll('\\', '/').replace('http:/', 'http://') 
      : ""
  };

  return (
    <>
      <ProfileUpdate 
        isOpen={isProfileUpdateOpen}
        onClose={handleCloseProfileUpdate}
        userData={userData}
        onUpdate={handleProfileUpdate}
        scrollToField={scrollToField}
      />
    </>
  );
};

export default GlobalModals;
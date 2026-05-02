import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCoursesAsync } from "../../../store/courseSlice";
import "../../../assets/Styles/DashBoard/PurchaseCourse.scss";
import CourseCard from "../../Course/CourseCard";
import EditCourse from "../../Course/EditCourse";
import NewCourse from "../../Course/NewCourse";
import course from "../../../assets/Images/purchaseimage.png";

const ListedCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const screenWidth = window.innerWidth;
  const { myCourses, loading } = useSelector((state) => state.course);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isNewCourseModalOpen, setIsNewCourseModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMyCoursesAsync());
  }, [dispatch]);

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const handleSaveCourse = () => {
    dispatch(fetchMyCoursesAsync());
  };

  const handleNewCourseSave = () => {
    dispatch(fetchMyCoursesAsync());
    setIsNewCourseModalOpen(false);
  };

  return (
    <div className="purchaseCourse">
      <div className="purchaseCourse-container">
        <div className="headingandbtn">
          <h2>Listed Courses</h2>
          <button className="view-all-btn" onClick={() => navigate('/all-courses')}>View All Courses</button>
        </div>

        <div className="course-list">
          {loading && <p>Loading courses...</p>}
          {!loading && myCourses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', width: '100%' }}>
              <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
                You haven't created any courses yet.
              </p>
              <button 
                onClick={() => setIsNewCourseModalOpen(true)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'var(--green)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.opacity = '0.9'}
                onMouseOut={(e) => e.target.style.opacity = '1'}
                onFocus={(e) => e.target.style.opacity = '0.9'}
                onBlur={(e) => e.target.style.opacity = '1'}
              >
                Create Your First Course
              </button>
            </div>
          ) : (
            myCourses.slice(0, screenWidth <= 1024 ? 2 : 3).map((courseItem) => (
              <CourseCard key={courseItem.id} course={courseItem} onEdit={handleEditCourse} />
            ))
          )}
        </div>
      </div>
      
      <EditCourse
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        courseData={selectedCourse}
        onSave={handleSaveCourse}
      />

      <NewCourse
        isOpen={isNewCourseModalOpen}
        onClose={() => setIsNewCourseModalOpen(false)}
        onSave={handleNewCourseSave}
      />
    </div>
  );
};

export default ListedCourse;

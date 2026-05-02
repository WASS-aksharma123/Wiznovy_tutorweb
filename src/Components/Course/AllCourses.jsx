import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCoursesAsync } from "../../store/courseSlice";
import "../../assets/Styles/AllCourse.scss";
import CourseCard from "./CourseCard";
import EditCourse from "./EditCourse";
import { SlExclamation } from "react-icons/sl";

const loaderStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

if (!document.querySelector('#loader-styles')) {
  const style = document.createElement('style');
  style.id = 'loader-styles';
  style.textContent = loaderStyles;
  document.head.appendChild(style);
}

const AllCourses = () => {
  const dispatch = useDispatch();
  const { myCourses, loading } = useSelector((state) => state.course);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  const renderCourseContent = () => {
    if (loading) {
      return (
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #113D38', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        </div>
      );
    }
    
    if (myCourses.length === 0) {
      return (
        <div className="no-sessions" style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '400px', gap: '10px' }}>
          <SlExclamation size={50} />
          No course found. Create your first course!
        </div>
      );
    }
    
    return myCourses.map((courseItem) => (
      <CourseCard key={courseItem.id} course={courseItem} onEdit={handleEditCourse} />
    ));
  };

  return (
    <div className="purchaseCoursess">
      <div className="purchaseCourse-containerr">
        <div className="headingggg">
          <h2>All Courses</h2>
        </div>

        <div className="course-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {renderCourseContent()}
        </div>
      </div>
      
      <EditCourse
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        courseData={selectedCourse}
        onSave={handleSaveCourse}
      />
    </div>
  );
};

export default AllCourses;
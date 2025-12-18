import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCoursesAsync } from "../store/courseSlice";
import "../assets/Styles/AllCourse.scss";
import CourseCard from "./CourseCard";
import EditCourse from "./EditCourse";

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

  return (
    <div className="purchaseCoursess">
      <div className="purchaseCourse-containerr">
        <div className="headingggg">
          <h2>All Courses</h2>
        </div>

        <div className="course-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {loading ? (
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
              <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #113D38', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
          ) : (
            myCourses.map((courseItem) => (
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
    </div>
  );
};

export default AllCourses;
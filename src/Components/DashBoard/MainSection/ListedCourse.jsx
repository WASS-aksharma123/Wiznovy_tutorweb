import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCoursesAsync } from "../../../store/courseSlice";
import "../../../assets/Styles/DashBoard/PurchaseCourse.scss";
import CourseCard from "../../Course/CourseCard";
import EditCourse from "../../Course/EditCourse";
import course from "../../../assets/Images/purchaseimage.png";

const ListedCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const screenWidth = window.innerWidth;
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
    <div className="purchaseCourse">
      <div className="purchaseCourse-container">
        <div className="headingandbtn">
          <h2>Listed Courses</h2>
          <button className="view-all-btn" onClick={() => navigate('/all-courses')}>View All Courses</button>
        </div>

        <div className="course-list">
          {loading && <p>Loading courses...</p>}
          {!loading && myCourses.slice(0, screenWidth <= 1024 ? 2 : 3).map((courseItem) => (
            <CourseCard key={courseItem.id} course={courseItem} onEdit={handleEditCourse} />
          ))}
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

export default ListedCourse;

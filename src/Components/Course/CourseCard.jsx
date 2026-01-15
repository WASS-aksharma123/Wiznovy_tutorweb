import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaUsers, FaStar } from "react-icons/fa";

const CourseCard = ({ course, onEdit }) => {
    const navigate = useNavigate();
    
    const handleEdit = () => {
        if (onEdit) {
            onEdit(course);
        }
    };

    const handleAddEditUnits = () => {
        navigate(`/course?id=${course.id}`);
    };

    return (
        <div className="course-card">
                <div className="image-section">
                    <img src={course.thumbnailUrl || course.imageUrl || course.image} alt={course.name || course.title} />
                    <div className="overlay">
                        <button className="btn" onClick={handleEdit}>Edit</button>
                    </div>
                </div>

                <div className="details-section">
                    <h3>{course.name || course.title}</h3>
                    <p>
                        By {course.teacher || 'Instructor'} <span>({course.totalLectures || course.sessions} Lectures)</span>
                    </p>

                    <div className="course-stats">
                        <div className="stat">
                            <FaClock className="icon" />
                            <span>{course.totalDuration || course.duration}</span>
                        </div>
                        <div className="stat">
                            <FaUsers className="icon" />
                            <span>{(course.students || 0).toString().padStart(2, "0")}</span>
                        </div>
                        <div className="stat">
                            <FaStar className="icon star" />
                            <span>{course.averageRating || course.rating || '0.0'}</span>
                        </div>
                    </div>
                    <button className='viewD' onClick={handleAddEditUnits}>Add & Edit Units</button>
                </div>
                
            </div>
        
    );
}

CourseCard.propTypes = {
    course: PropTypes.object.isRequired,
    onEdit: PropTypes.func
};

export default CourseCard




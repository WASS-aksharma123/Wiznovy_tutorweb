import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../assets/Styles/Pages/Course.scss";
import { FaClock, FaUsers, FaStar, FaPlay } from "react-icons/fa";
import Share from "../Components/DashBoard/SideBar/Share";
import AllModulesClasses from "../Components/Course/Sidesection/AllModulesClasses";
import { fetchMyCoursesAsync } from "../store/courseSlice";
import course from "../assets/Images/purchaseimage.png";
import Videos from '../Components/Course/Mainsection/Videos/Videos';
import StudyMaterialList from '../Components/Course/Mainsection/StudyMaterial/StudyMaterialList';

const Course = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { myCourses: courses, loading, units } = useSelector((state) => state.course);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [activeTab, setActiveTab] = useState('videos');
    const [tabLoading, setTabLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [courseStats, setCourseStats] = useState({ tutorName: '', totalUnits: 0 });
    const sidebarRef = useRef(null);

    const courseId = searchParams.get('id');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        if (!courses || courses.length === 0) {
            dispatch(fetchMyCoursesAsync());
        }
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    useEffect(() => {
        if (courses && courseId) {
            const foundCourse = courses.find(c => c.id.toString() === courseId);
            setSelectedCourse(foundCourse);
            if (foundCourse) {
                setCourseStats({
                    tutorName: foundCourse.tutor?.name || foundCourse.teacher || 'Instructor',
                    totalUnits: 0
                });
            }
        }
    }, [courses, courseId]);

    useEffect(() => {
        if (units && selectedCourse) {
            setCourseStats(prev => ({
                ...prev,
                totalUnits: units.length
            }));
        }
    }, [units, selectedCourse]);

    if (loading) {
        return (
            <div className="courseMain">
                <div className="container">
                    <div className="loading-state">Loading course details...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="courseMain">
            <div className="container">
                <div className="courseScreen">
                    <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                        <div className="user">
                            <div className="Courseface">
                                {selectedCourse && (
                                    <div className="course-card">
                                        <div className="image-section">
                                            <img src={selectedCourse.thumbnailUrl || selectedCourse.imageUrl || selectedCourse.image || course} alt={selectedCourse.name || selectedCourse.title} />
                                        </div>

                                        <div className="details-section">
                                            <h3>{selectedCourse.name || selectedCourse.title}</h3>
                                            <p>
                                                By {courseStats.tutorName} <span>({courseStats.totalUnits} {courseStats.totalUnits === 1 ? 'Unit' : 'Units'})</span>
                                            </p>

                                            <div className="course-stats">
                                                <div className="stat">
                                                    <FaClock className="icon" />
                                                    <span>{selectedCourse.totalDuration || selectedCourse.duration}</span>
                                                </div>
                                                <div className="stat">
                                                    <FaUsers className="icon" />
                                                    <span>{(selectedCourse.students || 0).toString().padStart(2, "0")}</span>
                                                </div>
                                                <div className="stat">
                                                    <FaStar className="icon star" />
                                                    <span>{selectedCourse.averageRating || selectedCourse.rating || '0.0'}</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                            <AllModulesClasses
                                courseId={courseId}
                                selectedUnit={selectedUnit}
                                onUnitSelect={setSelectedUnit}
                            />
                            <Share />
                        </div>
                    </div>
                    <div className="mainSection">
                        <div className="tabs">
                            <button className="sidebar-toggle" onClick={toggleSidebar}>
                                ☰
                            </button>
                            <div
                                className={`tab ${activeTab === 'videos' ? 'active' : ''}`}
                                onClick={() => {
                                    if (activeTab !== 'videos') {
                                        setTabLoading(true);
                                        setTimeout(() => {
                                            setActiveTab('videos');
                                            setTabLoading(false);
                                        }, 300);
                                    }
                                }}
                            >
                                <h2>Videos</h2>
                            </div>
                            <div
                                className={`tab ${activeTab === 'materials' ? 'active' : ''}`}
                                onClick={() => {
                                    if (activeTab !== 'materials') {
                                        setTabLoading(true);
                                        setTimeout(() => {
                                            setActiveTab('materials');
                                            setTabLoading(false);
                                        }, 300);
                                    }
                                }}
                            >
                                <h2>Study Materials</h2>
                            </div>
                        </div>

                        <div className="contentarea">
                            {tabLoading ? (
                                <div className="tab-loader">
                                    <div className="circular-loader"></div>
                                </div>
                            ) : (
                                <>
                                    {activeTab === 'videos' && (
                                        <div className="videossection">
                                            <Videos
                                                unitId={selectedUnit?.id}
                                                unitName={selectedUnit?.name}
                                            />
                                        </div>
                                    )}
                                    {activeTab === 'materials' && (
                                        <div className="studymaterialsection">
                                            <StudyMaterialList
                                                unitId={selectedUnit?.id}
                                                unitName={selectedUnit?.name}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;

import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import "../assets/Styles/Pages/DashBoard.scss";
import Loader from "../Components/Loader";

const UserDetails = lazy(() => import("../Components/DashBoard/SideBar/UserDetails"));
const MyScheduleClass = lazy(() => import("../Components/DashBoard/SideBar/MyScheduleClass"));
const Share = lazy(() => import("../Components/DashBoard/SideBar/Share"));
const MySchedule = lazy(() => import("../Components/DashBoard/MainSection/MySchedule"));
const PurchaseCourse = lazy(() => import("../Components/DashBoard/MainSection/ListedCourse"));
const Reviews = lazy(() => import("../Components/DashBoard/MainSection/Reviews"));
const LogoutButton = lazy(() => import("../Components/DashBoard/SideBar/LogoutButton"));

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return <Loader fullScreen text="Loading Dashboard..." />;
  }

  return (
    <div className="dashMain">
      <div className="container">
        <div className="DashBoardScreen">
          <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="user">
              <Suspense fallback={<Loader size="small" text="Loading sidebar..." />}>
                <UserDetails />
                <MyScheduleClass />
                <Share />
                <LogoutButton/>
              </Suspense>
            </div>
          </div>
          <div className="mainSection">
            <Suspense fallback={<Loader text="Loading content..." />}>
              <MySchedule toggleSidebar={toggleSidebar} />
              <PurchaseCourse />
              <Reviews />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashBoard);

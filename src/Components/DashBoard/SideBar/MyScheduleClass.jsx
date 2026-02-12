import React from "react";
import { useNavigate } from 'react-router-dom';
import { BookOpen, Library, ScrollText } from "lucide-react";
import "../../../assets/Styles/DashBoard/MyScheduleClass.scss";

const MyScheduleClass = () => {
  const navigate = useNavigate();

  return (
    <div className="mysch">
      <h2>My Schedule & Class</h2>
      <div className="profile-details">
        <div className="detail-item">
          <BookOpen size={16} />
          <button onClick={() => navigate('/all-courses')}>Courses</button>
        </div>
        <div className="detail-item">
          <Library size={16} />
          <button onClick={() => navigate('/my-books')}>My Books</button>
        </div>
        <div className="detail-item">
          <ScrollText size={16} />
          <button onClick={() => navigate('/transactions')}>Transaction History</button>
        </div>
      </div>
    </div>
  );
};

export default MyScheduleClass;

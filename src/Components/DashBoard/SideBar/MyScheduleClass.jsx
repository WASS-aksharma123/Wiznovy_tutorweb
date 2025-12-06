import React from "react";
import { BookOpenText, Calendar, ScrollText } from "lucide-react";
import "../../../assets/Styles/DashBoard/MyScheduleClass.scss";
const MyScheduleClass = () => {
  return (
    <div className="mysch">
      <h2>My Schedule & Class</h2>
      <div className="profile-details">
        <div className="detail-item">
          <BookOpenText size={16} />
          <span>My Class</span>
        </div>
        <div className="detail-item">
          <Calendar size={16} />
          <span>Calender & Live Class</span>
        </div>
        <div className="detail-item">
          <ScrollText size={16} />
          <span>Transaction History</span>
        </div>
      </div>
    </div>
  );
};

export default MyScheduleClass;

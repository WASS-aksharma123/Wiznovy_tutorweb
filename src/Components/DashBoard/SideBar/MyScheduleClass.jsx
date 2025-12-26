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
          <button>My Class</button>
        </div>
        <div className="detail-item">
          <Calendar size={16} />
          <button>Calender & Live Class</button>
        </div>
        <div className="detail-item">
          <ScrollText size={16} />
          <button>Transaction History</button>
        </div>
      </div>
    </div>
  );
};

export default MyScheduleClass;

import React from 'react';
import '../../../assets/Styles/DashBoard/TopSubject.scss';
import english from "../../../assets/Images/english.png"
import spanish from "../../../assets/Images/spanish.png"
import math from "../../../assets/Images/math.png"
import history from "../../../assets/Images/history.png"


const subjects = [
  {
    name: 'English',
    icon: english, 
  },
  {
    name: 'Spanish',
    icon: spanish,
  },
  {
    name: 'Math',
    icon: math,
  },
  {
    name: 'History',
    icon: history,
  },
];

const TopSubject = () => {
  return (
    <div className="top-subjects">
      <h2 className="title">Top Subjects</h2>
      <div className="subjects-list">
        {subjects.map((subject) => (
          <div className="subject-card" key={subject.name}>
            <div className="subject-icon">
              <img src={subject.icon} alt={subject.name} />
            </div>
            <p className="subject-name">{subject.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSubject;

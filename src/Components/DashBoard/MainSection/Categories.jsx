import React from 'react';
import '../../../assets/Styles/DashBoard/TopSubject.scss';
import subject from "../../../assets/Images/subject.png"
import daily from "../../../assets/Images/dailytask.png"
import help from "../../../assets/Images/help.png"
import progress from "../../../assets/Images/progress.png"

const subjects = [
  {
    name: 'Subject',
    icon: subject, 
  },
  {
    name: 'Daily Task',
    icon: daily,
  },
  {
    name: 'Help',
    icon: help,
  },
  {
    name: 'Progress',
    icon: progress,
  },
];

const Categories = () => {
  return (
    <div className="top-subjects">
      <h2 className="title">Categories</h2>
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

export default Categories;

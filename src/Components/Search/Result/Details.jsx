import React, { useState, useEffect } from "react";
import "../../../assets/Styles/Search/Details.scss";
import { Star, CheckCircle, BadgeCheck } from "lucide-react";
import Loader from "../../Loader";

const Details = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch profile details
    const fetchProfileData = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1200));
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (isLoading) {
    return <Loader fullScreen text="Loading profile details..." />;
  }
  return (
    <div className="container">
        <div className="freelancer-profile">
      {/* Header Section */}
      <div className="profile-header">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Freelancer"
          className="profile-img"
        />
        <div className="profile-info">
          <div className="oneLine">
            <div className="profile-name">
            <h2>Maria Eugenia L</h2>
            <CheckCircle className="verified-icon" />
          </div>
          <div className="profile-rating">
            <Star size={16} fill="#f5c518" stroke="none" />
            <span>4.9/5 (40 jobs)</span>
          </div>
          <div className="rate">$75/hr</div>
          </div>

          <div className="profile-meta">
            <p>Villa Rosa, Argentina — 7:38 am local time</p>
            <p>Rising Talent</p>
            <p>Professional Spanish Teacher</p>
          </div>

          <div className="profile-tags">
            <span>English: Fluent</span>
            <span>ID Verified</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <h3>About Maria Eugenia</h3>
        <p>
          I am a certified ELE teacher and I have more than 23 years of
          experience in education. I am permanently trained in the use of my
          native language. I have taught Spanish in the United States to both
          children, adolescents and adults of various nationalities. Currently I
          am teaching Spanish online to students from all over the world.
        </p>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>Review By Clients</h3>
        <div className="reviews">
          {[1, 2, 3].map((r) => (
            <div key={r} className="review-card">
              <div className="review-header">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Client"
                />
                <div>
                  <h4>Samantha Payne</h4>
                  <p>@Sam.Payne90</p>
                </div>
              </div>
              <div className="review-meta">
                <BadgeCheck size={14} />
                <span>Verified User</span>
              </div>
              <div className="review-stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={14} fill="#f5c518" stroke="none" />
                ))}
              </div>
              <p className="review-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                aliquam, purus sit amet luctus venenatis, lectus magna fringilla
                urna, porttitor rhoncus dolor purus non enim praesent elementum
                facilisis leo, vel
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Class Section */}
      <div className="class-section">
        {[
          { title: "One - One Class" },
          { title: "Group Tuition" },
          { title: "Hire Hourly Basis" },
        ].map((c) => (
          <div className="class-card" key={c.title}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1048/1048941.png"
              alt="Class"
            />
            <div>
              <h4>{c.title}</h4>
              <p>
                Reference site about Lorem Ipsum, giving information on its
                origins.
              </p>
              <button>Book a time</button>
            </div>
          </div>
        ))}
      </div>

      {/* Skills and Education */}
      <div className="skills-education">
        <div className="skills-box">
          <h3>Skills</h3>
          <div className="tags">
            {[
              "Castilian Spanish",
              "Spanish Tutoring",
              "Literary Translation",
              "Teaching Spanish",
              "Academic Translation",
              "Literary Translation",
            ].map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        <div className="education-box">
          <h3>Education</h3>
          <div className="tags">
            <span>Universidad de Salamanca profesora de ELE</span>
            <span>Universidad Austral</span>
            <span>Bachelor of Education</span>
          </div>
        </div>
      </div>

      {/* Other Experience */}
      <div className="experience-box">
        <h3>Other Experiences</h3>
        <div className="tags">
          <span>Spanish teacher in St Francis School Bakersfield USA</span>
          <span>
            Primary and Junior high school teacher of Spanish
          </span>
          <span>Spanish teacher in St Francis School Bakersfield USA</span>
          <span>
            Primary and Junior high school teacher of Spanish
          </span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default React.memo(Details);

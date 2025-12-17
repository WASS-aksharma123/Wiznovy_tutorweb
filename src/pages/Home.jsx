import { Star, CheckCircle } from "lucide-react";
import "../assets/Styles/Pages/Home.scss";
import englishicon from "../assets/Images/englishtutoricon.png";
import { PiArrowCircleUpRight } from "react-icons/pi";
import tutor1 from "../assets/Images/tutor1.png"
import tutor2 from "../assets/Images/tutor2.png"
import tutor3 from "../assets/Images/tutor3.png"
import { useNavigate } from "react-router-dom";


function HomePage() {
    const navigate = useNavigate();

  return (
    <div className="homepage">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Learn faster
              <br />
              with your best language
              <br />
              tutor.
            </h1>
            <div className="search-bar">
              <input type="text" placeholder="Search by keyword here..." />
              <button className="search-btn" onClick={() => navigate('/search')}>Search</button>
            </div>
          </div>
          {/* <div className="hero-image">
            <img src={herobanner} alt="Student learning" />
          </div> */}
        </div>
        <div className="carousel-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </section>

      <section className="trust-banner">
        <div className="trust-content">
          <span>
            Lorem ipsum dolor sit amet <strong>your Tutors needs you.</strong>
          </span>
          <div className="trust-indicators">
            <div className="avatars">
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="User"
              />
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="User"
              />
              <img
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="User"
              />
              <img
                src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="User"
              />
            </div>
            <div className="rating">
              <Star className="star-icon" fill="currentColor" />
              <span>4.9 Rating & Trusted By 10k +</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="tutors-section">
        <div className="section-header">
          <div>
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>Reference site about Lorem Ipsum, giving information</p>
          </div>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="tutors-grid">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={`tutor-${i}`} className="tutor-card">
              <div className="tutor-icon">
                <img src={englishicon} alt="" />
              </div>
              <div className="tutor-info">
                <h3>
                  English tutors <CheckCircle className="verified-icon" />
                </h3>

                <p>
                  Here you can select Lorem Ipsum, giving information on its
                  origins.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="progress-section">
        <div className="section-header">
          <div>
            <h2>Progress starts with the right tutor</h2>
            <p>
              240+ learners. Over 100,000 tutors. Progress that's personal (and
              proven).
            </p>
          </div>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="tutors-carousel">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={`progress-${i}`} className="tutor-profile-card">
              <div className="profile-image">
                <img
                  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Tutor"
                />
                <div className="profile-bg"></div>
              </div>
              <p>
                Working behind the scenes, our Business Technology (BT) team
                ensures Salesforce runs smoothly, efficiently, and safely!
                successfully, efficiently, and satisfactorily successfully.
              </p>
              {/* <div className="leaf-decoration"></div> */}
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>
            Find your next hire for a short task or
            <br />
            long-term growth
          </h2>
          <button className="cta-btn">Explore Wiznovy</button>
        </div>
      </section>

      <section className="top-tutors-section">
        <div className="section-header">
          <div>
            <h2>Top Tutors</h2>
            <p>Reference site about Lorem Ipsum, giving information</p>
          </div>
          <button className="view-all-btn">For Tutor</button>
        </div>
        <div className="top-tutors-grid">
          {[
            {
              color: "",
              img: tutor1,
            },
            {
              color: "",
              img: tutor2,
            },
            {
              color: "",
              img: tutor3,
            },
          ].map((tutor) => (
            <div key={tutor.img} className={`top-tutor-card ${tutor.color}`}>
              <div className="tutor-profile-img">
                <img src={tutor.img} alt="Top Tutor" />
              </div>
              <div className="tutor-details">
                <h3>Tutor name</h3>

                <PiArrowCircleUpRight className="arrow-icon" />
              </div>
              <p>
                Cashfree's UPI Autopay automates recurring payments to offer
                your customers a smooth, uninterrupted experience. Highest!
              </p>
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="section-header">
          <div>
            <h2>How it works</h2>
            <p>Reference site about Lorem Ipsum, giving information</p>
          </div>
          <button className="view-all-btn">For Tutor</button>
        </div>
        <div className="works-grid">
          {[
            {
              img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=400",
              title: "Posting jobs is always free"
            },
            {
              img: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=400",
              title: "Lorem Ipsum - All the facts"
            },
            {
              img: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400",
              title: "Lorem Ipsum - All the facts"
            },
          ].map((item) => (
            <div key={item.img} className="work-card">
              <div className="work-image">
                <img src={item.img} alt="How it works" />
              </div>
              <div className="title">
                <h3>{item.title}</h3>
                <PiArrowCircleUpRight />
              </div>

              <p>
                Reference site about Lorem Ipsum, giving information on its
                origins, as well as a random.
              </p>
            </div>
          ))}
        </div>
        <button className="cta-action-btn">CTA Action will be here</button>
      </section>
      </div>
    </div>
  );
}

export default HomePage;

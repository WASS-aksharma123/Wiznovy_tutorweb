import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFAQs } from "../store/faqSlice";
import "../assets/Styles/Pages/SupportAndHelp.scss";
import { ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const SupportAndHelp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { faqs, loading, error } = useSelector(state => state.faq);

  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  const renderFAQContent = () => {
    if (loading) {
      return <p>Loading FAQs...</p>;
    }
    
    if (error) {
      return <p className="error-message">Failed to load FAQs. Please try again later.</p>;
    }
    
    if (faqs.length === 0) {
      return <p>No FAQs available at the moment.</p>;
    }
    
    return faqs.map((item) => (
      <div key={item.id} className="faq-item">
        <div className="faq-text">
          <h4>{item.question}</h4>
          <p>{item.answer}</p>
        </div>
        <ArrowRight className="arrow-icon" />
      </div>
    ));
  };

  return (
    <div className="support-help-page">
      {/* <h2 className="page-title">Support & Help Ticketing</h2> */}

      {/* My Tickets Section */}
      {/* <div className="card-section">
        <div className="card">
          <div className="card-icon">
            🎟️
          </div>
          <div className="card-content">
            <h3>My Tickets</h3>
            <p>View All Chats With Support</p>
          </div>
          <ArrowRight className="arrow-icon" />
        </div>
      </div> */}

      {/* Need More Help */}
      <div className="section">
        <h3 className="section-title">Need Help</h3>
       <Link to={'/contact'}>
        <div className="card">
          <div className="card-icon">💬</div>
          <div className="card-content">
            <h4>Connect Now With Us</h4>
            <p>Get Everything You Want To Know Here</p>
          </div>
          <ArrowRight className="arrow-icon" />
        </div>
       </Link>
      </div>

      {/* Recommended FAQ */}
      <div className="section">
        <div className="section-header">
          <h3>Recommended FAQ For You</h3>
        </div>

        <div className="faq-list">
          {renderFAQContent()}
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <h4>Need Further Assistance?</h4>
        <p>We Are Here To Help You!</p>
        <button className="contact-btn" onClick={() => navigate("/contact")}>Contact Us</button>
      </div>
    </div>
  );
};

export default SupportAndHelp;

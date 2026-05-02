import { CheckCircle, Users, Search, MessageSquare, Calendar, Star } from 'lucide-react';
import '../../assets/Styles/FooterPages/HowToHire.scss';

const HowToHire = () => {
  const steps = [
    {
      icon: <Search size={32} />,
      title: 'Post Your Job',
      description: 'Tell us what you need. Browse tutor profiles and invite them to apply.',
      color: '#5b9bd5'
    },
    {
      icon: <Users size={32} />,
      title: 'Review Proposals',
      description: 'Compare profiles, reviews, and proposals. Interview your favorites.',
      color: '#00b4d8'
    },
    {
      icon: <MessageSquare size={32} />,
      title: 'Start Working',
      description: 'Hire the best fit and collaborate with ease through our platform.',
      color: '#ff6b35'
    }
  ];

  const benefits = [
    'Access to qualified tutors worldwide',
    'Secure payment protection',
    'Easy communication tools',
    'Flexible hiring options',
    'Quality guarantee',
    '24/7 support available'
  ];

  const tutorTypes = [
    {
      title: 'Subject Experts',
      description: 'Find specialized tutors for any subject from Math to Languages',
      icon: '📚'
    },
    {
      title: 'Test Prep Coaches',
      description: 'Prepare for exams with experienced test preparation tutors',
      icon: '🎯'
    },
    {
      title: 'Language Teachers',
      description: 'Learn new languages from native speakers and certified teachers',
      icon: '🌍'
    },
    {
      title: 'Skill Trainers',
      description: 'Master new skills with professional trainers and mentors',
      icon: '💡'
    }
  ];

  return (
    <div className="how-to-hire-page">
      <section className="hero-sectionn">
        <div className="hero-content">
          <h1 className="fade-in">How to Hire a Tutor</h1>
          <p className="fade-in-delay">Find the perfect tutor for your learning needs in just a few simple steps</p>
        </div>
      </section>

      <section className="steps-section">
        <h2>Three Simple Steps to Get Started</h2>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="step-number">{index + 1}</div>
              <div className="step-icon" style={{ color: step.color }}>
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="tutor-types-section">
        <h2>Find the Right Tutor for You</h2>
        <div className="tutor-types-grid">
          {tutorTypes.map((type, index) => (
            <div key={index} className="tutor-type-card fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="type-icon">{type.icon}</div>
              <h3>{type.title}</h3>
              <p>{type.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefits-content">
          <div className="benefits-text">
            <h2>Why Hire Through Our Platform?</h2>
            <p className="subtitle">We make hiring tutors safe, simple, and effective</p>
            <ul className="benefits-list">
              {benefits.map((benefit, index) => (
                <li key={index} className="benefit-item slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CheckCircle size={20} className="check-icon" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="benefits-image">
            <div className="image-placeholder">
              <Star size={80} className="star-icon" />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-sectionn">
        <div className="cta-content">
          <Calendar size={48} className="cta-icon" />
          <h2>Ready to Find Your Perfect Tutor?</h2>
          <p>Join thousands of satisfied learners who found their ideal tutor</p>
          <button className="cta-button">Get Started Now</button>
        </div>
      </section>
    </div>
  );
};

export default HowToHire;

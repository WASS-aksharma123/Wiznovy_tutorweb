import { useState, useEffect } from 'react';
import { 
  Globe, 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Heart, 
  Target, 
  Lightbulb,
  ArrowRight,
  Star,
  GraduationCap,
  Building,
  MapPin,
  Calendar,
  CheckCircle,
  Zap
} from 'lucide-react';
import '../../assets/Styles/FooterPages/OurImpact.scss';

const OurImpact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeImpact, setActiveImpact] = useState(null);
  const [countUp, setCountUp] = useState({
    students: 0,
    tutors: 0,
    countries: 0,
    sessions: 0
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Animate counters
    const targets = {
      students: 2000000,
      tutors: 50000,
      countries: 50,
      sessions: 5000000
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    Object.keys(targets).forEach(key => {
      const increment = targets[key] / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= targets[key]) {
          current = targets[key];
          clearInterval(timer);
        }
        setCountUp(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepDuration);
    });
  }, []);

  const impactStats = [
    {
      icon: <Users />,
      value: countUp.students.toLocaleString() + '+',
      label: 'Students Empowered',
      description: 'Lives transformed through personalized education'
    },
    {
      icon: <GraduationCap />,
      value: countUp.tutors.toLocaleString() + '+',
      label: 'Expert Tutors',
      description: 'Qualified educators making a difference'
    },
    {
      icon: <Globe />,
      value: countUp.countries + '+',
      label: 'Countries Served',
      description: 'Global reach breaking educational barriers'
    },
    {
      icon: <BookOpen />,
      value: countUp.sessions.toLocaleString() + '+',
      label: 'Learning Sessions',
      description: 'Hours of knowledge shared and growth achieved'
    }
  ];

  const impactAreas = [
    {
      id: 1,
      title: 'Educational Accessibility',
      icon: <Globe />,
      description: 'Breaking down geographical and economic barriers to quality education',
      achievements: [
        'Reached underserved communities in 50+ countries',
        'Provided scholarships to 10,000+ students',
        'Enabled learning in 25+ languages',
        'Created mobile-first platform for developing regions'
      ],
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 2,
      title: 'Academic Excellence',
      icon: <Award />,
      description: 'Driving measurable improvements in student performance and outcomes',
      achievements: [
        '85% average grade improvement within 3 months',
        '95% student satisfaction rate',
        '78% increase in subject confidence',
        '92% goal achievement rate'
      ],
      image: 'https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 3,
      title: 'Economic Empowerment',
      icon: <TrendingUp />,
      description: 'Creating sustainable income opportunities for educators worldwide',
      achievements: [
        'Generated $50M+ in tutor earnings',
        'Enabled 15,000+ tutors to work full-time',
        'Average 40% income increase for tutors',
        'Supported educators in 40+ countries'
      ],
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 4,
      title: 'Technology Innovation',
      icon: <Lightbulb />,
      description: 'Pioneering educational technology for personalized learning experiences',
      achievements: [
        'AI-powered matching algorithm',
        'Real-time progress tracking',
        'Interactive virtual classrooms',
        '99.9% platform uptime reliability'
      ],
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const milestones = [
    {
      year: '2015',
      title: 'WIZNONVY Founded',
      description: 'Started with a vision to democratize quality education globally',
      icon: <Zap />
    },
    {
      year: '2017',
      title: 'Global Expansion',
      description: 'Reached 10 countries and 10,000 students',
      icon: <Globe />
    },
    {
      year: '2019',
      title: 'AI Integration',
      description: 'Launched AI-powered tutor matching and personalized learning paths',
      icon: <Lightbulb />
    },
    {
      year: '2021',
      title: 'Pandemic Response',
      description: 'Provided free access to 100,000+ students during COVID-19',
      icon: <Heart />
    },
    {
      year: '2023',
      title: '2M Students Milestone',
      description: 'Reached 2 million students across 50+ countries',
      icon: <Users />
    },
    {
      year: '2024',
      title: 'Sustainability Initiative',
      description: 'Launched carbon-neutral learning platform and green education programs',
      icon: <Target />
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Maria Santos',
      role: 'UNESCO Education Specialist',
      quote: 'WIZNONVY has revolutionized access to quality education in underserved communities. Their impact is truly transformational.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Prof. James Chen',
      role: 'Harvard Education Research',
      quote: 'The measurable outcomes and student success rates on WIZNONVY are among the highest we have seen in online education.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Sarah Williams',
      role: 'Education Policy Advisor',
      quote: 'Their commitment to educational equity and innovation sets a new standard for the industry.',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className={`our-impact ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="impact-hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Our Global
              <span className="highlight"> Impact</span>
            </h1>
            <p className="hero-subtitle">
              Transforming lives through education. Discover how WIZNONVY is making 
              quality learning accessible worldwide and creating lasting change in 
              communities across the globe.
            </p>
            <div className="hero-cta">
              <button className="cta-primary">
                View Impact Report
                <ArrowRight size={18} />
              </button>
              <button className="cta-secondary">
                Join Our Mission
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="impact-globe">
              <div className="globe-ring ring-1"></div>
              <div className="globe-ring ring-2"></div>
              <div className="globe-ring ring-3"></div>
              <div className="globe-center">
                <Globe size={60} />
              </div>
              <div className="impact-points">
                <div className="point point-1">
                  <Users size={20} />
                </div>
                <div className="point point-2">
                  <BookOpen size={20} />
                </div>
                <div className="point point-3">
                  <Award size={20} />
                </div>
                <div className="point point-4">
                  <Heart size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="impact-stats-section">
        <div className="container">
          <div className="stats-grid">
            {impactStats.map((stat, index) => (
              <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <h3>{stat.value}</h3>
                  <h4>{stat.label}</h4>
                  <p>{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Areas Section */}
      <section className="impact-areas-section">
        <div className="container">
          <div className="section-header">
            <h2>Areas of Impact</h2>
            <p>How we're making a difference across multiple dimensions</p>
          </div>
          
          <div className="impact-areas-grid">
            {impactAreas.map((area, index) => (
              <div 
                key={area.id} 
                className={`impact-area-card ${activeImpact === area.id ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setActiveImpact(activeImpact === area.id ? null : area.id)}
              >
                <div className="area-image">
                  <img src={area.image} alt={area.title} />
                  <div className="area-overlay">
                    <div className="area-icon">{area.icon}</div>
                  </div>
                </div>
                
                <div className="area-content">
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  
                  <div className="area-achievements">
                    <h4>Key Achievements</h4>
                    <ul>
                      {area.achievements.map((achievement, idx) => (
                        <li key={idx}>
                          <CheckCircle size={16} />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Journey of Impact</h2>
            <p>Milestones that shaped our mission to transform education</p>
          </div>
          
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className="timeline-item"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="timeline-marker">
                  <div className="timeline-icon">{milestone.icon}</div>
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>Recognition & Testimonials</h2>
            <p>What education leaders say about our impact</p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="testimonial-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <Star fill="currentColor" />
                  </div>
                  <p>"{testimonial.quote}"</p>
                </div>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Goals Section */}
      <section className="future-goals-section">
        <div className="container">
          <div className="goals-content">
            <div className="goals-text">
              <h2>Our 2030 Vision</h2>
              <p>
                We're committed to reaching 10 million students by 2030, 
                establishing learning centers in 100 countries, and creating 
                100,000 sustainable teaching jobs worldwide.
              </p>
              <div className="goals-list">
                <div className="goal-item">
                  <Target className="goal-icon" />
                  <div>
                    <h4>10M Students</h4>
                    <span>Empowered globally</span>
                  </div>
                </div>
                <div className="goal-item">
                  <MapPin className="goal-icon" />
                  <div>
                    <h4>100 Countries</h4>
                    <span>With learning centers</span>
                  </div>
                </div>
                <div className="goal-item">
                  <Building className="goal-icon" />
                  <div>
                    <h4>100K Jobs</h4>
                    <span>For educators</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="goals-visual">
              <div className="progress-rings">
                <div className="progress-ring ring-students">
                  <div className="ring-progress" style={{ '--progress': '20%' }}></div>
                  <div className="ring-content">
                    <span className="ring-value">20%</span>
                    <span className="ring-label">Students</span>
                  </div>
                </div>
                <div className="progress-ring ring-countries">
                  <div className="ring-progress" style={{ '--progress': '50%' }}></div>
                  <div className="ring-content">
                    <span className="ring-value">50%</span>
                    <span className="ring-label">Countries</span>
                  </div>
                </div>
                <div className="progress-ring ring-jobs">
                  <div className="ring-progress" style={{ '--progress': '50%' }}></div>
                  <div className="ring-content">
                    <span className="ring-value">50%</span>
                    <span className="ring-label">Jobs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="impact-cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Be Part of Our Impact</h2>
              <p>
                Join millions of learners and thousands of educators who are 
                creating positive change through education. Together, we can 
                build a more educated and equitable world.
              </p>
              <div className="cta-buttons">
                <button className="cta-primary">
                  Start Learning Today
                  <ArrowRight size={18} />
                </button>
                <button className="cta-secondary">
                  Become a Tutor
                </button>
              </div>
            </div>
            <div className="cta-visual">
              <div className="impact-metrics">
                <div className="metric">
                  <Calendar className="metric-icon" />
                  <div>
                    <span className="metric-value">24/7</span>
                    <span className="metric-label">Learning Support</span>
                  </div>
                </div>
                <div className="metric">
                  <Heart className="metric-icon" />
                  <div>
                    <span className="metric-value">98%</span>
                    <span className="metric-label">Satisfaction Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurImpact;
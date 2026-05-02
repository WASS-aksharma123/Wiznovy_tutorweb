import { useState, useEffect } from 'react';
import { Award, Users, Target, TrendingUp, Linkedin, Twitter, Mail, ChevronRight, Star, Globe, Heart, Lightbulb } from 'lucide-react';
import '../../assets/Styles/FooterPages/Leadership.scss';

const Leadership = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLeader, setActiveLeader] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const leaders = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      position: 'Chief Executive Officer',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Sarah brings over 15 years of experience in educational technology and has led WIZNONVY to become a global leader in online tutoring. Her vision drives our mission to make quality education accessible worldwide.',
      achievements: ['Forbes 40 Under 40', 'EdTech Leader of the Year 2023', 'Harvard Business School Alumni'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sarah@wiznonvy.com'
      },
      quote: 'Education is the most powerful weapon which you can use to change the world.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Chief Technology Officer',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Michael leads our technology vision and innovation. With a background in AI and machine learning, he ensures our platform delivers cutting-edge learning experiences.',
      achievements: ['MIT Technology Review Innovator', 'Google Developer Expert', '20+ Patents in EdTech'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'michael@wiznonvy.com'
      },
      quote: 'Technology should enhance human potential, not replace it.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Chief Operating Officer',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Emily oversees our global operations and ensures seamless delivery of educational services. Her expertise in scaling operations has been crucial to our international expansion.',
      achievements: ['Operations Excellence Award', 'Stanford MBA', 'Global Education Leader'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'emily@wiznonvy.com'
      },
      quote: 'Excellence is not a skill, it\'s an attitude that drives everything we do.'
    },
    {
      id: 4,
      name: 'David Kim',
      position: 'Chief Learning Officer',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'David shapes our educational methodology and curriculum standards. His research in personalized learning has revolutionized how we approach individual student needs.',
      achievements: ['PhD in Educational Psychology', 'Published Author', 'Learning Innovation Award'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'david@wiznonvy.com'
      },
      quote: 'Every student has unique potential waiting to be unlocked.'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      position: 'Chief Marketing Officer',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Lisa drives our brand strategy and global marketing initiatives. Her creative campaigns have helped millions discover the power of personalized learning.',
      achievements: ['Marketing Excellence Award', 'Brand Strategy Expert', 'Digital Marketing Pioneer'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'lisa@wiznonvy.com'
      },
      quote: 'Great brands are built on authentic connections and shared values.'
    },
    {
      id: 6,
      name: 'James Wilson',
      position: 'Chief Financial Officer',
      image: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'James ensures our financial stability and growth strategy. His expertise in fintech and educational funding has enabled our sustainable expansion globally.',
      achievements: ['CPA Certified', 'Financial Leadership Award', 'Investment Strategy Expert'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'james@wiznonvy.com'
      },
      quote: 'Financial discipline enables educational dreams to become reality.'
    }
  ];

  const values = [
    {
      icon: <Heart />,
      title: 'Student-Centric',
      description: 'Every decision we make puts student success at the center'
    },
    {
      icon: <Lightbulb />,
      title: 'Innovation',
      description: 'We continuously evolve to provide cutting-edge learning solutions'
    },
    {
      icon: <Globe />,
      title: 'Global Impact',
      description: 'Making quality education accessible to learners worldwide'
    },
    {
      icon: <Users />,
      title: 'Collaboration',
      description: 'We believe in the power of working together towards common goals'
    }
  ];

  const stats = [
    { label: 'Years of Experience', value: '15+', icon: <Award /> },
    { label: 'Students Impacted', value: '2M+', icon: <Users /> },
    { label: 'Countries Served', value: '50+', icon: <Globe /> },
    { label: 'Success Rate', value: '98%', icon: <Target /> }
  ];

  return (
    <div className={`leadership ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="leadership-hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Meet Our
              <span className="highlight"> Leadership </span>
              Team
            </h1>
            <p className="hero-subtitle">
              Visionary leaders driving innovation in education technology. 
              Our diverse team combines decades of experience in education, 
              technology, and business to transform learning worldwide.
            </p>
          </div>
          <div className="hero-visual">
            <div className="leadership-grid-preview">
              {leaders.slice(0, 4).map((leader, index) => (
                <div 
                  key={leader.id} 
                  className={`preview-card card-${index + 1}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <img src={leader.image} alt={leader.name} />
                  <div className="preview-info">
                    <span className="name">{leader.name.split(' ')[0]}</span>
                    <span className="role">{leader.position.split(' ')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Leadership Team</h2>
            <p>Meet the visionaries shaping the future of education</p>
          </div>
          
          <div className="leaders-grid">
            {leaders.map((leader, index) => (
              <div 
                key={leader.id} 
                className={`leader-card ${activeLeader === leader.id ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setActiveLeader(activeLeader === leader.id ? null : leader.id)}
              >
                <div className="leader-image">
                  <img src={leader.image} alt={leader.name} />
                  <div className="image-overlay">
                    <ChevronRight className="expand-icon" />
                  </div>
                </div>
                
                <div className="leader-info">
                  <h3>{leader.name}</h3>
                  <p className="position">{leader.position}</p>
                  
                  <div className="leader-social">
                    <a href={leader.social.linkedin} className="social-link">
                      <Linkedin size={16} />
                    </a>
                    <a href={leader.social.twitter} className="social-link">
                      <Twitter size={16} />
                    </a>
                    <a href={`mailto:${leader.social.email}`} className="social-link">
                      <Mail size={16} />
                    </a>
                  </div>
                </div>

                <div className="leader-details">
                  <div className="leader-quote">
                    <Star className="quote-icon" />
                    <p>"{leader.quote}"</p>
                  </div>
                  
                  <div className="leader-bio">
                    <p>{leader.bio}</p>
                  </div>
                  
                  <div className="leader-achievements">
                    <h4>Key Achievements</h4>
                    <ul>
                      {leader.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide our leadership and decision-making</p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="value-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="leadership-cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Join Our Mission</h2>
              <p>
                We're always looking for passionate individuals who share our vision 
                of transforming education through technology and innovation.
              </p>
              <div className="cta-buttons">
                <button className="cta-primary">
                  View Careers
                  <ChevronRight size={16} />
                </button>
                <button className="cta-secondary">
                  Contact Leadership
                </button>
              </div>
            </div>
            <div className="cta-visual">
              <div className="mission-metrics">
                <div className="metric">
                  <TrendingUp className="metric-icon" />
                  <div>
                    <span className="metric-value">Growing</span>
                    <span className="metric-label">Global Reach</span>
                  </div>
                </div>
                <div className="metric">
                  <Users className="metric-icon" />
                  <div>
                    <span className="metric-value">500+</span>
                    <span className="metric-label">Team Members</span>
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

export default Leadership;
import { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Award, 
  CheckCircle, 
  Star, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Search, 
  Filter, 
  TrendingUp, 
  Shield, 
  Zap, 
  Target,
  Globe,
  Briefcase,
  MessageSquare,
  Calendar,
  Play
} from 'lucide-react';
import { 
  FaCode, 
  FaDesktop, 
  FaMobile, 
  FaPaintBrush, 
  FaChartLine, 
  FaDatabase,
  FaRocket,
  FaBullhorn,
  FaCog
} from 'react-icons/fa';
import '../../assets/Styles/FooterPages/Hireanagency.scss';

const Hireanagency = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const agencyTypes = [
    {
      id: 'development',
      name: 'Development Agencies',
      icon: <FaCode />,
      description: 'Full-stack development teams for web and mobile applications',
      count: '150+'
    },
    {
      id: 'design',
      name: 'Design Studios',
      icon: <FaPaintBrush />,
      description: 'Creative agencies specializing in UI/UX and brand design',
      count: '120+'
    },
    {
      id: 'marketing',
      name: 'Marketing Agencies',
      icon: <FaBullhorn />,
      description: 'Digital marketing experts for growth and brand awareness',
      count: '200+'
    },
    {
      id: 'consulting',
      name: 'Consulting Firms',
      icon: <FaCog />,
      description: 'Strategic consulting for business transformation',
      count: '80+'
    }
  ];

  const featuredAgencies = [
    {
      id: 1,
      name: 'TechCraft Solutions',
      category: 'development',
      specialization: 'Full-Stack Development',
      rating: 4.9,
      reviews: 156,
      teamSize: '25-50',
      location: 'San Francisco, CA',
      hourlyRate: '$75-150',
      skills: ['React', 'Node.js', 'AWS', 'Mobile Apps'],
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Top Rated Plus',
      completedProjects: 200,
      responseTime: '2 hours',
      description: 'Leading development agency with expertise in modern web technologies and scalable solutions.'
    },
    {
      id: 2,
      name: 'Creative Minds Studio',
      category: 'design',
      specialization: 'UI/UX Design',
      rating: 4.8,
      reviews: 134,
      teamSize: '10-25',
      location: 'New York, NY',
      hourlyRate: '$60-120',
      skills: ['Figma', 'Adobe Suite', 'Prototyping', 'Branding'],
      logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Rising Star',
      completedProjects: 150,
      responseTime: '1 hour',
      description: 'Award-winning design studio creating exceptional user experiences and brand identities.'
    },
    {
      id: 3,
      name: 'Growth Marketing Pro',
      category: 'marketing',
      specialization: 'Digital Marketing',
      rating: 4.9,
      reviews: 189,
      teamSize: '15-30',
      location: 'Austin, TX',
      hourlyRate: '$50-100',
      skills: ['SEO', 'PPC', 'Social Media', 'Analytics'],
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Top Rated',
      completedProjects: 300,
      responseTime: '30 minutes',
      description: 'Data-driven marketing agency helping businesses achieve sustainable growth and ROI.'
    },
    {
      id: 4,
      name: 'Strategic Advisors',
      category: 'consulting',
      specialization: 'Business Consulting',
      rating: 4.7,
      reviews: 98,
      teamSize: '5-15',
      location: 'Boston, MA',
      hourlyRate: '$100-200',
      skills: ['Strategy', 'Operations', 'Finance', 'Leadership'],
      logo: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Expert',
      completedProjects: 120,
      responseTime: '4 hours',
      description: 'Elite consulting firm providing strategic guidance for enterprise transformation.'
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: 'Define Your Project',
      description: 'Clearly outline your project requirements, timeline, and budget expectations',
      icon: <Target />,
      color: '#3b82f6'
    },
    {
      step: 2,
      title: 'Browse & Compare',
      description: 'Explore our curated list of verified agencies and compare their expertise',
      icon: <Search />,
      color: '#10b981'
    },
    {
      step: 3,
      title: 'Connect & Discuss',
      description: 'Reach out to shortlisted agencies and discuss your project in detail',
      icon: <MessageSquare />,
      color: '#f59e0b'
    },
    {
      step: 4,
      title: 'Start Collaboration',
      description: 'Choose the best fit and begin your project with confidence and support',
      icon: <Zap />,
      color: '#ef4444'
    }
  ];

  const benefits = [
    {
      title: 'Vetted Agencies',
      description: 'All agencies are thoroughly screened and verified for quality and reliability',
      icon: <Shield />
    },
    {
      title: 'Diverse Expertise',
      description: 'Access agencies with specialized skills across various industries and technologies',
      icon: <Globe />
    },
    {
      title: 'Scalable Teams',
      description: 'Find agencies that can scale with your project needs and business growth',
      icon: <TrendingUp />
    },
    {
      title: 'Proven Track Record',
      description: 'Work with agencies that have demonstrated success with similar projects',
      icon: <Award />
    },
    {
      title: 'Transparent Pricing',
      description: 'Clear pricing models and no hidden fees for better budget planning',
      icon: <Briefcase />
    },
    {
      title: 'Ongoing Support',
      description: 'Dedicated support throughout your project lifecycle and beyond',
      icon: <Users />
    }
  ];

  const stats = [
    { label: 'Verified Agencies', value: '500+', icon: <Building2 /> },
    { label: 'Successful Projects', value: '10,000+', icon: <CheckCircle /> },
    { label: 'Client Satisfaction', value: '98%', icon: <Star /> },
    { label: 'Average Project Time', value: '6 weeks', icon: <Clock /> }
  ];

  const filteredAgencies = featuredAgencies.filter(agency => {
    const matchesCategory = activeCategory === 'all' || agency.category === activeCategory;
    const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agency.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agency.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`hire-agency-page ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hire Top-Rated
              <span className="highlight"> Agencies </span>
              for Your Next Project
            </h1>
            <p className="hero-subtitle">
              Connect with verified agencies and expert teams ready to bring your vision to life. 
              From startups to enterprises, find the perfect agency partner.
            </p>
            <div className="hero-search">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search agencies by name, skills, or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn">
                  <ArrowRight />
                </button>
              </div>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Verified Agencies</span>
              </div>
              <div className="stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Success Rate</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-elements">
              <div className="agency-card card-1">
                <Building2 className="card-icon" />
                <span>Development</span>
              </div>
              <div className="agency-card card-2">
                <FaPaintBrush className="card-icon" />
                <span>Design</span>
              </div>
              <div className="agency-card card-3">
                <FaBullhorn className="card-icon" />
                <span>Marketing</span>
              </div>
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

      {/* Agency Types Section */}
      <section className="agency-types-section">
        <div className="container">
          <div className="section-header">
            <h2>Find Agencies by Specialization</h2>
            <p>Discover expert agencies across different domains and industries</p>
          </div>
          <div className="agency-types-grid">
            {agencyTypes.map((type, index) => (
              <div 
                key={type.id} 
                className="agency-type-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="type-icon">{type.icon}</div>
                <h3>{type.name}</h3>
                <p>{type.description}</p>
                <div className="type-count">{type.count} agencies</div>
                <button 
                  className="explore-btn"
                  onClick={() => setActiveCategory(type.id)}
                >
                  Explore <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2>How to Hire an Agency</h2>
            <p>Simple steps to find and work with the perfect agency for your project</p>
          </div>
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div 
                key={step.step} 
                className="process-step"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="step-number" style={{ backgroundColor: step.color }}>
                  {step.step}
                </div>
                <div className="step-icon" style={{ color: step.color }}>
                  {step.icon}
                </div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="step-connector">
                    <ArrowRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agencies Section */}
      <section className="featured-agencies-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Featured Agencies</h2>
              <p>Top-performing agencies ready to take on your next project</p>
            </div>
            <div className="filters">
              <select 
                value={activeCategory} 
                onChange={(e) => setActiveCategory(e.target.value)}
                className="category-filter"
              >
                <option value="all">All Categories</option>
                <option value="development">Development</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="consulting">Consulting</option>
              </select>
              <button className="filter-btn">
                <Filter size={16} />
                More Filters
              </button>
            </div>
          </div>
          
          <div className="agencies-grid">
            {filteredAgencies.map((agency, index) => (
              <div 
                key={agency.id} 
                className="agency-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="agency-header">
                  <div className="agency-logo">
                    <img src={agency.logo} alt={agency.name} />
                  </div>
                  <div className="agency-badge">{agency.badge}</div>
                </div>
                
                <div className="agency-info">
                  <h3>{agency.name}</h3>
                  <p className="agency-specialization">{agency.specialization}</p>
                  <p className="agency-description">{agency.description}</p>
                  
                  <div className="agency-rating">
                    <div className="rating">
                      <Star fill="currentColor" size={14} />
                      <span>{agency.rating}</span>
                      <span className="reviews">({agency.reviews} reviews)</span>
                    </div>
                    <div className="location">
                      <MapPin size={12} />
                      <span>{agency.location}</span>
                    </div>
                  </div>
                  
                  <div className="agency-details">
                    <div className="detail">
                      <Users size={14} />
                      <span>{agency.teamSize} team</span>
                    </div>
                    <div className="detail">
                      <Clock size={14} />
                      <span>{agency.responseTime}</span>
                    </div>
                    <div className="detail">
                      <CheckCircle size={14} />
                      <span>{agency.completedProjects} projects</span>
                    </div>
                  </div>
                  
                  <div className="agency-skills">
                    {agency.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                    {agency.skills.length > 3 && (
                      <span className="skill-more">+{agency.skills.length - 3}</span>
                    )}
                  </div>
                  
                  <div className="agency-footer">
                    <div className="hourly-rate">
                      <span className="rate">{agency.hourlyRate}</span>
                    </div>
                    <button className="contact-btn">
                      Contact Agency
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="load-more">
            <button className="load-more-btn">View All Agencies</button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Hire Through Our Platform?</h2>
            <p>We make agency hiring safe, transparent, and successful</p>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="benefit-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Ready to Start Your Project?</h2>
              <p>Join thousands of successful businesses that found their perfect agency partner through our platform</p>
              <div className="cta-buttons">
                <button className="cta-primary">
                  <FaRocket />
                  Post Your Project
                </button>
                <button className="cta-secondary">
                  <Play size={16} />
                  See How It Works
                </button>
              </div>
            </div>
            <div className="cta-visual">
              <div className="success-metrics">
                <div className="metric">
                  <CheckCircle className="metric-icon" />
                  <div>
                    <span className="metric-value">10,000+</span>
                    <span className="metric-label">Projects Completed</span>
                  </div>
                </div>
                <div className="metric">
                  <TrendingUp className="metric-icon" />
                  <div>
                    <span className="metric-value">98%</span>
                    <span className="metric-label">Success Rate</span>
                  </div>
                </div>
                <div className="metric">
                  <Calendar className="metric-icon" />
                  <div>
                    <span className="metric-value">48h</span>
                    <span className="metric-label">Avg. Match Time</span>
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

export default Hireanagency;
import { useState, useEffect } from 'react';
import { Rocket, TrendingUp, Users, BookOpen, Award, CheckCircle, ArrowRight, Zap, Target, DollarSign, Globe, Clock } from 'lucide-react';
import '../../assets/Styles/FooterPages/FreeBusiness.scss';

const FreeBusiness = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('tools');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const freeResources = [
    {
      icon: <BookOpen />,
      title: 'Business Guides',
      description: 'Comprehensive guides to help you start and grow your tutoring business',
      features: ['Marketing strategies', 'Pricing guides', 'Client management']
    },
    {
      icon: <Users />,
      title: 'Community Access',
      description: 'Join our thriving community of educators and entrepreneurs',
      features: ['Networking events', 'Peer support', 'Expert mentorship']
    },
    {
      icon: <Zap />,
      title: 'Free Tools',
      description: 'Essential business tools to streamline your operations',
      features: ['Schedule manager', 'Invoice generator', 'Analytics dashboard']
    },
    {
      icon: <Award />,
      title: 'Certifications',
      description: 'Free courses and certifications to boost your credibility',
      features: ['Teaching methods', 'Business skills', 'Platform mastery']
    }
  ];

  const businessTools = [
    {
      name: 'Session Scheduler',
      description: 'Manage your availability and bookings effortlessly',
      icon: <Clock />,
      color: '#5b9bd5'
    },
    {
      name: 'Revenue Tracker',
      description: 'Monitor your earnings and financial growth',
      icon: <DollarSign />,
      color: '#10b981'
    },
    {
      name: 'Student Analytics',
      description: 'Track student progress and engagement metrics',
      icon: <TrendingUp />,
      color: '#ff6b35'
    },
    {
      name: 'Global Reach',
      description: 'Connect with students from around the world',
      icon: <Globe />,
      color: '#c9a959'
    }
  ];

  const successMetrics = [
    { label: 'Free Resources', value: '100+', icon: <BookOpen /> },
    { label: 'Active Tutors', value: '25,000+', icon: <Users /> },
    { label: 'Avg. Monthly Income', value: '$3,500', icon: <DollarSign /> },
    { label: 'Success Rate', value: '94%', icon: <Target /> }
  ];

  const benefits = [
    'Zero setup fees - Start your business at no cost',
    'Flexible scheduling - Work on your own terms',
    'Global student base - Teach students worldwide',
    'Secure payments - Get paid on time, every time',
    'Marketing support - We help you find students',
    'Professional development - Free training and resources',
    'Community support - Connect with fellow tutors',
    'Growth tools - Scale your business with our platform'
  ];

  const tabs = [
    { id: 'tools', label: 'Free Tools', icon: <Zap /> },
    { id: 'resources', label: 'Resources', icon: <BookOpen /> },
    { id: 'community', label: 'Community', icon: <Users /> }
  ];

  return (
    <div className={`free-business ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="free-business-hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Start Your
              <span className="highlight"> Free Business</span>
            </h1>
            <p className="hero-subtitle">
              Launch and grow your tutoring business with zero upfront costs. 
              Access powerful tools, resources, and a global marketplace—all for free.
            </p>
            <div className="hero-cta">
              <button className="cta-primary">
                <Rocket size={20} />
                Start Free Today
                <ArrowRight size={18} />
              </button>
              <button className="cta-secondary">
                Learn More
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">$0</span>
                <span className="stat-label">Setup Cost</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">24/7</span>
                <span className="stat-label">Support</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">100+</span>
                <span className="stat-label">Free Tools</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-cards">
              <div className="float-card card-1">
                <TrendingUp size={24} />
                <span>Grow Revenue</span>
              </div>
              <div className="float-card card-2">
                <Users size={24} />
                <span>Find Students</span>
              </div>
              <div className="float-card card-3">
                <Award size={24} />
                <span>Build Reputation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="metrics-section">
        <div className="container">
          <div className="metrics-grid">
            {successMetrics.map((metric, index) => (
              <div key={index} className="metric-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="metric-icon">{metric.icon}</div>
                <h3>{metric.value}</h3>
                <p>{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources Section */}
      <section className="resources-section">
        <div className="container">
          <div className="section-header">
            <h2>Everything You Need to Succeed</h2>
            <p>Powerful resources to launch and scale your tutoring business</p>
          </div>
          <div className="resources-grid">
            {freeResources.map((resource, index) => (
              <div key={index} className="resource-card" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="resource-icon">{resource.icon}</div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <ul className="feature-list">
                  {resource.features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Tools Section */}
      <section className="tools-section">
        <div className="container">
          <div className="section-header">
            <h2>Free Business Tools</h2>
            <p>Professional-grade tools to manage and grow your business</p>
          </div>
          
          <div className="tabs-container">
            <div className="tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="tools-grid">
            {businessTools.map((tool, index) => (
              <div key={index} className="tool-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="tool-icon" style={{ background: tool.color }}>
                  {tool.icon}
                </div>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <button className="tool-btn">
                  Explore Tool
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2>Why Choose Our Free Business Platform?</h2>
              <p className="subtitle">
                We believe in empowering educators. That's why we provide everything 
                you need to build a successful tutoring business—completely free.
              </p>
              <ul className="benefits-list">
                {benefits.map((benefit, index) => (
                  <li key={index} className="benefit-item" style={{ animationDelay: `${index * 0.08}s` }}>
                    <CheckCircle size={20} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="benefits-visual">
              <div className="visual-card">
                <div className="visual-header">
                  <Rocket size={48} />
                  <h3>Launch in Minutes</h3>
                </div>
                <div className="visual-steps">
                  <div className="step">
                    <span className="step-number">1</span>
                    <span className="step-text">Create your profile</span>
                  </div>
                  <div className="step">
                    <span className="step-number">2</span>
                    <span className="step-text">Set your availability</span>
                  </div>
                  <div className="step">
                    <span className="step-number">3</span>
                    <span className="step-text">Start teaching</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="container">
          <div className="section-header">
            <h2>Success Stories</h2>
            <p>Real tutors building real businesses on our platform</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">
                I started with zero investment and now earn over $4,000 monthly. 
                The free tools and support made all the difference.
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Sarah Johnson</h4>
                  <span>Math Tutor</span>
                </div>
                <div className="author-stats">
                  <span>$4,200/mo</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">
                The platform gave me everything I needed to transition from 
                traditional teaching to running my own successful business.
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Michael Chen</h4>
                  <span>Language Teacher</span>
                </div>
                <div className="author-stats">
                  <span>150+ Students</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-mark">"</div>
              <p className="testimonial-text">
                No hidden fees, no surprises. Just a straightforward platform 
                that helps me focus on what I love—teaching.
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>Emily Rodriguez</h4>
                  <span>Science Tutor</span>
                </div>
                <div className="author-stats">
                  <span>4.9★ Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-icon">
              <Rocket size={64} />
            </div>
            <h2>Ready to Start Your Free Business?</h2>
            <p>
              Join thousands of successful tutors who are building thriving businesses 
              on our platform. No credit card required. No hidden fees. Just pure opportunity.
            </p>
            <div className="cta-buttons">
              <button className="cta-primary">
                Get Started Free
                <ArrowRight size={20} />
              </button>
              <button className="cta-secondary">
                Schedule a Demo
              </button>
            </div>
            <div className="cta-features">
              <div className="feature">
                <CheckCircle size={18} />
                <span>Free forever</span>
              </div>
              <div className="feature">
                <CheckCircle size={18} />
                <span>No credit card needed</span>
              </div>
              <div className="feature">
                <CheckCircle size={18} />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreeBusiness;

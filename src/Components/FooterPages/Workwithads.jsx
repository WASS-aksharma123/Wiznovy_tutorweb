import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Target, Users, Zap, BarChart3, Globe, Award, CheckCircle, ArrowRight, Play, Sparkles } from 'lucide-react';
import '../../assets/Styles/FooterPages/Workwithads.scss';

const Workwithads = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('monetize');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const benefits = [
    {
      icon: <DollarSign size={32} />,
      title: 'Earn Extra Income',
      description: 'Monetize your content and skills by displaying relevant ads to your audience',
      color: '#10b981'
    },
    {
      icon: <Target size={32} />,
      title: 'Targeted Advertising',
      description: 'Show ads that match your audience interests for better engagement',
      color: '#3b82f6'
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Real-time Analytics',
      description: 'Track your earnings and performance with detailed insights',
      color: '#8b5cf6'
    },
    {
      icon: <Globe size={32} />,
      title: 'Global Reach',
      description: 'Connect with advertisers from around the world',
      color: '#f59e0b'
    }
  ];

  const features = [
    'Flexible ad placement options',
    'Multiple ad formats supported',
    'Transparent revenue sharing',
    'No minimum traffic required',
    'Quick approval process',
    'Dedicated support team',
    'Monthly payouts',
    'Performance optimization tools'
  ];

  const steps = [
    {
      number: '01',
      title: 'Sign Up',
      description: 'Create your account and complete your profile with relevant information',
      icon: <Users />
    },
    {
      number: '02',
      title: 'Set Preferences',
      description: 'Choose ad types, placement, and customize settings to match your content',
      icon: <Target />
    },
    {
      number: '03',
      title: 'Start Earning',
      description: 'Publish content and start earning from ads displayed to your audience',
      icon: <TrendingUp />
    }
  ];

  const adFormats = [
    {
      title: 'Display Ads',
      description: 'Banner and image ads that blend seamlessly with your content',
      icon: '🖼️',
      earnings: 'Up to $5 CPM'
    },
    {
      title: 'Video Ads',
      description: 'Engaging video advertisements with higher earning potential',
      icon: '🎥',
      earnings: 'Up to $15 CPM'
    },
    {
      title: 'Native Ads',
      description: 'Sponsored content that matches your platform style',
      icon: '📱',
      earnings: 'Up to $8 CPM'
    },
    {
      title: 'Text Ads',
      description: 'Simple text-based ads with high click-through rates',
      icon: '📝',
      earnings: 'Up to $3 CPM'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Publishers', icon: <Users /> },
    { value: '$2M+', label: 'Paid Out Monthly', icon: <DollarSign /> },
    { value: '95%', label: 'Satisfaction Rate', icon: <Award /> },
    { value: '24/7', label: 'Support Available', icon: <Zap /> }
  ];

  return (
    <div className={`workwithads-page ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="ads-hero-section">
        <div className="hero-background">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="badge">
              <Sparkles size={16} />
              <span>Start Monetizing Today</span>
            </div>
            <h1 className="hero-title">
              Turn Your Content Into
              <span className="highlight"> Revenue</span>
            </h1>
            <p className="hero-subtitle">
              Join thousands of content creators earning passive income through our 
              intelligent ad platform. Simple setup, transparent earnings, and full control.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">
                Get Started Free
                <ArrowRight size={18} />
              </button>
              <button className="btn-secondary">
                <Play size={18} />
                Watch Demo
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="earnings-card">
              <div className="card-header">
                <span>Your Earnings</span>
                <TrendingUp className="trend-icon" />
              </div>
              <div className="card-amount">$2,847.50</div>
              <div className="card-growth">+23.5% this month</div>
              <div className="mini-chart">
                <div className="bar" style={{ height: '40%' }}></div>
                <div className="bar" style={{ height: '60%' }}></div>
                <div className="bar" style={{ height: '45%' }}></div>
                <div className="bar" style={{ height: '80%' }}></div>
                <div className="bar" style={{ height: '70%' }}></div>
                <div className="bar" style={{ height: '90%' }}></div>
                <div className="bar" style={{ height: '100%' }}></div>
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
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Work With Our Ads Platform?</h2>
            <p>Everything you need to maximize your earning potential</p>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="benefit-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="benefit-icon" style={{ color: benefit.color }}>
                  {benefit.icon}
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Formats Section */}
      <section className="ad-formats-section">
        <div className="container">
          <div className="section-header">
            <h2>Choose Your Ad Format</h2>
            <p>Multiple formats to match your content style</p>
          </div>
          <div className="formats-grid">
            {adFormats.map((format, index) => (
              <div 
                key={index} 
                className="format-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="format-icon">{format.icon}</div>
                <h3>{format.title}</h3>
                <p>{format.description}</p>
                <div className="format-earnings">{format.earnings}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Get started in three simple steps</p>
          </div>
          <div className="steps-container">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="step-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="step-number">{step.number}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {index < steps.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-content">
            <div className="features-text">
              <h2>Everything You Need to Succeed</h2>
              <p className="subtitle">
                Our platform provides all the tools and support you need to maximize 
                your ad revenue while maintaining a great user experience.
              </p>
              <ul className="features-list">
                {features.map((feature, index) => (
                  <li 
                    key={index} 
                    className="feature-item"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <CheckCircle size={20} className="check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="features-visual">
              <div className="visual-card card-1">
                <BarChart3 size={40} />
                <span>Analytics Dashboard</span>
              </div>
              <div className="visual-card card-2">
                <DollarSign size={40} />
                <span>Revenue Tracking</span>
              </div>
              <div className="visual-card card-3">
                <Target size={40} />
                <span>Ad Optimization</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ads-cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-icon">
              <Sparkles size={60} />
            </div>
            <h2>Ready to Start Earning?</h2>
            <p>Join our community of successful publishers and start monetizing your content today</p>
            <div className="cta-buttons">
              <button className="cta-primary">
                Create Free Account
                <ArrowRight size={18} />
              </button>
              <button className="cta-secondary">Contact Sales</button>
            </div>
            <div className="cta-note">
              <CheckCircle size={16} />
              <span>No credit card required • Free forever • Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Workwithads;

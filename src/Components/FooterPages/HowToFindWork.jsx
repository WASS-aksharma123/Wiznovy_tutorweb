import { useState, useEffect } from 'react';
import { Search, Target, FileText, Send, CheckCircle, TrendingUp, Award, Users, Briefcase, Star, Clock, DollarSign, Zap, BookOpen, MessageSquare, Shield } from 'lucide-react';
import '../../assets/Styles/FooterPages/HowToFindWork.scss'

const HowToFindWork = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    {
      icon: <Target size={40} />,
      title: 'Create Your Profile',
      description: 'Build a compelling profile that showcases your skills, experience, and expertise. Add your portfolio, certifications, and work samples.',
      tips: ['Use a professional photo', 'Write a clear headline', 'Highlight your top skills', 'Add relevant certifications']
    },
    {
      icon: <Search size={40} />,
      title: 'Search & Browse Jobs',
      description: 'Explore thousands of job opportunities that match your skills. Use filters to find the perfect projects for your expertise.',
      tips: ['Set up job alerts', 'Use specific keywords', 'Filter by budget & duration', 'Save interesting jobs']
    },
    {
      icon: <FileText size={40} />,
      title: 'Craft Winning Proposals',
      description: 'Write personalized proposals that stand out. Show clients why you\'re the perfect fit for their project.',
      tips: ['Read job description carefully', 'Address client needs', 'Show relevant experience', 'Set competitive rates']
    },
    {
      icon: <Send size={40} />,
      title: 'Submit & Follow Up',
      description: 'Submit your proposal and stay engaged. Respond promptly to client messages and be ready for interviews.',
      tips: ['Submit quality proposals', 'Respond within 24 hours', 'Be professional', 'Ask clarifying questions']
    }
  ];

  const categories = [
    { icon: <BookOpen />, name: 'Tutoring & Education', jobs: '2,500+' },
    { icon: <Briefcase />, name: 'Business Consulting', jobs: '1,800+' },
    { icon: <MessageSquare />, name: 'Writing & Translation', jobs: '3,200+' },
    { icon: <Target />, name: 'Marketing & Sales', jobs: '2,100+' },
    { icon: <Zap />, name: 'Design & Creative', jobs: '1,900+' },
    { icon: <Award />, name: 'Development & IT', jobs: '2,700+' }
  ];

  const successTips = [
    {
      icon: <Star />,
      title: 'Build Your Reputation',
      description: 'Deliver quality work consistently to earn 5-star reviews and build a strong reputation on the platform.'
    },
    {
      icon: <Clock />,
      title: 'Be Responsive',
      description: 'Quick response times show professionalism. Reply to messages within 24 hours to increase your chances.'
    },
    {
      icon: <DollarSign />,
      title: 'Price Competitively',
      description: 'Research market rates and price your services competitively while ensuring fair compensation for your expertise.'
    },
    {
      icon: <Shield />,
      title: 'Stay Professional',
      description: 'Maintain clear communication, meet deadlines, and always deliver what you promise to build long-term relationships.'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Jobs', icon: <Briefcase /> },
    { value: '$10M+', label: 'Paid to Freelancers', icon: <DollarSign /> },
    { value: '95%', label: 'Success Rate', icon: <TrendingUp /> },
    { value: '30K+', label: 'Happy Clients', icon: <Users /> }
  ];

  const faqs = [
    {
      question: 'How do I get started?',
      answer: 'Create a free account, complete your profile with your skills and experience, and start browsing available jobs. You can submit proposals immediately.'
    },
    {
      question: 'How much does it cost?',
      answer: 'Creating an account and browsing jobs is completely free. We only charge a small service fee when you successfully complete a project.'
    },
    {
      question: 'How do I get paid?',
      answer: 'Payments are processed securely through our platform. Once a client approves your work, funds are released to your account within 3-5 business days.'
    },
    {
      question: 'What if I have a dispute?',
      answer: 'Our support team is available 24/7 to help resolve any disputes. We have a fair mediation process to protect both freelancers and clients.'
    }
  ];

  return (
    <div className={`how-to-find-work ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="work-hero-work">
        <div className="hero-overlay">
          <div className="animated-bg">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
          </div>
        </div>
        <div className="work-hero-container">
          <div className="hero-content">
            <h1 className="fade-in">
              How to Find Work
              <span className="highlight"> & Start Earning</span>
            </h1>
            <p className="fade-in-delay">
              Your complete guide to finding freelance opportunities, landing clients, and building a successful career on our platform.
            </p>
            <div className="hero-buttons fade-in-delay-2">
              <button className="btn-primary">
                <Users size={20} />
                Create Free Profile
              </button>
              <button className="btn-secondary">
                <Search size={20} />
                Browse Jobs
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-element element-1">
              <CheckCircle size={24} />
              <span>Profile Complete</span>
            </div>
            <div className="floating-element element-2">
              <Star size={24} />
              <span>5.0 Rating</span>
            </div>
            <div className="floating-element element-3">
              <DollarSign size={24} />
              <span>$5,000 Earned</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="how-stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stat-icon">{stat.icon}</div>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="how-steps-section">
        <div className="container">
          <div className="section-header">
            <h2>4 Simple Steps to Get Started</h2>
            <p>Follow these steps to start finding work and earning on our platform</p>
          </div>
          <div className="steps-container">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step-card ${activeStep === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveStep(index)}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="step-number">{index + 1}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <ul className="step-tips">
                  {step.tips.map((tip, idx) => (
                    <li key={idx}>
                      <CheckCircle size={16} />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="how-categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Popular Job Categories</h2>
            <p>Explore opportunities across various fields and industries</p>
          </div>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div
                key={index}
                className="category-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p className="job-count">{category.jobs} jobs available</p>
                <button className="explore-btn">
                  Explore
                  <TrendingUp size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Tips Section */}
      <section className="how-tips-section">
        <div className="container">
          <div className="section-header">
            <h2>Tips for Success</h2>
            <p>Best practices to help you stand out and win more projects</p>
          </div>
          <div className="tips-grid">
            {successTips.map((tip, index) => (
              <div
                key={index}
                className="tip-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="tip-icon">{tip.icon}</div>
                <h3>{tip.title}</h3>
                <p>{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="how-faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about finding work on our platform</p>
          </div>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="how-cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-icon">
              <Award size={64} />
            </div>
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of successful freelancers earning on our platform today</p>
            <div className="cta-buttons">
              <button className="btn-cta-primary">
                Get Started Now
                <TrendingUp size={20} />
              </button>
              <button className="btn-cta-secondary">
                Learn More
              </button>
            </div>
            <div className="cta-features">
              <div className="feature-item">
                <CheckCircle size={18} />
                <span>Free to join</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={18} />
                <span>Secure payments</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={18} />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToFindWork;

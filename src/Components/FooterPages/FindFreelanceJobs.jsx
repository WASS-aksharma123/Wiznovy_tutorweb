import { useState, useEffect } from 'react';
import { Search, Briefcase, DollarSign, Clock, MapPin, Star, Filter, TrendingUp, Award, Users, ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { FaCode, FaPaintBrush, FaChartLine, FaPenNib, FaVideo, FaMicrophone } from 'react-icons/fa';
import '../../assets/Styles/FooterPages/FindFreelanceJobs.scss';

const FindFreelanceJobs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'all', name: 'All Jobs', icon: <Briefcase /> },
    { id: 'tutoring', name: 'Tutoring', icon: <Users /> },
    { id: 'writing', name: 'Writing', icon: <FaPenNib /> },
    { id: 'design', name: 'Design', icon: <FaPaintBrush /> },
    { id: 'development', name: 'Development', icon: <FaCode /> },
    { id: 'marketing', name: 'Marketing', icon: <FaChartLine /> }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Math Tutor for High School Students',
      category: 'tutoring',
      type: 'Hourly',
      budget: '$30-50/hr',
      duration: 'Long-term',
      level: 'Intermediate',
      description: 'Looking for an experienced math tutor to help high school students with algebra, geometry, and calculus.',
      skills: ['Mathematics', 'Algebra', 'Calculus', 'Teaching'],
      posted: '2 hours ago',
      proposals: 8,
      rating: 4.9,
      verified: true
    },
    {
      id: 2,
      title: 'English Language Tutor - IELTS Preparation',
      category: 'tutoring',
      type: 'Fixed',
      budget: '$500-800',
      duration: '1-3 months',
      level: 'Expert',
      description: 'Need an expert English tutor to prepare students for IELTS exam. Must have proven track record.',
      skills: ['English', 'IELTS', 'Teaching', 'Communication'],
      posted: '5 hours ago',
      proposals: 15,
      rating: 4.8,
      verified: true
    },
    {
      id: 3,
      title: 'Content Writer for Educational Blog',
      category: 'writing',
      type: 'Fixed',
      budget: '$300-600',
      duration: '1 month',
      level: 'Intermediate',
      description: 'Seeking a talented writer to create engaging educational content for our learning platform.',
      skills: ['Content Writing', 'SEO', 'Education', 'Research'],
      posted: '1 day ago',
      proposals: 22,
      rating: 4.7,
      verified: false
    },
    {
      id: 4,
      title: 'UI/UX Designer for E-Learning Platform',
      category: 'design',
      type: 'Hourly',
      budget: '$40-70/hr',
      duration: '3-6 months',
      level: 'Expert',
      description: 'Looking for a creative UI/UX designer to redesign our e-learning platform interface.',
      skills: ['UI Design', 'UX Design', 'Figma', 'Prototyping'],
      posted: '3 hours ago',
      proposals: 12,
      rating: 4.9,
      verified: true
    },
    {
      id: 5,
      title: 'React Developer for Educational App',
      category: 'development',
      type: 'Hourly',
      budget: '$50-80/hr',
      duration: '3-6 months',
      level: 'Expert',
      description: 'Need an experienced React developer to build interactive features for our educational application.',
      skills: ['React', 'JavaScript', 'Node.js', 'API Integration'],
      posted: '6 hours ago',
      proposals: 18,
      rating: 4.8,
      verified: true
    },
    {
      id: 6,
      title: 'Social Media Manager for Online Courses',
      category: 'marketing',
      type: 'Fixed',
      budget: '$400-700',
      duration: '1-3 months',
      level: 'Intermediate',
      description: 'Looking for a social media expert to promote our online courses across various platforms.',
      skills: ['Social Media', 'Marketing', 'Content Strategy', 'Analytics'],
      posted: '12 hours ago',
      proposals: 25,
      rating: 4.6,
      verified: false
    }
  ];

  const stats = [
    { icon: <Briefcase />, value: '5,000+', label: 'Active Jobs' },
    { icon: <DollarSign />, value: '$2M+', label: 'Paid to Freelancers' },
    { icon: <Users />, value: '20K+', label: 'Active Freelancers' },
    { icon: <TrendingUp />, value: '97%', label: 'Client Satisfaction' }
  ];

  const features = [
    {
      icon: <Zap />,
      title: 'Quick Apply',
      description: 'Apply to jobs in seconds with your profile'
    },
    {
      icon: <Award />,
      title: 'Verified Clients',
      description: 'Work with trusted and verified clients'
    },
    {
      icon: <DollarSign />,
      title: 'Secure Payments',
      description: 'Get paid safely and on time, every time'
    },
    {
      icon: <TrendingUp />,
      title: 'Grow Your Career',
      description: 'Build your reputation and earn more'
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = activeCategory === 'all' || job.category === activeCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`find-freelance-jobs ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="jobs-hero">
        <div className="hero-background">
          <div className="animated-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Find Your Next
              <span className="highlight"> Freelance Job</span>
            </h1>
            <p>Discover thousands of opportunities from clients worldwide. Start earning on your terms today.</p>
            
            <div className="hero-search">
              <div className="search-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for jobs, skills, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn">
                  Search Jobs
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="quick-stats">
              <div className="stat-item">
                <Briefcase size={18} />
                <span>500+ new jobs posted today</span>
              </div>
              <div className="stat-item">
                <Clock size={18} />
                <span>Average response time: 2 hours</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="floating-card card-1">
              <Briefcase className="card-icon" />
              <div className="card-content">
                <span className="card-title">New Job</span>
                <span className="card-value">$50/hr</span>
              </div>
            </div>
            <div className="floating-card card-2">
              <DollarSign className="card-icon" />
              <div className="card-content">
                <span className="card-title">Earnings</span>
                <span className="card-value">$2,450</span>
              </div>
            </div>
            <div className="floating-card card-3">
              <Star className="card-icon" />
              <div className="card-content">
                <span className="card-title">Rating</span>
                <span className="card-value">4.9★</span>
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
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Browse by Category</h2>
            <p>Find jobs that match your skills and expertise</p>
          </div>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="category-icon">{category.icon}</div>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="jobs-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Available Jobs</h2>
              <p>Browse through {filteredJobs.length} opportunities waiting for you</p>
            </div>
            <button className="filter-btn">
              <Filter size={16} />
              Advanced Filters
            </button>
          </div>

          <div className="jobs-grid">
            {filteredJobs.map((job, index) => (
              <div
                key={job.id}
                className="job-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="job-header">
                  <div className="job-title-section">
                    <h3>{job.title}</h3>
                    {job.verified && (
                      <div className="verified-badge">
                        <CheckCircle size={14} />
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="job-type-badge">{job.type}</div>
                </div>

                <p className="job-description">{job.description}</p>

                <div className="job-details">
                  <div className="detail-item">
                    <DollarSign size={14} />
                    <span>{job.budget}</span>
                  </div>
                  <div className="detail-item">
                    <Clock size={14} />
                    <span>{job.duration}</span>
                  </div>
                  <div className="detail-item">
                    <Award size={14} />
                    <span>{job.level}</span>
                  </div>
                </div>

                <div className="job-skills">
                  {job.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>

                <div className="job-footer">
                  <div className="job-meta">
                    <span className="posted-time">
                      <Clock size={12} />
                      {job.posted}
                    </span>
                    <span className="proposals">
                      <Users size={12} />
                      {job.proposals} proposals
                    </span>
                  </div>
                  <button className="apply-btn">
                    Apply Now
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="no-results">
              <Briefcase size={48} />
              <h3>No jobs found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}

          <div className="load-more">
            <button className="load-more-btn">Load More Jobs</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Freelance With Us?</h2>
            <p>Join thousands of successful freelancers earning on our platform</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="jobs-cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-icon">
              <Award size={64} />
            </div>
            <h2>Ready to Start Your Freelance Journey?</h2>
            <p>Create your profile and start applying to jobs in minutes</p>
            <div className="cta-buttons">
              <button className="cta-primary">Create Free Profile</button>
              <button className="cta-secondary">Browse All Jobs</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FindFreelanceJobs;

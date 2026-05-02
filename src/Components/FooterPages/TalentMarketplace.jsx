import { useState, useEffect } from 'react';
import { Star, CheckCircle, Search, Filter, MapPin, Clock, Award, Users, TrendingUp, ArrowRight, Play } from 'lucide-react';
import { FaCode, FaDesktop, FaMobile, FaPaintBrush, FaChartLine, FaDatabase } from 'react-icons/fa';
import '../../assets/Styles/FooterPages/TalentMarketplace.scss';

const TalentMarketplace = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'all', name: 'All Categories', icon: <Users /> },
    { id: 'development', name: 'Development', icon: <FaCode /> },
    { id: 'design', name: 'Design', icon: <FaPaintBrush /> },
    { id: 'marketing', name: 'Marketing', icon: <FaChartLine /> },
    { id: 'data', name: 'Data Science', icon: <FaDatabase /> },
    { id: 'mobile', name: 'Mobile', icon: <FaMobile /> },
  ];

  const talents = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Full Stack Developer',
      category: 'development',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 85,
      location: 'San Francisco, CA',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Top Rated',
      completedJobs: 156,
      responseTime: '1 hour'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'UI/UX Designer',
      category: 'design',
      rating: 4.8,
      reviews: 89,
      hourlyRate: 75,
      location: 'New York, NY',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Rising Talent',
      completedJobs: 78,
      responseTime: '2 hours'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'Digital Marketing Specialist',
      category: 'marketing',
      rating: 4.9,
      reviews: 203,
      hourlyRate: 65,
      location: 'Austin, TX',
      skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Top Rated Plus',
      completedJobs: 234,
      responseTime: '30 minutes'
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Data Scientist',
      category: 'data',
      rating: 4.7,
      reviews: 145,
      hourlyRate: 95,
      location: 'Seattle, WA',
      skills: ['Python', 'Machine Learning', 'SQL', 'Tableau'],
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Expert',
      completedJobs: 189,
      responseTime: '1 hour'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      title: 'Mobile App Developer',
      category: 'mobile',
      rating: 4.8,
      reviews: 167,
      hourlyRate: 80,
      location: 'Los Angeles, CA',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Top Rated',
      completedJobs: 198,
      responseTime: '45 minutes'
    },
    {
      id: 6,
      name: 'James Wilson',
      title: 'Frontend Developer',
      category: 'development',
      rating: 4.6,
      reviews: 92,
      hourlyRate: 70,
      location: 'Chicago, IL',
      skills: ['Vue.js', 'TypeScript', 'CSS', 'JavaScript'],
      avatar: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=300',
      badge: 'Rising Talent',
      completedJobs: 67,
      responseTime: '2 hours'
    }
  ];

  const filteredTalents = talents.filter(talent => {
    const matchesCategory = activeCategory === 'all' || talent.category === activeCategory;
    const matchesSearch = talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { label: 'Active Talents', value: '50,000+', icon: <Users /> },
    { label: 'Projects Completed', value: '2M+', icon: <CheckCircle /> },
    { label: 'Success Rate', value: '98%', icon: <TrendingUp /> },
    { label: 'Avg. Response Time', value: '1 hour', icon: <Clock /> }
  ];

  return (
    <div className={`talent-marketplace ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="talent-hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Find the Perfect
              <span className="highlight"> Talent </span>
              for Your Project
            </h1>
            <p className="hero-subtitle">
              Connect with top-rated freelancers and agencies from around the world. 
              Get your project done faster with verified professionals.
            </p>
            <div className="hero-search">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search for skills, services, or professionals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn">
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-cards">
              <div className="talent-card card-1">
                <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Talent" />
                <div className="card-info">
                  <span className="name">Sarah J.</span>
                  <div className="rating">
                    <Star fill="currentColor" size={12} />
                    <span>4.9</span>
                  </div>
                </div>
              </div>
              <div className="talent-card card-2">
                <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Talent" />
                <div className="card-info">
                  <span className="name">Michael C.</span>
                  <div className="rating">
                    <Star fill="currentColor" size={12} />
                    <span>4.8</span>
                  </div>
                </div>
              </div>
              <div className="talent-card card-3">
                <img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Talent" />
                <div className="card-info">
                  <span className="name">Emily R.</span>
                  <div className="rating">
                    <Star fill="currentColor" size={12} />
                    <span>4.9</span>
                  </div>
                </div>
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

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Browse by Category</h2>
            <p>Find the right talent for your specific needs</p>
          </div>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <button
                key={category.id}
                className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
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

      {/* Talents Section */}
      <section className="talents-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Top Talents</h2>
              <p>Discover verified professionals ready to work on your project</p>
            </div>
            <div className="filters">
              <button className="filter-btn">
                <Filter size={16} />
                Filters
              </button>
            </div>
          </div>
          
          <div className="talents-grid">
            {filteredTalents.map((talent, index) => (
              <div 
                key={talent.id} 
                className="talent-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="talent-header">
                  <div className="talent-avatar">
                    <img src={talent.avatar} alt={talent.name} />
                    <div className="online-indicator"></div>
                  </div>
                  <div className="talent-badge">{talent.badge}</div>
                </div>
                
                <div className="talent-info">
                  <h3>{talent.name}</h3>
                  <p className="talent-title">{talent.title}</p>
                  
                  <div className="talent-rating">
                    <div className="rating">
                      <Star fill="currentColor" size={14} />
                      <span>{talent.rating}</span>
                      <span className="reviews">({talent.reviews} reviews)</span>
                    </div>
                    <div className="location">
                      <MapPin size={12} />
                      <span>{talent.location}</span>
                    </div>
                  </div>
                  
                  <div className="talent-skills">
                    {talent.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                    {talent.skills.length > 3 && (
                      <span className="skill-more">+{talent.skills.length - 3}</span>
                    )}
                  </div>
                  
                  <div className="talent-stats">
                    <div className="stat">
                      <CheckCircle size={14} />
                      <span>{talent.completedJobs} jobs</span>
                    </div>
                    <div className="stat">
                      <Clock size={14} />
                      <span>{talent.responseTime}</span>
                    </div>
                  </div>
                  
                  <div className="talent-footer">
                    <div className="hourly-rate">
                      <span className="rate">${talent.hourlyRate}/hr</span>
                    </div>
                    <button className="contact-btn">
                      Contact
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="load-more">
            <button className="load-more-btn">Load More Talents</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="talent-cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Ready to Start Your Project?</h2>
              <p>Join thousands of satisfied clients who found their perfect match on our platform</p>
              <div className="cta-buttons">
                <button className="cta-primary">Post a Job</button>
                <button className="cta-secondary">
                  <Play size={16} />
                  Watch How It Works
                </button>
              </div>
            </div>
            <div className="cta-visual">
              <div className="success-metrics">
                <div className="metric">
                  <Award className="metric-icon" />
                  <div>
                    <span className="metric-value">98%</span>
                    <span className="metric-label">Success Rate</span>
                  </div>
                </div>
                <div className="metric">
                  <TrendingUp className="metric-icon" />
                  <div>
                    <span className="metric-value">24h</span>
                    <span className="metric-label">Avg. Hire Time</span>
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

export default TalentMarketplace;
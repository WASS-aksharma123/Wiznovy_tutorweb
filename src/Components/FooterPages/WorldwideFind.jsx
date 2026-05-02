import { useState, useEffect } from 'react';
import { Globe, MapPin, Users, Briefcase, TrendingUp, Search, Filter, Star, Clock, CheckCircle, ArrowRight, Award, Target } from 'lucide-react';
import '../../assets/Styles/FooterPages/WorldwideFind.scss';

const WorldwideFind = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeRegion, setActiveRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const regions = [
    { id: 'all', name: 'All Regions', icon: <Globe size={20} /> },
    { id: 'north-america', name: 'North America', icon: <MapPin size={20} /> },
    { id: 'europe', name: 'Europe', icon: <MapPin size={20} /> },
    { id: 'asia', name: 'Asia', icon: <MapPin size={20} /> },
    { id: 'australia', name: 'Australia', icon: <MapPin size={20} /> },
    { id: 'africa', name: 'Africa', icon: <MapPin size={20} /> }
  ];

  const opportunities = [
    {
      id: 1,
      title: 'Senior Math Tutor',
      company: 'Global Learning Academy',
      location: 'Remote - USA',
      region: 'north-america',
      type: 'Full-time',
      salary: '$45-65/hr',
      posted: '2 days ago',
      applicants: 12,
      skills: ['Calculus', 'Algebra', 'Statistics'],
      rating: 4.8
    },
    {
      id: 2,
      title: 'English Language Teacher',
      company: 'International Education Hub',
      location: 'Remote - UK',
      region: 'europe',
      type: 'Part-time',
      salary: '$35-50/hr',
      posted: '1 day ago',
      applicants: 8,
      skills: ['IELTS', 'TOEFL', 'Grammar'],
      rating: 4.9
    },
    {
      id: 3,
      title: 'Science Instructor',
      company: 'Asia Pacific Learning',
      location: 'Remote - Singapore',
      region: 'asia',
      type: 'Contract',
      salary: '$40-60/hr',
      posted: '3 days ago',
      applicants: 15,
      skills: ['Physics', 'Chemistry', 'Biology'],
      rating: 4.7
    },
    {
      id: 4,
      title: 'Programming Mentor',
      company: 'Tech Education Network',
      location: 'Remote - Australia',
      region: 'australia',
      type: 'Freelance',
      salary: '$50-75/hr',
      posted: '5 days ago',
      applicants: 20,
      skills: ['Python', 'JavaScript', 'Web Dev'],
      rating: 4.9
    },
    {
      id: 5,
      title: 'Business Studies Tutor',
      company: 'African Learning Initiative',
      location: 'Remote - South Africa',
      region: 'africa',
      type: 'Part-time',
      salary: '$30-45/hr',
      posted: '1 week ago',
      applicants: 6,
      skills: ['Economics', 'Accounting', 'Finance'],
      rating: 4.6
    },
    {
      id: 6,
      title: 'Music Theory Teacher',
      company: 'Creative Arts Academy',
      location: 'Remote - Canada',
      region: 'north-america',
      type: 'Freelance',
      salary: '$35-55/hr',
      posted: '4 days ago',
      applicants: 10,
      skills: ['Piano', 'Theory', 'Composition'],
      rating: 4.8
    }
  ];

  const stats = [
    { icon: <Briefcase />, value: '10,000+', label: 'Active Jobs' },
    { icon: <Users />, value: '50K+', label: 'Global Tutors' },
    { icon: <Globe />, value: '150+', label: 'Countries' },
    { icon: <TrendingUp />, value: '95%', label: 'Success Rate' }
  ];

  const benefits = [
    {
      icon: <Globe />,
      title: 'Work From Anywhere',
      description: 'Connect with students worldwide from the comfort of your home'
    },
    {
      icon: <Clock />,
      title: 'Flexible Schedule',
      description: 'Choose your own hours and work at your own pace'
    },
    {
      icon: <TrendingUp />,
      title: 'Competitive Pay',
      description: 'Earn competitive rates based on your expertise and experience'
    },
    {
      icon: <Award />,
      title: 'Career Growth',
      description: 'Build your reputation and grow your tutoring career globally'
    }
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesRegion = activeRegion === 'all' || opp.region === activeRegion;
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  return (
    <div className={`worldwide-find ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="worldwide-hero">
        <div className="hero-background">
          <div className="globe-animation"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Find Opportunities
              <span className="highlight"> Worldwide</span>
            </h1>
            <p>Connect with students across the globe and share your knowledge. Discover teaching opportunities that match your expertise.</p>

            <div className="hero-search">
              <div className="search-box">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by job title, skills, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-btn">
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="floating-globe">
              <Globe size={120} />
              <div className="pulse-ring"></div>
              <div className="pulse-ring delay-1"></div>
              <div className="pulse-ring delay-2"></div>
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

      {/* Regions Filter */}
      <section className="regions-section">
        <div className="container">
          <h2>Browse by Region</h2>
          <div className="regions-grid">
            {regions.map((region, index) => (
              <button
                key={region.id}
                className={`region-card ${activeRegion === region.id ? 'active' : ''}`}
                onClick={() => setActiveRegion(region.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {region.icon}
                <span>{region.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="opportunities-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Latest Opportunities</h2>
              <p>Discover teaching positions from around the world</p>
            </div>
            <button className="filter-btn">
              <Filter size={16} />
              More Filters
            </button>
          </div>

          <div className="opportunities-grid">
            {filteredOpportunities.map((opp, index) => (
              <div
                key={opp.id}
                className="opportunity-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-header">
                  <div className="company-info">
                    <div className="company-logo">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h3>{opp.title}</h3>
                      <p className="company-name">{opp.company}</p>
                    </div>
                  </div>
                  <div className="job-type">{opp.type}</div>
                </div>

                <div className="card-body">
                  <div className="location-info">
                    <MapPin size={14} />
                    <span>{opp.location}</span>
                  </div>

                  <div className="skills-tags">
                    {opp.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">{skill}</span>
                    ))}
                  </div>

                  <div className="job-meta">
                    <div className="meta-item">
                      <Clock size={14} />
                      <span>{opp.posted}</span>
                    </div>
                    <div className="meta-item">
                      <Users size={14} />
                      <span>{opp.applicants} applicants</span>
                    </div>
                    <div className="meta-item rating">
                      <Star size={14} fill="currentColor" />
                      <span>{opp.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="salary">{opp.salary}</div>
                  <button className="apply-btn">
                    Apply Now
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredOpportunities.length === 0 && (
            <div className="no-results">
              <Target size={48} />
              <h3>No opportunities found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          )}

          <div className="load-more">
            <button className="load-more-btn">View All Opportunities</button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Work With Us?</h2>
            <p>Join thousands of tutors teaching students worldwide</p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="benefit-card"
                style={{ animationDelay: `${index * 0.15}s` }}
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
      <section className="findings-cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-icon">
              <CheckCircle size={64} />
            </div>
            <h2>Ready to Start Your Global Teaching Journey?</h2>
            <p>Join our community of educators and make an impact worldwide</p>
            <div className="cta-buttons">
              <button className="cta-primary">Create Your Profile</button>
              <button className="cta-secondary">Learn More</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default WorldwideFind;

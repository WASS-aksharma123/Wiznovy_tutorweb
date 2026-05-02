import { useState, useEffect } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Heart, 
  Coffee,
  Zap,
  Award,
  Globe,
  ChevronRight,
  Search,
  Filter,
  Star,
  Target,
  Lightbulb,
  Shield
} from 'lucide-react';
import '../../assets/Styles/FooterPages/Careers.scss';

const Careers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80k - $120k',
      description: 'Build scalable educational platforms using React, Node.js, and cloud technologies.',
      requirements: ['5+ years experience', 'React & Node.js', 'AWS/Azure', 'Agile methodology']
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, USA',
      type: 'Full-time',
      salary: '$90k - $130k',
      description: 'Lead product strategy and roadmap for our learning management platform.',
      requirements: ['3+ years PM experience', 'EdTech background', 'Data-driven', 'User-centric']
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      salary: '$70k - $100k',
      description: 'Create intuitive and engaging user experiences for students and tutors.',
      requirements: ['4+ years design experience', 'Figma expert', 'User research', 'Design systems']
    },
    {
      id: 4,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'London, UK',
      type: 'Full-time',
      salary: '$75k - $110k',
      description: 'Drive growth through innovative marketing campaigns and brand strategy.',
      requirements: ['5+ years marketing', 'Digital marketing', 'Analytics', 'Team leadership']
    },
    {
      id: 5,
      title: 'Data Scientist',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$85k - $125k',
      description: 'Develop AI/ML models to personalize learning experiences and improve outcomes.',
      requirements: ['PhD or Masters', 'Python/R', 'ML frameworks', 'Statistical analysis']
    },
    {
      id: 6,
      title: 'Customer Success Manager',
      department: 'Operations',
      location: 'Toronto, Canada',
      type: 'Full-time',
      salary: '$60k - $85k',
      description: 'Ensure student and tutor satisfaction through proactive support and engagement.',
      requirements: ['3+ years CS experience', 'Communication skills', 'Problem-solving', 'CRM tools']
    }
  ];

  const benefits = [
    {
      icon: <Heart />,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and wellness programs'
    },
    {
      icon: <Coffee />,
      title: 'Work-Life Balance',
      description: 'Flexible hours, remote work options, and unlimited PTO policy'
    },
    {
      icon: <TrendingUp />,
      title: 'Career Growth',
      description: 'Professional development budget, mentorship programs, and clear career paths'
    },
    {
      icon: <DollarSign />,
      title: 'Competitive Pay',
      description: 'Market-leading salaries, equity options, and performance bonuses'
    },
    {
      icon: <Users />,
      title: 'Inclusive Culture',
      description: 'Diverse team, employee resource groups, and inclusive workplace policies'
    },
    {
      icon: <Zap />,
      title: 'Innovation Time',
      description: '20% time for personal projects, hackathons, and learning new technologies'
    }
  ];

  const values = [
    {
      icon: <Target />,
      title: 'Mission-Driven',
      description: 'We exist to make quality education accessible to everyone, everywhere'
    },
    {
      icon: <Lightbulb />,
      title: 'Innovation First',
      description: 'We embrace new ideas and technologies to solve educational challenges'
    },
    {
      icon: <Users />,
      title: 'Collaboration',
      description: 'We believe the best solutions come from diverse teams working together'
    },
    {
      icon: <Shield />,
      title: 'Integrity',
      description: 'We operate with transparency, honesty, and ethical standards'
    }
  ];

  const stats = [
    { value: '500+', label: 'Team Members', icon: <Users /> },
    { value: '30+', label: 'Countries', icon: <Globe /> },
    { value: '4.8/5', label: 'Employee Rating', icon: <Star /> },
    { value: '95%', label: 'Retention Rate', icon: <Award /> }
  ];

  const departments = ['All', 'Engineering', 'Product', 'Design', 'Marketing', 'Operations'];

  const filteredJobs = jobOpenings.filter(job => {
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  return (
    <div className={`careers ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="careers-hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Build Your Career
              <span className="highlight"> With Purpose</span>
            </h1>
            <p className="hero-subtitle">
              Join our mission to transform education globally. Work with talented 
              people, solve meaningful problems, and make a real impact on millions 
              of learners worldwide.
            </p>
            <div className="hero-cta">
              <button className="cta-primary">
                View Open Positions
                <ChevronRight size={18} />
              </button>
              <button className="cta-secondary">
                Life at WIZNONVY
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="career-illustration">
              <div className="illustration-circle circle-1"></div>
              <div className="illustration-circle circle-2"></div>
              <div className="illustration-circle circle-3"></div>
              <div className="illustration-center">
                <Briefcase size={80} />
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

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
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

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Join WIZNONVY?</h2>
            <p>We invest in our people because they're our greatest asset</p>
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

      {/* Job Openings Section */}
      <section className="jobs-section">
        <div className="container">
          <div className="section-header">
            <h2>Open Positions</h2>
            <p>Find your next opportunity to make an impact</p>
          </div>

          {/* Search and Filter */}
          <div className="jobs-controls">
            <div className="search-box">
              <Search size={20} />
              <input 
                type="text" 
                placeholder="Search positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-tabs">
              {departments.map((dept) => (
                <button
                  key={dept}
                  className={`filter-tab ${selectedDepartment === dept ? 'active' : ''}`}
                  onClick={() => setSelectedDepartment(dept)}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job Listings */}
          <div className="jobs-grid">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <div 
                  key={job.id} 
                  className="job-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="job-header">
                    <div className="job-title-section">
                      <h3>{job.title}</h3>
                      <span className="job-department">{job.department}</span>
                    </div>
                    <div className="job-meta">
                      <div className="meta-item">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={16} />
                        <span>{job.type}</span>
                      </div>
                      <div className="meta-item">
                        <DollarSign size={16} />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="job-description">{job.description}</p>
                  
                  <div className="job-requirements">
                    <h4>Requirements:</h4>
                    <div className="requirements-tags">
                      {job.requirements.map((req, idx) => (
                        <span key={idx} className="requirement-tag">{req}</span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="apply-button">
                    Apply Now
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div className="no-jobs">
                <p>No positions found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="careers-cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Don't See the Right Role?</h2>
              <p>
                We're always looking for talented individuals who share our passion 
                for education. Send us your resume and let's explore how you can 
                contribute to our mission.
              </p>
              <div className="cta-buttons">
                <button className="cta-primary">
                  Send General Application
                  <ChevronRight size={18} />
                </button>
                <button className="cta-secondary">
                  Join Our Talent Network
                </button>
              </div>
            </div>
            <div className="cta-visual">
              <div className="cta-stats">
                <div className="cta-stat">
                  <Award className="cta-stat-icon" />
                  <div>
                    <span className="cta-stat-value">Best Place to Work</span>
                    <span className="cta-stat-label">EdTech Awards 2024</span>
                  </div>
                </div>
                <div className="cta-stat">
                  <TrendingUp className="cta-stat-icon" />
                  <div>
                    <span className="cta-stat-value">Fast Growing</span>
                    <span className="cta-stat-label">Inc. 5000 Company</span>
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

export default Careers;

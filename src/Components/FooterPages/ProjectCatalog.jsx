import { useState, useEffect } from 'react';
import { Search, Filter, Star, Clock, DollarSign, CheckCircle, TrendingUp, BookOpen, Code, Palette, BarChart, Globe, Zap } from 'lucide-react';
import '../../assets/Styles/FooterPages/ProjectCatalog.scss';

const ProjectCatalog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'all', name: 'All Projects', icon: <BookOpen /> },
    { id: 'tutoring', name: 'Tutoring', icon: <BookOpen /> },
    { id: 'development', name: 'Development', icon: <Code /> },
    { id: 'design', name: 'Design', icon: <Palette /> },
    { id: 'marketing', name: 'Marketing', icon: <BarChart /> },
    { id: 'language', name: 'Language', icon: <Globe /> },
  ];

  const projects = [
    {
      id: 1,
      title: 'Math Tutoring for High School Students',
      category: 'tutoring',
      description: 'Looking for an experienced math tutor to help with algebra and calculus for grade 11-12 students.',
      budget: 500,
      duration: '2 weeks',
      level: 'Intermediate',
      proposals: 12,
      rating: 4.8,
      skills: ['Mathematics', 'Algebra', 'Calculus', 'Teaching'],
      postedTime: '2 hours ago',
      verified: true
    },
    {
      id: 2,
      title: 'English Language Conversation Practice',
      category: 'language',
      description: 'Native English speaker needed for daily conversation practice sessions to improve fluency.',
      budget: 300,
      duration: '1 month',
      level: 'Beginner',
      proposals: 8,
      rating: 4.9,
      skills: ['English', 'Communication', 'Teaching', 'IELTS'],
      postedTime: '5 hours ago',
      verified: true
    },
    {
      id: 3,
      title: 'Web Development Course Creation',
      category: 'development',
      description: 'Create a comprehensive web development course covering HTML, CSS, JavaScript, and React.',
      budget: 1200,
      duration: '1 month',
      level: 'Expert',
      proposals: 15,
      rating: 4.7,
      skills: ['React', 'JavaScript', 'HTML', 'CSS'],
      postedTime: '1 day ago',
      verified: true
    },
    {
      id: 4,
      title: 'UI/UX Design Mentorship',
      category: 'design',
      description: 'Seeking a mentor to guide through UI/UX design principles and portfolio development.',
      budget: 800,
      duration: '3 weeks',
      level: 'Intermediate',
      proposals: 10,
      rating: 4.6,
      skills: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
      postedTime: '3 hours ago',
      verified: false
    },
    {
      id: 5,
      title: 'Digital Marketing Strategy Sessions',
      category: 'marketing',
      description: 'Need expert guidance on SEO, social media marketing, and content strategy for small business.',
      budget: 600,
      duration: '2 weeks',
      level: 'Intermediate',
      proposals: 18,
      rating: 4.9,
      skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
      postedTime: '6 hours ago',
      verified: true
    },
    {
      id: 6,
      title: 'Spanish Language Lessons for Beginners',
      category: 'language',
      description: 'Looking for a patient tutor to teach Spanish from scratch with focus on conversation.',
      budget: 400,
      duration: '1 month',
      level: 'Beginner',
      proposals: 14,
      rating: 4.8,
      skills: ['Spanish', 'Teaching', 'Grammar', 'Conversation'],
      postedTime: '4 hours ago',
      verified: true
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { label: 'Active Projects', value: '5,000+', icon: <BookOpen /> },
    { label: 'Total Budget', value: '$2M+', icon: <DollarSign /> },
    { label: 'Success Rate', value: '96%', icon: <TrendingUp /> },
    { label: 'Avg. Response', value: '2 hours', icon: <Clock /> }
  ];

  return (
    <div className={`project-catalog ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="project-hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Discover
              <span className="highlight"> Amazing Projects </span>
              Waiting for You
            </h1>
            <p className="hero-subtitle">
              Browse through thousands of projects and find the perfect opportunity to showcase your skills and grow your career.
            </p>
            <div className="hero-search">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search projects by title, skills, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn">
                  <Zap />
                </button>
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
            <p>Find projects that match your expertise</p>
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

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Available Projects</h2>
              <p>Start bidding on projects that interest you</p>
            </div>
            <div className="filters">
              <button className="filter-btn">
                <Filter size={16} />
                Filters
              </button>
            </div>
          </div>
          
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="project-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-header">
                  <div className="project-meta">
                    <span className="level-badge">{project.level}</span>
                    {project.verified && (
                      <CheckCircle className="verified-icon" size={16} />
                    )}
                  </div>
                  <span className="posted-time">{project.postedTime}</span>
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-skills">
                  {project.skills.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
                
                <div className="project-details">
                  <div className="detail-item">
                    <DollarSign size={16} />
                    <span>${project.budget}</span>
                  </div>
                  <div className="detail-item">
                    <Clock size={16} />
                    <span>{project.duration}</span>
                  </div>
                  <div className="detail-item">
                    <Star size={16} fill="currentColor" />
                    <span>{project.rating}</span>
                  </div>
                </div>
                
                <div className="project-footer">
                  <span className="proposals">{project.proposals} proposals</span>
                  <button className="bid-btn">Submit Proposal</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="project-cta-section">
        <div className="container">
          <div className="cta-content">
            <Zap className="cta-icon" size={48} />
            <h2>Ready to Start Your Next Project?</h2>
            <p>Post your project and get proposals from talented professionals within hours</p>
            <button className="cta-button">Post a Project</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectCatalog;

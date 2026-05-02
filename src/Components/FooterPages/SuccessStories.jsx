import { useState, useEffect } from 'react';
import { Star, TrendingUp, Award, Users, Quote, ArrowRight, Play, CheckCircle, Target, Briefcase } from 'lucide-react';
import '../../assets/Styles/FooterPages/SuccessStories.scss';

const SuccessStories = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStory, setActiveStory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'all', name: 'All Stories' },
    { id: 'students', name: 'Students' },
    { id: 'tutors', name: 'Tutors' },
    { id: 'business', name: 'Business' }
  ];

  const stories = [
    {
      id: 1,
      category: 'students',
      name: 'Emma Thompson',
      role: 'High School Student',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievement: 'Improved Math Grade from C to A+',
      story: 'I was struggling with calculus and felt completely lost. After connecting with my tutor on WIZNONVY, everything changed. The personalized approach and flexible scheduling helped me understand complex concepts. Within 3 months, I went from a C to an A+ and gained confidence in my abilities.',
      results: [
        { label: 'Grade Improvement', value: '2 Grades' },
        { label: 'Sessions Completed', value: '45' },
        { label: 'Time to Success', value: '3 Months' }
      ],
      quote: 'WIZNONVY transformed my academic journey. The platform made learning enjoyable and effective.',
      videoUrl: '#'
    },
    {
      id: 2,
      category: 'tutors',
      name: 'Michael Rodriguez',
      role: 'Professional Tutor',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievement: 'Built Successful Tutoring Career',
      story: 'As a former teacher, I wanted more flexibility and the ability to reach students globally. WIZNONVY provided the perfect platform. I now work with students from 15 countries, set my own schedule, and earn more than I did in traditional teaching while making a real impact.',
      results: [
        { label: 'Students Taught', value: '200+' },
        { label: 'Countries Reached', value: '15' },
        { label: 'Monthly Income', value: '$5,000+' }
      ],
      quote: 'This platform gave me the freedom to teach on my terms while reaching students worldwide.',
      videoUrl: '#'
    },
    {
      id: 3,
      category: 'students',
      name: 'Sarah Chen',
      role: 'College Student',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievement: 'Mastered Spanish in 6 Months',
      story: 'I needed to learn Spanish for my study abroad program. My WIZNONVY tutor created a customized curriculum that fit my learning style. Through consistent sessions and practical conversations, I achieved fluency faster than I thought possible. I\'m now confidently studying in Barcelona!',
      results: [
        { label: 'Proficiency Level', value: 'Fluent' },
        { label: 'Study Duration', value: '6 Months' },
        { label: 'Practice Hours', value: '120+' }
      ],
      quote: 'Learning Spanish opened doors I never imagined. Thank you WIZNONVY!',
      videoUrl: '#'
    },
    {
      id: 4,
      category: 'business',
      name: 'David Park',
      role: 'Startup Founder',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievement: 'Upskilled Team with Expert Tutors',
      story: 'Our startup needed to quickly upskill our development team in new technologies. WIZNONVY connected us with industry experts who provided tailored training. The flexible scheduling and quality instruction helped our team master React and Node.js in record time, accelerating our product launch.',
      results: [
        { label: 'Team Members Trained', value: '12' },
        { label: 'Technologies Learned', value: '5' },
        { label: 'Time Saved', value: '40%' }
      ],
      quote: 'WIZNONVY was instrumental in our team\'s rapid growth and product success.',
      videoUrl: '#'
    },
    {
      id: 5,
      category: 'students',
      name: 'Lisa Anderson',
      role: 'SAT Prep Student',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievement: 'Scored 1520 on SAT',
      story: 'I was aiming for top universities and needed an exceptional SAT score. My WIZNONVY tutor developed a strategic study plan focusing on my weak areas. The personalized attention and proven strategies helped me achieve a 1520, opening doors to my dream schools.',
      results: [
        { label: 'SAT Score', value: '1520' },
        { label: 'Score Increase', value: '+280' },
        { label: 'Prep Duration', value: '4 Months' }
      ],
      quote: 'The targeted preparation made all the difference. I got into my dream university!',
      videoUrl: '#'
    },
    {
      id: 6,
      category: 'tutors',
      name: 'James Wilson',
      role: 'Language Tutor',
      image: 'https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievement: 'Grew from Part-time to Full-time',
      story: 'I started tutoring English as a side hustle. The platform\'s tools, student matching system, and reliable payment made it easy to grow. Within a year, I transitioned to full-time tutoring, doubled my income, and now help students from around the world achieve their language goals.',
      results: [
        { label: 'Monthly Students', value: '50+' },
        { label: 'Income Growth', value: '200%' },
        { label: 'Rating', value: '4.9/5' }
      ],
      quote: 'WIZNONVY turned my passion for teaching into a thriving career.',
      videoUrl: '#'
    }
  ];

  const stats = [
    { label: 'Success Stories', value: '10,000+', icon: <Award /> },
    { label: 'Average Improvement', value: '85%', icon: <TrendingUp /> },
    { label: 'Student Satisfaction', value: '98%', icon: <Star /> },
    { label: 'Lives Changed', value: '50,000+', icon: <Users /> }
  ];

  const filteredStories = selectedCategory === 'all' 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);

  return (
    <div className={`success-stories ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="success-hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Real Stories,
              <span className="highlight"> Real Success</span>
            </h1>
            <p className="hero-subtitle">
              Discover how students, tutors, and businesses are achieving their goals 
              through personalized learning on WIZNONVY. These are their inspiring journeys.
            </p>
            <div className="hero-cta">
              <button className="cta-primary">
                Share Your Story
                <ArrowRight size={18} />
              </button>
              <button className="cta-secondary">
                <Play size={18} />
                Watch Video
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="success-badges">
              <div className="badge badge-1">
                <Star fill="currentColor" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="badge badge-2">
                <TrendingUp />
                <span>85% Improvement</span>
              </div>
              <div className="badge badge-3">
                <Users />
                <span>50K+ Students</span>
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

      {/* Categories Filter */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-filter">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="stories-section">
        <div className="container">
          <div className="stories-grid">
            {filteredStories.map((story, index) => (
              <div 
                key={story.id} 
                className={`story-card ${activeStory === story.id ? 'expanded' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="story-header">
                  <div className="story-image">
                    <img src={story.image} alt={story.name} />
                    <div className="play-overlay" onClick={() => setActiveStory(activeStory === story.id ? null : story.id)}>
                      <Play size={32} />
                    </div>
                  </div>
                  <div className="story-intro">
                    <h3>{story.name}</h3>
                    <p className="role">{story.role}</p>
                    <div className="achievement">
                      <CheckCircle size={16} />
                      <span>{story.achievement}</span>
                    </div>
                  </div>
                </div>

                <div className="story-content">
                  <div className="story-quote">
                    <Quote className="quote-icon" />
                    <p>{story.quote}</p>
                  </div>

                  <div className="story-text">
                    <p>{story.story}</p>
                  </div>

                  <div className="story-results">
                    <h4>Key Results</h4>
                    <div className="results-grid">
                      {story.results.map((result, idx) => (
                        <div key={idx} className="result-item">
                          <span className="result-value">{result.value}</span>
                          <span className="result-label">{result.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    className="read-more-btn"
                    onClick={() => setActiveStory(activeStory === story.id ? null : story.id)}
                  >
                    {activeStory === story.id ? 'Show Less' : 'Read Full Story'}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Global Impact</h2>
            <p>Making a difference in education worldwide</p>
          </div>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-icon">
                <Target />
              </div>
              <h3>Academic Excellence</h3>
              <p>Students achieve an average grade improvement of 2 levels within 3 months of personalized tutoring.</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon">
                <Briefcase />
              </div>
              <h3>Career Growth</h3>
              <p>Tutors build sustainable careers with flexible schedules and competitive earnings on our platform.</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon">
                <Users />
              </div>
              <h3>Global Community</h3>
              <p>Connecting learners and educators from over 50 countries, breaking down geographical barriers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="success-cta-section">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Ready to Write Your Success Story?</h2>
              <p>
                Join thousands of students and tutors who are achieving their goals 
                through personalized learning. Your journey starts here.
              </p>
              <div className="cta-buttons">
                <button className="cta-primary">
                  Get Started Today
                  <ArrowRight size={18} />
                </button>
                <button className="cta-secondary">
                  Become a Tutor
                </button>
              </div>
            </div>
            <div className="cta-visual">
              <div className="testimonial-preview">
                <div className="testimonial-item">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill="currentColor" size={16} />
                    ))}
                  </div>
                  <p>"Life-changing experience!"</p>
                  <span>- Emma T.</span>
                </div>
                <div className="testimonial-item">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} fill="currentColor" size={16} />
                    ))}
                  </div>
                  <p>"Best investment in my education"</p>
                  <span>- Michael R.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;

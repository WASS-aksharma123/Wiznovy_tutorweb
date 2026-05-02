import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  Calendar, 
  Eye, 
  MessageCircle, 
  Share2,
  Target,
  Gift,
  Zap,
  CheckCircle,
  Star,
  Play
} from 'lucide-react';
import '../../assets/Styles/FooterPages/BlogAffiliateProgramme.scss';

const BlogAffiliateProgramme = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('blog');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const blogCategories = [
    { id: 'all', name: 'All Posts' },
    { id: 'education', name: 'Education' },
    { id: 'technology', name: 'Technology' },
    { id: 'career', name: 'Career Tips' },
    { id: 'success', name: 'Success Stories' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Online Learning: Trends to Watch in 2024',
      excerpt: 'Discover the latest trends shaping the future of online education and how they impact students and educators.',
      category: 'education',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      readTime: '5 min read',
      views: 1250,
      comments: 23,
      image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true
    },
    {
      id: 2,
      title: 'How AI is Revolutionizing Personalized Learning',
      excerpt: 'Explore how artificial intelligence is creating more personalized and effective learning experiences.',
      category: 'technology',
      author: 'Michael Chen',
      date: '2024-01-12',
      readTime: '7 min read',
      views: 980,
      comments: 18,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 3,
      title: '10 Essential Skills Every Remote Worker Needs',
      excerpt: 'Master these crucial skills to excel in the remote work environment and advance your career.',
      category: 'career',
      author: 'Emily Rodriguez',
      date: '2024-01-10',
      readTime: '6 min read',
      views: 1450,
      comments: 31,
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 4,
      title: 'From Struggling Student to Top Performer: Maria\'s Journey',
      excerpt: 'Read how Maria transformed her academic performance with personalized tutoring and dedication.',
      category: 'success',
      author: 'David Park',
      date: '2024-01-08',
      readTime: '4 min read',
      views: 2100,
      comments: 45,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 5,
      title: 'Building Effective Study Habits for Online Learning',
      excerpt: 'Learn proven strategies to maximize your learning potential in virtual environments.',
      category: 'education',
      author: 'Lisa Thompson',
      date: '2024-01-05',
      readTime: '8 min read',
      views: 875,
      comments: 19,
      image: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 6,
      title: 'The Rise of Micro-Learning: Learning in Small Bites',
      excerpt: 'Discover how micro-learning is making education more accessible and effective for busy professionals.',
      category: 'technology',
      author: 'James Wilson',
      date: '2024-01-03',
      readTime: '5 min read',
      views: 1320,
      comments: 27,
      image: 'https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  const affiliateStats = [
    { label: 'Active Affiliates', value: '5,000+', icon: <Users /> },
    { label: 'Total Commissions Paid', value: '$2.5M+', icon: <DollarSign /> },
    { label: 'Average Monthly Earnings', value: '$850', icon: <TrendingUp /> },
    { label: 'Top Performer Earnings', value: '$15K+', icon: <Award /> }
  ];

  const affiliateBenefits = [
    {
      icon: <DollarSign />,
      title: 'Competitive Commissions',
      description: 'Earn up to 30% commission on every successful referral with our tiered commission structure.'
    },
    {
      icon: <Target />,
      title: 'Marketing Support',
      description: 'Access professional marketing materials, banners, and content to boost your conversion rates.'
    },
    {
      icon: <Zap />,
      title: 'Real-time Tracking',
      description: 'Monitor your performance with our advanced analytics dashboard and real-time reporting.'
    },
    {
      icon: <Gift />,
      title: 'Bonus Rewards',
      description: 'Unlock special bonuses and incentives as you reach higher performance milestones.'
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div className={`blog-affiliate-programme ${isVisible ? 'visible' : ''}`}>
      {/* Hero Section */}
      <section className="blog-affiliate-hero">
        <div className="container">
          <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="highlight">Blog</span> & Affiliate
              <br />Programme
            </h1>
            <p className="hero-subtitle">
              Stay informed with our latest insights and join our affiliate program 
              to earn while you share the power of personalized learning.
            </p>
            <div className="hero-tabs">
              <button 
                className={`tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
                onClick={() => setActiveTab('blog')}
              >
                <BookOpen size={20} />
                Explore Blog
              </button>
              <button 
                className={`tab-btn ${activeTab === 'affiliate' ? 'active' : ''}`}
                onClick={() => setActiveTab('affiliate')}
              >
                <Users size={20} />
                Join Affiliate Program
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-elements">
              <div className="element element-1">
                <BookOpen size={32} />
              </div>
              <div className="element element-2">
                <DollarSign size={28} />
              </div>
              <div className="element element-3">
                <TrendingUp size={30} />
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Blog Section */}
      {activeTab === 'blog' && (
        <>
          {/* Featured Post */}
          {featuredPost && (
            <section className="featured-post-section">
              <div className="container">
                <div className="featured-post">
                  <div className="post-image">
                    <img src={featuredPost.image} alt={featuredPost.title} />
                    <div className="featured-badge">
                      <Star fill="currentColor" />
                      Featured
                    </div>
                  </div>
                  <div className="post-content">
                    <div className="post-meta">
                      <span className="category">{featuredPost.category}</span>
                      <span className="date">{new Date(featuredPost.date).toLocaleDateString()}</span>
                    </div>
                    <h2>{featuredPost.title}</h2>
                    <p>{featuredPost.excerpt}</p>
                    <div className="post-stats">
                      <div className="stat">
                        <Eye size={16} />
                        <span>{featuredPost.views}</span>
                      </div>
                      <div className="stat">
                        <MessageCircle size={16} />
                        <span>{featuredPost.comments}</span>
                      </div>
                      <div className="stat">
                        <Calendar size={16} />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    <button className="read-more-btn">
                      Read Full Article
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Blog Categories */}
          <section className="blog-categories">
            <div className="container">
              <div className="categories-filter">
                {blogCategories.map((category) => (
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

          {/* Blog Posts Grid */}
          <section className="blog-posts-section">
            <div className="container">
              <div className="posts-grid">
                {filteredPosts.filter(post => !post.featured).map((post, index) => (
                  <article 
                    key={post.id} 
                    className="blog-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="card-image">
                      <img src={post.image} alt={post.title} />
                      <div className="category-tag">{post.category}</div>
                    </div>
                    <div className="card-content">
                      <div className="post-meta">
                        <span className="author">By {post.author}</span>
                        <span className="date">{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <div className="card-footer">
                        <div className="post-stats">
                          <div className="stat">
                            <Eye size={14} />
                            <span>{post.views}</span>
                          </div>
                          <div className="stat">
                            <MessageCircle size={14} />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                        <div className="read-time">{post.readTime}</div>
                      </div>
                      <button className="card-btn">
                        Read More
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Affiliate Program Section */}
      {activeTab === 'affiliate' && (
        <>
          {/* Affiliate Stats */}
          <section className="affiliate-stats-section">
            <div className="container">
              <div className="stats-grid">
                {affiliateStats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="stat-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
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

          {/* How It Works */}
          <section className="how-it-works-section">
            <div className="container">
              <div className="section-header">
                <h2>How Our Affiliate Program Works</h2>
                <p>Start earning in just 3 simple steps</p>
              </div>
              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Sign Up</h3>
                    <p>Join our affiliate program for free and get instant access to your dashboard and marketing materials.</p>
                  </div>
                </div>
                <div className="step-card">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Share & Promote</h3>
                    <p>Use your unique referral links to promote WIZNONVY through your network, blog, or social media.</p>
                  </div>
                </div>
                <div className="step-card">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Earn Commissions</h3>
                    <p>Receive up to 30% commission for every successful referral. Payments are made monthly via your preferred method.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="benefits-section">
            <div className="container">
              <div className="section-header">
                <h2>Why Join Our Affiliate Program?</h2>
                <p>Unlock exclusive benefits and maximize your earning potential</p>
              </div>
              <div className="benefits-grid">
                {affiliateBenefits.map((benefit, index) => (
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

          {/* Commission Structure */}
          <section className="commission-section">
            <div className="container">
              <div className="section-header">
                <h2>Commission Structure</h2>
                <p>Earn more as you refer more students</p>
              </div>
              <div className="commission-tiers">
                <div className="tier-card tier-bronze">
                  <div className="tier-header">
                    <h3>Bronze</h3>
                    <div className="tier-commission">15%</div>
                  </div>
                  <div className="tier-requirements">
                    <p>0-10 referrals/month</p>
                  </div>
                  <ul className="tier-features">
                    <li><CheckCircle size={16} /> Basic marketing materials</li>
                    <li><CheckCircle size={16} /> Monthly payments</li>
                    <li><CheckCircle size={16} /> Email support</li>
                  </ul>
                </div>
                <div className="tier-card tier-silver">
                  <div className="tier-header">
                    <h3>Silver</h3>
                    <div className="tier-commission">20%</div>
                  </div>
                  <div className="tier-requirements">
                    <p>11-25 referrals/month</p>
                  </div>
                  <ul className="tier-features">
                    <li><CheckCircle size={16} /> Premium marketing kit</li>
                    <li><CheckCircle size={16} /> Bi-weekly payments</li>
                    <li><CheckCircle size={16} /> Priority support</li>
                    <li><CheckCircle size={16} /> Performance bonuses</li>
                  </ul>
                </div>
                <div className="tier-card tier-gold">
                  <div className="tier-badge">Most Popular</div>
                  <div className="tier-header">
                    <h3>Gold</h3>
                    <div className="tier-commission">30%</div>
                  </div>
                  <div className="tier-requirements">
                    <p>25+ referrals/month</p>
                  </div>
                  <ul className="tier-features">
                    <li><CheckCircle size={16} /> Custom marketing materials</li>
                    <li><CheckCircle size={16} /> Weekly payments</li>
                    <li><CheckCircle size={16} /> Dedicated account manager</li>
                    <li><CheckCircle size={16} /> Exclusive bonuses</li>
                    <li><CheckCircle size={16} /> Early access to new features</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2>Stay Updated</h2>
              <p>
                {activeTab === 'blog' 
                  ? 'Subscribe to our newsletter and never miss the latest educational insights and tips.'
                  : 'Get the latest affiliate program updates, tips, and exclusive offers delivered to your inbox.'
                }
              </p>
            </div>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="email-input"
              />
              <button className="subscribe-btn">
                Subscribe
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="blog-affiliate-cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>
                {activeTab === 'blog' 
                  ? 'Ready to Transform Your Learning Journey?'
                  : 'Ready to Start Earning with WIZNONVY?'
                }
              </h2>
              <p>
                {activeTab === 'blog'
                  ? 'Join thousands of students who are achieving their goals through personalized learning.'
                  : 'Join our affiliate program today and start earning while helping others discover the power of personalized education.'
                }
              </p>
              <div className="cta-buttons">
                <button className="cta-primary">
                  {activeTab === 'blog' ? 'Start Learning Today' : 'Join Affiliate Program'}
                  <ArrowRight size={18} />
                </button>
                <button className="cta-secondary">
                  <Play size={16} />
                  {activeTab === 'blog' ? 'Watch Demo' : 'Watch Success Stories'}
                </button>
              </div>
            </div>
            <div className="cta-visual">
              <div className="success-indicators">
                <div className="indicator">
                  <Star fill="currentColor" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="indicator">
                  <Users />
                  <span>50K+ {activeTab === 'blog' ? 'Students' : 'Affiliates'}</span>
                </div>
                <div className="indicator">
                  <TrendingUp />
                  <span>98% Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogAffiliateProgramme;
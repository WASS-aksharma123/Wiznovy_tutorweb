import { useState, useEffect } from 'react';
import { User, Mail, Phone, MessageSquare } from 'lucide-react';
import contactus from '../assets/Images/contactus.jpg';
import '../assets/Styles/SignIn.scss';
import "../assets/Styles/Pages/Contact.scss"
import { Link, useNavigate } from 'react-router-dom';
import { fetchContactCategories, submitContactForm } from '../services/contactService';
import { getTutorPages } from '../services/pageservice';

export default function Contact() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pages, setPages] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    concernType: '',
    message: '',
    agreeToPolicy: false
  });

  useEffect(() => {
    const loadCategories = async () => {
      const result = await fetchContactCategories();
      if (result.success) {
        setCategories(result.data);
      }
    };
    const loadPages = async () => {
      const result = await getTutorPages();
      if (result.success) {
        setPages(result.pages);
      }
    };
    loadCategories();
    loadPages();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await submitContactForm(formData);
    
    if (result.success) {
      alert('Message sent successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        concernType: '',
        message: '',
        agreeToPolicy: false
      });
    } else {
      alert(`Error: ${result.message}`);
    }
    
    setIsSubmitting(false);
  };

  const handlePrivacyPolicyClick = (e) => {
    e.preventDefault();
    const privacyPage = pages.find(page => page.title.toLowerCase().includes('privacy'));
    if (privacyPage) {
      navigate('/general-backend', { state: { pageData: privacyPage } });
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="contact">
      <div className="container">
        <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Contact Us</h1>
            <p>Have questions or need support? Reach out to the Wiznovy team for guidance, feedback, or any assistance. You’re just a message away</p>
            <button className="btn-try">Try Today</button>
          </div>
          <div className="hero-image">
            <img src={contactus} alt="Professional women" />
          </div>
        </div>
      </section>

      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Get in touch</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>
            Our friendly team would love to hear from you.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                <label htmlFor="firstName" className="form-label">First name</label>
                <div className="input-container">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    className="form-input"
                    required
                  />
                </div>
              </div>
              <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                <label htmlFor="lastName" className="form-label">Last name</label>
                <div className="input-container">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-container">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@company.com"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone number</label>
              <div className="input-container">
                <Phone className="input-icon" size={18} />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="concernType">Concern related to</label>
              <div className="input-container">
                <select
                  id="concernType"
                  name="concernType"
                  value={formData.concernType}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                  style={{ paddingLeft: '0.75rem' }}
                >
                  <option value="">Please select the concern type</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <div className="input-container">
                <MessageSquare className="input-icon" size={18} style={{ top: '0.75rem' }} />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Leave us a message... (Max 500 characters)"
                  className="form-input"
                  rows={4}
                  style={{ paddingTop: '0.75rem', resize: 'vertical', minHeight: '100px' }}
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  name="agreeToPolicy"
                  checked={formData.agreeToPolicy}
                  onChange={handleInputChange}
                  className="checkbox" 
                  required 
                />
                <span className='policyyyy'>
                  You agree to our friendly{' '}
                  <Link to="#" onClick={handlePrivacyPolicyClick} className="terms">
                    privacy policy.
                  </Link>
                </span>
              </label>
            </div>

            <button type="submit" className="signin-button" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send message'}
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}
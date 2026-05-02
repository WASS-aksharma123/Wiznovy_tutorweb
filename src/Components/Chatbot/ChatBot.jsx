import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Send, Mic, ArrowLeft, Search, UserPlus, Menu, Clock, DollarSign, Globe, BookOpen, TrendingUp, Video, Wallet, Library, User, Settings, Users, Calendar, Play, HelpCircle, Eye, History, CreditCard, Calculator, CalendarCheck, CalendarPlus, Bell, ExternalLink, RotateCcw, AlertTriangle, Mail, Wrench, DollarSign as PayoutIcon, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../assets/Styles/ChatBot/ChatBot.scss";
import chatbot from '../../assets/Images/chatBot.png';
import { getTutorProfile } from '../../store/profileSlice';
import { fetchBalance, fetchPayouts } from '../../store/walletSlice';
import { fetchTutorSessions, fetchUpcomingSessions, fetchPendingBookings } from '../../store/scheduleSlice';
import { openProfileUpdate } from '../../store/modalSlice';

const ChatBot = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [currentView, setCurrentView] = useState('main'); // 'main', 'about', 'tutor', 'student', 'howItWorks', 'earnings', 'viewBalance', 'commissionBreakdown', 'schedule', 'upcomingSessions', 'bookingRequests', 'help', 'technicalIssues', 'payoutQuestions', 'contactSupport'
  const [supportMessage, setSupportMessage] = useState('');
  const chatMessagesRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const { balance, payouts, loading } = useSelector(state => state.wallet);
  const { sessions, loading: scheduleLoading, error } = useSelector((state) => state.schedule);
  const { pendingBookings, bookingsLoading } = useSelector((state) => state.schedule);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getTutorProfile());
      dispatch(fetchBalance());
      dispatch(fetchPayouts());
    }
  }, [isAuthenticated, dispatch]);

  const guestCards = [
    { id: 1, title: "About Wiznovy", desc: "Learn about our platform", action: () => setCurrentView('about') },
    { id: 2, title: "Explore as a Tutor", desc: "Start teaching with us", action: () => setCurrentView('tutor') },
    { id: 3, title: "How It Works", desc: "Understand our process", action: () => setCurrentView('howItWorks') },
    { id: 4, title: "Explore as a Student", desc: "Begin your learning journey", action: () => setCurrentView('student') },
    { id: 5, title: "Sign Up", desc: "Create your account", action: () => { navigate('/signup'); onClose?.(); } },
    { id: 6, title: "Contact Us", desc: "Get in touch with us", action: () => { navigate('/contact'); onClose?.(); } }
  ];

  const tutorCards = [
    { id: 1, title: "My Earnings", desc: "Check your income and payouts", icon: <DollarSign size={16} />, action: () => setCurrentView('earnings') },
    { id: 2, title: "My Schedule", desc: "View and manage your sessions", icon: <Calendar size={16} />, action: () => setCurrentView('schedule') },
    { id: 3, title: "Edit Profile", desc: "Update your personal information", icon: <User size={16} />, action: () => { 
      dispatch(openProfileUpdate());
      onClose?.(); 
    }},
    { id: 4, title: "Add Subjects", desc: "Manage subjects you teach", icon: <BookOpen size={16} />, action: () => { 
      dispatch(openProfileUpdate({ scrollToField: 'subjects' }));
      onClose?.(); 
    }},
    { id: 5, title: "Update Pricing", desc: "Set your hourly rates", icon: <DollarSign size={16} />, action: () => { 
      dispatch(openProfileUpdate({ scrollToField: 'hourlyRate' }));
      onClose?.(); 
    }},
    { id: 6, title: "I Need Help", desc: "Get support and assistance", icon: <HelpCircle size={16} />, action: () => setCurrentView('help') }
  ];

  const aboutCards = [
    { id: 1, title: "Explore Tutors", desc: "Browse our verified tutors", icon: <Search size={16} />, action: () => setCurrentView('tutor') },
    { id: 2, title: "Sign Up", desc: "Create your account", icon: <UserPlus size={16} />, action: () => { navigate('/signup'); onClose?.(); } },
    { id: 3, title: "Back to Menu", desc: "Return to main menu", icon: <Menu size={16} />, action: () => setCurrentView('main') }
  ];

  const tutorActionCards = [
    { id: 1, title: "Sign Up as Tutor", desc: "Join our teaching community", icon: <UserPlus size={16} />, action: () => { navigate('/signup'); onClose?.(); } },
    { id: 2, title: "How It Works", desc: "Learn the teaching process", icon: <BookOpen size={16} />, action: () => setCurrentView('howItWorks') },
    { id: 3, title: "Back to Menu", desc: "Return to main menu", icon: <Menu size={16} />, action: () => setCurrentView('main') }
  ];

  const howItWorksCards = [
    { id: 1, title: "Sign Up", desc: "Create your free account", icon: <UserPlus size={16} />, action: () => { navigate('/signup'); onClose?.(); } },
    { id: 2, title: "Explore as a Student", desc: "Start your learning journey", icon: <BookOpen size={16} />, action: () => setCurrentView('student') },
    { id: 3, title: "Back to Menu", desc: "Return to main menu", icon: <Menu size={16} />, action: () => setCurrentView('main') }
  ];

  const studentActionCards = [
    { id: 1, title: "Sign Up", desc: "Create your account", icon: <UserPlus size={16} />, action: () => { navigate('/signup'); onClose?.(); } },
    { id: 2, title: "Explore as a Tutor", desc: "Start teaching with us", icon: <BookOpen size={16} />, action: () => setCurrentView('tutor') },
    { id: 3, title: "Back to Menu", desc: "Return to main menu", icon: <Menu size={16} />, action: () => setCurrentView('main') }
  ];

  const earningsCards = [
    { id: 1, title: "View Balance", desc: "Check your wallet balance", icon: <Eye size={16} />, action: () => {
      dispatch(fetchBalance());
      dispatch(fetchPayouts());
      setCurrentView('viewBalance');
    }},
    { id: 2, title: "Request Payout", desc: "Submit payout request", icon: <CreditCard size={16} />, action: () => { navigate('/wallet'); onClose?.(); } },
    { id: 3, title: "Commission Breakdown", desc: "Understand platform fees", icon: <Calculator size={16} />, action: () => setCurrentView('commissionBreakdown') }
  ];

  const viewBalanceCards = [
    { id: 1, title: "Request Payout", desc: "Submit payout request", icon: <CreditCard size={16} />, action: () => { navigate('/tutor/payouts'); onClose?.(); } },
    { id: 2, title: "View History", desc: "See transaction history", icon: <History size={16} />, action: () => { navigate('/transactions'); onClose?.(); } },
    { id: 3, title: "Back", desc: "Return to earnings menu", icon: <ArrowLeft size={16} />, action: () => setCurrentView('earnings') }
  ];

  const commissionCards = [
    { id: 1, title: "View My Sessions", desc: "See your teaching sessions", icon: <Calendar size={16} />, action: () => { navigate('/tutor/schedule'); onClose?.(); } },
    { id: 2, title: "Back to Menu", desc: "Return to main menu", icon: <Menu size={16} />, action: () => setCurrentView('main') }
  ];

  const scheduleCards = [
    { id: 1, title: "Upcoming Sessions", desc: "View your future sessions", icon: <CalendarCheck size={16} />, action: () => {
      dispatch(fetchTutorSessions({}));
      setCurrentView('upcomingSessions');
    }},
    { id: 2, title: "Set Availability", desc: "Manage your calendar", icon: <CalendarPlus size={16} />, action: () => { 
      dispatch(openProfileUpdate({ scrollToField: 'availableDays' }));
      onClose?.(); 
    }},
    { id: 3, title: "Booking Requests", desc: "Review pending bookings", icon: <Bell size={16} />, action: () => {
      dispatch(fetchPendingBookings());
      setCurrentView('bookingRequests');
    }}
  ];

  const upcomingSessionCards = [
    { id: 1, title: "View All Sessions", desc: "See complete schedule", icon: <Calendar size={16} />, action: () => { navigate('/tutor/sessions'); onClose?.(); } },
    { id: 2, title: "Back", desc: "Return to schedule menu", icon: <ArrowLeft size={16} />, action: () => setCurrentView('schedule') }
  ];

  const bookingRequestCards = [
    { id: 1, title: "View All Requests", desc: "Manage all bookings", icon: <Calendar size={16} />, action: () => { navigate('/tutor/bookings'); onClose?.(); } },
    { id: 2, title: "Back", desc: "Return to schedule menu", icon: <ArrowLeft size={16} />, action: () => setCurrentView('schedule') }
  ];

  const helpCards = [
    { id: 1, title: "Technical Issues", desc: "Troubleshoot platform problems", icon: <Wrench size={16} />, action: () => setCurrentView('technicalIssues') },
    { id: 2, title: "Payout Questions", desc: "Get help with payments", icon: <PayoutIcon size={16} />, action: () => setCurrentView('payoutQuestions') },
    { id: 3, title: "Contact Support", desc: "Reach our support team", icon: <Mail size={16} />, action: () => setCurrentView('contactSupport') }
  ];

  const technicalIssuesCards = [
    { id: 1, title: "Video/Audio Problems", desc: "Fix Zoom session issues", icon: <Video size={16} />, action: () => {} },
    { id: 2, title: "Login Issues", desc: "Can't access your account", icon: <User size={16} />, action: () => {} },
    { id: 3, title: "Students Can't See Availability", desc: "Calendar setup troubleshooting", icon: <CalendarPlus size={16} />, action: () => {} },
    { id: 4, title: "Platform Navigation", desc: "Help using the platform", icon: <Settings size={16} />, action: () => {} },
    { id: 5, title: "Back", desc: "Return to help menu", icon: <ArrowLeft size={16} />, action: () => setCurrentView('help') }
  ];

  const payoutQuestionsCards = [
    { id: 1, title: "When do I get paid?", desc: "Payment timeline info", icon: <Clock size={16} />, action: () => {} },
    { id: 2, title: "My payout failed", desc: "Troubleshoot failed payments", icon: <AlertTriangle size={16} />, action: () => {} },
    { id: 3, title: "Change bank account", desc: "Update payment details", icon: <CreditCard size={16} />, action: () => {} },
    { id: 4, title: "Something else", desc: "Other payout questions", icon: <MessageSquare size={16} />, action: () => {} },
    { id: 5, title: "Back", desc: "Return to help menu", icon: <ArrowLeft size={16} />, action: () => setCurrentView('help') }
  ];

  const contactSupportCards = [
    { id: 1, title: "Back", desc: "Return to help menu", icon: <ArrowLeft size={16} />, action: () => setCurrentView('help') }
  ];

  const handleCardClick = (card) => {
    if (card.action) {
      card.action();
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message.trim(),
        sender: 'user',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Auto-reply after a short delay
      setTimeout(() => {
        const botReply = {
          id: Date.now() + 1,
          text: "Thanks for your message! I'm here to help you navigate through the platform. You can use the cards above to explore different sections or ask me specific questions.",
          sender: 'bot',
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, botReply]);
      }, 1000);
    }
  };

  const handleSupportSubmit = () => {
    if (supportMessage.trim()) {
      // Create mailto link with pre-filled content
      const subject = encodeURIComponent('Tutor Support Request - Payout Question');
      const body = encodeURIComponent(`Hello Support Team,\n\n${supportMessage}\n\nTutor Name: ${profile?.tutorDetail?.name || 'N/A'}\nTutor Email: ${profile?.email || 'N/A'}\n\nThank you for your assistance.`);
      const mailtoLink = `mailto:support@wiznovy.com?subject=${subject}&body=${body}`;
      
      globalThis.location.href = mailtoLink;
      setSupportMessage('');
      setCurrentView('help');
    }
  };

  const renderHowItWorksContent = () => (
    <div className="about-content">
      <button className="back-btn" onClick={() => setCurrentView('main')}>
        <ArrowLeft size={16} /> Back
      </button>
      
      <div className="about-section">
        <h2>How Wiznovy Works</h2>
        <p>Getting started with Wiznovy is simple! Follow these easy steps to begin your personalized learning journey.</p>
      </div>

      <div className="how-it-works-steps">
        <div className="step-item">
          <div className="step-number">1</div>
          <div className="step-content">
            <User size={18} className="step-icon" />
            <div>
              <h3>Sign up for free</h3>
              <p>Takes just 2 minutes to create your account</p>
            </div>
          </div>
        </div>

        <div className="step-item">
          <div className="step-number">2</div>
          <div className="step-content">
            <Settings size={18} className="step-icon" />
            <div>
              <h3>Tell us what you want to learn</h3>
              <p>Complete onboarding to set your learning preferences</p>
            </div>
          </div>
        </div>

        <div className="step-item">
          <div className="step-number">3</div>
          <div className="step-content">
            <Users size={18} className="step-icon" />
            <div>
              <h3>Browse tutors and pick your favorite</h3>
              <p>Explore verified tutors and find the perfect match</p>
            </div>
          </div>
        </div>

        <div className="step-item">
          <div className="step-number">4</div>
          <div className="step-content">
            <Calendar size={18} className="step-icon" />
            <div>
              <h3>Book a trial session at a discounted rate</h3>
              <p>Try before you commit with our affordable trial sessions</p>
            </div>
          </div>
        </div>

        <div className="step-item">
          <div className="step-number">5</div>
          <div className="step-content">
            <Play size={18} className="step-icon" />
            <div>
              <h3>Start learning!</h3>
              <p>Begin your personalized 1-on-1 learning experience</p>
            </div>
          </div>
        </div>
      </div>

      <div className="chatbot_cards">
        {howItWorksCards.map((card) => (
          <div key={card.id} className="chatbot_card" onClick={() => handleCardClick(card)}>
            <div className="card-header">
              {card.icon}
              <h3>{card.title}</h3>
            </div>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTutorContent = () => (
    <div className="about-content">
      <button className="back-btn" onClick={() => setCurrentView('main')}>
        <ArrowLeft size={16} /> Back
      </button>
      
      <div className="about-section">
        <h2>Why Teach with Wiznovy?</h2>
        <p>Join thousands of tutors worldwide who are making a difference while earning great income. Here's what makes Wiznovy the perfect platform for educators:</p>
      </div>

      <div className="tutor-benefits">
        <div className="benefit-item">
          <Clock size={18} className="benefit-icon" />
          <div>
            <h3>Set Your Own Schedule</h3>
            <p>Complete flexibility - teach when you want, set your availability</p>
          </div>
        </div>

        <div className="benefit-item">
          <DollarSign size={18} className="benefit-icon" />
          <div>
            <h3>Set Your Own Pricing</h3>
            <p>You control your hourly rates based on your expertise and experience</p>
          </div>
        </div>

        <div className="benefit-item">
          <BookOpen size={18} className="benefit-icon" />
          <div>
            <h3>Teach Multiple Subjects</h3>
            <p>Share your knowledge across different subjects and expand your reach</p>
          </div>
        </div>

        <div className="benefit-item">
          <Globe size={18} className="benefit-icon" />
          <div>
            <h3>Reach Students Globally</h3>
            <p>Multi-timezone support connects you with learners worldwide</p>
          </div>
        </div>

        <div className="benefit-item">
          <TrendingUp size={18} className="benefit-icon" />
          <div>
            <h3>Earn 75% of Session Fees</h3>
            <p>Keep most of what you earn - only 25% platform commission</p>
          </div>
        </div>

        <div className="benefit-item">
          <Video size={18} className="benefit-icon" />
          <div>
            <h3>Zoom Integration</h3>
            <p>Seamless session management with integrated video calling</p>
          </div>
        </div>

        <div className="benefit-item">
          <Wallet size={18} className="benefit-icon" />
          <div>
            <h3>Easy Earnings Management</h3>
            <p>Track earnings and request payouts through our secure wallet system</p>
          </div>
        </div>

        <div className="benefit-item">
          <Library size={18} className="benefit-icon" />
          <div>
            <h3>Access Teaching Resources</h3>
            <p>Comprehensive library of teaching materials and educational content</p>
          </div>
        </div>
      </div>

      <div className="chatbot_cards">
        {tutorActionCards.map((card) => (
          <div key={card.id} className="chatbot_card" onClick={() => handleCardClick(card)}>
            <div className="card-header">
              {card.icon}
              <h3>{card.title}</h3>
            </div>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStudentContent = () => (
    <div className="about-content">
      <button className="back-btn" onClick={() => setCurrentView('main')}>
        <ArrowLeft size={16} /> Back
      </button>
      
      <div className="about-section">
        <h2>Why Learn with Wiznovy?</h2>
        <p>Join thousands of students worldwide who are achieving their learning goals with personalized 1-on-1 tutoring. Here's what makes Wiznovy perfect for learners:</p>
      </div>

      <div className="tutor-benefits">
        <div className="benefit-item">
          <Search size={18} className="benefit-icon" />
          <div>
            <h3>Browse 50+ subjects with verified, rated tutors</h3>
            <p>Find expert tutors across diverse subjects, all verified and rated by students</p>
          </div>
        </div>

        <div className="benefit-item">
          <Video size={18} className="benefit-icon" />
          <div>
            <h3>Flexible 1-on-1 tutoring sessions via Zoom</h3>
            <p>Personalized learning experience with seamless video integration</p>
          </div>
        </div>

        <div className="benefit-item">
          <Play size={18} className="benefit-icon" />
          <div>
            <h3>Trial sessions available to try before committing</h3>
            <p>Test compatibility with tutors through affordable trial sessions</p>
          </div>
        </div>

        <div className="benefit-item">
          <Wallet size={18} className="benefit-icon" />
          <div>
            <h3>Wallet system for easy payment and refund management</h3>
            <p>Secure, convenient payment system with transparent refund policies</p>
          </div>
        </div>

        <div className="benefit-item">
          <Clock size={18} className="benefit-icon" />
          <div>
            <h3>Student-friendly cancellation policy</h3>
            <p>Cancel 8+ hours before: 100% wallet refund<br/>
               Cancel 4-8 hours before: 50% wallet credit<br/>
               Cancel less than 4 hours before: 25% wallet credit</p>
          </div>
        </div>

        <div className="benefit-item">
          <Calendar size={18} className="benefit-icon" />
          <div>
            <h3>Reschedule penalty fee model</h3>
            <p>8+ hours before: Free (no penalty)<br/>
               4-8 hours before: 25% penalty fee<br/>
               1-4 hours before: 50% penalty fee<br/>
               Less than 1 hour before: Reschedule NOT allowed</p>
          </div>
        </div>

        <div className="benefit-item">
          <Settings size={18} className="benefit-icon" />
          <div>
            <h3>Reschedule up to 3 times per session</h3>
            <p>Maximum flexibility - even reschedule to a different tutor if needed</p>
          </div>
        </div>

        <div className="benefit-item">
          <TrendingUp size={18} className="benefit-icon" />
          <div>
            <h3>Rate and review tutors after sessions</h3>
            <p>Help the community by sharing your experience and feedback</p>
          </div>
        </div>

        <div className="benefit-item">
          <Library size={18} className="benefit-icon" />
          <div>
            <h3>Access Open Library (free educational resources)</h3>
            <p>Extensive collection of free learning materials and study resources</p>
          </div>
        </div>

        <div className="benefit-item">
          <Users size={18} className="benefit-icon" />
          <div>
            <h3>24/7 chatbot support for quick help</h3>
            <p>Get instant assistance anytime with our intelligent support system</p>
          </div>
        </div>
      </div>

      <div className="chatbot_cards">
        {studentActionCards.map((card) => (
          <div key={card.id} className="chatbot_card" onClick={() => handleCardClick(card)}>
            <div className="card-header">
              {card.icon}
              <h3>{card.title}</h3>
            </div>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );


  const renderAboutContent = () => (
    <div className="about-content">
      <button className="back-btn" onClick={() => setCurrentView('main')}>
        <ArrowLeft size={16} /> Back
      </button>
      
      <div className="about-section">
        <h2>Our Vision</h2>
        <p>Wiznovy is on a mission to make quality education accessible to everyone, everywhere. We connect students with verified tutors from around the world for personalized 1-on-1 learning.</p>
      </div>

      <div className="about-section">
        <h2>What We Offer</h2>
        <ul>
          <li>50+ subjects across academics, languages, test prep, and professional skills</li>
          <li>Verified tutors with ratings and reviews from real students</li>
          <li>Flexible scheduling -- learn on your time, from anywhere</li>
          <li>Live 1-on-1 sessions via Zoom video</li>
          <li>Secure payments with wallet system and transparent pricing</li>
          <li>Free educational resources through our Open Library</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>Why Wiznovy?</h2>
        <ul>
          <li>Try before you commit -- book a trial session first</li>
          <li>Student-friendly cancellation policy (cancel 12+ hours ahead for a full refund)</li>
          <li>Reschedule up to 3 times per session</li>
          <li>24/7 chatbot support</li>
        </ul>
      </div>

      <div className="chatbot_cards">
        {aboutCards.map((card) => (
          <div key={card.id} className="chatbot_card" onClick={() => handleCardClick(card)}>
            <div className="card-header">
              {card.icon}
              <h3>{card.title}</h3>
            </div>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEarningsContent = () => (
    <div className="about-content">
      <button className="back-btn" onClick={() => setCurrentView('main')}>
        <ArrowLeft size={16} /> Back
      </button>
      
      <div className="about-section">
        <h2>My Earnings</h2>
        <p>Manage your income, request payouts, and understand commission structure.</p>
      </div>

      <div className="chatbot_cards">
        {earningsCards.map((card) => (
          <div key={card.id} className="chatbot_card" onClick={() => handleCardClick(card)}>
            <div className="card-header">
              {card.icon}
              <h3>{card.title}</h3>
            </div>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderViewBalanceContent = () => {
    // Ensure balance is a number with proper fallback
    const availableForPayout = typeof balance === 'number' ? balance : (parseFloat(balance) || 0);
    
    // Calculate pending review amount from payouts with PENDING status
    const pendingReview = (payouts || []).reduce((total, payout) => {
      if (payout.status === 'PENDING') {
        return total + (parseFloat(payout.amount) || 0);
      }
      return total;
    }, 0);
    
    // Calculate total approved earnings from payouts
    const approvedPayouts = (payouts || []).filter(payout => 
      (payout.status || '').toLowerCase() === 'approved'
    );
    const totalApprovedEarnings = approvedPayouts.reduce((total, payout) => {
      const amount = parseFloat(payout.amount) || 0;
      return total + amount;
    }, 0);

    return (
      <div className="about-content">
        <button className="back-btn" onClick={() => setCurrentView('earnings')}>
          <ArrowLeft size={16} /> Back
        </button>
        
        <div className="about-section">
          <h2>Wallet Balance</h2>
          <p>Your current earnings breakdown:</p>
        </div>

        <div className="tutor-benefits">
          <div className="benefit-item">
            <DollarSign size={18} className="benefit-icon" />
            <div>
              <h3>Available for Payout</h3>
              <p>{loading ? 'Loading...' : `$${availableForPayout.toFixed(2)}`}</p>
            </div>
          </div>

          <div className="benefit-item">
            <Clock size={18} className="benefit-icon" />
            <div>
              <h3>Pending Review</h3>
              <p>${pendingReview.toFixed(2)}</p>
              <small style={{color: '#666', fontSize: '12px'}}>Earnings awaiting admin review for manual payout</small>
            </div>
          </div>

          <div className="benefit-item">
            <TrendingUp size={18} className="benefit-icon" />
            <div>
              <h3>Total Approved Earnings</h3>
              <p>{loading ? 'Loading...' : `$${totalApprovedEarnings.toFixed(2)}`}</p>
              <small style={{color: '#666', fontSize: '12px'}}>
                {approvedPayouts.length} approved transaction{approvedPayouts.length !== 1 ? 's' : ''}
              </small>
            </div>
          </div>
        </div>

        <div className="chatbot_cards">
          {viewBalanceCards.map((card) => (
            <div key={card.id} className="chatbot_card" onClick={() => handleCardClick(card)}>
              <div className="card-header">
                {card.icon}
                <h3>{card.title}</h3>
              </div>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCommissionBreakdownContent = () => (
    <div className="about-content">
      <button className="back-btn" onClick={() => setCurrentView('earnings')}>
        <ArrowLeft size={16} /> Back
      </button>
      
      <div className="about-section">
        <h2>Commission Breakdown</h2>
        <p><strong>Platform fee: 25% | You keep: 75%</strong></p>
        <p>Commission rate is the same for all tutors.</p>
      </div>

      <div className="tutor-benefits">
        <div className="benefit-item">
          <Calculator size={18} className="benefit-icon" />
          <div>
            <h3>Example Calculation</h3>
            <p>$40 session → Platform: $10, Tutor: $30</p>
          </div>
        </div>

        <div className="benefit-item">
          <DollarSign size={18} className="benefit-icon" />
          <div>
            <h3>How It Works</h3>
            <p>For every session you complete, you keep 75% of the session fee. The remaining 25% covers platform costs, payment processing, and support services.</p>
          </div>
        </div>

        <div className="benefit-item">
          <Wallet size={18} className="benefit-icon" />
          <div>
            <h3>Payout Process</h3>
            <p>Payouts are processed via manual bank transfer by admin. Submit your request and admin will process it manually - not automated through Stripe Connect.</p>
          </div>
        </div>
      </div>

      <div className="chatbot_cards">
        {commissionCards.map((card) => (
          <div key={card.id} className="chatbot_card" onClick={() => handleCardClick(card)}>
            <div className="card-header">
              {card.icon}
              <h3>{card.title}</h3>
            </div>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScheduleContent = () => (
    <div className="about-content">
      <button className="back-btn" onClick={() => setCurrentView('main')}>
        <ArrowLeft size={16} /> Back
      </button>
      
      <div className="about-section">
        <h2>My Schedule</h2>
        <p>Manage your upcoming sessions, set availability, and review booking requests.</p>
      </div>

      <div className="chatbot_cards">
        {scheduleCards.map((card) => (
          <div key={card.id} className="chatbot_card" onClick={() => handleCardClick(card)}>
            <div className="card-header">
              {card.icon}
              <h3>{card.title}</h3>
            </div>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const formatDateTime = (dateStr, timeStr) => {
    const date = new Date(dateStr);
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    return `${date.toLocaleDateString('en-US', options)} at ${timeStr}`;
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const renderUpcomingSessionsContent = () => {
    // Filter sessions to show only upcoming ones (same logic as MySchedule)
    const upcomingSessions = sessions?.filter(session => {
      const sessionDate = session.date || session.sessionDate || session.createdAt || session.scheduledDate;
      if (!sessionDate) return false;
      const sessionDateTime = new Date(sessionDate);
      return sessionDateTime > new Date();
    }) || [];

    return (
      <div className="about-content">
        <button className="back-btn" onClick={() => setCurrentView('schedule')}>
          <ArrowLeft size={16} /> Back
        </button>
        
        <div className="about-section">
          <h2>Upcoming Sessions</h2>
          <p>Your next 5 scheduled sessions:</p>
        </div>

        {scheduleLoading ? (
          <div className="tutor-benefits">
            <div className="benefit-item">
              <Clock size={18} className="benefit-icon" />
              <div>
                <h3>Loading...</h3>
                <p>Fetching your upcoming sessions</p>
              </div>
            </div>
          </div>
        ) : upcomingSessions?.length > 0 ? (
          <div className="tutor-benefits">
            {upcomingSessions.slice(0, 5).map((session, index) => (
              <div key={session.id || index} className="benefit-item">
                <CalendarCheck size={18} className="benefit-icon" />
                <div>
                  <h3>{formatDateTime(session.date || session.sessionDate, formatTime(session.startTime))}</h3>
                  <p><strong>Subject:</strong> {session.subject || 'General Tutoring'}</p>
                  <p><strong>Student:</strong> {session.user?.userDetail?.name || session.studentName || 'Student'}</p>
                  <p><strong>Duration:</strong> {session.duration || 60} minutes</p>
                  <div style={{marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                    {session.zoomMeeting?.startUrl && (
                      <button 
                        style={{padding: '4px 8px', fontSize: '12px', background: '#1fa7a1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                        onClick={() => globalThis.open(session.zoomMeeting.startUrl, '_blank')}
                      >
                        <ExternalLink size={12} style={{marginRight: '4px'}} />Start Session
                      </button>
                    )}
                    <button 
                      style={{padding: '4px 8px', fontSize: '12px', background: '#f0f0f0', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                      onClick={() => { navigate('/tutor/reschedule/' + session.id); onClose?.(); }}
                    >
                      <RotateCcw size={12} style={{marginRight: '4px'}} />Reschedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="tutor-benefits">
            <div className="benefit-item">
              <CalendarCheck size={18} className="benefit-icon" />
              <div>
                <h3>No Upcoming Sessions</h3>
                <p>You don't have any sessions scheduled for the near future.</p>
              </div>
            </div>
          </div>
        )}

        <div className="chatbot_cards">
          {upcomingSessionCards.map((card) => (
            <div key={card.id} className="chatbot_card" onClick={() => handleCardClick(card)}>
              <div className="card-header">
                {card.icon}
                <h3>{card.title}</h3>
              </div>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBookingRequestsContent = () => (
    <div className="about-content">
      <button className="back-btn" onClick={() => setCurrentView('schedule')}>
        <ArrowLeft size={16} /> Back
      </button>
      
      <div className="about-section">
        <h2>Booking Requests</h2>
        <p>Pending booking requests awaiting your response:</p>
      </div>

      {bookingsLoading ? (
        <div className="tutor-benefits">
          <div className="benefit-item">
            <Clock size={18} className="benefit-icon" />
            <div>
              <h3>Loading...</h3>
              <p>Fetching your booking requests</p>
            </div>
          </div>
        </div>
      ) : pendingBookings?.length > 0 ? (
        <div className="tutor-benefits">
          {pendingBookings.slice(0, 3).map((booking, index) => (
            <div key={booking.id || index} className="benefit-item">
              <Bell size={18} className="benefit-icon" />
              <div>
                <h3>{booking.studentName || booking.user?.userDetail?.name || 'Student'}</h3>
                <p><strong>Subject:</strong> {booking.subject || 'General Tutoring'}</p>
                <p><strong>Requested:</strong> {formatDateTime(booking.requestedDate, formatTime(booking.requestedTime))}</p>
                <p><strong>Duration:</strong> {booking.duration || 60} minutes</p>
                <div style={{marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                  <button 
                    style={{padding: '4px 8px', fontSize: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                    onClick={() => { navigate('/tutor/bookings/accept/' + booking.id); onClose?.(); }}
                  >
                    Accept
                  </button>
                  <button 
                    style={{padding: '4px 8px', fontSize: '12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
                    onClick={() => { navigate('/tutor/bookings/decline/' + booking.id); onClose?.(); }}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="tutor-benefits">
          <div className="benefit-item">
            <Bell size={18} className="benefit-icon" />
            <div>
              <h3>No Pending Requests</h3>
              <p>You don't have any booking requests at the moment.</p>
            </div>
          </div>
        </div>
      )}

      <div className="about-section">
        <h2>Set Availability Instructions</h2>
        <p>To manage your availability:</p>
        <ul>
          <li>Go to your calendar page to set available time slots</li>
          <li>Students can only book sessions during your available hours</li>
          <li>Update your availability regularly for better booking opportunities</li>
        </ul>
      </div>

      <div className="chatbot_cards">
        {bookingRequestCards.map((card) => (
          <div key={card.id} className="chatbot_card" onClick={() => handleCardClick(card)}>
            <div className="card-header">
              {card.icon}
              <h3>{card.title}</h3>
            </div>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );



  const renderMainContent = () => (
    <>
      <h1 className="chatbot_title">
        {isAuthenticated && profile?.tutorDetail?.name ? (
          <>Hi <span>{profile.tutorDetail.name}</span>! How can I help you today?</>
        ) : (
          "Hi! Welcome to Wiznovy. I'm here to help you get started!"
        )}
      </h1>

      <div className="chatbot_bot">
        <img src={chatbot} alt="AI Bot" />
      </div>

      <div className="chatbot_cards">
        {(isAuthenticated ? tutorCards : guestCards).map((card) => (
          <div key={card.id} className="chatbot_card" onClick={() => handleCardClick(card)}>
            {card.icon ? (
              <div className="card-header">
                {card.icon}
                <h3>{card.title}</h3>
              </div>
            ) : (
              <h3>{card.title}</h3>
            )}
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </>
  );

  const renderCurrentView = () => {
    // Show chat messages if there are any, otherwise show the normal content
    if (chatMessages.length > 0) {
      return (
        <div className="chat_view">
          <div className="chat_messages_container" ref={chatMessagesRef}>
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`chat_message ${msg.sender}`}>
                <div className="message_content">
                  {msg.text}
                </div>
                <div className="message_time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
          
          <div className="back_to_menu">
            <button 
              className="back-btn" 
              onClick={() => setChatMessages([])}
            >
              <ArrowLeft size={16} /> Back to Menu
            </button>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'about':
        return renderAboutContent();
      case 'tutor':
        return renderTutorContent();
      case 'student':
        return renderStudentContent();
      case 'howItWorks':
        return renderHowItWorksContent();
      case 'earnings':
        return renderEarningsContent();
      case 'viewBalance':
        return renderViewBalanceContent();
      case 'commissionBreakdown':
        return renderCommissionBreakdownContent();
      case 'schedule':
        return renderScheduleContent();
      case 'upcomingSessions':
        return renderUpcomingSessionsContent();
      case 'bookingRequests':
        return renderBookingRequestsContent();
      case 'help':
        return renderHelpContent();
      case 'technicalIssues':
        return renderTechnicalIssuesContent();
      case 'payoutQuestions':
        return renderPayoutQuestionsContent();
      case 'contactSupport':
        return renderContactSupportContent();
      default:
        return renderMainContent();
    }
  };

  const renderHelpContent = () => (
    <div className="about-content">
      <button className="back-btn" onClick={() => setCurrentView('main')}>
        <ArrowLeft size={16} /> Back
      </button>
      
      <div className="about-section">
        <h2>I Need Help</h2>
        <p>Get assistance with technical issues, payout questions, or contact our support team.</p>
      </div>

      <div className="chatbot_cards">
        {helpCards.map((card) => (
          <div key={card.id} className="chatbot_card" onClick={() => handleCardClick(card)}>
            <div className="card-header">
              {card.icon}
              <h3>{card.title}</h3>
            </div>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTechnicalIssuesContent = () => (
    <div className="about-content">
      <button className="back-btn" onClick={() => setCurrentView('help')}>
        <ArrowLeft size={16} /> Back
      </button>
      
      <div className="about-section">
        <h2>Technical Issues</h2>
        <p>Common technical problems and solutions for tutors:</p>
      </div>

      <div className="tutor-benefits">
        <div className="benefit-item">
          <Video size={18} className="benefit-icon" />
          <div>
            <h3>Video/Audio Problems</h3>
            <p>• Check your microphone and camera permissions</p>
            <p>• Ensure stable internet connection</p>
            <p>• Try refreshing the Zoom session</p>
            <p>• Use Chrome or Firefox for best compatibility</p>
          </div>
        </div>

        <div className="benefit-item">
          <User size={18} className="benefit-icon" />
          <div>
            <h3>Login Issues</h3>
            <p>• Clear your browser cache and cookies</p>
            <p>• Try using an incognito/private globalThis</p>
            <p>• Reset your password if needed</p>
            <p>• Disable browser extensions temporarily</p>
          </div>
        </div>

        <div className="benefit-item">
          <CalendarPlus size={18} className="benefit-icon" />
          <div>
            <h3>Students Can't See My Availability</h3>
            <p>• Go to your calendar settings and ensure availability is published</p>
            <p>• Check that your time slots are set for future dates</p>
            <p>• Verify your timezone settings are correct</p>
            <p>• Make sure you have at least one subject selected</p>
            <button 
              style={{marginTop: '8px', padding: '6px 12px', background: '#1fa7a1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
              onClick={() => { navigate('/tutor/calendar'); onClose?.(); }}
            >
              Go to Calendar Settings
            </button>
          </div>
        </div>

        <div className="benefit-item">
          <Settings size={18} className="benefit-icon" />
          <div>
            <h3>Platform Navigation</h3>
            <p>• Use the sidebar menu to access different sections</p>
            <p>• Dashboard shows your overview and quick actions</p>
            <p>• Profile section lets you update your information</p>
            <p>• Schedule section manages your sessions and availability</p>
          </div>
        </div>
      </div>

      <div className="chatbot_cards">
        {technicalIssuesCards.map((card) => (
          <div key={card.id} className="chatbot_card" onClick={() => handleCardClick(card)}>
            <div className="card-header">
              {card.icon}
              <h3>{card.title}</h3>
            </div>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPayoutQuestionsContent = () => (
    <div className="about-content">
      <button className="back-btn" onClick={() => setCurrentView('help')}>
        <ArrowLeft size={16} /> Back
      </button>
      
      <div className="about-section">
        <h2>Payout Questions</h2>
        <p>Get answers to common payout and payment questions:</p>
      </div>

      <div className="tutor-benefits">
        <div className="benefit-item">
          <Clock size={18} className="benefit-icon" />
          <div>
            <h3>When do I get paid?</h3>
            <p>Payouts are processed via manual bank transfer by admin. After your session is completed and confirmed, earnings move to "Available for Payout." Submit a payout request, and admin will process it within 3-5 business days via bank transfer.</p>
            <button 
              style={{marginTop: '8px', padding: '6px 12px', background: '#1fa7a1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
              onClick={() => { navigate('/wallet'); onClose?.(); }}
            >
              Request Payout
            </button>
          </div>
        </div>

        <div className="benefit-item">
          <AlertTriangle size={18} className="benefit-icon" />
          <div>
            <h3>My payout failed</h3>
            <p><strong>Common reasons for payout failures:</strong></p>
            <p>• Incorrect bank account details</p>
            <p>• Bank account has been closed</p>
            <p>• Minimum payout amount of $50 not met</p>
            <p>• Bank routing number is invalid</p>
            <button 
              style={{marginTop: '8px', padding: '6px 12px', background: '#1fa7a1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
              onClick={() => { navigate('/tutor/payment-settings'); onClose?.(); }}
            >
              Go to Payment Settings
            </button>
          </div>
        </div>

        <div className="benefit-item">
          <CreditCard size={18} className="benefit-icon" />
          <div>
            <h3>Change bank account</h3>
            <p><strong>To update your bank account:</strong></p>
            <p>• Go to Payment Settings in your profile</p>
            <p>• Add your new bank account details</p>
            <p>• Bank changes may require verification (1-2 business days)</p>
            <p><strong>Note:</strong> Maximum 2 bank account changes allowed per year</p>
            <button 
              style={{marginTop: '8px', padding: '6px 12px', background: '#1fa7a1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
              onClick={() => { navigate('/tutor/payment-settings'); onClose?.(); }}
            >
              Go to Payment Settings
            </button>
          </div>
        </div>

        <div className="benefit-item">
          <MessageSquare size={18} className="benefit-icon" />
          <div>
            <h3>Something else</h3>
            <p>Have a different payout question? Describe your issue below and we'll get back to you:</p>
            <textarea
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
              placeholder="Describe your payout question or issue..."
              style={{
                width: '100%',
                minHeight: '80px',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginTop: '8px',
                fontSize: '14px',
                fontFamily: 'inherit'
              }}
            />
            <button 
              style={{
                marginTop: '8px', 
                padding: '6px 12px', 
                background: supportMessage.trim() ? '#1fa7a1' : '#ccc', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: supportMessage.trim() ? 'pointer' : 'not-allowed'
              }}
              onClick={handleSupportSubmit}
              disabled={!supportMessage.trim()}
            >
              Submit to Support
            </button>
          </div>
        </div>
      </div>

      <div className="chatbot_cards">
        {payoutQuestionsCards.map((card) => (
          <div key={card.id} className="chatbot_card" onClick={() => handleCardClick(card)}>
            <div className="card-header">
              {card.icon}
              <h3>{card.title}</h3>
            </div>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContactSupportContent = () => (
    <div className="about-content">
      <button className="back-btn" onClick={() => setCurrentView('help')}>
        <ArrowLeft size={16} /> Back
      </button>
      
      <div className="about-section">
        <h2>Contact Support</h2>
        <p>Need personalized help? Reach out to our support team:</p>
      </div>

      <div className="tutor-benefits">
        <div className="benefit-item">
          <Mail size={18} className="benefit-icon" />
          <div>
            <h3>Email Support</h3>
            <p><strong>support@wiznovy.com</strong></p>
            <p>We typically respond within 24 hours during business days.</p>
            <p>Please include your tutor name and detailed description of your issue.</p>
            <button 
              style={{marginTop: '8px', padding: '6px 12px', background: '#1fa7a1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
              onClick={() => {
                const subject = encodeURIComponent('Tutor Support Request');
                const body = encodeURIComponent(`Hello Support Team,\n\n[Please describe your issue here]\n\nTutor Name: ${profile?.tutorDetail?.name || 'N/A'}\nTutor Email: ${profile?.email || 'N/A'}\n\nThank you for your assistance.`);
                globalThis.location.href = `mailto:support@wiznovy.com?subject=${subject}&body=${body}`;
              }}
            >
              Send Email
            </button>
          </div>
        </div>

        <div className="benefit-item">
          <Clock size={18} className="benefit-icon" />
          <div>
            <h3>Support Hours</h3>
            <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM EST</p>
            <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM EST</p>
            <p><strong>Sunday:</strong> Closed</p>
            <p>Emergency technical issues are handled 24/7.</p>
          </div>
        </div>

        <div className="benefit-item">
          <HelpCircle size={18} className="benefit-icon" />
          <div>
            <h3>Before Contacting Support</h3>
            <p>• Check the Technical Issues section for common solutions</p>
            <p>• Review the Payout Questions for payment-related help</p>
            <p>• Try clearing your browser cache and refreshing</p>
            <p>• Include screenshots if reporting a visual issue</p>
          </div>
        </div>
      </div>

      <div className="chatbot_cards">
        {contactSupportCards.map((card) => (
          <div key={card.id} className="chatbot_card" onClick={() => handleCardClick(card)}>
            <div className="card-header">
              {card.icon}
              <h3>{card.title}</h3>
            </div>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="chatbot_page">
      <div className="chatbot_content">
        {renderCurrentView()}
      </div>

      <div className="chatbot_controls">
        <button className="control_btn" title="Voice Input">
          <Mic size={20} />
        </button>

        <input 
          type="text" 
          placeholder="Type a question or subject..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />

        <button className="control_btn send" onClick={handleSend} title="Send Message">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
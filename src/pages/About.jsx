import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../assets/Styles/Pages/About.scss';
import women from "../assets/Images/about_women.png"
const About = () => {
  const [hoveredMember, setHoveredMember] = useState(2);

  const getImageId = (index) => {
    const imageIds = ['2379004', '2182970', '3184611', '2379005', '3184338'];
    return imageIds[index] || '3184338';
  };
  const services = [
    {
      name: 'Cloud',
      description: 'Insa data across applications. Empower stakeholders at strategic/operational virtual data in the.',
      color: 'blue'
    },
    {
      name: 'MuleSoft',
      description: 'Create connected experiences faster with the world\'s #1 trusted integration platform.',
      color: 'cyan'
    },
    {
      name: 'Tableau',
      description: 'Do more with your data with scalable insights from Tableau, the leading AI-powered analytics platform.',
      color: 'orange'
    },
    {
      name: 'Salesforce Artificial Intelligence',
      description: 'Drive productivity and personalization with predictive across the Salesforce Einstein platform.',
      color: 'purple'
    },
    {
      name: 'Slack',
      description: 'Bring your people, favorite apps together so you are your own transparent teams.',
      color: 'pink'
    }
  ];

  const teamMembers = [
    { name: 'John Smith', role: 'Lead Developer' },
    { name: 'Sarah Johnson', role: 'UI/UX Designer' },
    { name: 'Jenny Wilson', role: 'DE / Founder, CEO' },
    { name: 'Mike Davis', role: 'Product Manager' },
    { name: 'Lisa Chen', role: 'Marketing Director' }
  ];

  return (
    <div className="landing-page">

      <div className="container">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Powering people's progress.</h1>
              <p>Connecting talent with opportunities to unlock growth and success.</p>
              <button className="btn-try">Try Today</button>
            </div>
            <div className="hero-image">
              <img src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Professional women" />
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="about-content">
            <div className="about-image">
              <img src={women} alt="Professional woman with tablet" />
            </div>
            <div className="about-text">
              <h2>Hire skilled experts for quick tasks or lasting success</h2>
              {/* <p className="subtitle">Reference site about Lorem Ipsum, giving information</p> */}
              <p className="description">
                We create life-changing learning experiences by connecting learners with the best tutors.
              </p>
              <p className="description">
                A personalized journey that inspires growth, keeps motivation high, and helps people love learning, every step of the way.
              </p>
            </div>
          </div>
        </section>

        <section className="services-section">
          <h2>Hire top talent for one-off tasks or long-term success.</h2>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            // navigation
            // pagination={{ clickable: true }}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false
            }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="services-swiper"
          >
            {services.map((service, index) => (
              <SwiperSlide key={service.name}>
                <div className={`service-card ${service.color}`}>
                  <div className="service-header">
                    <h3>{service.name}</h3>
                  </div>
                  <p>{service.description}</p>
                  <button className="contact-link">
                    Contact us <ExternalLink size={16} />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="team-section">
          <h2>Meet our team</h2>
          <p className="team-subtitle">
            Our talented team brings expertise, creativity, and dedication to help learners, tutors, and freelancers succeed. Together, we build a platform that empowers growth, learning, and meaningful connections.
          </p>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <button
                key={member.name}
                className={`team-member ${hoveredMember === index ? 'highlighted' : ''}`}
                type="button"
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(2)}
                onFocus={() => setHoveredMember(index)}
                onBlur={() => setHoveredMember(2)}
                onClick={() => setHoveredMember(index)}
              >
                {hoveredMember === index && (
                  <div className="member-card">
                    <p className="member-name">{member.name}</p>
                    <p className="member-role">{member.role}</p>
                  </div>
                )}
                <div className="member-avatar">
                  <img
                    src={`https://images.pexels.com/photos/${getImageId(index)}/pexels-photo-${getImageId(index)}.jpeg?auto=compress&cs=tinysrgb&w=300`}
                    alt={member.name}
                  />
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>


    </div>
  );
};

export default About;

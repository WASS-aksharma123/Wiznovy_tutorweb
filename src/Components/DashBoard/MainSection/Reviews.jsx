import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../../assets/Styles/DashBoard/Reviews.scss';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Excellent teaching methods and very patient instructor. My child's grades improved significantly!",
      course: "Mathematics Grade 8",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Michael Chen", 
      rating: 4.8,
      comment: "Great platform with interactive lessons. The scheduling system is very convenient.",
      course: "Physics Grade 10",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emily Davis",
      rating: 5,
      comment: "Amazing experience! The tutors are knowledgeable and make learning fun and engaging.",
      course: "English Literature",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "David Wilson",
      rating: 4.9,
      comment: "Highly recommend! Flexible timing and excellent teaching quality. Worth every penny.",
      course: "Chemistry Grade 11",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="star half" />);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star empty" />);
    }
    
    return stars;
  };

  return (
    <div className="reviews">
      <div className="reviews-container">
        <h2>Student Reviews</h2>
        
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
          className="reviews-swiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="review-card">
                <div className="review-header">
                  <div className="user-info">
                    <img src={review.avatar} alt={review.name} className="avatar" />
                    <div className="user-details">
                      <h4>{review.name}</h4>
                      <p className="course">{review.course}</p>
                    </div>
                  </div>
                  <div className="rating">
                    <div className="stars">
                      {renderStars(review.rating)}
                    </div>
                    <span className="rating-value">{review.rating}</span>
                  </div>
                </div>
                
                <div className="review-content">
                  <p>"{review.comment}"</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
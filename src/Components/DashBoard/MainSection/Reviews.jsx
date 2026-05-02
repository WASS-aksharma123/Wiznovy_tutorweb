import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaStar, FaUser, FaQuoteLeft } from 'react-icons/fa';
import { getMyReviews } from '../../../services/reviewService';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../../assets/Styles/DashBoard/Reviews.scss';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getMyReviews(10, 0);
      
      if (response.success) {
        setReviews(response.data.result || []);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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

  if (loading) {
    return (
      <div className="reviews">
        <div className="reviews-container">
          <h2>My Reviews</h2>
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading reviews...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="reviews">
        <div className="reviews-container">
          <h2>My Reviews</h2>
          <div className="error-state">
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="reviews">
        <div className="reviews-container">
          <h2>My Reviews</h2>
          <div className="empty-state">
            <FaStar className="empty-icon" />
            <p>No reviews yet</p>
            <span>Reviews from students will appear here</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews">
      <div className="reviews-container">
        <div className="reviews-header">
          <h2>My Reviews</h2>
          <span className="review-count">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
        </div>
        
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
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
              slidesPerView: 3,
            },
          }}
          className="reviews-swiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="review-card">
                <div className="review-header">
                  <div className="avatar">
                    <FaUser />
                  </div>
                  <div className="user-info">
                    <div className="user-name">{review.account.userDetail.name}</div>
                    <div className="review-meta">
                      <span className="review-type">{review.type}</span>
                      <span className="review-date">{formatDate(review.createdAt)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="rating-section">
                  <div className="stars">
                    {renderStars(parseFloat(review.rating))}
                  </div>
                  <div className="rating-value">{review.rating}</div>
                </div>
                
                <div className="review-content">
                  <FaQuoteLeft className="quote-icon" />
                  <p className="comment-text">{review.comment}</p>
                </div>
                
                <div className="review-footer">
                  <div className="footer-text">Verified Review</div>
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
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import './Videos.scss';
import { CirclePlus, CircleAlert, SquarePen, Play, Clock } from "lucide-react";
import CreateVideo from './CreateVideo';
import EditVideo from './EditVideo';
import { fetchVideoLecturesByUnitAsync } from '../../../../store/courseSlice';

const Videos = ({ unitId, unitName }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const dispatch = useDispatch();
  const { videoLectures, videoLecturesLoading, error } = useSelector((state) => state.course);

  useEffect(() => {
    if (unitId) {
      dispatch(fetchVideoLecturesByUnitAsync(unitId));
    }
  }, [dispatch, unitId]);

  if (!unitId) {
    return (
      <div className="videos-container">
        <div className="no-unit-selected">
          <h2>Select a Unit</h2>
          <p>Please select a unit from the sidebar to view its video lectures.</p>
        </div>
      </div>
    );
  }

  const handleVideoCreated = (newVideo) => {
    console.log('Video created:', newVideo);
    // Refresh the video lectures list
    dispatch(fetchVideoLecturesByUnitAsync(unitId));
  };

  const handleVideoUpdated = () => {
    // Refresh the video lectures list
    dispatch(fetchVideoLecturesByUnitAsync(unitId));
  };

  const handleEditClick = (video) => {
    setSelectedVideo(video);
    setIsEditModalOpen(true);
  };

  return (
    <div className="videos-container">
      <div className="createvidesss">
        <h2>{unitName || 'Unit Videos'}</h2>
        <button 
          className='createee' 
          onClick={() => setIsCreateModalOpen(true)}
        >
          <CirclePlus /> Create Video
        </button>
      </div>

      <div className="videos-list">
        {(() => {
          if (videoLecturesLoading) {
            return <div className="loading">Loading videos...</div>;
          }
          
          if (error) {
            return (
              <div className="error">
                <CircleAlert /> {error}
              </div>
            );
          }
          
          if (videoLectures.length === 0) {
            return (
              <div className="no-videos">
                <p>No video lectures found for this unit.</p>
                <p>Click "Create Video" to add your first video lecture.</p>
              </div>
            );
          }
          
          return videoLectures.map((video) => {
            const thumbnailContent = video.thumbnailUrl ? (
              <img src={video.thumbnailUrl} alt={video.title} />
            ) : (
              <div className="placeholder-thumbnail">
                <Play size={24} />
              </div>
            );

            const durationText = video.duration ? `${video.duration} min` : 'Duration not set';

            return (
              <div key={video.id} className="video-card">
                <div className="video-thumbnail">
                  {thumbnailContent}
                </div>
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <div className="video-meta">
                    <span className="duration">
                      <Clock size={16} /> {durationText}
                    </span>
                    <span className="unit-name">{video.unit?.name}</span>
                  </div>
                </div>
                <div className="video-actions">
                  <button 
                    className="editdd-btn"
                    onClick={() => handleEditClick(video)}
                  >
                    <SquarePen size={16} /> Edit
                  </button>
                </div>
              </div>
            );
          });
        })()}
      </div>
      
      <CreateVideo 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        unitId={unitId}
        onVideoCreated={handleVideoCreated}
      />
      
      <EditVideo 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        video={selectedVideo}
        onVideoUpdated={handleVideoUpdated}
      />
    </div>
  );
};

Videos.propTypes = {
  unitId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unitName: PropTypes.string
};

export default Videos;
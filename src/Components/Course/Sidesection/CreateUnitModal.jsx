import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { X, Upload } from "lucide-react";
import { createUnitAsync } from "../../../store/courseSlice";
import "../../../assets/Styles/Course/Sidesection/CreateUnitModal.scss";

const CreateUnitModal = ({ isOpen, onClose, courseId }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.course);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const unitData = new FormData();
    unitData.append('name', formData.name);
    unitData.append('description', formData.description);
    unitData.append('courseId', courseId);
    if (formData.image) {
      unitData.append('image', formData.image);
    }
    
    try {
      await dispatch(createUnitAsync(unitData)).unwrap();
      setFormData({ name: "", description: "", image: null });
      onClose();
    } catch (error) {
      console.error('Failed to create unit:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content create-unit-modal">
        <div className="modal-header">
          <h3>Create New Unit</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="unit-form">
          <div className="form-group">
            <label htmlFor="name">Name of the unit</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              maxLength={40}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              required
              maxLength={300}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image Upload</label>
            <div className="image-upload">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
              <label htmlFor="image" className="file-label">
                <Upload size={20} />
                {formData.image ? formData.image.name : "Choose an image"}
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating...' : 'Create Unit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateUnitModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired
};

export default CreateUnitModal;
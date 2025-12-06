import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Upload } from "lucide-react";
import { updateUnitAsync, updateUnitImageAsync, fetchUnitsByCourseAsync } from "../../../store/courseSlice";
import "../../../assets/Styles/Course/Sidesection/CreateUnitModal.scss";

const EditUnitModal = ({ isOpen, onClose, unit, courseId }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.course);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null
  });

  useEffect(() => {
    if (unit) {
      setFormData({
        name: unit.name || "",
        description: unit.description || "",
        image: null
      });
    }
  }, [unit]);

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
    
    try {
      // Update text fields
      const textData = {
        name: formData.name,
        description: formData.description
      };
      await dispatch(updateUnitAsync({ unitId: unit.id, unitData: textData })).unwrap();
      
      // Update image if provided
      if (formData.image) {
        await dispatch(updateUnitImageAsync({ unitId: unit.id, imageFile: formData.image })).unwrap();
      }
      
      onClose();
    } catch (error) {
      console.error('Failed to update unit:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content create-unit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Unit</h3>
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
              maxLength={200}
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
              {loading ? 'Updating...' : 'Update Unit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUnitModal;
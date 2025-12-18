import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Edit, Trash2, Download, Plus } from 'lucide-react';
import { fetchStudyMaterialsByTutorUnit, deleteStudyMaterial } from '../../../../services/studyMaterialService';
import EditStudyMaterial from './EditStudyMaterial';
import CreateStudyMaterial from './CreateStudyMaterial';
import './StudyMaterialList.scss';

const StudyMaterialList = ({ unitId }) => {
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    if (unitId) {
      fetchStudyMaterials();
    }
  }, [unitId]);

  const fetchStudyMaterials = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await fetchStudyMaterialsByTutorUnit(unitId);
      
      if (result.success) {
        setStudyMaterials(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error('Error fetching study materials:', err);
      setError('Failed to load study materials');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (material) => {
    setEditingMaterial(material);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (materialId) => {
    if (globalThis.confirm('Are you sure you want to delete this study material?')) {
      try {
        const result = await deleteStudyMaterial(materialId);
        if (result.success) {
          fetchStudyMaterials();
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error('Error deleting study material:', err);
        setError('Failed to delete study material');
      }
    }
  };

  const handleEditSuccess = () => {
    fetchStudyMaterials();
    setIsEditModalOpen(false);
    setEditingMaterial(null);
  };

  const handleCreateSuccess = () => {
    fetchStudyMaterials();
    setIsCreateModalOpen(false);
  };

  if (loading) {
    return <div className="loading-message"></div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="study-materials-list">
      <div className="materials-header">
        <h3>Study Materials</h3>
        <button 
          className="create-btn"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus size={16} />
          Add Material
        </button>
      </div>
      {studyMaterials.length === 0 ? (
        <div className="no-materials">No study materials found for this unit.</div>
      ) : (
        <div className="materials-grid">
          {studyMaterials.map((material) => (
          <div key={material.id} className="material-card">
            <div className="material-header">
              <h4>{material.title}</h4>
              <span className="material-date">
                {new Date(material.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            {material.description && (
              <p className="material-description">{material.description}</p>
            )}
            
            <div className="material-info">
              <span className="unit-name">Unit: {material.unit?.name}</span>
              {material.videoLecture && (
                <span className="video-lecture">Video Lecture: {material.videoLecture.title}</span>
              )}
            </div>
            
            <div className="material-actions">
              {material.fileUrl && (
                <a 
                  href={material.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="action-btn download-btn"
                >
                  <Download size={16} />
                  Download
                </a>
              )}
              <button 
                className="action-btn edittt-btn"
                onClick={() => handleEdit(material)}
              >
                <Edit size={16} />
                Edit
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={() => handleDelete(material.id)}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
          ))}
        </div>
      )}
      <CreateStudyMaterial
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        unitId={unitId}
        onSuccess={handleCreateSuccess}
      />
      <EditStudyMaterial
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingMaterial(null);
        }}
        studyMaterial={editingMaterial}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

StudyMaterialList.propTypes = {
  unitId: PropTypes.string
};

export default StudyMaterialList;
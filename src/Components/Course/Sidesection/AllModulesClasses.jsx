import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import "../../../assets/Styles/Course/Sidesection/AllModulesClasses.scss";
import { CirclePlus, CircleAlert, SquarePen } from "lucide-react";
import CreateUnitModal from "./CreateUnitModal";
import EditUnitModal from "./EditUnitModal";
import { fetchUnitsByCourseAsync } from "../../../store/courseSlice";





const AllModulesClasses = ({ courseId, selectedUnit, onUnitSelect }) => {
  const dispatch = useDispatch();
  const { units, unitsLoading } = useSelector((state) => state.course);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);


  useEffect(() => {
    if (courseId) {
      dispatch(fetchUnitsByCourseAsync(courseId));
    }
  }, [courseId]);

  useEffect(() => {
    if (units.length > 0 && !selectedUnit) {
      const sortedUnits = [...units].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      onUnitSelect(sortedUnits[0]);
    }
  }, [units, selectedUnit, onUnitSelect]);

  return (
    <div className="modules-wrapper">
      <div className="modules-header">
        <h2>All Units</h2>
        <button className="create" onClick={() => setIsModalOpen(true)}>
          <CirclePlus /> Create Unit
        </button>
      </div>

      <CreateUnitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseId={courseId}
      />

      <EditUnitModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        unit={editingUnit}
        courseId={courseId}
      />

      <div className="Unitsss">
        {unitsLoading && (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Loading units...</p>
          </div>
        )}
        {!unitsLoading && units.length === 0 && (
          <div className="no-units"><CircleAlert size={50} />No unit to show</div>
        )}
        {!unitsLoading && units.length > 0 && (
          [...units]
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((unit) => (
              <div
                onClick={() => onUnitSelect(unit)}
                key={unit.id}
                className={`unit-item ${selectedUnit?.id === unit.id ? 'selected' : ''}`}
              >
                <div className="overlay">
                  <button
                    className="btn"
                    onClick={() => {
                      setEditingUnit(unit);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <SquarePen size={14} />
                  </button>
                </div>
                <button className="unit-image-btn" >
                  <img src={unit.imgUrl ? unit.imgUrl : "/src/assets/Images/Group 291.svg"} alt={unit.name} />
                </button>
                <div className="unit-info">
                  <h4>{unit.name}</h4>
                  <p>{unit.description}</p>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

AllModulesClasses.propTypes = {
  courseId: PropTypes.string.isRequired,
  selectedUnit: PropTypes.object,
  onUnitSelect: PropTypes.func.isRequired
};

export default AllModulesClasses;

import { API_BASE_URL } from '../config/api.js';

export const createStudyMaterial = async (studyMaterialData) => {
  try {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    
    let body;
    if (studyMaterialData instanceof FormData) {
      body = studyMaterialData;
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(studyMaterialData);
    }
    
    const response = await fetch(`${API_BASE_URL}/study-material`, {
      method: 'POST',
      headers,
      body,
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Study material created successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to create study material',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const fetchStudyMaterialsByUnit = async (unitId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/study-material/unit/${unitId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        data: data || [],
      };
    } else {
      return {
        success: false,
        message: 'Failed to fetch study materials',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const fetchStudyMaterialsByTutorUnit = async (unitId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/study-material/tutor/list?unitId=${unitId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        data: data.result || [],
        total: data.total || 0,
      };
    } else {
      return {
        success: false,
        message: 'Failed to fetch study materials',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const updateStudyMaterial = async (studyMaterialId, studyMaterialData) => {
  try {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    
    let body;
    if (studyMaterialData instanceof FormData) {
      body = studyMaterialData;
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(studyMaterialData);
    }
    
    const response = await fetch(`${API_BASE_URL}/study-material/${studyMaterialId}`, {
      method: 'PUT',
      headers,
      body,
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Study material updated successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to update study material',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const updateStudyMaterialByTutor = async (studyMaterialId, studyMaterialData) => {
  try {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    
    let body;
    if (studyMaterialData instanceof FormData) {
      // Convert FormData to URLSearchParams
      const params = new URLSearchParams();
      for (let [key, value] of studyMaterialData.entries()) {
        if (value instanceof File) continue;
        params.append(key, value);
      }
      body = params;
    } else {
      // Convert object to URLSearchParams
      const params = new URLSearchParams();
      Object.keys(studyMaterialData).forEach(key => {
        params.append(key, studyMaterialData[key]);
      });
      body = params;
    }
    
    const response = await fetch(`${API_BASE_URL}/study-material/tutor/${studyMaterialId}`, {
      method: 'PUT',
      headers,
      body,
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Study material updated successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to update study material',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const updateStudyMaterialByTutorWithId = async (studyMaterialId, studyMaterialData) => {
  try {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    
    let body;
    if (studyMaterialData instanceof FormData) {
      // Convert FormData to URLSearchParams for x-www-form-urlencoded
      const params = new URLSearchParams();
      for (let [key, value] of studyMaterialData.entries()) {
        if (value instanceof File) {
          // Skip file for now, handle separately if needed
          continue;
        }
        params.append(key, value);
      }
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      body = params;
    } else {
      // Convert object to URLSearchParams
      const params = new URLSearchParams();
      Object.keys(studyMaterialData).forEach(key => {
        params.append(key, studyMaterialData[key]);
      });
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
      body = params;
    }
    
    const response = await fetch(`${API_BASE_URL}/study-material/tutor/${studyMaterialId}`, {
      method: 'PUT',
      headers,
      body,
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Study material updated successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to update study material',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const deleteStudyMaterial = async (studyMaterialId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/study-material/${studyMaterialId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Study material deleted successfully',
      };
    } else {
      const data = await response.json();
      return {
        success: false,
        message: data.message || 'Failed to delete study material',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};
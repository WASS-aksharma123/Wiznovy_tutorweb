import { API_BASE_URL } from '../config/api.js';

export const createCourse = async (courseData) => {
  try {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    
    let body;
    if (courseData instanceof FormData) {
      body = courseData;
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(courseData);
    }
    
    const response = await fetch(`${API_BASE_URL}/course`, {
      method: 'POST',
      headers,
      body,
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Course created successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to create course',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const fetchSubjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/subjects/all`);
    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        data: data.result || [],
      };
    } else {
      return {
        success: false,
        message: 'Failed to fetch subjects',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const fetchLanguages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/languages/all?limit=50&offset=0`);
    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        data: data.result || [],
      };
    } else {
      return {
        success: false,
        message: 'Failed to fetch languages',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const fetchMyCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/course/my-courses`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        data: data.result || [],
      };
    } else {
      return {
        success: false,
        message: 'Failed to fetch courses',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const updateCourse = async (courseId, courseData) => {
  try {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    
    let body;
    if (courseData instanceof FormData) {
      body = courseData;
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(courseData);
    }
    
    const response = await fetch(`${API_BASE_URL}/course/${courseId}`, {
      method: 'PATCH',
      headers,
      body,
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Course updated successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to update course',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const createUnit = async (unitData) => {
  try {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    
    let body;
    if (unitData instanceof FormData) {
      body = unitData;
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(unitData);
    }
    
    const response = await fetch(`${API_BASE_URL}/unit`, {
      method: 'POST',
      headers,
      body,
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Unit created successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to create unit',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const updateUnit = async (unitId, unitData) => {
  try {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    
    let body;
    if (unitData instanceof FormData) {
      body = unitData;
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(unitData);
    }
    
    const response = await fetch(`${API_BASE_URL}/unit/${unitId}`, {
      method: 'PUT',
      headers,
      body,
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Unit updated successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to update unit',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const updateUnitImage = async (unitId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    
    const response = await fetch(`${API_BASE_URL}/unit/imge/${unitId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Unit image updated successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to update unit image',
      };
    }
  } catch (error) {
    console.error('Image update error:', error);
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const fetchUnitsByCourse = async (courseId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/unit/by-course?courseId=${courseId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        data: data.result || [],
      };
    } else {
      return {
        success: false,
        message: 'Failed to fetch units',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const createVideoLecture = async (videoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/video-lecture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: videoData, // FormData
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Video lecture created successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to create video lecture',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const fetchVideoLecturesByUnit = async (unitId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/video-lecture/tutor/unit/${unitId}`, {
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
        message: 'Failed to fetch video lectures',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const updateVideoLecture = async (videoLectureId, videoData) => {
  try {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    
    let body;
    if (videoData instanceof FormData) {
      body = videoData;
    } else {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(videoData);
    }
    
    const response = await fetch(`${API_BASE_URL}/video-lecture/${videoLectureId}`, {
      method: 'PUT',
      headers,
      body,
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Video lecture updated successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to update video lecture',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const updateVideoThumbnail = async (videoLectureId, thumbnailFile) => {
  try {
    const formData = new FormData();
    formData.append('file', thumbnailFile);
    
    const response = await fetch(`${API_BASE_URL}/video-lecture/thumbnail/${videoLectureId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Video thumbnail updated successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to update video thumbnail',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

export const updateVideoFile = async (videoLectureId, videoFile) => {
  try {
    const formData = new FormData();
    formData.append('video', videoFile);
    
    const response = await fetch(`${API_BASE_URL}/video-lecture/video/${videoLectureId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: 'Video file updated successfully',
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to update video file',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};
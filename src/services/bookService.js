import { API_BASE_URL } from '../config/api.js';

export const createBookBasic = async (bookData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/books/tutor`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data: data };
    } else {
      return { success: false, message: data.message || 'Failed to create book' };
    }
  } catch (error) {
    console.error('BookService createBookBasic error:', error.message);
    return { success: false, message: error.message || 'Failed to create book' };
  }
};

export const updateBookPdf = async (bookId, pdfFile) => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', pdfFile);
    const response = await fetch(`${API_BASE_URL}/books/tutor/pdf/${bookId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data: data };
    } else {
      return { success: false, message: data.message || 'Failed to update PDF' };
    }
  } catch (error) {
    return { success: false, message: error.message || 'Failed to update PDF' };
  }
};

export const createBook = async (bookData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/books/tutor`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: bookData,
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data: data };
    } else {
      return { success: false, message: data.message || 'Failed to create book' };
    }
  } catch (error) {
    console.error('BookService createBook error:', error.message);
    return { success: false, message: error.message || 'Failed to create book' };
  }
};

export const getTutorBooks = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/books/tutor/list`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data: data };
    } else {
      return { success: false, message: data.message || 'Failed to fetch books' };
    }
  } catch (error) {
    return { success: false, message: error.message || 'Failed to fetch books' };
  }
};

export const getBook = async (bookId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/books/tutor/${bookId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data: data };
    } else {
      return { success: false, message: data.message || 'Failed to fetch book' };
    }
  } catch (error) {
    return { success: false, message: error.message || 'Failed to fetch book' };
  }
};

export const updateBookCoverImage = async (bookId, coverImageFile) => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', coverImageFile);
    const response = await fetch(`${API_BASE_URL}/books/tutor/cover-image/${bookId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data: data };
    } else {
      return { success: false, message: data.message || 'Failed to update cover image' };
    }
  } catch (error) {
    return { success: false, message: error.message || 'Failed to update cover image' };
  }
};

export const updateBookImages = async (bookId, bookImagesFiles) => {
  try {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    bookImagesFiles.forEach((image) => {
      formData.append('files', image);
    });
    const response = await fetch(`${API_BASE_URL}/books/tutor/images/${bookId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data: data };
    } else {
      return { success: false, message: data.message || 'Failed to update book images' };
    }
  } catch (error) {
    return { success: false, message: error.message || 'Failed to update book images' };
  }
};

export const updateBook = async (bookId, bookData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/books/tutor/${bookId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data: data };
    } else {
      return { success: false, message: data.message || 'Failed to update book' };
    }
  } catch (error) {
    console.error('BookService updateBook error:', error.message);
    return { success: false, message: error.message || 'Failed to update book' };
  }
};
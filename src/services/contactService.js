import { API_BASE_URL } from '../config/api.js'

export const fetchContactCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact-us-category/all?type=TUTOR`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        data: data.result || [],
      }
    } else {
      return {
        success: false,
        message: data.message || 'Failed to fetch categories',
      }
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    }
  }
}

export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact-us`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        categoryId: formData.concernType,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phone,
        message: formData.message
      })
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        data: data,
      }
    } else {
      return {
        success: false,
        message: data.message || 'Failed to submit contact form',
      }
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    }
  }
}

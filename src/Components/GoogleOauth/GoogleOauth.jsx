import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setGoogleAuth } from '../../store/authSlice'
import { API_BASE_URL } from '../../config/api'

const GoogleOauth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSuccess = async (credentialResponse) => {
    if (credentialResponse?.credential) {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/tutor/google-login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: credentialResponse.credential })
        })

        if (response.ok) {
          const data = await response.json()
          
          localStorage.setItem('token', data.token)
          dispatch(setGoogleAuth({ 
            user: { name: data.name, email: data.email, role: data.role, status: data.status },
            token: data.token 
          }))

          if (data.signup === true) {
            alert(data.message || 'Tutor account created successfully. Your account is under review.')
            navigate('/onboarding')
          } else if (data.status === 'PENDING') {
            alert(data.message || 'Your account is pending approval. Please contact admin.')
            navigate('/')
          } else {
            navigate('/dashboard')
          }
        } else {
          console.error('Google login failed')
        }
      } catch (error) {
        console.error('Error during Google login:', error)
      }
    }
  }

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log('Login Failed')}
    />
  )
}

export default GoogleOauth

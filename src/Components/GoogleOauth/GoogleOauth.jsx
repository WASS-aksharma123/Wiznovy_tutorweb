import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
const GoogleOauth = () => {
  const navigate = useNavigate()
  return (
    <div>
      <GoogleLogin
        onSuccess={credentialResponse => {
          const details = jwtDecode(credentialResponse.credential)
          console.log(details)
          navigate('/onboarding')
        }}
        onError={() => {
          console.log('Login Failed')
        }}
      />
    </div>
  )
}

export default GoogleOauth

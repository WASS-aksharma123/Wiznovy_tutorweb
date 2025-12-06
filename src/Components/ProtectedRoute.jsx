import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Loader from './Loader'
import PendingStatusPage from './PendingStatusPage'

const ProtectedRoute = ({ children, requiredRole = null, fallbackPath = '/' }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth)
  const { profile } = useSelector((state) => state.profile)
  const [isValidating, setIsValidating] = useState(true)
  const location = useLocation()
  
  // Check if user has pending status
  const isPending = user?.status === 'PENDING' || profile?.status === 'PENDING'

  useEffect(() => {
    const validateAuth = async () => {
      const token = localStorage.getItem('token')
      if (token && !isAuthenticated) {
        try {
          const response = await fetch('https://wiznovyserver.webappssoft.com:6524/api/v1/auth/validate-token', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          
          if (!response.ok) {
            localStorage.removeItem('token')
            localStorage.removeItem('currentUser')
          }
        } catch (error) {
          console.error('Token validation failed:', error)
          localStorage.removeItem('token')
          localStorage.removeItem('currentUser')
        }
      }
      setIsValidating(false)
    }

    if (!loading) {
      validateAuth()
    }
  }, [isAuthenticated, loading])

  if (loading || isValidating) {
    return <Loader fullScreen text="Authenticating..." />
  }

  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />
  }

  // Show pending page if trying to access dashboard with pending status
  if (isPending && location.pathname === '/dashboard') {
    return <PendingStatusPage />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string,
  fallbackPath: PropTypes.string,
}

export default ProtectedRoute
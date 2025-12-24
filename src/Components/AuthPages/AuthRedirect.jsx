import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const AuthRedirect = ({ children }) => {
  const token = localStorage.getItem('token')
  
  if (token) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}

AuthRedirect.propTypes = {
  children: PropTypes.node.isRequired
}

export default AuthRedirect
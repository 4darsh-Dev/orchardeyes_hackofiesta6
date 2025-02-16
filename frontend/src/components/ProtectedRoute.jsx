import { useAuth0 } from '@auth0/auth0-react'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children, isAuthenticated }) => {
  const { loginWithRedirect } = useAuth0()
  const location = useLocation()

  if (!isAuthenticated) {
    loginWithRedirect({
      appState: { returnTo: location.pathname }
    })
    return null
  }

  return children
}

export default ProtectedRoute

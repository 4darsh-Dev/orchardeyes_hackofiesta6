import { useNavigate } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate()

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider
      domain='dev-h7oni1avnzc37fk7.us.auth0.com'
      clientId='BCYRUBfd9PLBjvn60NwTFKhsAf7dffr7'
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation='localstorage' // Ensures session persists after reload
      useRefreshTokens={true} // Enables refresh tokens for better persistence
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory

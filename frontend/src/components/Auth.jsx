import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'

const LoginBtn = styled.button`
  color: black;
  background-color: #e3e3e3;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #9f9e9e;
  }
`

const RegisterBtn = styled.button`
  color: white;
  background-color: #7c0a0a;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: red;
  }
`

const Auth = ({ isAuthenticated }) => {
  const { loginWithRedirect, logout, user } = useAuth0()
  return isAuthenticated ? (
    <div className='flex items-center gap-3'>
      <RegisterBtn
        onClick={() => {
          logout({
            logoutParams: {
              returnTo: import.meta.env.VITE_REDIRECT_URL,
              clientId: 'BCYRUBfd9PLBjvn60NwTFKhsAf7dffr7'
            }
          })
        }}
      >
        Log Out
      </RegisterBtn>
      {user.img ? (
        <img
          src={user.picture}
          alt={user.name}
          className='rounded-full h-[7vh]'
        />
      ) : (
        <div
          className='rounded-full h-[7vh] w-[7vh] bg-[#7812b7] text-white text-2xl flex items-center justify-center'
          style={{ fontFamily: 'Sour Gummy, sans-serif' }}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  ) : (
    <div>
      <RegisterBtn
        onClick={() => {
          loginWithRedirect({
            screen_hint: 'signup'
          })
        }}
      >
        Register
      </RegisterBtn>
      <LoginBtn
        onClick={() => {
          loginWithRedirect({
            appState: { returnTo: '/farm-management/dashboard' }
          })
        }}
      >
        Login
      </LoginBtn>
    </div>
  )
}

export default Auth

import styled from 'styled-components'
import PropTypes from 'prop-types'
import LogoImg from '../assets/img/logo.png'
import { useNavigate } from 'react-router-dom'
import Auth from './Auth'
const NavbarContainer = styled.nav.withConfig({
  shouldForwardProp: (prop) => !['background'].includes(prop)
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  padding: 1vh 1.5rem;
  box-sizing: border-box;
  background-color: white;
  z-index: 1000;
  border-bottom: 1px solid #e3e1e1;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: bold;
`
const LogoImage = styled.img`
  height: 50px;
`
const NavLinks = styled.ul`
  display: flex;
  list-style: none;

  align-items: center;
`

const NavLink = styled.li`
  margin: 0 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Navbar = ({ background, isAuthenticated }) => {
  const navigate = useNavigate()
  return (
    <nav
      // background={background}
      className='shadow hidden sm:flex bg-white justify-between items-center fixed top-0 left-0 w-full p-[1vh_1.5rem] box-border bg-white z-[1000] border-b border-[#e3e1e1]'
    >
      <Logo>
        <LogoImage src={LogoImg} alt='apple-orchard-logo' />
      </Logo>
      <NavLinks className='font-mid-bold'>
        <NavLink
          onClick={() => {
            navigate('/')
          }}
        >
          Home
        </NavLink>
        <NavLink
          onClick={() => {
            navigate('/models-report')
          }}
        >
          Models
        </NavLink>
        <NavLink
          onClick={() => {
            navigate('/about')
          }}
        >
          About
        </NavLink>
        <NavLink
          onClick={() => {
            navigate('/contact')
          }}
        >
          Contact
        </NavLink>
        <NavLink
          onClick={() => {
            navigate('/farm-management/dashboard')
          }}
        >
          Dashboard
        </NavLink>
        <Auth isAuthenticated={isAuthenticated} />
      </NavLinks>
    </nav>
  )
}

export default Navbar
Navbar.propTypes = {
  background: PropTypes.string.isRequired
}

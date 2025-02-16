import { useEffect, useState } from 'react'
import './App.css'
import { Routes, useLocation, Route, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import ProfilePage from './pages/ProfilePage'

import OrchardManagement from './pages/FarmManagement'
import ModelsReport from './pages/ModelsReport'
import ConnectDrone from './components/connectDrone'
import ProtectedRoute from './components/ProtectedRoute'
import OrchardPage from './pages/OrchardPage'
import Chatbot from './components/chatbot/Chatbot'
import FarmCard from './components/FarmCard'
import QuickActions from './pages/QuickActions'
import Analysis from './components/Analysis'
import Learn from './components/Learn'
import { createUser, getUser } from './api'
import ImageUpload from './components/ImageUpload'
import About from './pages/AboutPage'
import ExpandedWeatherCard from './components/ExpandedWeatherCard'
import MapComponent from './components/MapComponent'

function App() {
  return <AppContent />
}
function AppContent() {
  const location = useLocation()
  const isOrchardRoute = location.pathname === '/orchard'
  const [activeTab, setActiveTab] = useState(null)
  const [userData, setUserData] = useState(null)
  const [currentAnalysisSlide, setCurrentAnalysisSlide] = useState(0)
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
    user
  } = useAuth0()
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getAccessTokenSilently() // Tries to silently authenticate
      } catch (error) {
        console.error('Silent authentication failed:', error)
      }
    }
    checkAuth()
  }, [getAccessTokenSilently])

  useEffect(() => {
    const updateUser = async () => {
      try {
        if (!isLoading && isAuthenticated) {
          await userInit(user.email)
          navigate('/farm-management/dashboard') // Redirect logged-in users
        }
      } catch (error) {
        console.error('User init failed', error)
      }
    }
    updateUser()
  }, [isAuthenticated, isLoading])

  useEffect(() => {
    console.log('User data:', userData)
  }, [userData])
  const userInit = async (email) => {
    try {
      const userData = await getUser(email)
      if (userData) setUserData(userData)
      else {
        const newUser = await createUser(user.email, user.name)
        setUserData(newUser)
      }
    } catch (error) {
      console.error('Failed to get access token:', error)
    }
  }
  return (
    <>
      <Navbar
        background={isOrchardRoute ? '#f4f4f4' : 'transparent'}
        isAuthenticated={isAuthenticated}
      />
      <div className='sm:mt-20'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/ownerPage' element={<ProfilePage />} />
          <Route
            path='farm-management'
            element={
              <OrchardManagement
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            }
          >
            <Route
              path='analysis'
              element={
                <Analysis
                  currentAnalysisSlide={currentAnalysisSlide}
                  setCurrentAnalysisSlide={setCurrentAnalysisSlide}
                />
              }
            />
            <Route path='dashboard' element={<FarmCard />} />
            <Route path='weather' element={<ExpandedWeatherCard />} />

            <Route path='learn' element={<Learn />} />
            <Route
              path='quick-actions'
              element={
                <QuickActions
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                  setCurrentAnalysisSlide={setCurrentAnalysisSlide}
                />
              }
            />
            <Route path='drone' element={<ConnectDrone />} />
            <Route path='image-upload' element={<ImageUpload />} />
            <Route path='home' element={<MapComponent />} />
          </Route>
          <Route path='/connect' element={<ConnectDrone />} />
          <Route path='/chatbot' element={<Chatbot />} />
          <Route path='/models-report' element={<ModelsReport />} />
          <Route path='/orchard' element={<OrchardPage />} />
          <Route
            path='/profile'
            element={<ProfilePage userData={userData} />}
          />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<About />} />
        </Routes>
      </div>
    </>
  )
}
export default App

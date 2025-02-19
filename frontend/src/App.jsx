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
import { createUser, getUser, getWeatherData } from './api'
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
  const [weatherData, setWeatherData] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [isLoadingWeatherData, setIsLoadingWeatherData] = useState(true)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getAccessTokenSilently() // Tries to silently authenticate
      } catch (error) {
        console.error('Silent authentication failed:', error)
      }
    }
    checkAuth()
    getLocation()
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

  useEffect(() => {
    console.log(userLocation, 'userLocation')
    handleWeatherData()
  }, [userLocation])

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
  const handleWeatherData = async () => {
    try {
      if (!userLocation) {
        setIsLoadingWeatherData(false)
        return
      }
      const data = await getWeatherData(
        userLocation.latitude,
        userLocation.longitude
      )
      console.log('Weather data:', data)
      setWeatherData(data)
      setIsLoadingWeatherData(false)
    } catch (error) {
      setIsLoadingWeatherData(false)
      console.error('Failed to get weather data:', error)
    }
  }
  const getLocation = () => {
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
          },
          (error) => {
            throw new Error(error.message)
          }
        )
      } else {
        throw new Error('Geolocation is not supported by your browser.')
      }
    } catch (e) {
      console.error('Failed to get location:', e)
    }
  }
  return (
    <>
      <Navbar
        background={isOrchardRoute ? '#f4f4f4' : 'transparent'}
        isAuthenticated={isAuthenticated}
      />
      <div className='sm:mt-20 flex flex-col items-center'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/ownerPage' element={<ProfilePage />} />
          <Route
            path='farm-management'
            element={
              <OrchardManagement
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleWeatherData={handleWeatherData}
              />
            }
          >
            {/* <Route
            path='farm-management'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <OrchardManagement
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </ProtectedRoute>
            }
          > */}
            <Route
              path='analysis'
              element={
                <Analysis
                  currentAnalysisSlide={currentAnalysisSlide}
                  setCurrentAnalysisSlide={setCurrentAnalysisSlide}
                />
              }
            />
            <Route
              path='dashboard'
              element={<FarmCard weatherData={weatherData} />}
            />
            <Route
              path='weather'
              element={
                <ExpandedWeatherCard
                  weatherData={weatherData}
                  setWeatherData={setWeatherData}
                  isLoading={isLoadingWeatherData}
                />
              }
            />

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
            <Route
              path='home'
              element={
                <>
                  <MapComponent />
                </>
              }
            />
          </Route>
          <Route
            path='/connect'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ConnectDrone />
              </ProtectedRoute>
            }
          />
          <Route path='/chatbot' element={<Chatbot />} />
          <Route path='/models-report' element={<ModelsReport />} />
          <Route path='/orchard' element={<OrchardPage />} />
          <Route
            path='/profile'
            element={<ProfilePage userData={userData} />}
          />
          {/* <Route
            path='/profile'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfilePage userData={userData} />
              </ProtectedRoute>
            }
          /> */}
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<About />} />
        </Routes>
      </div>
    </>
  )
}
export default App

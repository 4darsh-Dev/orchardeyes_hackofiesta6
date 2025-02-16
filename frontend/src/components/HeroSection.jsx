import {
  FaMapMarkedAlt,
  FaRobot,
  FaCloudUploadAlt,
  FaChartLine
} from 'react-icons/fa'

import React from 'react'
import HomeVideo from '../assets/LandingPage.mp4'
import imgDrone from '../assets/droneHome.png'
import Hamburger from './Hamburger'
import { useAuth0 } from '@auth0/auth0-react'

const HeroSection = () => {
  const { loginWithRedirect, logout, user } = useAuth0()
  return (
    <>
      <div className='w-full bg-green-600 text-white py-2 px-6 flex justify-between items-center'>
        <span>
          <Hamburger />
        </span>
        <div className='text-xl font-bold'>OrchardEyes</div>
      </div>
      <div className='relative w-full h-screen overflow-hidden flex flex-col'>
        {/* Background Video */}
        <div className='relative w-full h-1/3'>
          <video
            autoPlay
            loop
            muted
            className='absolute top-0 left-0 w-full h-full object-cover rounded-br-[2rem] rounded-bl-[2rem]'
          >
            <source src={HomeVideo} type='video/mp4' />
          </video>
          <div className='absolute top-0 left-0 w-full h-full via-transparent to-transparent'></div>
          <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-[-2.5rem] h-[5rem] w-[5rem] hover:scale-[1.2] bg-white rounded-full border-[.3rem] border-white animate-hover'>
            <img src={imgDrone} alt='' />
          </div>
        </div>

        {/* Content */}
        <div className='relative w-full h-3/4 flex flex-col items-center justify-center text-center  px-6 '>
          <h1 className='text-4xl md:text-6xl font-bold'>
            OrchardEyes: AI Powered Drone System
          </h1>
          <p className='mt-4  text-lg md:text-xl max-w-2xl'>
            AI-powered drones mapping pest hotspots for healthier orchards.
          </p>
          <div className='mt-6 flex space-x-4'>
            <button
              className='bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg'
              onClick={() => {
                loginWithRedirect({
                  appState: { returnTo: '/farm-management/dashboard' }
                })
              }}
            >
              Get Started
            </button>
            <button className='bg-white text-green-600 hover:bg-gray-200 font-semibold px-6 py-3 rounded-lg'>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection

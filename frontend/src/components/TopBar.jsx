import React from 'react'
import { Bell, User } from 'lucide-react'
import chatBotIcon from '../assets/img/bot-tab-icon.png'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
const TopBar = ({ activeTab }) => {
  const navigate = useNavigate()
  const { loginWithRedirect, logout, user } = useAuth0()
  return (
    <div className='w-full bg-white sm:hidden'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='h-12 flex items-center justify-between'>
          {/* Center - Page Name */}
          <h1 className='text-xl font-semibold text-gray-900'>{activeTab}</h1>

          {/* Right side - Profile Icon */}
          <div className='flex items-center justify-center'>
            {/* Left side - Notification Icon */}
            <div className='flex items-center'>
              <button className='p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100'>
                <Bell size={24} />
              </button>
            </div>
            <div className='flex items-center'>
              <button
                className='p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100'
                onClick={() => {
                  navigate('/chatbot')
                }}
              >
                <img src={chatBotIcon} alt='' className='h-7 w-7' />
              </button>
            </div>

            <div className='flex items-center'>
              <button
                className='p-1 text-gray-600 hover:text-gray-900 rounded-full bg-gray-100 hover:bg-gray-200'
                onClick={() => {
                  navigate('/profile')
                }}
              >
                {user ? (
                  user.img ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className='rounded-full h-[7vh]'
                    />
                  ) : (
                    <div
                      className='rounded-full h-[5vh] w-[5vh] bg-[#7812b7] text-white text-2xl flex items-center justify-center'
                      style={{ fontFamily: 'Sour Gummy, sans-serif' }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )
                ) : (
                  <User size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar

import React, { useState } from 'react'
import {
  Menu,
  X,
  Globe,
  HelpCircle,
  Info,
  LogOut,
  Settings,
  Monitor,
  Leaf,
  Trophy,
  Video,
  User2
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Hamburger() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if (isSettingsOpen) setIsSettingsOpen(false)
  }

  const toggleSettings = (e) => {
    e.stopPropagation()
    setIsSettingsOpen(!isSettingsOpen)
  }

  const handleItemClick = (action) => {
    console.log(`Clicked: ${action}`)
    // Here you would typically add navigation logic
    setIsOpen(false)
    setIsSettingsOpen(false)
  }

  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path)
  }

  return (
    <div className='relative z-10'>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className='p-2 hover:bg-gray-100 rounded-lg transition-colors text-white mb-2'
        aria-label='Menu'
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50'
          onClick={toggleMenu}
        />
      )}

      {/* Menu Content */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex flex-col h-full'>
          {/* Logo/Header */}
          <div className='p-4 border-b text-black'>
            <h1 className='text-xl font-bold'>OrchardEyes</h1>
          </div>

          {/* Menu Items */}

          <div className='py-2 '>
            <button
              onClick={() => {
                handleItemClick('about')
                handleNavigation('/about')
              }}
              className='w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-black mb-[1.5rem] mt-[1.5rem]'
            >
              <Info size={20} />
              <span>About</span>
            </button>
            <button
              onClick={() => {
                handleItemClick('dashboard')
                handleNavigation('/farm-management/dashboard')
              }}
              className='w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-black mb-[1.5rem] mt-[1.5rem]'
            >
              <Info size={20} />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => {
                handleItemClick('profile')
                handleNavigation('/profile')
              }}
              className='w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-black mb-[1.5rem] mt-[1.5rem]'
            >
              <User2 size={20} />
              <span>Profile</span>
            </button>
            <button
              onClick={() => handleItemClick('webinar')}
              className='w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-black mb-[1.5rem] mt-[1.5rem]'
            >
              <Video size={20} />
              <span>Webinar</span>
            </button>

            <button
              onClick={() => handleItemClick('quiz')}
              className='w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-black mb-[1.5rem] mt-[1.5rem]'
            >
              <Trophy size={20} />
              <span>Quiz Leadership</span>
            </button>

            <button
              onClick={() => handleItemClick('plants')}
              className='w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-black mb-[1.5rem] mt-[1.5rem]'
            >
              <Leaf size={20} />
              <span>Plants</span>
            </button>

            <button
              onClick={() => handleItemClick('devices')}
              className='w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-black mb-[1.5rem] mt-[1.5rem]'
            >
              <Monitor size={20} />
              <span>Devices</span>
            </button>

            {/* Settings Dropdown */}
            <div className='relative'>
              <button
                onClick={toggleSettings}
                className='w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-black mb-[1.5rem] mt-[1.5rem]'
              >
                <Settings size={20} />
                <span>Settings</span>
              </button>

              {isSettingsOpen && (
                <div className='bg-gray-50 pl-8'>
                  <button
                    onClick={() => handleItemClick('change-language')}
                    className='w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-black'
                  >
                    <Globe size={20} />
                    <span>Change Language</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleItemClick('help')}
              className='w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-black mb-[1.5rem] mt-[1.5rem]'
            >
              <HelpCircle size={20} />
              <span>Help & Support</span>
            </button>

            <button
              onClick={() => handleItemClick('about')}
              className='w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-black mb-[1.5rem] mt-[1.5rem]'
            >
              <Info size={20} />
              <span>About OrchardEyes</span>
            </button>
          </div>

          {/* Logout at bottom */}
          <button
            onClick={() => handleItemClick('logout')}
            className='p-4 border-t flex items-center gap-3 hover:bg-gray-100 text-black'
          >
            <LogOut size={20} />
            <span className=''>Log Out</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Hamburger

import { useState } from 'react'
import {
  Home,
  LayoutDashboard,
  HelpCircle,
  Zap,
  GraduationCap
} from 'lucide-react'
import logo from '../assets/img/logo.png'
import droneTabIcon from '../assets/img/drone-tab-icon.png'
import botTabIcon from '../assets/img/bot-tab-icon.png'
import { useNavigate } from 'react-router-dom'
const SidebarLeft = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  return (
    <div
      className={`fixed bottom-0 sm:top-0 left-0 h-auto sm:h-screen w-screen sm:w-48 sm:bg-[#ffffff] rounded-r-2xl z-50 text-gray-700 p-3 transition-transform duration-300 ease-in-out sm:border sm:border-[#e3e1e1] sm:pt-[15vh] sm:shadow z-[1000]`}
    >
      <nav className='flex-grow'>
        <ul className='flex flex-row sm:flex-col sm:items-start items-center justify-around border shadow sm:shadow-none sm:border-none rounded-xl bg-white mx-4 sm:mx-1 py-1'>
          <li className='flex items-center'>
            <span
              onClick={() => {
                navigate('/farm-management/home')
              }}
              className={`flex items-center p-2 rounded-md ${activeTab === 'Home' ? 'bg-green-200' : ''} sm:gap-2`}
            >
              <Home size={22} />
              <span className='hidden sm:flex'>Home</span>
            </span>
          </li>
          <li>
            <span
              onClick={() => {
                navigate('/farm-management/dashboard')
              }}
              className={`flex items-center p-2 rounded-md ${activeTab === 'Dashboard' || activeTab === 'Analysis' ? 'bg-green-200' : ''} sm:gap-2`}
            >
              <LayoutDashboard size={22} />
              <span className='hidden sm:flex'>Dashboard</span>
            </span>
          </li>

          <li>
            <span
              onClick={() => {
                navigate('/farm-management/quick-actions')
              }}
              className={`flex items-center p-2 rounded-md ${activeTab === 'Quick Actions' || activeTab === 'Upload Image' ? 'bg-green-200' : ''} sm:gap-2`}
            >
              <Zap size={22} />
              <span className='hidden sm:flex'>Quick Actions</span>
            </span>
          </li>
          <li>
            <span
              onClick={() => {
                navigate('/farm-management/drone')
              }}
              className={`flex items-center p-2 pl-1 rounded-md ${activeTab === 'My Drone' ? 'bg-green-200' : ''} sm:gap-2`}
            >
              <img
                src={droneTabIcon}
                alt='Drone Tab Icon'
                className='w-9 h-9'
              />
              <span className='hidden sm:flex'>My Drone</span>
            </span>
          </li>
          <li>
            <span
              onClick={() => {
                navigate('/farm-management/learn')
              }}
              className={`flex items-center p-2  rounded-md ${activeTab === 'Learn' ? 'bg-green-200' : ''} sm:gap-2`}
            >
              <GraduationCap size={24} />
              <span className='hidden sm:flex'>Learn</span>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SidebarLeft

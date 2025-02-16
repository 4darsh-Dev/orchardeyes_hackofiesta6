import { useEffect, useState } from 'react'
import { Bell, ChevronDown, RotateCw } from 'lucide-react'
import Card from '../components/Card'
import DoughnutChartWithImage from '../components/charts/DoughnutChartWithImage'
import leafForChart from '../assets/img/leaf_for_chart.svg'
import appleForChart from '../assets/img/apple_for_chart.png'
import sunCloud from '../assets/img/sun_cloud.svg'
import SidebarLeft from '../components/SideBarLeft'
import PieChart from '../components/charts/PieChart'
import SideBarRight from '../components/SideBarRight'
import LineChart from '../components/charts/LineChart'
import PrecisionMap from '../components/charts/PrecisionMap'
import TopBar from '../components/TopBar'
import FarmCard from '../components/FarmCard'
import QuickActions from './QuickActions'
import Chatbot from '../components/chatbot/Chatbot'
import { Outlet, useLocation } from 'react-router-dom'

const OrchardManagement = ({ activeTab, setActiveTab }) => {
  const [farmMetrics, setFarmMetrics] = useState(null)
  const location = useLocation()
  // Dummy data for development
  const data = {
    health: {
      fruit: {
        healthy: 86,
        unhealthy: 14
      },
      leaves: {
        healthy: 90,
        unhealthy: 10
      }
    },
    weather: {
      temperature: 32, // in degrees Celsius
      humidity: 50, // in percentage
      prediction: 'Rainy' // could be "cloudy", "sunny", or "rain"
    },
    pestSeverity: 35, // on a scale of 1-100
    predictedDiseases: {
      disease: ['Apple scab', 'Fire blight', 'No Disease'],
      chance: [10, 43, 47] // percentages
    },
    appleCount: 1200, // total number of apples
    estimatedAppleYield: [0, 3.2, 5.5, 2.3, 4.1, 6.7, 3.8], // in tonnes
    precisionMapData: {
      pestDisease: [
        [1.1, 1.2],
        [1.3, 2.1],
        [1.5, 3.3],
        [2.2, 1.4],
        [2.5, 2.6],
        [2.8, 3.1]
      ],
      lowWater: [
        [3.1, 1.2],
        [3.3, 2.4],
        [3.5, 3.6],
        [4.2, 1.1],
        [4.5, 2.3],
        [4.8, 3.5]
      ],
      nutrientDeficiency: [
        [5.1, 1.3],
        [5.3, 2.5],
        [5.5, 3.7],
        [6.2, 1.4],
        [6.5, 2.6],
        [6.8, 3.8]
      ],
      healthy: [
        // Fill the rest of the area with green points
        ...Array.from({ length: 20 }, (_, x) =>
          Array.from({ length: 20 }, (_, y) => [(x + 1) / 2, (y + 1) / 2])
        )
          .flat()
          .filter(
            ([x, y]) =>
              !(
                (x <= 2.8 && y <= 3.8) ||
                (x >= 3.1 && x <= 4.8 && y <= 3.8) ||
                (x >= 5.1 && x <= 6.8 && y <= 3.8)
              )
          )
      ]
    }
  }
  const routeName = location.pathname.slice(16)
  useEffect(() => {
    setFarmMetrics(data)
  }, [])
  useEffect(() => {
    console.log(routeName)
    switch (routeName) {
      case '/analysis':
        setActiveTab('Analysis')
        break
      case '/dashboard':
        setActiveTab('Dashboard')
        break
      case '/quick-actions':
        setActiveTab('Quick Actions')
        break
      case '/learn':
        setActiveTab('Learn')
        break
      case '/drone':
        setActiveTab('My Drone')
        break
      case '/image-upload':
        setActiveTab('Upload Image')
        break
      case '/home':
        setActiveTab('Home')
        break
      default:
        setActiveTab('Dashboard')
        break
    }
  }, [location.pathname])
  // Destructure farmMetrics
  const {
    health: {
      fruit: { healthy: healthyFruits, unhealthy: unhealthyFruits } = {},
      leaves: { healthy: healthyLeaves, unhealthy: unhealthyLeaves } = {}
    } = {},
    weather: { temperature, humidity, prediction } = {},
    pestSeverity,
    predictedDiseases: { disease, chance } = {},
    appleCount,
    production
  } = farmMetrics || {}

  return (
    <>
      <TopBar classname='sm:hidden' activeTab={activeTab} />
      <SidebarLeft activeTab={activeTab} setActiveTab={setActiveTab} />
      <Outlet />
    </>
  )
}

export default OrchardManagement

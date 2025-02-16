import {
  BarChart2,
  Sprout,
  Bug,
  Droplets,
  Cloud,
  Upload,
  PlusCircle
} from 'lucide-react'
import Card from '../components/Card'
// import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import droneIcon from '../assets/img/drone.png'
import { useNavigate } from 'react-router-dom'
const QuickActions = ({ activeTab, setActiveTab, setCurrentAnalysisSlide }) => {
  const navigate = useNavigate()
  const actions = [
    {
      //   icon: (
      //     <DotLottieReact
      //       src='https://lottie.host/b399d2cc-e08f-4046-8521-43f48cfdfe56/sZHognriY6.lottie'
      //       loop
      //       autoplay
      //     />
      //   ),
      icon: <img src={droneIcon} className='h-10' />,
      label: 'Connect Drone',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      route: '/farm-management/drone',
      routeName: 'My Drone'
    },
    {
      icon: <BarChart2 size={40} />,
      label: 'Analysis',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      route: '/farm-management/analysis'
    },
    {
      icon: <Sprout size={40} />,
      label: 'Yield',
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      route: '/farm-management/analysis'
    },
    {
      icon: <Bug size={40} />,
      label: 'Disease Detection',
      color: 'bg-red-100',
      iconColor: 'text-red-600',
      route: '/farm-management/image-upload',
      functions: setCurrentAnalysisSlide(2)
    },
    {
      icon: <Droplets size={40} />,
      label: 'NDVI/Water Stress',
      color: 'bg-cyan-100',
      iconColor: 'text-cyan-600'
    },
    {
      icon: <Cloud size={40} />,
      label: 'Weather',
      color: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      icon: <Upload size={40} />,
      label: 'Soil Report Upload',
      color: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      route: '/farm-management/image-upload'
    },
    {
      icon: <PlusCircle size={40} />,
      label: 'Coming Soon',
      color: 'bg-gray-100',
      iconColor: 'text-gray-400'
    }
  ]

  return (
    <div className='p-4 md:p-6 max-w-4xl mx-auto'>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4 h-[70vh] items-center'>
        {actions.map((action, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(action.route)
              action.functions
            }}
          >
            <Card
              key={index}
              margin='mb-0'
              bgColor={action.color}
              otherStyles='cursor-pointer transition-shadow duration-200'
            >
              <div
                className={` mx-auto rounded-full ${action.color} flex items-center justify-center mb-3`}
              >
                <div className={action.iconColor}>{action.icon}</div>
              </div>

              <p className='text-sm text-gray-500 text-center font-bold'>
                {action.label}
              </p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuickActions

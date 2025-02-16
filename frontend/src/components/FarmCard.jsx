import React, { useEffect, useState } from 'react'
import {
  Footprints,
  Heart,
  Droplets,
  Moon,
  ArrowRight,
  Leaf,
  AlertTriangle,
  Bot
} from 'lucide-react'
import Card from './Card'
import DoughnutChartWithImage from '../components/charts/DoughnutChartWithImage'
import leafForChart from '../assets/img/leaf_for_chart.svg'
import appleForChart from '../assets/img/apple_for_chart.png'
import sunCloud from '../assets/img/sun_cloud.svg'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const FarmDashboard = () => {
  const [farmMetrics, setFarmMetrics] = useState(null)
  const navigate = useNavigate()
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

  useEffect(() => {
    setFarmMetrics(data)
  }, [])
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
    <div className='p-4 md:p-6 max-w-xl mx-auto'>
      <div className='grid grid-cols-2 gap-4'>
        {/* Farm Health Card */}
        <Card
          margin='mb-0'
          bgColor='bg-gradient-to-br from-emerald-500 to-emerald-600'
          otherStyles={'col-span-2'}
        >
          <div
            className='w-full text-white'
            onClick={() => {
              navigate('/farm-management/analysis')
            }}
          >
            <h2
              className='text-lg font-semibold mb-4'
              style={{ fontFamily: '' }}
            >
              OVERVIEW
            </h2>
            <div className='grid grid-cols-2 sm:grid-cols-2 gap-2'>
              <div className='flex items-start space-x-3'>
                <div className='p-2 bg-white/20 backdrop-blur-sm rounded-full'>
                  <Leaf className='text-white' size={24} />
                </div>
                <div>
                  <p className='text-sm text-white/80'>Status</p>
                  <p className='font-semibold'>Healthy</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='p-2 bg-white/20 backdrop-blur-sm rounded-full'>
                  <AlertTriangle className='text-white' size={24} />
                </div>
                <div>
                  <p className='text-sm text-white/80'>Disease Risk</p>
                  <p className='font-semibold'>None Detected</p>
                </div>
              </div>
              <div className='col-span-2'>
                <p className='text-sm text-white/80 mb-1'>Estimated Yield</p>
                <div className='w-full bg-white/20 rounded-full h-2.5'>
                  <div className='bg-white h-2.5 rounded-full w-3/4'></div>
                </div>
                <p className='text-sm mt-1'>
                  75% of target (12.5 tons/hectare)
                </p>
              </div>
            </div>
          </div>
        </Card>
        {/* <Card
          margin='mb-0'
          bgColor='bg-green-100'
          otherStyles='relative overflow-hidden'
        >
          <div className='w-full h-full'>
            <h3 className='text-sky-900 text-xl font-bold mb-2'>Farm Health</h3>
            <p className='text-xl font-semibold text-sky-900 mb-1'>95%</p>
            {/* <div className='absolute bottom-4 right-4 w-16 h-16 bg-sky-200 rounded-full flex items-center justify-center'>
              <Footprints className='text-sky-600' size={24} />
            </div>
          </div>
        </Card> */}

        {/* Crop Vitals Card */}
        {/* <Card
          className='p-4'
          bgColor={'bg-[#ffd6d6]'}
          otherStyles={
            'border border-[#81ec81] flex items-center justify-between'
          }
        >
          <h2 className='font-semibold mb-2 text-lg'>Leaves and Fruits</h2>
          <div className='flex flex-col gap-4 items-center'>
            <div className='flex space-x-4'>
              <DoughnutChartWithImage
                img={leafForChart}
                label1='Healthy leaves'
                label2='Diseased Leaves'
                data1={healthyLeaves}
                data2={unhealthyLeaves}
              />
            </div>
            <div className='flex space-x-4'>
              <DoughnutChartWithImage
                img={appleForChart}
                label1='Healthy Apples'
                label2='Diseased Apples'
                data1={healthyFruits}
                data2={unhealthyFruits}
              />
            </div>
          </div>
        </Card> */}

        {/* chatbot card */}
        <Card
          margin='mb-0'
          bgColor='bg-gradient-to-br from-indigo-500 to-indigo-600'
          otherStyles=' col-span-1'
        >
          <div
            className='flex items-start flex-col gap-1'
            onClick={() => {
              navigate('/chatbot')
            }}
          >
            <p className='text-2xl text-bold text-indigo-200 mb-1'>
              Personlised
            </p>
            <div className='flex items-center justify-center gap-4'>
              <p className='text-2xl text-indigo-200 mb-1'>Insights</p>
              <div className='p-2 bg-indigo-200 rounded-full flex items-center justify-center'>
                <Bot className='text-indigo-600' size={24} />
              </div>
            </div>
            {/* <button className='mt-2 bg-indigo-600 text-white px-2 py-2 rounded-lg flex items-center  hover:bg-indigo-700 transition-colors'>
              <span>Chat now</span>
              <ArrowRight size={16} />
            </button> */}
          </div>
        </Card>

        {/* Weather Card */}
        <Card
          bgColor={'bg-[#cee6f4]'}
          otherStyles={'border border-[#71c9bd]'}
          margin={'0'}
        >
          <div
            className='flex items-center justify-between gap-4'
            onClick={() => {
              navigate('/farm-management/weather')
            }}
          >
            <div className='flex items-center'>
              <img src={sunCloud} alt='sun behing clouds' />
            </div>
            <div className='flex flex-col'>
              <div className='text-right flex gap-2  items-center'>
                <span className='text-2xl text-semibold text-blue-700'>
                  {temperature}&#176;
                </span>
                <span className='block text-xl text-bold text-blue-700'>
                  {prediction}
                </span>
              </div>
              <div className='border-t border-black my-2'></div>
              <div className='flex flex-col'>
                <div className='text-right flex gap-2 items-center'>
                  <span className='text-md text-semibold text-blue-700'>
                    {humidity}%
                  </span>
                  <span className='block text-sm text-semibold text-blue-700'>
                    humidity
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Today's Tasks Section */}
      <div className='mt-8'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold'>Today&apos;s Tasks</h2>
          <button className='text-sky-500 text-sm'>See all</button>
        </div>

        <div className='space-y-3'>
          <div className='bg-white p-4 rounded-xl flex items-center justify-between shadow-sm'>
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
              </div>
              <div>
                <p className='text-xl'>Check Irrigation System</p>
                <p className='text-sm text-gray-500'>Completed</p>
              </div>
            </div>
            <ArrowRight className='text-gray-400' size={20} />
          </div>

          <div className='bg-white p-4 rounded-xl flex items-center justify-between shadow-sm'>
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center'>
                <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
              </div>
              <div>
                <p className='text-xl'>Apply Fertilizer</p>
                <p className='text-sm text-gray-500'>2 of 4 zones done</p>
              </div>
            </div>
            <ArrowRight className='text-gray-400' size={20} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FarmDashboard

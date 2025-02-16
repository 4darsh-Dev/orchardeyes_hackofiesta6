import React, { useEffect, useState } from 'react'
import DoughnutChartWithImage from './charts/DoughnutChartWithImage'
import Card from './Card'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import LineChart from './charts/LineChart'
import PieChart from './charts/PieChart'
import leafForChart from '../assets/img/leaf_for_chart.svg'
import appleForChart from '../assets/img/apple_for_chart.png'
import sunCloud from '../assets/img/sun_cloud.svg'
import PrecisionMap from './charts/PrecisionMap'

const Analysis = ({ currentAnalysisSlide, setCurrentAnalysisSlide }) => {
  const [farmMetrics, setFarmMetrics] = useState(null)
  const [slideAnimation, setSlideAnimation] = useState('')

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

  const slides = [
    {
      title: 'Leaves and Fruits',
      component: ({ data }) => (
        <div className='flex flex-col gap-6 w-full'>
          <div className='flex gap-4 justify-around'>
            <div className='flex flex-col items-center gap-4'>
              <DoughnutChartWithImage
                img={leafForChart}
                label1='Healthy leaves'
                label2='Diseased Leaves'
                data1={data.health.leaves.healthy}
                data2={data.health.leaves.unhealthy}
              />
              <Card bgColor='bg-emerald-50' margin='mt-4'>
                <div className='text-center'>
                  <p className='font-semibold text-lg text-emerald-700'>
                    {data.health.leaves.healthy}% Healthy
                  </p>
                  <p className='text-red-600'>
                    {data.health.leaves.unhealthy}% Diseased
                  </p>
                </div>
              </Card>
            </div>
            <div className='flex flex-col items-center gap-4'>
              <DoughnutChartWithImage
                img={appleForChart}
                label1='Healthy Apples'
                label2='Diseased Apples'
                data1={data.health.fruit.healthy}
                data2={data.health.fruit.unhealthy}
              />
              <Card bgColor='bg-emerald-50' margin='mt-4'>
                <div className='text-center'>
                  <p className='font-semibold text-lg text-emerald-700'>
                    {data.health.fruit.healthy}% Healthy
                  </p>
                  <p className='text-red-600'>
                    {data.health.fruit.unhealthy}% Diseased
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Disease Prediction',
      component: ({ data }) => (
        <div className='flex flex-col gap-6 w-full'>
          <PieChart
            dataSet={data.predictedDiseases.chance}
            labels={data.predictedDiseases.disease}
          />
          <div className='grid grid-cols-3 gap-4'>
            {data.predictedDiseases.disease.map((disease, index) => (
              <Card key={disease} bgColor='bg-orange-50'>
                <div className='text-center'>
                  <p className='font-semibold'>{disease}</p>
                  <p className='text-lg text-orange-700'>
                    {data.predictedDiseases.chance[index]}%
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Production',
      component: ({ data }) => (
        <div className='flex flex-col gap-6 w-full'>
          <LineChart
            labels={[0, 15, 30, 45, 60, 75]}
            data={farmMetrics.estimatedAppleYield}
            title='Estimated Apple Count (tonnes)'
          />
          <div className='grid grid-cols-3 gap-4'>
            {data.predictedDiseases.disease.map((disease, index) => (
              <Card key={disease} bgColor='bg-orange-50'>
                <div className='text-center'>
                  <p className='font-semibold'>{disease}</p>
                  <p className='text-lg text-orange-700'>
                    {data.predictedDiseases.chance[index]}%
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Precision Map',
      component: ({ data }) => (
        <div className='w-full'>
          <Card bgColor='bg-blue-50'>
            <PrecisionMap
              data={data.precisionMapData}
              title='2D Precision Map'
            />
          </Card>
        </div>
      )
    }
  ]

  useEffect(() => {
    setFarmMetrics(data)
  }, [])

  const handleSlideChange = (direction) => {
    setSlideAnimation(direction === 'next' ? 'slide-left' : 'slide-right')

    setTimeout(() => {
      setCurrentAnalysisSlide((prev) => {
        if (direction === 'next') {
          return prev === slides.length - 1 ? 0 : prev + 1
        } else {
          return prev === 0 ? slides.length - 1 : prev - 1
        }
      })
      setSlideAnimation('')
    }, 300)
  }

  return (
    <div className='flex bg-white p-4 sm:pl-48 flex-col gap-6 bg-[#dedede] min-h-screen'>
      {farmMetrics ? (
        <div className='relative w-full'>
          <div className='flex justify-between items-center mb-6'>
            <button
              onClick={() => handleSlideChange('prev')}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
            >
              <ChevronLeft className='w-6 h-6 text-gray-600' />
            </button>
            <h2 className='font-semibold text-xl text-gray-600'>
              {slides[currentAnalysisSlide].title}
            </h2>
            <button
              onClick={() => handleSlideChange('next')}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
            >
              <ChevronRight className='w-6 h-6 text-gray-600' />
            </button>
          </div>

          <div className={`transition-all duration-300 ${slideAnimation}`}>
            {slides[currentAnalysisSlide].component({ data: farmMetrics })}
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
        </div>
      )}
    </div>
  )
}

export default Analysis

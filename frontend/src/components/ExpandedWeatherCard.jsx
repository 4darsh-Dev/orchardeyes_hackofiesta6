import React, { useEffect, useState } from 'react'
import {
  Sun,
  Wind,
  Droplets,
  Thermometer,
  ArrowLeft,
  Clock,
  RefreshCcw,
  Cloud,
  Rainbow,
  CloudRain,
  CloudSun,
  CloudSunRain
} from 'lucide-react'
import PropTypes from 'prop-types'
import '../styles/scrollbar.css'
import { HashLoader } from 'react-spinners'
import { weatherIcon } from './weatherIcon.jsx'
const ExpandedWeatherCard = ({ weatherData, setWeatherData, isLoading }) => {
  if (isLoading) {
    return <HashLoader />
  }
  if (!weatherData && !isLoading) {
    return (
      <div className='flex flex-col items-center justify-center p-8 min-h-[400px]'>
        {/* Weather Icon */}
        <div className='text-gray-300 mb-6'>
          <img
            src='https://thumb.ac-illust.com/b6/b65ea5b262b6cedb7e01d49227e6c530_t.jpeg'
            alt=''
          />
        </div>

        {/* Error Message */}
        <h2 className='text-xl md:text-2xl font-semibold text-gray-700 mb-2'>
          Unable to get Weather Data
        </h2>

        {/* Supplementary Text */}
        <p className='text-gray-500 text-center max-w-md mb-6'>
          We couldn't retrieve the current weather information. Please check
          your connection and try again.
        </p>

        {/* Retry Button */}
        <button
          className='px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2'
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    )
  }
  const { current, hourlyForecast, dailyForecast } = weatherData

  // Function to format the date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const options = { day: 'numeric', month: 'short' }
    return date.toLocaleDateString('en-US', options)
  }

  return (
    <>
      {weatherData && (
        <div className='w-full max-w-2xl p-4 overflow-hidden mt-5'>
          <div className='flex flex-col items-center gap-2 mb-8'>
            <div className='flex flex-col items-center gap-1'>
              {weatherIcon(current.condition, 120)}
              <span className='text-5xl font-bold'>{current.temp}°C</span>
              <div className='text-md mt-1 opacity-75'>
                {formatDate(Date.now())}
              </div>
              <span className='text-xl'>{current.condition}</span>
            </div>

            <div className='flex gap-4'>
              <div className='bg-white/10 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-2 flex-col'>
                  <Wind className='w-5 h-5' />
                  <span className='sr-only'>Wind</span>
                  <div className='text-lg font-semibold'>{current.wind}</div>
                </div>
              </div>

              <div className='bg-white/10 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-2 flex-col'>
                  <Droplets className='w-5 h-5' />
                  <span className='sr-only'>Humidity</span>
                  <div className='text-lg font-semibold'>
                    {current.humidity}
                  </div>
                </div>
              </div>

              <div className='bg-white/10 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-2 flex-col'>
                  <Thermometer className='w-5 h-5' />
                  <span className='sr-only'>Feels like</span>
                  <div className='text-lg font-semibold'>{current.temp}</div>
                </div>
              </div>

              <div className='bg-white/10 rounded-lg p-4'>
                <div className='flex items-center gap-2 mb-2 flex-col'>
                  <RefreshCcw className='w-5 h-5' />
                  <span className='sr-only'>Update</span>
                  <div className='text-lg font-semibold'>
                    {current.lastUpdated}
                  </div>
                </div>
              </div>
            </div>
            <div className='border-t border-white/20 pt-6 px-4 flex flex-col items-start'>
              <h3 className='text-lg mb-4'>Today&apos;s Forecast</h3>
              <div className='flex gap-10 overflow-x-scroll scrollbar-hide w-[90vw] justify-evenly scrollbar-hide'>
                {hourlyForecast.map(({ time, temp, condition }, index) => (
                  <div
                    key={time}
                    className='flex flex-col items-center bg-white/10 rounded-lg '
                  >
                    <span className='text-sm mb-2'>{time}</span>
                    {weatherIcon(condition, 40)}
                    <span className='text-lg font-semibold'>{temp}&deg;</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
const weatherDataPropTypes = {
  current: PropTypes.shape({
    temp: PropTypes.number.isRequired,
    condition: PropTypes.string.isRequired,
    wind: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    lastUpdated: PropTypes.string.isRequired
  }).isRequired,
  dailyForecast: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      temp: PropTypes.number.isRequired,
      condition: PropTypes.string.isRequired
    })
  ).isRequired,
  hourlyForecast: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
      temp: PropTypes.number.isRequired,
      condition: PropTypes.string.isRequired
    })
  ).isRequired
}
ExpandedWeatherCard.propTypes = {
  weatherData: PropTypes.shape(weatherDataPropTypes),
  setWeatherData: PropTypes.func.isRequired
}
export default ExpandedWeatherCard

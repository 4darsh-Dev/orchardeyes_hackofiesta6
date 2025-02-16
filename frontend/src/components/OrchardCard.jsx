import React from 'react'

import { useNavigate } from 'react-router-dom'
const OrchardCard = ({ orchard }) => {
  if (!orchard) return null // Pre-check to ensure orchard data exists

  const navigate = useNavigate()
  return (
    <div
      className='bg-white rounded-lg shadow-lg overflow-hidden'
      onClick={() => {
        navigate('/orchard')
      }}
    >
      <img
        src={orchard.image}
        alt={orchard.name}
        className='w-full h-48 object-cover'
      />
      <div className='p-4'>
        <h3 className='text-lg font-semibold'>{orchard.name}</h3>
        <p className='text-sm text-gray-600'>{orchard.location}</p>
        <button className='mt-4 w-full bg-red-600 text-white py-2 px-4 rounded'>
          Order Now
        </button>
      </div>
    </div>
  )
}

export default OrchardCard

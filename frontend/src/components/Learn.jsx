import React from 'react'
import Card from './Card'
import { Earth, Cloud, Apple, Bug, Microscope } from 'lucide-react'

const Learn = () => {
  const learningResources = [
    {
      title: 'Soil Types',
      description:
        'Learn about different soil compositions, pH levels, and how they affect crop growth. Understand loamy, clay, sandy, and silt soils.',
      icon: <Earth className='w-12 h-12 mb-4' />,
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Growing Seasons',
      description:
        'Discover optimal planting and harvesting times throughout the year. Plan your farming calendar for maximum yield.',
      icon: <Cloud className='w-12 h-12 mb-4' />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Apple Species',
      description:
        'Explore various apple varieties, their characteristics, and ideal growing conditions. From Honeycrisp to Fuji and beyond.',
      icon: <Apple className='w-12 h-12 mb-4' />,
      bgColor: 'bg-red-50'
    },
    {
      title: 'Pest Management',
      description:
        'Identify common orchard pests and learn effective, environmentally-friendly control methods.',
      icon: <Bug className='w-12 h-12 mb-4' />,
      bgColor: 'bg-green-50'
    },
    {
      title: 'Disease Prevention',
      description:
        'Understand common apple tree diseases, their symptoms, and prevention strategies for a healthy orchard.',
      icon: <Microscope className='w-12 h-12 mb-4' />,
      bgColor: 'bg-purple-50'
    }
  ]

  return (
    <div className='container mx-auto px-4 py-8 mb-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {learningResources.map((resource, index) => (
          <Card
            key={index}
            bgColor={resource.bgColor}
            margin='mb-0'
            otherStyles='hover:shadow-2xl transition-shadow duration-300'
          >
            {resource.icon}
            <h2 className='text-xl font-semibold mb-3'>{resource.title}</h2>
            <p className='text-gray-600'>{resource.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Learn

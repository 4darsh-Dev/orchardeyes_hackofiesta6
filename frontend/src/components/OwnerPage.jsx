import React from 'react'
import { MapPin, Star, Award, Plus, PlayCircle } from 'lucide-react'

// Navigation Component
const Navigation = () => (
  <nav className='bg-green-800 p-4'>
    <ul className='flex space-x-6 text-white'>
      <li className='cursor-pointer'>Profile</li>
      <li className='cursor-pointer'>Analytics</li>
      <li className='cursor-pointer'>Messages</li>
    </ul>
  </nav>
)

// Profile Header Component
const ProfileHeader = () => (
  <div className='flex flex-col items-center mt-8'>
    <div className='w-24 h-24 bg-yellow-400 rounded-full overflow-hidden'>
      <img
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2yfUhhVZ0QzJBOo0Q__o1RYvXGbuvx20DzQ&s'
        alt='Profile'
        className='w-full h-full object-cover'
      />
    </div>
    <h1 className='text-2xl font-bold mt-4'>Omkar rana</h1>
    <p className='text-gray-600 mt-2'>
      I focus on quality not the quantity of my fruits
    </p>
  </div>
)

// Stats Section Component
const StatsSection = () => (
  <div className='flex justify-center space-x-8 mt-6'>
    <div className='text-center bg-green-100 px-6 py-3 rounded-lg'>
      <h2 className='text-2xl font-bold'>2k</h2>
      <p className='text-sm'>Reviews</p>
    </div>
    <div className='text-center bg-green-100 px-6 py-3 rounded-lg'>
      <h2 className='text-2xl font-bold'>5</h2>
      <p className='text-sm'>Years Experience</p>
    </div>
  </div>
)

// Details Section Component
const DetailsSection = () => (
  <div className='mt-8 px-4'>
    <div className='flex justify-between items-center mb-2'>
      <span>Area:</span>
      <button className='text-gray-600'>
        <MapPin size={16} />
      </button>
    </div>
    <div className='flex justify-between items-center mb-2'>
      <span>Apple variety:</span>
      <button className='text-gray-600'>
        <MapPin size={16} />
      </button>
    </div>
    <div className='flex justify-between items-center mb-2'>
      <span>Sponsors:</span>
      <button className='text-gray-600'>
        <MapPin size={16} />
      </button>
    </div>
    <div className='bg-green-50 p-4 rounded-lg mt-4 flex items-center'>
      <span className='text-green-800'>Your total bookmarks: 5k</span>
    </div>
  </div>
)

// Rating Component
const RatingSection = () => (
  <div className='flex space-x-4 mt-6 px-4'>
    <div className='bg-green-50 p-2 rounded-full'>
      <MapPin className='text-green-600' size={20} />
    </div>
    <div className='bg-green-50 p-2 rounded-full'>
      <Star className='text-green-600' size={20} />
    </div>
    <div className='bg-green-50 p-2 rounded-full'>
      <Award className='text-green-600' size={20} />
    </div>
    <div className='bg-green-50 px-4 py-2 rounded-full'>
      <span>Certificates</span>
    </div>
  </div>
)

// Gallery Section Component
const GallerySection = () => (
  <div className='mt-8 px-4'>
    <h2 className='text-xl font-bold mb-4 border-b pb-2'>Gallery</h2>
    <div className='grid grid-cols-3 gap-4'>
      {[1, 2, 3, 4, 5, 6].map((item, index) =>
        index === 5 ? (
          <div
            key={item}
            className='bg-gray-100 rounded-lg aspect-video flex items-center justify-center'
          >
            <Plus className='text-gray-600' />
          </div>
        ) : (
          <div
            key={item}
            className='relative rounded-lg overflow-hidden aspect-video'
          >
            <img
              src='/api/placeholder/320/180'
              alt={`Gallery ${item}`}
              className='w-full h-full object-cover'
            />
            {index === 0 && (
              <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-30'>
                <PlayCircle className='text-white' size={32} />
              </div>
            )}
          </div>
        )
      )}
    </div>
  </div>
)

// Testimonial Card Component
const TestimonialCard = ({ name, location }) => (
  <div className='bg-emerald-500 p-6 rounded-lg text-white'>
    <div className='flex flex-col items-center'>
      <img
        src='/api/placeholder/48/48'
        alt={name}
        className='w-12 h-12 rounded-full'
      />
      <h3 className='mt-2 font-semibold'>{name}</h3>
      <p className='text-sm'>{location}</p>
    </div>
    <p className='text-center mt-4'>
      The rule of 25 says you need to sav get this number, first annual
      expenses.
    </p>
    <div className='flex justify-center mt-4'>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={16} className='text-yellow-400' />
      ))}
    </div>
  </div>
)

// Testimonials Section Component
const TestimonialsSection = () => (
  <div className='mt-8 px-4 mb-8'>
    <h2 className='text-xl font-bold mb-4 border-b pb-2'>Testimonials</h2>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      {[1, 2, 3].map((item) => (
        <TestimonialCard
          key={item}
          name='Samsher Singh'
          location='Delhi, pitampura'
        />
      ))}
    </div>
  </div>
)

// Main Profile Page Component
const ProfilePage = () => {
  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-3xl mx-auto'>
        <ProfileHeader />
        <StatsSection />
        <DetailsSection />
        <RatingSection />
        <GallerySection />
        <TestimonialsSection />
      </div>
    </div>
  )
}

export default ProfilePage

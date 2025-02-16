import React from 'react'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'

const HomePage = () => {
  return (
    <div className='sm:hidden'>
      <HeroSection />
      <Features />
      <HowItWorks />
      <Testimonials />
    </div>
  )
}

export default HomePage

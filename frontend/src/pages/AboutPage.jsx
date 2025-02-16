import React, { useState } from 'react'

import { ArrowDownNarrowWide, Lightbulb, Home } from 'lucide-react'
import OrchardImg from '../assets/orchardImg.jpeg'
// import Icon from "../assets/logo-small.png";
import { useNavigate } from 'react-router-dom'
import Hamburger from '../components/Hamburger'

const faqs = [
  {
    question: 'How does the drone detect pests?',
    answer:
      'OrchardEyes uses AI-powered image recognition to analyze drone-captured images and detect pest infestations accurately.'
  },
  {
    question: 'How accurate is the AI?',
    answer:
      'Our AI models are trained on large agricultural datasets, achieving over 90% accuracy in identifying common pests and diseases.'
  },
  {
    question: 'Do I need internet access to use OrchardEyes?',
    answer:
      'No, OrchardEyes processes data on-device using edge computing. However, an internet connection is required for cloud analytics and report generation.'
  },
  {
    question: 'Is it affordable for small farmers?',
    answer:
      'Yes! We offer flexible pricing plans and government-backed subsidies to ensure accessibility for small and large-scale farmers alike.'
  }
]

const About = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const navigate = useNavigate()

  const handleBackToHome = () => {
    navigate('/')
  }

  return (
    <div className='bg-gray-100 text-gray-900 relative'>
      {/* Hero Section */}
      <div
        className='relative h-[400px] flex items-center justify-center bg-cover bg-center'
        style={{ backgroundImage: `url(${OrchardImg})` }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative z-10 p-6 text-center items-center justify-center  flex flex-col gap-2'>
          {/* <img className="h-[5rem] w-[5rem] p-2 bg-white rounded-full" src={Icon} alt="" /> */}

          <h1 className='text-4xl font-bold text-white'>
            Empowering Farmers with AI
          </h1>
          <p className='text-lg text-gray-300 mt-2'>
            Revolutionizing agriculture through AI-driven precision farming.
          </p>
        </div>
        <span className='absolute left-[1rem] top-[1rem]'>
          <Hamburger />
        </span>
      </div>

      {/* Mission & Vision */}
      <section className='py-16 px-6 text-center'>
        <h2 className='text-3xl font-semibold'>Our Mission & Vision</h2>
        <p className='mt-4 text-lg text-gray-700 max-w-2xl mx-auto'>
          Our goal is to empower farmers with AI-powered drone insights,
          reducing crop loss and improving yield quality.
        </p>
      </section>

      {/* Problem & Solution */}
      <section className='py-16 px-6 bg-white text-center'>
        <h2 className='text-3xl font-semibold'>The Problem & Our Solution</h2>
        <div className='mt-6 max-w-3xl mx-auto text-lg text-gray-700'>
          <div className='flex items-center justify-center gap-4'>
            <div className='flex items-center gap-2'>
              <ArrowDownNarrowWide className='text-red-500 text-4xl' />
              <p>
                <strong>Problem:</strong> Farmers lose up to 30% of yield due to
                undetected pests and diseases.
              </p>
            </div>
          </div>
          <div className='flex items-center justify-center gap-4 mt-4'>
            <div className='flex items-center gap-2'>
              <Lightbulb className='text-yellow-500 text-4xl' />
              <p>
                <strong>Solution:</strong> OrchardEyes provides real-time
                AI-powered monitoring to detect issues early and prevent crop
                loss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='py-16 px-6 text-center bg-gray-200'>
        <h2 className='text-3xl font-semibold'>How It Works</h2>
        <p className='mt-4 text-lg text-gray-700 max-w-2xl mx-auto'>
          Our AI-powered drone scans your orchard, generates a 3D map, and
          provides pest and disease insights instantly.
        </p>
        <button className='mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700'>
          See Full Process →
        </button>
      </section>

      {/* FAQ Section */}
      <section className='py-16 px-6 text-center'>
        <h2 className='text-3xl font-semibold'>Frequently Asked Questions</h2>
        <div className='mt-6 max-w-3xl mx-auto text-left'>
          {faqs.map((faq, index) => (
            <div key={index} className='border-b border-gray-300 py-4'>
              <button
                className='flex justify-between items-center w-full text-lg font-medium text-left'
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <ArrowDownNarrowWide
                  className={`transition-transform ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}
                />
              </button>
              {openIndex === index && (
                <p className='mt-2 text-gray-600'>{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-16 px-6 text-center bg-blue-600 text-white'>
        <h2 className='text-3xl font-semibold'>
          Ready to Transform Your Orchard?
        </h2>
        <p className='mt-4 text-lg max-w-2xl mx-auto'>
          Join the future of precision farming with OrchardEyes. Get early
          access and boost your farm’s productivity.
        </p>
        <button className='mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-200'>
          Get Early Access
        </button>
      </section>
    </div>
  )
}

export default About

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'

const FooterLinks = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between'>
      {/* Navigation Links */}
      <div className='mb-4 md:mb-0'>
        <h5 className='text-white font-semibold mb-2'>Quick Links</h5>
        <ul>
          <li>
            <a href='/' className='text-gray-300 hover:text-white'>
              Home
            </a>
          </li>
          <li>
            <a href='/about' className='text-gray-300 hover:text-white'>
              About Us
            </a>
          </li>
          <li>
            <a href='/services' className='text-gray-300 hover:text-white'>
              Services
            </a>
          </li>
          <li>
            <a href='/contact' className='text-gray-300 hover:text-white'>
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Social Media Links */}
      <div className='mb-4 md:mb-0'>
        <h5 className='text-white font-semibold mb-2'>Follow Us</h5>
        <div className='flex space-x-4'>
          <a
            href='https://facebook.com'
            className='text-gray-300 hover:text-white'
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href='https://twitter.com'
            className='text-gray-300 hover:text-white'
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href='https://instagram.com'
            className='text-gray-300 hover:text-white'
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>

      {/* Contact Info */}
      <div>
        <h5 className='text-white font-semibold mb-2'>Contact Us</h5>
        <p className='text-gray-300'>Email: info@orchard.com</p>
        <p className='text-gray-300'>Phone: +91 123 456 7890</p>
      </div>
    </div>
  )
}

export default FooterLinks

import { Leaf, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div>
            <div className='flex items-center mb-4'>
              <Leaf className='h-8 w-8 text-emerald-500' />
              <span className='ml-2 text-2xl font-semibold'>SeedSociety</span>
            </div>
            <p className='text-gray-400'>
              Making our planet greener, one tree at a time. Join our mission to
              create a sustainable future for generations to come.
            </p>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              {[
                'Home',
                'Events',
                'Fundraise',
                'Blog',
                'About Us',
                'Contact Us'
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className='text-gray-400 hover:text-emerald-500 transition-colors'
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact Us</h3>
            <ul className='space-y-4'>
              <li className='flex items-center'>
                <Mail className='h-5 w-5 text-emerald-500 mr-2' />
                <a
                  href='mailto:solveeaseofficial@gmail.com'
                  className='text-gray-400 hover:text-emerald-500'
                >
                  solveeaseofficial@gmail.com
                </a>
              </li>
              <li className='flex items-center'>
                <Phone className='h-5 w-5 text-emerald-500 mr-2' />
                <a
                  href='tel:+1234567890'
                  className='text-gray-400 hover:text-emerald-500'
                >
                  +91 72751 56652
                </a>
              </li>
              <li className='flex items-center'>
                <MapPin className='h-5 w-5 text-emerald-500 mr-2' />
                <span className='text-gray-400'>
                  Keshav Mahavidyalaya, Pitampura 110034, New Delhi, India
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Newsletter</h3>
            <p className='text-gray-400 mb-4'>
              Subscribe to our newsletter for updates on our initiatives and
              impact.
            </p>
            <form className='space-y-4'>
              <input
                type='email'
                placeholder='Enter your email'
                className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-emerald-500'
              />
              <button
                type='submit'
                className='w-full bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors'
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className='mt-12 pt-8 border-t border-gray-800 text-center text-gray-400'>
          <p>© {new Date().getFullYear()} SeedSociety. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

import { Bookmark, MapPin } from 'lucide-react'
import PestInfectionHistoryLineGraph from '../components/charts/PestInfectionHistoryLineGraph'
import AnnualYield from '../components/charts/AnnualYield'
import GradeOfApples from '../components/charts/GradeOfApples'
import ChemicalUsage from '../components/charts/ChemicalUsage'
// import HarvestPeriod from "../components/charts/HarvestPeriod"
import Rating from '../components/Rating'

const OrchardPage = () => {
  return (
    <div className='bg-[#f4f4f4]'>
      <div className='max-w-4xl mx-auto p-4'>
        {/* Video Box */}
        <div className='w-full h-80 bg-gray-200 rounded-lg mb-4 flex items-center justify-center'>
          <iframe
            className='w-full h-full rounded-lg'
            src='https://www.youtube.com/embed/Y_oA0XGHndU'
            title='Video'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>

        {/* Farm Name, Rating, and Bookmark */}
        <div className='flex items-center justify-between mb-2'>
          <h1 className='text-2xl font-bold'>Singh Apple Orchard</h1>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <Rating />
              <span className='mr-2'>4.2</span>
            </div>
            <button className='btn-primary'>ORDER NOW</button>
            <Bookmark className='w-5 h-5' />
          </div>
        </div>

        {/* Short Description */}
        <p className='text-gray-600 mb-4'>
          &quot;Providing fresh apples since 2006&quot;
        </p>

        {/* Location Section */}
        <div className='flex flex-col'>
          <h2 className='text-xl font-semibold mb-2'>Location</h2>
          <div className='flex items-start'>
            <MapPin className='w-5 h-5 mr-2 mt-1' />
            <p className='text-gray-700'>
              Bagi, Gawass, Himachal Pradesh 171207
            </p>
          </div>
        </div>
      </div>
      <div className='max-w-4xl mx-auto p-4 flex gap-8 flex-wrap '>
        {/* Card for Annual Yield */}
        <div className='bg-white shadow-md rounded-lg p-4 flex flex-col items-center mb-6'>
          <h2 className='text-xl font-semibold mb-4'>Annual Yield</h2>
          <div className='relative '>
            <AnnualYield />
          </div>
        </div>

        {/* Card for Pest Infection History */}
        <div className='bg-white shadow-md rounded-lg p-4 flex flex-col items-center mb-6'>
          <h2 className='text-xl font-semibold mb-4'>Pest Infection History</h2>
          <div className='relative'>
            <PestInfectionHistoryLineGraph />
          </div>
        </div>

        <div className='bg-white shadow-md rounded-lg p-4 flex flex-col items-center mb-6'>
          <div className='relative '>
            <GradeOfApples />
          </div>
        </div>
        <div className='bg-white shadow-md rounded-lg p-4 flex flex-col items-center mb-6'>
          <div className='relative '>
            <ChemicalUsage />
          </div>
        </div>
        {/* <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center mb-6">
                    <div className="relative ">
                        <HarvestPeriod />
                    </div>
                </div> */}
      </div>
    </div>
  )
}

export default OrchardPage

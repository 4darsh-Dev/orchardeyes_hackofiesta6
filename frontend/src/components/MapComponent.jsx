import { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Search, Filter, Bug } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Dummy data for pest and disease outbreaks
const outbreakData = [
  {
    id: 1,
    position: [51.505, -0.09],
    type: 'pest',
    severity: 'high',
    name: 'Codling Moth'
  },
  {
    id: 2,
    position: [51.51, -0.1],
    type: 'disease',
    severity: 'medium',
    name: 'Apple Scab'
  },
  {
    id: 3,
    position: [51.515, -0.09],
    type: 'pest',
    severity: 'low',
    name: 'Aphids'
  },
  {
    id: 4,
    position: [51.52, -0.08],
    type: 'disease',
    severity: 'high',
    name: 'Fire Blight'
  }
  // Add more dummy data points as needed
]

// Custom marker icons
const getOutbreakIcon = (type, severity) => {
  const color =
    severity === 'high' ? 'red' : severity === 'medium' ? 'yellow' : 'orange'
  const icon = type === 'pest' ? Bug : Bug

  return L.divIcon({
    html: `
      <div class="p-2 rounded-full ${
        severity === 'high'
          ? 'bg-red-500'
          : severity === 'medium'
            ? 'bg-yellow-500'
            : 'bg-orange-500'
      }">
        ${icon}
      </div>
    `,
    className: '',
    iconSize: [30, 30]
  })
}

// Map Controls Component
// const MapControls = ({ onSearch, onFilter, onThemeToggle }) => {
//   return (
//     <div className='absolute top-4 left-4 z-[1000] space-y-2'>
//       {/* <div className='bg-white rounded-lg shadow-lg p-2'>
//         <div className='flex items-center space-x-2'>
//           <input
//             type='text'
//             placeholder='Search location...'
//             className='px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
//             onChange={(e) => onSearch(e.target.value)}
//           />
//           <button
//             className='p-2 bg-gray-100 rounded-lg hover:bg-gray-200'
//             onClick={() => onFilter()}
//           >
//             <Filter className='w-5 h-5' />
//           </button>
//         </div>
//       </div> */}

//       <div className='bg-white rounded-lg shadow-lg p-2'>
//         <select
//           className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
//           onChange={(e) =>
//             onFilter({ type: 'severity', value: e.target.value })
//           }
//         >
//           <option value=''>All Severities</option>
//           <option value='high'>High</option>
//           <option value='medium'>Medium</option>
//           <option value='low'>Low</option>
//         </select>
//       </div>
//     </div>
//   )
// }

// Legend Component
// const Legend = () => {
//   return (
//     <div className='absolute bottom-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-4'>
//       <h3 className='font-semibold mb-2'>Legend</h3>
//       <div className='space-y-2'>
//         <div className='flex items-center space-x-2'>
//           <div className='w-4 h-4 rounded-full bg-red-500' />
//           <span>High Severity</span>
//         </div>
//         <div className='flex items-center space-x-2'>
//           <div className='w-4 h-4 rounded-full bg-yellow-500' />
//           <span>Medium Severity</span>
//         </div>
//         <div className='flex items-center space-x-2'>
//           <div className='w-4 h-4 rounded-full bg-orange-500' />
//           <span>Low Severity</span>
//         </div>
//       </div>
//     </div>
//   )
// }

const MapComponent = () => {
  const [theme, setTheme] = useState('light')
  const [filters, setFilters] = useState({})
  const center = [51.505, -0.09]
  const zoom = 13

  const handleSearch = async (query) => {
    console.log('Searching for:', query)
  }

  const handleFilter = (filter) => {
    setFilters((prev) => ({ ...prev, [filter.type]: filter.value }))
  }

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))

  const filteredOutbreaks = outbreakData.filter((outbreak) => {
    if (filters.severity && outbreak.severity !== filters.severity) {
      return false
    }
    return true
  })

  // const tileLayerUrl =
  //   'https://api.jawg.io/static?zoom=12&center=48.856,2.351&size=400x300&layer=jawg-sunny&format=png&access-token=Y9Wf945CKUCY8eISt4rJ3mZBZoPyd43H1p3R2h33HkMNVInGHvMGH8TOcLG7kiyh'

  const tileLayerUrl =
    theme === 'light'
      ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

  return (
    <div className='relative h-[calc(100vh-4rem)] w-screen'>
      {/* <MapControls
        onSearch={handleSearch}
        onFilter={handleFilter}
        onThemeToggle={toggleTheme}
      /> */}
      {/* <Legend /> */}
      <MapContainer center={center} zoom={zoom} className='h-full w-full'>
        <TileLayer url={tileLayerUrl} />
        <MarkerClusterGroup>
          {filteredOutbreaks.map((outbreak) => (
            <Marker
              key={outbreak.id}
              position={outbreak.position}
              icon={getOutbreakIcon(outbreak.type, outbreak.severity)}
            ></Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}

export default MapComponent

import { useState } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'
import Button from '../components/Button.jsx'
import DroneComponent from './Drone3d.jsx'
import { useNavigate } from 'react-router-dom'

const ConnectDrone = () => {
  const [qrData, setQrData] = useState(null)
  const [error, setError] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const navigate = useNavigate()
  const handleScan = (data) => {
    if (data) {
      setQrData(data)
      setIsScanning(false)
      console.log('QR Data:', data[0].rawValue)
      if (data[0].rawValue) navigate('/farm-management')
    }
  }

  const handleError = (err) => {
    setError(err)
    console.error('QR Error:', err)
  }
  return (
    <div className='flex flex-col items-center justify-center h-[70vh] sm:h-[auto] '>
      {isScanning && (
        <div className='h-[50vh] w-52'>
          <Scanner
            scanDelay={300}
            onError={handleError}
            onScan={handleScan}
            paused={!isScanning}
            className='h-full w-full'
          />
        </div>
      )}

      {/* {qrData && <p>QR Data: {qrData}</p>}
            {error && <p>Error: {error.message}</p>} */}
      {!isScanning && <DroneComponent />}
      <Button
        onClick={() => {
          setIsScanning(true)
        }}
        className='bg-[#7c0a0a] text-white px-4 py-2 rounded-md hover:bg-red-500'
      >
        Connect Drone
      </Button>
    </div>
  )
}

export default ConnectDrone

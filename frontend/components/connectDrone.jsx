import { useState } from "react"
import { Scanner } from "@yudiel/react-qr-scanner"
import Button from "../components/Button.jsx"

const ConnectDrone = () => {
    const [qrData, setQrData] = useState(null)
    const [error, setError] = useState(null)
    const [isScanning, setIsScanning] = useState(false)
    const handleScan = (data) => {
        if (data) {
            setQrData(data)
            // Handle the QR data (e.g., connect to the drone)
            console.log("QR Data:", data)
        }
    }

    const handleError = (err) => {
        setError(err)
        console.error("QR Error:", err)
    }

    const previewStyle = {
        height: 240,
        width: 320,
    }

    return (
        <div className="flex flex-col items-center">
            <h1>Connect Drone</h1>
            <div className="h-[50vh] w-52">
                <Scanner
                    scanDelay={300}
                    onError={handleError}
                    onScan={handleScan}
                    paused={!isScanning}
                    className="h-full w-full"
                />
            </div>
            {/* {qrData && <p>QR Data: {qrData}</p>}
            {error && <p>Error: {error.message}</p>} */}
            <Button
                onClick={() => {
                    setIsScanning(true)
                }}
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-[#d1d4d6] w-full "
            >
                Register
            </Button>
        </div>
    )
}

export default ConnectDrone

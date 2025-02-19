import { Cloud, CloudRain, CloudSun, CloudSunRain, Sun } from 'lucide-react'

// Function to return the appropriate weather icon based on the condition
export const weatherIcon = (condition, size) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return <Sun color='#cfcb18' size={size} fill='#cfcb18' />
    case 'partly cloudy':
    case 'cloudy':
      return <CloudSun color='#7d43e9' size={size} />
    case 'overcast':
    case 'mist':
      return <Cloud color='#5636e3' size={size} />
    case 'rain':
    case 'light rain':
    case 'heavy rain':
      return <CloudRain color='#4582e6' size={size} />
    case 'thunderstorm':
      return <CloudRain color='#3245d0' size={size} />
    case 'snow':
    case 'light snow':
    case 'heavy snow':
      return <CloudRain color='#65b1e0' size={size} />
    default:
      return <CloudSunRain color='#2850d3' size={size} />
  }
}

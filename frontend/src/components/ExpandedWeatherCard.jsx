import React from 'react';
import { Sun, Wind, Droplets, Thermometer, ArrowLeft, Clock } from 'lucide-react';

const ExpandedWeatherCard = ({
  temperature = 20,
  weatherCondition = 'Sunny',
  date = 'Monday, 24 April',
  windSpeed = '12 km/h',
  humidity = '45%',
  feelsLike = '22°',
  lastUpdated = 'Now',
  hourlyForecast = ['12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM'].map((time, index) => ({
    time,
    temperature: 22 - index,
    icon: Sun,
  })),
}) => {
  return (
    <div className="w-full max-w-2xl bg-gradient-to-br bg-green-500 text-white p-8 shadow-lg overflow-hidden">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 py-2 px-4 rounded-lg transition-all duration-300">
          <ArrowLeft className="w-4 h-4" />
          <span className="sr-only">Back</span>
        </button>
        <div className="text-sm opacity-75">Today's Forecast</div>
      </div>

      {/* Main weather info */}
      <div className="grid grid-cols-2 gap-2 mb-8">
        <div>
          <div className="flex items-start gap-2">
            <span className="text-6xl font-bold">{temperature}</span>
            <span className="text-3xl mt-2">°C</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Sun className="w-8 h-8" />
            <span className="text-2xl">{weatherCondition}</span>
          </div>
          <div className="text-lg mt-1 opacity-75">
            {date}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-5 h-5" />
              <span className="sr-only">Wind</span>
            </div>
            <div className="text-xl font-semibold">{windSpeed}</div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5" />
              <span className="sr-only">Humidity</span>
            </div>
            <div className="text-xl font-semibold">{humidity}</div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="w-5 h-5" />
              <span className="sr-only">Feels like</span>
            </div>
            <div className="text-xl font-semibold">{feelsLike}</div>
          </div>

          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5" />
              <span className="sr-only">Updated</span>
            </div>
            <div className="text-xl font-semibold">{lastUpdated}</div>
          </div>
        </div>
      </div>

      {/* Hourly forecast */}
      <div className="border-t border-white/20 pt-6">
        <h3 className="text-lg mb-4">Today's Forecast</h3>
        <div className="flex gap-4 overflow-x-auto">
          {hourlyForecast.map(({ time, temperature, icon: Icon }, index) => (
            <div key={time} className="flex flex-col items-center bg-white/10 rounded-lg p-3 min-w-[80px]">
              <span className="text-sm mb-2">{time}</span>
              <Icon className="w-6 h-6 mb-2" />
              <span className="text-lg font-semibold">{temperature}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpandedWeatherCard;
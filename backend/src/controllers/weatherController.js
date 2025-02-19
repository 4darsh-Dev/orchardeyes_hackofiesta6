const weatherApiKey = process.env.WEATHER_API_KEY

const fetchWeatherData = async (lat, lon) => {
  if (!weatherApiKey) {
    throw new Error('Something went wrong')
  }
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${lat},${lon}&days=2`
  console.log('url', url)
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const sendWeatherData = async (req, res) => {
  console.log('req received')
  const { lat, lon } = req.query
  try {
    const data = await fetchWeatherData(lat, lon)
    if (!data) throw new Error('Something went wrong')

    const currentHour = new Date().getHours()
    const today = new Date().toISOString().split('T')[0]

    const hourlyForecast = data.forecast.forecastday.flatMap((day) => {
      if (day.date === today) {
        return day.hour.filter(
          (hour) => new Date(hour.time).getHours() >= currentHour
        )
      }
      return day.hour
    })

    const remainingHoursToday = hourlyForecast.filter(
      (hour) => new Date(hour.time).getDate() === new Date().getDate()
    )
    const additionalHoursNeeded = 6 - remainingHoursToday.length

    const additionalHours = hourlyForecast.slice(
      remainingHoursToday.length,
      remainingHoursToday.length + additionalHoursNeeded
    )

    const finalHourlyForecast = [
      ...remainingHoursToday,
      ...additionalHours
    ].map((hour) => ({
      time: hour.time.slice(11, 16),
      temp: Math.round(hour.temp_c),
      condition: hour.condition.text
    }))

    const weatherData = {
      current: {
        temp: Math.round(data.current.temp_c),
        condition: data.current.condition.text,
        wind: data.current.wind_kph,
        humidity: data.current.humidity,
        lastUpdated: data.current.last_updated.slice(11, 16)
      },
      dailyForecast: data.forecast.forecastday.map((day) => ({
        date: day.date,
        temp: Math.round(day.day.avgtemp_c),
        condition: day.day.condition.text
      })),
      hourlyForecast: finalHourlyForecast
    }

    console.log('weather data', weatherData)
    res.status(200).json(weatherData)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

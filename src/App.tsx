import WeatherCard from './components/WeatherCard.tsx'
import axios from 'axios'

export default function App() {

  const fetchWeatherData = async (lat: number, lon:number) => { 
    const response = await axios.get<WeatherData>(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_REACT_APP_API_KEY}&units=metric`
  );
    const data = await response.data;
    return data;
  }

  const fetchCoordinates = async (location: string) => {
    const response = await axios.get(
  `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`
  );

    const data = await response.data;
    return data;
  }

  return (
    <div className="flex w-[100vw] h-[90vh] items-center justify-center">
      <WeatherCard 
        fetchWeatherData={fetchWeatherData} 
        fetchCoordinates={fetchCoordinates}
      />
    </div>
    )
}


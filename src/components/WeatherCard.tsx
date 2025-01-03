import React, { useEffect, useState } from 'react'
import { optionType } from '../types/index.ts'
import axios from 'axios'

interface WeatherData {
  name: string;
  sys: {
    country: string
  };
  main: {
    temp: number,
    humidity: number,
    feels_like: number,
    pressure: number,
    temp_max: number,
    temp_min: number
  },
  weather: [{
    description: string,
    icon: string,
    main: string
  }],
  wind: {
    deg: number,
    speed: number
  }
}

const WeatherCard: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeatherData = async (lat: number, lon:number) => { 
    const response = await axios.get<WeatherData>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_REACT_APP_API_KEY}`
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

  useEffect(() => {
      setOptions([])
      if (location.trim() == '') {
        return
      }
      const fetch = async () => {
        const result = await fetchCoordinates(location.trim())
        console.log(result)

        setOptions(result);

      }
      fetch();
  }, [location])

  const submitOptionHandler = async(option: optionType) => {
    const { lat, lon } = option;

    const forecasts = await fetchWeatherData(lat, lon)
    setOptions([]);
    setWeatherData(forecasts);
    console.log(forecasts)
  }

    
  return (
    <>
      <div className='p-6 rounded border shadow-sm'>
        <div className="flex flex-row gap-2 relative">
          <input
            className='p-2 border-2 rounded border-gray-100 outline-none focus:ring-4 duration-200 text-gray-500'
            type='text'
            value={location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
            placeholder='Search place'/> 
        </div>

        {/* Options */}
        <div className='absolute p-4'>
          <ul className='text-gray-600 bg-white'>
            { options && options.map((option: optionType, index: number) => (
              <li key={option.name + '-' + index}>
                  <button
                    onClick={(e) => submitOptionHandler(option)}    
                    className='hover:bg-zinc-600 hover:text-white text-left text-sm w-full px-2 py-1'>
                    { option.name }
                  </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Display Weather Data */}
        { weatherData && 
          <div>
            <h2>{ weatherData.name }</h2>
          </div>
        }
      </div>
    </>
  )
}

export default WeatherCard;

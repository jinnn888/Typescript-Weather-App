import React, { useEffect, useState } from 'react'
import { optionType } from '../types/index.ts'
import { BsFillCloudsFill } from "react-icons/bs";
import { FaCloudShowersHeavy } from "react-icons/fa6";

interface PropsInterface {
  fetchWeatherData: (lat: number, lon:number) => {};
  fetchCoordinates: (location: string) => [];
}

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


const WeatherCard: React.FC<PropsInterface>= ({ fetchWeatherData, fetchCoordinates }) => {
  const [location, setLocation] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
      setOptions([])
      if (location.trim() == '') {
        return
      }
      const fetch = async () => {
        const result = await fetchCoordinates(location.trim())

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

  const searchSubmitHandler = async (location: string) => {
    const fetchCoords = await fetchCoordinates(location);
    const { lat, lon } = fetchCoords[0];
    
    const forecasts = await fetchWeatherData(lat, lon)
    setOptions([]);
    setWeatherData(forecasts);
    console.log(forecasts)
  }
  
  const generateIcon = (main: string): React.ReactNode => {
    let element: React.ReactNode;
    switch (main.toLowerCase()) {
      case 'rain':
        element = <FaCloudShowersHeavy className='text-gruvbox-blue text-6xl mb-4'/>;
        break;
     case 'clouds':
       element = <BsFillCloudsFill className='text-gruvbox-blue text-6xl mb-4'/> 
       break;
    }
    
    return element;

  }

  return (
    <>
      <div className=' p-6 rounded shadow-md h-[60vh] w-10/12 flex'>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 ">
            <input
              className='bg-transparent border-gruvbox-blue p-2 w-full border-2 rounded border-gray-100 outline-none focus:ring-4 duration-200 text-gruvbox-white'
              type='text'
              value={location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
              placeholder='Search place'/>
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => searchSubmitHandler(location)}
              className='bg-gruvbox-blue text-gruvbox-white text-sm font-semibold py-1 px-2 rounded'  
              >Search</button>
          </div>
          {/* Options */}
          { options.length > 1 && 
          <div className='w-full p-4 rounded bg-gruvbox-blue'>
            <ul className='text-gruvbox-white'>
              { options.map((option: optionType, index: number) => (
                <li key={option.name + '-' + index}>
                    <button
                      onClick={(e) => submitOptionHandler(option)}    
                      className='text-left text-sm w-full px-2 py-1'>
                      { option.name }
                    </button>
                </li>
              ))}
            </ul>
          </div>
          }
        </div>

       
        {/* Display Weather Data */}
        { weatherData && 
          <div className="w-full flex flex-col items-center mt-[6rem] text-gruvbox-white">
            { generateIcon(weatherData.weather[0].main) }
            <h2 className="text-6xl font-bold">{ weatherData.main.temp }°C</h2>
            <span className="capitalize">{ weatherData.weather[0].description }</span>
            <span className="capitalize">{ weatherData.weather[0].main }</span>
                  
            <div className="flex flex-row justify-around p-4 w-full">
              <div className='flex flex-col'>
                <span className="font-semibold text-lg">{ weatherData.main.humidity }</span>
                <span className="font-normal text-md">Humidity</span>
              </div>
            <div className='flex flex-col'>
                <span className="font-semibold text-lg">{ weatherData.wind.speed }Km/H</span>
                <span className="font-normal text-md">Wind Speed</span>
            </div>

            </div>
            
          </div>
        }
      </div>
    </>
  )
}

export default WeatherCard;

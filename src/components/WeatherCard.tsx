import React, { useEffect, useState } from 'react'
import { optionType } from '../types/index.ts'

import axios from 'axios'

export default function WeatherCard() {
  const [location, setLocation] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);

  const fetchCoordinates = async (location: string) => {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${
      import.meta.env.VITE_REACT_APP_API_KEY}`
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

  const optionHandler = async(option: optionType) => {
    console.log(option)
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

          <button
            className='text-gray-600 border shadow-sm p-2 rounded text-sm'>
            Search
          </button>
        </div>

        {/* Options */}
        <div className='absolute p-4'>
          <ul className='text-gray-600 bg-white'>
            { options && options.map((option: optionType ) => (
              <li>
                  <button
                    onClick={(e) => optionHandler(option)}    
                    className='hover:bg-zinc-600 hover:text-white text-left text-sm w-full px-2 py-1'>
                    { option.name }
                  </button>
              </li>
            ))}
          </ul>

        </div>

      </div>
    </>
  )
}

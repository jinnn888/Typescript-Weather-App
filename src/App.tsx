import { useState } from 'react'
import WeatherCard from './components/WeatherCard.tsx'

function App() {
  const [count, setCount] = useState<number>(0);
  return (
    <div className="flex w-[100vw] h-[90vh] items-center justify-center">
      <WeatherCard/>
    </div>
  )
}

export default App

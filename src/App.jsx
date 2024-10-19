import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInformations from './components/WeatherInformations/WeatherInformations'
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInformations5Days'

function App() {
  const [weather, setWeather] = useState()
  const [weather5Days, setWeather5Days] = useState()
  const inputRef = useRef()

  async function searchCity() {
    const city = inputRef.current.value
    const key = "71c7973c58cf6910b7e8a1eb4f2fcf7d"

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    const url5days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

    const apiDataWeather = await axios.get(url)
    const apiInfo5Days = await axios.get(url5days)

    setWeather5Days(apiInfo5Days.data)
    setWeather(apiDataWeather.data)
  }

  return (
    <div className='container'>
      <h1>Previsão do Tempo</h1>
      <input ref={inputRef} type="text" placeholder='Digite o nome da cidade'/>
      <button onClick={searchCity}>Buscar</button>

      {weather && <WeatherInformations weather={weather}/>}
      {weather && <WeatherInformations5Days weather5Days={weather5Days}/>}
    </div>
  )
}

export default App
